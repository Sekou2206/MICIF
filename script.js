// ==========================================
// M.I.C.I - Script Principal
// ==========================================

// ========== 1. DONNÉES PRODUITS (DATA) ==========
// NOTE : Les fichiers images doivent être AU MÊME NIVEAU que index.html
const products = [
    { 
        id: 1, name: "Vestes Rose et Blanche", category: "Veste", price: 1890, 
        description: "Veste bicolore rose et blanche d'inspiration sportswear.", 
        images: [
            "img_3692.jpeg",
            "img_3693.jpeg"
        ],
        sizes: ["XS", "S", "M", "L", "XL"], 
        colors: [
            { name: "Rose", hex: "#FFC0CB" }, 
            { name: "Blanc", hex: "#FFFFFF" }
        ],
        isNew: true,
        composition: ["70% Cachemire", "30% Laine", "Doublure 100% Soie"]
    },
    { 
        id: 2, name: "Veste Rouge et Marron", category: "Veste", price: 1450, 
        description: "Veste de qualité supérieure, coloris rouge et marron.", 
        images: [
            "img_3697.jpeg"
        ],
        sizes: ["XS", "S", "M", "L"], 
        colors: [
            { name: "Rouge", hex: "#FF0000" },
            { name: "Marron", hex: "#722F37" }
        ],
        composition: ["100% Coton", "Nettoyage à sec uniquement"]
    },
    { 
        id: 3, name: "Surchemise Bleue", category: "Veste", price: 980, 
        description: "Surchemise bleue élégante.", 
        images: [
            "img_3689.jpeg",
            "img_3690.jpeg"
        ],
        sizes: ["S", "M", "L"], 
        colors: [
            { name: "Bleu", hex: "#1B2838" }
        ],
        composition: ["100% Laine Vierge", "Doublure Cupro"]
    },
    { 
        id: 4, name: "Surchemise Noire", category: "Veste", price: 780, 
        description: "Surchemise noire intemporelle.", 
        images: [
            "img_3694.jpeg"
        ],
        sizes: ["S", "M", "L", "XL"], 
        colors: [
            { name: "Noir", hex: "#1A1A1A" }
        ],
        isNew: true,
        composition: ["Coton Premium", "Made in Italy"]
    },
    { 
        id: 5, name: "Blazer Rouge", category: "Veste", price: 420, 
        description: "Blazer rouge coupe ajustée.", 
        images: ["img_3695.jpeg"], 
        sizes: ["S", "M", "L"], 
        colors: [{ name: "Rouge", hex: "#A9A9A9" }],
        composition: ["100% Laine Mérinos"]
    },
    { 
        id: 6, name: "Veste Noire", category: "Veste", price: 280, 
        description: "Veste noire classique.", 
        images: ["img_3698.jpeg"], 
        sizes: ["S", "M", "L"], 
        colors: [{ name: "Noir", hex: "#1A1A1A" }], 
        composition: ["100% Coton"]
    },
    { 
        id: 7, name: "Sac Vert et Orange", category: "Sac", price: 380, 
        description: "Sac tendance vert et orange.", 
        images: ["img_3699.jpeg"], 
        sizes: ["Unique"], 
        colors: [{ name: "Vert", hex: "#00FF00" }], 
        composition: ["Cuir Synthétique"]
    },
    { 
        id: 8, name: "Chemise en Soie", category: "Chemise", price: 320, 
        description: "Chemise en soie douce et légère.", 
        images: ["img_3691.jpeg"], 
        sizes: ["S", "M", "L"], 
        colors: [{ name: "Beige", hex: "#F5F5DC" }], 
        composition: ["100% Soie"]
    },
    { 
        id: 9, name: "Veste Marron", category: "Veste", price: 560, 
        description: "Veste marron chaude.", 
        images: ["img_3684.jpeg"], 
        sizes: ["S", "M", "L"], 
        colors: [{ name: "Camel", hex: "#C19A6B" }], 
        composition: ["100% Cachemire"]
    },
    { 
        id: 10, name: "Surchemise Mixte", category: "Veste", price: 290, 
        description: "Surchemise polyvalente.", 
        images: [
            "img_3687.jpeg",
            "img_3688.jpeg"
        ], 
        sizes: ["S", "M", "L"], 
        colors: [{ name: "Noir", hex: "#1A1A1A" }], 
        composition: ["Coton et Lin"]
    },
    { 
        id: 11, name: "Veste Bleue", category: "Veste", price: 680, 
        description: "Veste bleue moderne.", 
        images: ["img_3685.jpeg"], 
        sizes: ["36", "37", "38", "39", "40"], 
        colors: [{ name: "Bleu", hex: "#0000FF" }], 
        isNew: true,
        composition: ["Tige en daim", "Semelle cuir"]
    },
    { 
        id: 12, name: "T-Shirt Noir", category: "Hauts", price: 520, 
        description: "T-shirt noir essentiel.", 
        images: [
            "img_3700.jpeg",
            "img_3701.jpeg"
        ], 
        sizes: ["S", "M"], 
        colors: [{ name: "Noir", hex: "#1A1A1A" }], 
        composition: ["100% Coton Bio"]
    }
];

