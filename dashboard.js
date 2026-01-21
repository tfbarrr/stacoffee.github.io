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
});
