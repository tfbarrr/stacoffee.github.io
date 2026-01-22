const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// --- [BAGIAN BARU] ---

// 1. Izinkan server membaca file apa saja yang ada di root (untuk CSS/JS/Gambar)
app.use(express.static(__dirname));

// 2. Rute khusus untuk halaman utama ('/') agar membuka index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- [BATAS BAGIAN BARU] ---

// Initialize SQLite database
const DB_FILE = path.join(__dirname, 'orders.db');
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

/**
 * Initialize database table if it doesn't exist
 */
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            notes TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Orders table ready');
        }
    });
}

/**
 * GET /api/orders - Fetch all orders
 */
app.get('/api/orders', (req, res) => {
    db.all('SELECT * FROM orders ORDER BY createdAt DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
        res.json({
            success: true,
            orders: rows || [],
            count: (rows || []).length
        });
    });
});

/**
 * POST /api/orders - Add a new order
 */
app.post('/api/orders', (req, res) => {
    try {
        const { name, email, phone, quantity, notes } = req.body;
        
        // Validate required fields
        if (!name || !email || !phone || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        db.run(
            'INSERT INTO orders (name, email, phone, quantity, notes) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, quantity, notes || ''],
            function(err) {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
                
                // Fetch all orders to return
                db.all('SELECT * FROM orders ORDER BY createdAt DESC', [], (err, rows) => {
                    res.status(201).json({
                        success: true,
                        message: 'Order added successfully',
                        orderId: this.lastID,
                        orders: rows || []
                    });
                });
            }
        );
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * DELETE /api/orders/:orderId - Delete an order by ID
 */
app.delete('/api/orders/:orderId', (req, res) => {
    try {
        const orderId = parseInt(req.params.orderId);
        
        db.run('DELETE FROM orders WHERE id = ?', [orderId], function(err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }
            
            // Fetch remaining orders to return
            db.all('SELECT * FROM orders ORDER BY createdAt DESC', [], (err, rows) => {
                res.json({
                    success: true,
                    message: 'Order deleted successfully',
                    orders: rows || []
                });
            });
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * GET /health - Health check endpoint
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

/**
 * Start the server
 */
const PORT = process.env.PORT || 2502;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`Health check: http://${HOST}:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            } else {
                console.log('Database closed');
            }
            process.exit(0);
        });
    });
});

module.exports = app;