// ========== 2. ÉTAT (STATE) ==========
let cart = JSON.parse(localStorage.getItem('mici-cart')) || [];
let favorites = JSON.parse(localStorage.getItem('mici-favorites')) || [];
let currency = localStorage.getItem('mici-currency') || 'EUR';

const currencyRates = {
    EUR: { symbol: '€', rate: 1, locale: 'fr-FR', name: 'EUR' },
    XOF: { symbol: 'FCFA', rate: 655.96, locale: 'fr-FR', name: 'XOF' },
    USD: { symbol: '$', rate: 1.08, locale: 'en-US', name: 'USD' }
};

let currentProduct = null;
let currentSlideIndex = 0;
let selectedSize = null;
let selectedColor = null;

// ========== 3. INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    renderProducts();
    updateCartUI();
    updateFavoritesUI();
    updateCurrencyUI();
    initScrollListener();
    initCloseDropdowns();
});

function initCloseDropdowns() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.currency-wrapper')) document.getElementById('currencyDropdown')?.classList.remove('open');
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

function initScrollListener() {
    window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50));
}

// ========== 4. NAVIGATION ==========
function navigateTo(pageName) {
    document.body.classList.add('is-animating');
    setTimeout(() => {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(`page-${pageName}`);
        if(targetPage) targetPage.classList.add('active');
        document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === pageName));
        window.scrollTo(0, 0);
        initScrollAnimations();
        if (pageName === 'boutique') renderProducts();
        if (pageName === 'favorites') renderFavorites();
        setTimeout(() => { document.body.classList.remove('is-animating'); }, 600);
    }, 700);
}

// ========== 5. DEVISES (CURRENCY) ==========
function toggleCurrencyDropdown() { document.getElementById('currencyDropdown').classList.toggle('open'); }

function setCurrency(code) {
    currency = code;
    localStorage.setItem('mici-currency', code);
    updateCurrencyUI();
    renderProducts(); 
    updateCartUI();
    if (currentProduct) openProductModal(currentProduct.id);
    document.querySelectorAll('.currency-opt').forEach(btn => btn.classList.toggle('active', btn.textContent.includes(code) || (code === 'XOF' && btn.textContent.includes('FCFA'))));
}

function formatPrice(priceInEur) {
    const curr = currencyRates[currency];
    const converted = priceInEur * curr.rate;
    if (currency === 'XOF') return new Intl.NumberFormat(curr.locale, { maximumFractionDigits: 0 }).format(converted) + ' ' + curr.symbol;
    return new Intl.NumberFormat(curr.locale, { style: 'currency', currency: curr.name, minimumFractionDigits: 0 }).format(converted);
}

function updateCurrencyUI() { document.getElementById('currencyLabel').textContent = currency; }

// ========== 6. MENU MOBILE ==========
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
    document.getElementById('menuBtn').classList.toggle('active');
}
document.getElementById('menuBtn').addEventListener('click', toggleMobileMenu);

