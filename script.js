// Menu Data Stacoffee
const menuItems = [
    {id:1,name:'Army Brew Espresso',price:25000,img:'https://images.unsplash.com/photo-1494314671902-399b18174975?w=400'},
    {id:2,name:'Kreme Latte',price:35000,img:'https://images.unsplash.com/photo-1512568400610-42fe290ca098?w=400'},
    {id:3,name:'Green Matcha',price:38000,img:'https://images.unsplash.com/photo-1577968897966-7d75d666b262?w=400'},
    {id:4,name:'Stacoffee Gamestation Fries',price:28000,img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400'},
    {id:5,name:'Kreme Croissant',price:22000,img:'https://images.unsplash.com/photo-1534622727722-a3e98a7d8ffe?w=400'},
    {id:6,name:'Army Chicken Wings',price:45000,img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'}
];

let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartModal = document.getElementById('cart-modal');
const paymentModal = document.getElementById('payment-modal');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    setupEventListeners();
    updateCartDisplay();
});

function renderMenu() {
    menuGrid.innerHTML = '';
    menuItems.forEach(function(item) {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = '<img src="'+item.img+'" alt="'+item.name+'" loading="lazy"><h3>'+item.name+'</h3><p class="price">Rp '+item.price.toLocaleString()+'</p><button onclick="addToCart('+item.id+')"><i class="fas fa-plus"></i> Tambah</button>';
        menuGrid.appendChild(card);
    });
}

function addToCart(itemId) {
    const item = menuItems.find(function(m) { return m.id === itemId; });
    const cartItem = cart.find(function(c) { return c.id === itemId; });
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({id:item.id,name:item.name,price:item.price,quantity:1});
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    const totalPrice = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toLocaleString();
    
    const cartItemsEl = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p>Keranjang kosong</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsEl.innerHTML = cart.map(function(item) {
            return '<div class="cart-item"><span>'+item.name+' x'+item.quantity+'</span><span>Rp '+(item.price * item.quantity).toLocaleString()+'</span></div>';
        }).join('');
        checkoutBtn.disabled = false;
    }
}

function setupEventListeners() {
    document.getElementById('hamburger').addEventListener('click', function() {
        document.getElementById('nav-links').classList.toggle('show');
    });

    document.querySelectorAll('a[href="#cart"]').forEach(function(link) {
        link.addEventListener('click', function() { cartModal.style.display = 'block';
        document.getElementById('nav-links').classList.remove('show');
        });
      
    });

    document.querySelectorAll('.close').forEach(function(close) {
        close.addEventListener('click', function() {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'none';
            loginModal.style.display = 'none';
        });
    });

    checkoutBtn.addEventListener('click', checkout);

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'none';
        }
    });
}

function checkout() {
    const total = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);
    
    // Demo QR tanpa backend (FIX ERROR)
    document.getElementById('qr-image').src = 'https://api.qrserver.com/v1/create?size=250x250&data=Stacoffee%20Order%20Rp'+total.toLocaleString()+'%20Scan%20DANA/OVO/Gopay';
    document.getElementById('qr-amount').textContent = 'Rp '+total.toLocaleString();
    
    cartModal.style.display = 'none';
    paymentModal.style.display = 'block';
    
    // Kosongkan cart setelah checkout
    cart = [];
    updateCartDisplay();
}

// 1. Setup Login Modal
const loginModal = document.getElementById('login-modal');
const loginLink = document.getElementById('login-link');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Event Buka Modal Login
loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'block';
    // Tutup navbar mobile jika sedang terbuka
    document.getElementById('nav-links').classList.remove('show');
});

// Logic Login Sederhana
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // HARDCODE CREDENTIALS (Untuk demo)
    if (user === 'admin' && pass === '12345') {
        // Simpan sesi login
        localStorage.setItem('role', 'cashier');
        localStorage.setItem('user', 'Stacoffee Admin');
        
        // Redirect ke dashboard
        alert('Login Berhasil! Mengalihkan ke Dashboard kasir...');
        window.location.href = 'dashboard.html';
    } else {
        loginError.style.display = 'block';
        // Shake animation effect
        loginForm.classList.add('shake');
        setTimeout(() => loginForm.classList.remove('shake'), 500);
    }
});

// Modifikasi window click event untuk menutup login modal juga
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        cartModal.style.display = 'none';
        paymentModal.style.display = 'none';
        loginModal.style.display = 'none'; // Tambahan
    }
});
