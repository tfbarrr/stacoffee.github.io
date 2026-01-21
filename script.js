// 1. DATA MENU
const menuData = [
    {
        id: "coffee",
        name: "Coffee",
        items: [
            {
                id: 101,
                name: "Kopi Susu Gula Aren",
                desc: "Espresso, Fresh Milk, Gula Aren Asli",
                price: 18000,
                img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200",
                options: [
                    { name: "Sugar", type: "radio", choices: ["Normal (100%)", "Less (50%)", "No Sugar"] },
                    { name: "Temp", type: "radio", choices: ["Ice", "Hot"] }
                ]
            },
            {
                id: 102,
                name: "Caramel Macchiato",
                desc: "Vanilla, Espresso, Milk, Caramel Sauce",
                price: 24000,
                img: "https://images.unsplash.com/photo-1485808191679-5f8c7c8356f7?w=200",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 103,
                name: "Avocado Coffee",
                desc: "Fresh Brewed Robusta Coffee with Avocado Syrup",
                price: 25000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/avocado%20coffee.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 104,
                name: "Creamy Lotus Biscoff",
                desc: "Espresso, Steamed Milk, Lotus Biscoff Syrup with Foam and real Biscoff",
                price: 28000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/_creamy%20lotus%20biscoff%20.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 105,
                name: "Chocolate Frappe",
                desc: "Frappecino with Chocolate Syrup and Topped with Whipped Cream",
                price: 26000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/choco%20frappe.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 106,
                name: "Tiramisu Milk",
                desc: "Frappecino with Mocha Syrup and Topped with Whipped Cream",
                price: 27000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/tiramisu%20milk.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 107,
                name: "Coffee Series Bottle",
                desc: "Espresso, Milk, Tiramisu Syrup with Cocoa Powder Topping",
                price: 28000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/coffee%20sereis%20botol%20200ml.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            }
        ]
    },
    {
        id: "non-coffee",
        name: "Non-Coffee",
        items: [
            {
                id: 201,
                name: "Matcha Peanut",
                desc: "Premium Japan Matcha with Peanut Syrup",
                price: 22000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/matcha%20peanut.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 202,
                name: "Aloe Lemongrass",
                desc: "Aloe Vera with Premium Lemongrass",
                price: 20000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/Aloe%20Lemongrass.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 203,
                name: "Apple Fuji",
                desc: "Fresh Apple Juice with Fuji drops",
                price: 25000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/apple%20fuji.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 204,
                name: "Coconut Tropic",
                desc: "Fresh Coconut blended with Tropical Fruits",
                price: 23000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/coconut%20tropic.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 205,
                name: "Mango Milk",
                desc: "Fresh Mango Juice with Condensed Milk",
                price: 24000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/mango%20milk.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 206,
                name: "Mango Boost",
                desc: "Even Fresher Mango Juice, Energy drink",
                price: 23000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/mango%20boost.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 207,
                name: "Mango Summer",
                desc: "Fresh Brewed Tea, with Mango Juice",
                price: 23000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/mango%20summer.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 208,
                name: "Mango Yakult",
                desc: "Fresh Brewed Tea, with Mango Juice and Yakult",
                price: 24000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/mango%20yakult.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 209,
                name: "",
                desc: "Fresh Strawberry blended with Yakult",
                price: 25000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/banagato.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            },
            {
                id: 210,
                name: "Strawberry Boost",
                desc: "Fresh Strawberry blended with Energy Drink",
                price: 24000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/non%20coffee%20series%20botol%20250ml.jpg",
                options: [{ name: "Sugar", type: "radio", choices: ["Normal", "Less"] }]
            }
        ]
    },
    {
        id: "food",
        name: "Food",
        items: [
            {
                id: 301,
                name: "Mie Godok Staco",
                desc: "Telur, Ayam, Kerupuk, Acar",
                price: 28000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/Mie%20godok.jpg",
                options: [{ name: "Pedas", type: "radio", choices: ["Tidak Pedas", "Sedang", "Pedas"] }]
            },
            {
                id: 302,
                name: "Chicken Lava Egg Mayo",
                desc: "Macaroni Cheese, with Chicken Lava Egg Mayo",
                price: 30000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/_chickem%20lava%20egg%20mayo.jpg",
                options: [{ name: "Pedas", type: "radio", choices: ["Tidak Pedas", "Sedang", "Pedas"] }]
            },
            {
                id: 303,
                name: "Rice Bowl Blackpepper",
                desc: "Telur, Ayam, Sosis, Bakso, Acar",
                price: 25000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/_rice%20bowl%20blackpepper.jpg",
                options: [{ name: "Pedas", type: "radio", choices: ["Tidak Pedas", "Sedang", "Pedas"] }]
            },
            {
                id: 304,
                name: "Chicken Katsu",
                desc: "Rice, Chicken Katsu, Caulliflower, Saus Tonkatsu",
                price: 30000,
                img: "https://raw.githubusercontent.com/tfbarrr/imageshi/main/ayam%20selimut.png",
                options: [{ name: "Pedas", type: "radio", choices: ["Tidak Pedas", "Sedang", "Pedas"] }]
            },
            {
                id: 305,
                name: "Spaghetti Bolognese",
                desc: "Spaghetti with Beef Bolognese Sauce",
                price: 32000,
                img: "https://github.com/tfbarrr/imageshi/blob/main/burger%20premium%20ala%20cart.png",
                options: [{ name: "Pedas", type: "radio", choices: ["Tidak Pedas", "Sedang", "Pedas"] }]
            }
        ]
    }
];

