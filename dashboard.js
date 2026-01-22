// Security Check: Apakah user sudah login?
document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('role');
    
        // --- LOGIKA RESPONSIVE SIDEBAR ---
    
    const sidebar = document.getElementById('sidebar-nav');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');

    // Fungsi Buka Sidebar
    if(toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    // Fungsi Tutup Sidebar (Klik X atau Klik Overlay)
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if(overlay) overlay.addEventListener('click', closeSidebar);

    
    // Jika tidak ada role 'cashier' tersimpan, tendang balik ke halaman home
    if (role !== 'cashier') {
        alert('Akses Ditolak! Silakan login terlebih dahulu.');
        window.location.href = 'index.html';
    }

    // Fitur Logout
    const logoutBtn = document.getElementById('logout-btn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus data sesi
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            
            // Redirect ke halaman utama
            window.location.href = 'index.html';
        });
    }
    
    // Initialize dashboard
    loadOrders();
    
    // Auto refresh setiap 10 detik agar realtime
    setInterval(loadOrders, 10000);
});

// ============================================
// DASHBOARD BUTTON FUNCTIONS
// ============================================

const API_BASE_URL = `${window.location.origin}/api`;

// 1. Load Data dari Backend
async function loadOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        const data = await response.json();
        
        if (!data.success) {
            console.error('Failed to load orders:', data.message);
            return;
        }
        
        renderOrdersTable(data.orders);
    } catch (error) {
        console.error('Error loading orders:', error);
        // Fallback ke localStorage jika backend tidak tersedia
        loadOrdersFromLocalStorage();
    }
}

