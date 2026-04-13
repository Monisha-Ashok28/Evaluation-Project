// ================== STATIC PRODUCTS =================
let products = [
  { id: 1, name: "iPhone 15 Pro", brand: "Apple", price: 79998, image: "./images/iphone15_pro.jpg" },
  { id: 2, name: "iPhone 15", brand: "Apple", price: 69999, image: "./images/iphone15.jpg" },
  { id: 3, name: "iPhone 16", brand: "Apple", price: 67999, image: "./images/iphone16.jpg" },
  { id: 4, name: "iPhone 16 Plus", brand: "Apple", price: 89900, image: "./images/iphone16_plus.jpg" },
  { id: 5, name: "iPhone 17", brand: "Apple", price: 82900, image: "./images/iphone17.jpg" },
  { id: 6, name: "iPhone 17 Pro", brand: "Apple", price: 134900, image: "./images/iphone17_pro.jpg" },
  { id: 7, name: "iPhone 17 Pro Max", brand: "Apple", price: 189900, image: "./images/iphone17_pro_max.jpg" },
  { id: 8, name: "iPhone Air", brand: "Apple", price: 94990, image: "./images/iphone_air.jpg" },
  { id: 9, name: "iPhone 16 Pro Max", brand: "Apple", price: 144990, image: "./images/iphone16_pro_max.jpg" },

  { id: 10, name: "Samsung S24 FE", brand: "Samsung", price: 40450, image: "./images/samsung_s24_fe.jpg" },
  { id: 11, name: "Samsung S26 Ultra", brand: "Samsung", price: 139999, image: "./images/samsung_s26_ultra.jpg" },
  { id: 12, name: "Samsung S25", brand: "Samsung", price: 74999, image: "./images/samsung_s25.jpg" },
  { id: 13, name: "Samsung S25 Ultra", brand: "Samsung", price: 118999, image: "./images/samsung_s25_ultra.jpg" },
  { id: 14, name: "Samsung S26", brand: "Samsung", price: 87999, image: "./images/samsung_s26.jpg" },
  { id: 15, name: "Samsung Galaxy Z Fold7", brand: "Samsung", price: 186999, image: "./images/samsung_fold7.jpg" },

  { id: 16, name: "OnePlus 13s", brand: "OnePlus", price: 57999, image: "./images/oneplus_13s.jpg" },
  { id: 17, name: "OnePlus 15", brand: "OnePlus", price: 79999, image: "./images/oneplus_15.jpg" },
  { id: 18, name: "OnePlus 15R", brand: "OnePlus", price: 50499, image: "./images/oneplus_15r.jpg" },
  { id: 19, name: "OnePlus Nord 6", brand: "OnePlus", price: 39999, image: "./images/oneplus_nord6.jpg" }
];

function updateAuthButton() {
    let section = document.getElementById("auth-section");
    if (!section) return;

    let loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        section.innerHTML = `<button onclick="logout()" class="btn btn-danger">Logout</button>`;
    } else {
        section.innerHTML = `<button onclick="goToLogin()" class="btn btn-light">Login</button>`;
    }
}

function loadAuth() {
    const auth = document.getElementById("auth-section");
    const user = localStorage.getItem("user");

    if (user) {
        auth.innerHTML = `
            <button onclick="goToCart()" class="btn btn-light">Cart 🛒 <span id="cart-count">0</span></button>
            <button onclick="logout()" class="btn btn-danger">Logout</button>
        `;
    } else {
        auth.innerHTML = `
            <button onclick="goToCart()" class="btn btn-light">Cart 🛒 <span id="cart-count">0</span></button>
            <button onclick="window.location.href='login.html'" class="btn btn-light">Login</button>
        `;
    }
}

// ===== ADD TO CART =====
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;   // increase quantity
    } else {
        cart.push({ id: id, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart");
}

// ===== CART COUNT =====
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.getElementById("cart-count");

    let totalQty = 0;
    cart.forEach(item => totalQty += item.qty);

    if (count) {
        count.innerText = totalQty;
    }
}

// ===== LOAD CART PAGE =====
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    let total = 0;

    if (!container) return;

    container.innerHTML = "";

    cart.forEach(item => {
        let p = products.find(x => x.id === item.id);

        if (p) {
            total += p.price * item.qty;

            container.innerHTML += `
                <div class="card p-3 mb-3">
                    <h5>${p.name}</h5>
                    <p>₹${p.price}</p>

                    <div>
                        <button onclick="decreaseQty(${item.id})">➖</button>
                        <span>${item.qty}</span>
                        <button onclick="increaseQty(${item.id})">➕</button>
                    </div>

                    <button onclick="removeItem(${item.id})" class="btn btn-danger mt-2">Remove</button>
                </div>
            `;
        }
    });

    document.getElementById("total").innerText = "₹" + total;
}

function loadProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";

    products.forEach(p => {
        list.innerHTML += `
        <div class="col-md-4 mb-4 product-card" data-brand="${p.brand}">
            <div class="card p-3 text-center">
                <img src="${p.image}" style="height:200px; object-fit:contain;">
                <h5>${p.name}</h5>
                <p>${p.brand}</p>
                <p>₹${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>`;
    });
}

function filterProducts(brand) {
    let items = document.querySelectorAll(".product-card");

    items.forEach(p => {
        let b = p.getAttribute("data-brand");

        if (brand.toLowerCase() === "all" || b.toLowerCase() === brand.toLowerCase()){
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

function searchProducts() {
    let input = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".product-card");

    items.forEach(p => {
        let text = p.innerText.toLowerCase();

        if (text.includes(input)) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

let sliderImages = ["images/iphone1.jpg", "images/samsung1.jpg", "images/oneplus1.jpg"];
let i = 0;

function startSlider() {
    let img = document.getElementById("slider");
    if (!img) return;

    setInterval(() => {
        img.style.opacity = 0;

        setTimeout(() => {
            i = (i + 1) % sliderImages.length;
            img.src = sliderImages[i];
            img.style.opacity = 1;
        }, 300);

    }, 2500);
}

function logout() {
    localStorage.removeItem("user");

    alert("Logged out successfully");

    window.location.href = "index.html";
}

function goToCart() {
    window.location.href = "cart.html";
}

function goToLogin() {
    window.location.href = "login.html";
}

function payNow() {
    alert("Payment Successful!");
    localStorage.removeItem("cart");

    updateCartCount();
    window.location.href = "index.html";
}
function login() {
    let u = document.getElementById("user").value.trim();
    let p = document.getElementById("pass").value.trim();

    if (u === "admin" && p === "1234") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
}

// ================== LOAD ==================
window.onload = function () {
    updateCartCount();
    updateAuthButton();
    startSlider();
};

function increaseQty(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        if (item.id === id) item.qty += 1;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function decreaseQty(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        if (item.id === id && item.qty > 1) {
            item.qty -= 1;
        }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function goToCheckout() {
    window.location.href = "checkout.html";
}

function placeOrder() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if (!name || !phone || !address) {
        alert("Please fill all details");
        return;
    }

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");

    window.location.href = "success.html";
}


document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    loadAuth();
});