let cart = [];
let currentSelectedProduct = null;

// Saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupEventListeners();
});

// Render Menu ke HTML
function renderMenu() {
    const navContainer = document.getElementById('category-nav');
    const menuContainer = document.getElementById('menu-container');

    menuData.forEach((cat, index) => {
        // Nav Button
        const btn = document.createElement('a');
        btn.className = `cat-btn ${index === 0 ? 'active' : ''}`;
        btn.innerText = cat.name;
        btn.href = `#${cat.id}`;
        btn.onclick = (e) => {
            e.preventDefault();
            document.getElementById(cat.id).scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        navContainer.appendChild(btn);

        // Section
        const section = document.createElement('div');
        section.id = cat.id;
        section.className = 'category-section';
        section.innerHTML = `<div class="category-title">${cat.name}</div>`;

        cat.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'menu-item';
            itemEl.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-desc">${item.desc}</div>
                    <div class="item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                </div>
                <div class="item-img-box">
                    <img src="${item.img}" class="item-img" alt="${item.name}">
                    <div class="add-btn-mini"><i class="fas fa-plus"></i></div>
                </div>
            `;
            itemEl.onclick = () => openOptionModal(item);
            section.appendChild(itemEl);
        });
        menuContainer.appendChild(section);
    });
}

// Buka Modal Opsi (Gula, Es, dll)
function openOptionModal(product) {
    currentSelectedProduct = product;
    const modal = document.getElementById('options-modal');
    const details = document.getElementById('options-details');
    const form = document.getElementById('options-form');

    details.innerHTML = `
        <div style="display:flex; align-items:center; margin-bottom:15px;">
            <img src="${product.img}" style="width:60px; height:60px; border-radius:8px; margin-right:15px; object-fit:cover;">
            <div>
                <h3 style="margin:0;">${product.name}</h3>
                <div style="font-weight:bold;">Rp ${product.price.toLocaleString('id-ID')}</div>
            </div>
        </div>
    `;

    form.innerHTML = '';
    if (product.options) {
        product.options.forEach((opt, idx) => {
            let html = `<div class="option-group"><span class="option-title">${opt.name}</span>`;
            opt.choices.forEach((choice, cIdx) => {
                const isChecked = cIdx === 0 ? 'checked' : '';
                html += `
                    <label class="radio-option">
                        <span>${choice}</span>
                        <input type="radio" name="opt_${idx}" value="${choice}" ${isChecked}>
                    </label>
                `;
            });
            html += `</div>`;
            form.innerHTML += html;
        });
    }
    modal.style.display = 'block';
}

// Tambah ke Cart (Setelah pilih opsi)
document.getElementById('add-to-cart-final').addEventListener('click', () => {
    if (!currentSelectedProduct) return;
    const selectedOptions = [];
    if (currentSelectedProduct.options) {
        currentSelectedProduct.options.forEach((opt, idx) => {
            const val = document.querySelector(`input[name="opt_${idx}"]:checked`).value;
            selectedOptions.push(`${opt.name}: ${val}`);
        });
    }
    const cartItem = {
        ...currentSelectedProduct,
        cartId: Date.now(),
        selectedOptions: selectedOptions
    };
    cart.push(cartItem);
    updateCartUI();
    closeModal('options-modal');
});

// Update Tampilan Cart
function updateCartUI() {
    const floatCart = document.getElementById('floating-cart');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total-preview');
    const modalList = document.getElementById('cart-items-list');
    const finalTotal = document.getElementById('final-total');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    countSpan.innerText = cart.length;
    totalSpan.innerText = "Rp " + total.toLocaleString('id-ID');

    floatCart.style.display = cart.length > 0 ? 'flex' : 'none';

    modalList.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.style.borderBottom = "1px solid #eee";
        div.style.padding = "10px 0";
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <strong>${item.name}</strong>
                <span>Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
            <div style="font-size:0.8rem; color:#888;">${item.selectedOptions.join(', ')}</div>
            <div style="text-align:right; margin-top:5px;">
                <span style="color:red; font-size:0.8rem; cursor:pointer;" onclick="removeFromCart(${index})">Hapus</span>
            </div>
        `;
        modalList.appendChild(div);
    });
    finalTotal.innerText = "Rp " + total.toLocaleString('id-ID');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    if(cart.length === 0) closeModal('cart-modal');
}

// Konfirmasi Pesanan (Table Input)
document.getElementById('confirm-order-btn').addEventListener('click', () => {
    const tableNum = document.getElementById('table-number').value;
    const custName = document.getElementById('customer-name').value;

    if (!tableNum) {
        alert("Mohon masukkan nomor meja!");
        return;
    }

    const orderData = {
        orderId: "ORD-" + Math.floor(Math.random() * 10000),
        table: tableNum,
        customer: custName || "Guest",
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        status: "New Order",
        timestamp: new Date().toLocaleString()
    };

    // Simpan data (Simulasi)
    let allOrders = JSON.parse(localStorage.getItem('cafe_orders')) || [];
    allOrders.push(orderData);
    localStorage.setItem('cafe_orders', JSON.stringify(allOrders));

    alert(`Terima kasih! Pesanan untuk Meja ${tableNum} telah diterima.`);
    cart = [];
    updateCartUI();
    closeModal('table-modal');
    closeModal('cart-modal');
    document.getElementById('table-number').value = '';
});

// Helper: Tutup Modal
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Setup Semua Tombol
function setupEventListeners() {
    // Buka Cart Modal saat Floating Bar diklik
    document.getElementById('floating-cart').addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'block';
    });

    // Buka Table Input saat tombol Pesan diklik
    document.getElementById('btn-order-table').addEventListener('click', () => {
        document.getElementById('table-modal').style.display = 'block';
        document.getElementById('cart-modal').style.display = 'none'; 
    });

    // Staff Login Trigger
    document.getElementById('staff-login-trigger').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-modal').style.display = 'block';
    });
    document.getElementById('login-link-nav').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-modal').style.display = 'block';
        // Tutup nav di mobile jika terbuka
        document.getElementById('nav-links').classList.remove('show');
    });

    // Close Modal Outside Click
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

    // HAMBURGER LOGIC (Fix)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        
        // Tutup menu saat link diklik
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }
    
    const loginModal = document.getElementById('login-modal');
const loginLink = document.getElementById('login-link');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

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
}
