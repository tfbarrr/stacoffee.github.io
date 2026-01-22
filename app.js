const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Simulated database file (you can replace with a real database later)
const ORDERS_FILE = path.join(__dirname, 'orders.json');

/**
 * Load orders from JSON file or return empty list
 */
function loadOrdersFromStorage() {
    try {
        if (fs.existsSync(ORDERS_FILE)) {
            const data = fs.readFileSync(ORDERS_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error loading orders:', error);
        return [];
    }
}

/**
 * Save orders to JSON file
 */
function saveOrdersToStorage(orders) {
    try {
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving orders:', error);
    }
}

/**
 * GET /api/orders - Fetch all orders
 */
app.get('/api/orders', (req, res) => {
    const orders = loadOrdersFromStorage();
    res.json({
        success: true,
        orders: orders,
        count: orders.length
    });
});

/**
 * POST /api/orders - Add a new order
 */
app.post('/api/orders', (req, res) => {
    try {
        const data = req.body;
        const orders = loadOrdersFromStorage();
        
        // Add order to list
        orders.push(data);
        saveOrdersToStorage(orders);
        
        res.status(201).json({
            success: true,
            message: 'Order added successfully',
            orders: orders
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * DELETE /api/orders/:orderId - Delete an order by index
 */
app.delete('/api/orders/:orderId', (req, res) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const orders = loadOrdersFromStorage();
        
        if (orderId < 0 || orderId >= orders.length) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        
        orders.splice(orderId, 1);
        saveOrdersToStorage(orders);
        
        res.json({
            success: true,
            message: 'Order deleted successfully',
            orders: orders
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
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`Health check: http://${HOST}:${PORT}/health`);
});

module.exports = app;