// ========== 7. BOUTIQUE (RENDER PRODUCTS) ==========
function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    const category = document.getElementById('categorySelect')?.value || 'all';
    const sort = document.getElementById('sortSelect')?.value || 'featured';
    
    let filtered = [...products];
    if (category !== 'all') filtered = filtered.filter(p => p.category === category);
    
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    
    document.getElementById('resultsCount').textContent = `${filtered.length} articles`;
    
    container.innerHTML = filtered.map((product) => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                <div class="product-badges">${product.isNew ? '<span class="badge-new">NOUVEAU</span>' : ''}</div>
                <div class="product-actions">
                    <button class="action-btn ${favorites.includes(product.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price"><span class="current-price">${formatPrice(product.price)}</span></div>
            </div>
        </div>
    `).join('');
}

function filterProducts() { renderProducts(); }

// ========== 8. MODAL PRODUIT (LUXE) ==========
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    selectedSize = currentProduct.sizes[0];
    selectedColor = currentProduct.colors[0];
    currentSlideIndex = 0;

    const track = document.getElementById('galleryTrack');
    const dots = document.getElementById('galleryDots');
    
    track.innerHTML = currentProduct.images.map((img, i) => 
        `<div class="gallery-slide"><img src="${img}" alt="${currentProduct.name} View ${i+1}"></div>`
    ).join('');
    
    dots.innerHTML = currentProduct.images.map((_, i) => 
        `<div class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`
    ).join('');

    document.getElementById('modalCategory').textContent = currentProduct.category;
    document.getElementById('modalTitle').textContent = currentProduct.name;
    document.getElementById('modalPrice').textContent = formatPrice(currentProduct.price);
    document.getElementById('modalDescription').textContent = currentProduct.description;

    const colorContainer = document.getElementById('modalColors');
    colorContainer.innerHTML = currentProduct.colors.map(c => `
        <button class="color-btn-luxe ${c.name === selectedColor.name ? 'active' : ''}" 
                style="background: ${c.hex};" 
                data-color-name="${c.name}"
                onclick="selectColorByName('${c.name}')">
        </button>
    `).join('');
    document.getElementById('selectedColorName').textContent = selectedColor.name;

    const sizeContainer = document.getElementById('modalSizes');
    sizeContainer.innerHTML = currentProduct.sizes.map(size => `
        <button class="size-btn-luxe ${size === selectedSize ? 'active' : ''}" onclick="selectSize('${size}')">${size}</button>
    `).join('');

    document.getElementById('modalComposition').innerHTML = currentProduct.composition.map(c => `<li>${c}</li>`).join('');

    document.getElementById('favoriteBtn').classList.toggle('active', favorites.includes(currentProduct.id));
    document.getElementById('addToCartBtn').onclick = () => addToCart(currentProduct.id, selectedSize, selectedColor.name);
    
    const scrollZone = document.querySelector('.modal-scroll-zone');
    if (scrollZone) scrollZone.scrollTop = 0;

    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProductModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
}

// ========== 9. CARROUSEL LOGIC ==========
function changeSlide(direction) {
    if(!currentProduct) return;
    const track = document.getElementById('galleryTrack');
    const totalSlides = currentProduct.images.length;
    
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;

    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    updateDots();
}

function goToSlide(index) {
    currentSlideIndex = index;
    document.getElementById('galleryTrack').style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.gallery-dots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

// ========== 10. OPTIONS LOGIC ==========
function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn-luxe').forEach(btn => btn.classList.toggle('active', btn.textContent === size));
}

function selectColorByName(colorName) {
    selectedColor = currentProduct.colors.find(c => c.name === colorName);
    document.querySelectorAll('.color-btn-luxe').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-color-name') === colorName);
    });
    document.getElementById('selectedColorName').textContent = colorName;
}

function toggleAccordion(btn) {
    const item = btn.parentElement;
    item.classList.toggle('open');
}

// ========== 11. PANIER (CART) ==========
function toggleCart() { 
    document.getElementById('cartPanel').classList.toggle('open'); 
    document.querySelector('.cart-overlay').classList.toggle('open'); 
    document.body.style.overflow = document.getElementById('cartPanel').classList.contains('open') ? 'hidden' : ''; 
}

function addToCart(productId, size, colorName) {
    const existing = cart.find(item => item.productId === productId && item.size === size && item.color === colorName);
    if (existing) existing.quantity++; else cart.push({ productId, size, color: colorName, quantity: 1 });
    saveCart(); 
    updateCartUI(); 
    showToast('Ajouté au panier');
}

function removeFromCart(productId, size, color) { 
    cart = cart.filter(i => !(i.productId === productId && i.size === size && i.color === color)); 
    saveCart(); 
    updateCartUI(); 
}

function updateQuantity(productId, size, color, delta) { 
    const item = cart.find(i => i.productId === productId && i.size === size && i.color === color); 
    if (item) { 
        item.quantity += delta; 
        if (item.quantity <= 0) removeFromCart(productId, size, color); 
        else { saveCart(); updateCartUI(); } 
    } 
}

function saveCart() { localStorage.setItem('mici-cart', JSON.stringify(cart)); }

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => { 
        const product = products.find(p => p.id === item.productId); 
        return sum + (product ? product.price * item.quantity : 0); 
    }, 0);
    
    const cartBadge = document.getElementById('cartCount');
    if (totalItems > 0) { cartBadge.textContent = totalItems; cartBadge.classList.add('show'); } else cartBadge.classList.remove('show');
    
    document.getElementById('cartTotal').textContent = formatPrice(totalPrice);
    document.getElementById('cartFooter').style.display = cart.length > 0 ? 'block' : 'none';
    
    const container = document.getElementById('cartItems');
    if (cart.length === 0) { container.innerHTML = `<div class="cart-empty"><p>Votre panier est vide</p></div>`; }
    else {
        container.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return '';
            return `
                <div class="cart-item">
                    <div class="cart-item-image"><img src="${product.images[0]}" alt="${product.name}"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-options">${item.size} / ${item.color}</div>
                        <div class="cart-item-price">${formatPrice(product.price)}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button onclick="updateQuantity(${item.productId}, '${item.size}', '${item.color}', -1)">−</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.productId}, '${item.size}', '${item.color}', 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart(${item.productId}, '${item.size}', '${item.color}')">Suppr.</button>
                        </div>
                    </div>
                </div>`;
        }).join('');
    }
}

// ========== 12. FAVORIS ==========
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) favorites.splice(index, 1); else favorites.push(productId);
    localStorage.setItem('mici-favorites', JSON.stringify(favorites));
    updateFavoritesUI(); 
    renderProducts();
    if(currentProduct) document.getElementById('favoriteBtn').classList.toggle('active', favorites.includes(productId));
    showToast(favorites.includes(productId) ? 'Ajouté aux favoris' : 'Retiré des favoris');
}

function updateFavoritesUI() {
    const count = favorites.length;
    const badge = document.getElementById('favoritesCount');
    if (count > 0) { badge.textContent = count; badge.classList.add('show'); } else badge.classList.remove('show');
}

function renderFavorites() {
    const container = document.getElementById('favoritesGrid');
    const empty = document.getElementById('favoritesEmpty');
    if (favorites.length === 0) { empty.style.display = 'block'; container.style.display = 'none'; return; }
    empty.style.display = 'none'; container.style.display = 'grid';
    const favProducts = products.filter(p => favorites.includes(p.id));
    container.innerHTML = favProducts.map((product) => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn active" onclick="event.stopPropagation(); toggleFavorite(${product.id}); renderFavorites();">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price"><span class="current-price">${formatPrice(product.price)}</span></div>
            </div>
        </div>`).join('');
}

// ========== 13. UTILITAIRES ==========
function showToast(message) { 
    const toast = document.getElementById('toast'); 
    const messageEl = document.getElementById('toastMessage'); 
    messageEl.textContent = message; 
    toast.classList.add('show'); 
    setTimeout(() => toast.classList.remove('show'), 3000); 
}