// Render orders table
function renderOrdersTable(orders) {
    const tbody = document.getElementById('order-table-body');
    const emptyMsg = document.getElementById('empty-msg');

    tbody.innerHTML = '';

    if (orders.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    emptyMsg.style.display = 'none';

    orders.slice().reverse().forEach((order, reverseIndex) => {
        let itemsHtml = order.items.map(item => 
            `<div>- <b>${item.name}</b> <br><small style="color:#666">(${item.selectedOptions.join(', ')})</small></div>`
        ).join('<br>');

        const realIndex = orders.length - 1 - reverseIndex;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><b>${order.orderId}</b></td>
            <td style="font-size: 1.2rem; font-weight:bold; color: var(--army-green); text-align:center;">${order.table}</td>
            <td>${order.customer}</td>
            <td style="white-space:normal; min-width:200px;">${itemsHtml}</td>
            <td style="font-weight:bold;">Rp ${order.total.toLocaleString('id-ID')}</td>
            <td>${order.timestamp}</td>
            <td>
                <button class="btn-action" onclick="selesaiOrder(${realIndex})" style="background:#c0392b;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Fallback: Load dari localStorage jika backend tidak ada
function loadOrdersFromLocalStorage() {
    const orders = JSON.parse(localStorage.getItem('cafe_orders')) || [];
    renderOrdersTable(orders);
}

// 2. Hapus/Selesaikan Pesanan
async function selesaiOrder(orderIndex) {
    if(!confirm('Hapus pesanan ini?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderIndex}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (!data.success) {
            alert('Gagal menghapus pesanan: ' + data.message);
            return;
        }
        
        loadOrders();
    } catch (error) {
        console.error('Error deleting order:', error);
        // Fallback ke localStorage
        selesaiOrderLocal(orderIndex);
    }
}

// Fallback: Hapus dari localStorage
function selesaiOrderLocal(reversedIndex) {
    let orders = JSON.parse(localStorage.getItem('cafe_orders')) || [];
    let realIndex = orders.length - 1 - reversedIndex;
    orders.splice(realIndex, 1);
    localStorage.setItem('cafe_orders', JSON.stringify(orders));
    loadOrders();
}

// 3. Responsive Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Toggle class 'active'
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// 4. Refresh Data
function refreshData() { 
    loadOrders(); 
}

// 5. Logout
function logout() { 
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// ============================================
// SECTION NAVIGATION
// ============================================

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Update active menu link
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.menu-link').classList.add('active');
    
    // Close sidebar on mobile
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
    
    // Load section-specific data
    if (sectionName === 'laporan') {
        loadLaporanData();
    }
}

// ============================================
// LAPORAN SECTION FUNCTIONS
// ============================================

function loadLaporanData() {
    try {
        const response = fetch(`${API_BASE_URL}/orders`);
        response.then(res => res.json()).then(data => {
            if (data.success) {
                renderLaporanTable(data.orders);
                calculateLaporanStats(data.orders);
            }
        }).catch(err => {
            const orders = JSON.parse(localStorage.getItem('cafe_orders')) || [];
            renderLaporanTable(orders);
            calculateLaporanStats(orders);
        });
    } catch (error) {
        const orders = JSON.parse(localStorage.getItem('cafe_orders')) || [];
        renderLaporanTable(orders);
        calculateLaporanStats(orders);
    }
}

function renderLaporanTable(orders) {
    const tbody = document.getElementById('laporan-table-body');
    const emptyMsg = document.getElementById('laporan-empty-msg');

    tbody.innerHTML = '';

    if (orders.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    emptyMsg.style.display = 'none';

    orders.forEach((order) => {
        const tr = document.createElement('tr');
        const tanggal = order.timestamp || new Date().toLocaleDateString('id-ID');
        tr.innerHTML = `
            <td><b>${order.orderId}</b></td>
            <td>${tanggal}</td>
            <td style="text-align:center; font-weight:bold; color: var(--army-green);">${order.table}</td>
            <td>${order.customer}</td>
            <td style="font-weight:bold;">Rp ${order.total.toLocaleString('id-ID')}</td>
            <td><span style="background: #27ae60; color: white; padding: 5px 10px; border-radius: 5px; font-size: 0.85rem;">Selesai</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function calculateLaporanStats(orders) {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Count today's orders
    const today = new Date().toLocaleDateString('id-ID');
    const todayOrders = orders.filter(order => {
        const orderDate = order.timestamp || '';
        return orderDate.includes(today);
    }).length;

    document.getElementById('stat-total').textContent = totalOrders;
    document.getElementById('stat-revenue').textContent = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
    document.getElementById('stat-average').textContent = `Rp ${Math.floor(avgOrder).toLocaleString('id-ID')}`;
    document.getElementById('stat-today').textContent = todayOrders;
}

function filterLaporan() {
    const fromDate = document.getElementById('filter-from').value;
    const toDate = document.getElementById('filter-to').value;
    alert('Filter dengan rentang tanggal: ' + fromDate + ' - ' + toDate + '\n(Fitur lengkap dapat diimplementasikan di backend)');
}

function exportLaporan() {
    try {
        const orders = JSON.parse(localStorage.getItem('cafe_orders')) || [];
        const dataStr = JSON.stringify(orders, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `laporan-pesanan-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        alert('Laporan berhasil diexport!');
    } catch (error) {
        alert('Gagal export laporan: ' + error.message);
    }
}

// ============================================
// PENGATURAN SECTION FUNCTIONS
// ============================================

function saveTokSettings() {
    const namaToko = document.getElementById('nama-toko').value;
    const alamat = document.getElementById('alamat-toko').value;
    const telp = document.getElementById('telp-toko').value;
    
    localStorage.setItem('toko-settings', JSON.stringify({
        nama: namaToko,
        alamat: alamat,
        telepon: telp
    }));
    alert('Pengaturan toko berhasil disimpan!');
}

function saveMejaSettings() {
    const jumlah = document.getElementById('jumlah-meja').value;
    const kapasitas = document.getElementById('kapasitas-meja').value;
    
    localStorage.setItem('meja-settings', JSON.stringify({
        jumlah: parseInt(jumlah),
        kapasitas: parseInt(kapasitas)
    }));
    alert('Pengaturan meja berhasil disimpan!');
}

function saveSystemSettings() {
    const refreshInterval = document.getElementById('refresh-interval').value;
    const timezone = document.getElementById('timezone').value;
    
    localStorage.setItem('system-settings', JSON.stringify({
        refreshInterval: parseInt(refreshInterval),
        timezone: timezone
    }));
    alert('Pengaturan sistem berhasil disimpan!');
}

function backupData() {
    try {
        const allData = {
            orders: JSON.parse(localStorage.getItem('cafe_orders')) || [],
            settings: {
                toko: JSON.parse(localStorage.getItem('toko-settings')) || {},
                meja: JSON.parse(localStorage.getItem('meja-settings')) || {},
                system: JSON.parse(localStorage.getItem('system-settings')) || {}
            },
            backup_date: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup-stacoffee-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        alert('Backup data berhasil dibuat!');
    } catch (error) {
        alert('Gagal membuat backup: ' + error.message);
    }
}

function restoreData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.orders) {
                localStorage.setItem('cafe_orders', JSON.stringify(data.orders));
            }
            if (data.settings) {
                if (data.settings.toko) {
                    localStorage.setItem('toko-settings', JSON.stringify(data.settings.toko));
                }
                if (data.settings.meja) {
                    localStorage.setItem('meja-settings', JSON.stringify(data.settings.meja));
                }
                if (data.settings.system) {
                    localStorage.setItem('system-settings', JSON.stringify(data.settings.system));
                }
            }
            
            alert('Data berhasil direstore!');
            loadOrders();
        } catch (error) {
            alert('Gagal restore data: File tidak valid');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('⚠️ Anda yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan!')) {
        if (confirm('Tekan OK lagi untuk konfirmasi penghapusan semua data')) {
            localStorage.removeItem('cafe_orders');
            localStorage.removeItem('toko-settings');
            localStorage.removeItem('meja-settings');
            localStorage.removeItem('system-settings');
            alert('Semua data berhasil dihapus!');
            loadOrders();
        }
    }
}
