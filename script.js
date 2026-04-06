/* =============================================
   ShopZone — script.js
   Author: Portfolio Project (B.Tech CSE)
   Logic: Products, Cart, Filters, LocalStorage
   ============================================= */

/* ==========================================
   1. PRODUCT DATA
   Each product is an object in this array.
   In a real app this would come from a REST API.
   ========================================== */
const products = [
  {
    id: 1,
    name: "Premium Slim-Fit Oxford Shirt",
    category: "men",
    price: 1299,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 1284,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
    description: "Crafted from 100% Egyptian cotton, this slim-fit Oxford shirt is perfect for both formal and casual occasions. Its breathable fabric and classic design ensure all-day comfort.",
    features: ["100% Egyptian Cotton", "Slim Fit", "Machine Washable", "Available in 6 colors"]
  },
  {
    id: 2,
    name: "Women's Floral Wrap Dress",
    category: "women",
    price: 1899,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
    description: "A beautiful floral wrap dress that flatters every figure. Made from lightweight chiffon fabric, it flows elegantly and is perfect for summer outings, parties, and casual events.",
    features: ["Lightweight Chiffon", "Wrap Design", "Floral Print", "Midi Length"]
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    category: "electronics",
    price: 24999,
    originalPrice: 34990,
    rating: 4.9,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
    description: "Industry-leading noise cancellation with the new Integrated Processor V1. Enjoy crystal-clear calls with our most precisely engineered microphone system, and 30-hour battery life.",
    features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.2", "Multipoint Connect"]
  },
  {
    id: 4,
    name: "Men's Running Pro Sneakers",
    category: "sports",
    price: 3499,
    originalPrice: 5999,
    rating: 4.4,
    reviews: 2301,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    description: "Engineered for performance runners, these sneakers feature a responsive foam midsole and breathable mesh upper. The rubber outsole provides superior grip on all surfaces.",
    features: ["Responsive Foam", "Breathable Mesh", "Anti-Slip Sole", "Lightweight 280g"]
  },
  {
    id: 5,
    name: "Women's Yoga & Gym Leggings",
    category: "sports",
    price: 899,
    originalPrice: 1799,
    rating: 4.6,
    reviews: 3104,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80",
    description: "High-waist compression leggings that offer four-way stretch and moisture-wicking performance. Perfect for yoga, running, gym workouts, and everyday athleisure wear.",
    features: ["4-Way Stretch", "Moisture Wicking", "High Waist", "Squat Proof"]
  },
  {
    id: 6,
    name: "Apple iPhone 15 Pro Max",
    category: "electronics",
    price: 134900,
    originalPrice: 159900,
    rating: 4.8,
    reviews: 9823,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
    description: "Titanium design. A17 Pro chip. An industry-first 5x optical zoom camera that changes the way you shoot. The most powerful iPhone ever, built for the most demanding tasks.",
    features: ["A17 Pro Chip", "5x Optical Zoom", "Titanium Body", "USB 3 Speed"]
  },
  {
    id: 7,
    name: "Women's Classic Trench Coat",
    category: "women",
    price: 4599,
    originalPrice: 8999,
    rating: 4.5,
    reviews: 671,
    image: "https://images.unsplash.com/photo-1548267016-4c36e85fa97b?w=400&q=80",
    description: "A timeless trench coat in water-resistant fabric. Double-breasted button closure, belted waist, and storm flaps make this the perfect layering piece for unpredictable weather.",
    features: ["Water Resistant", "Double Breasted", "Belted Waist", "Lined Interior"]
  },
  {
    id: 8,
    name: "Men's Cargo Combat Joggers",
    category: "men",
    price: 1599,
    originalPrice: 2999,
    rating: 4.3,
    reviews: 1402,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
    description: "Functional meets fashion with these tactical cargo joggers. Multiple pockets, elastic waistband with drawstring, and tapered fit make them perfect for streetwear and everyday utility.",
    features: ["6 Pockets", "Elastic Waist", "Tapered Fit", "Ripstop Fabric"]
  },
  {
    id: 9,
    name: "iPad Air 5th Generation",
    category: "electronics",
    price: 59900,
    originalPrice: 74900,
    rating: 4.7,
    reviews: 4312,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    description: "Supercharged by the M1 chip. iPad Air in a stunning 10.9-inch Liquid Retina display. Compatible with Apple Pencil and Magic Keyboard — the ultimate portable creative tool.",
    features: ["M1 Chip", "10.9-inch Retina", "USB-C", "5G Ready"]
  },
  {
    id: 10,
    name: "Women's Strappy Block Heels",
    category: "women",
    price: 1299,
    originalPrice: 2499,
    rating: 4.2,
    reviews: 533,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&q=80",
    description: "Elegant strappy block heels that pair beautifully with dresses or wide-leg trousers. The block heel provides stability while the ankle strap ensures a secure, comfortable fit.",
    features: ["Block Heel 3-inch", "Ankle Strap", "Faux Suede", "Cushioned Insole"]
  },
  {
    id: 11,
    name: "Dumbbells Set (5–25 kg Pair)",
    category: "sports",
    price: 3999,
    originalPrice: 7499,
    rating: 4.6,
    reviews: 2891,
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&q=80",
    description: "Adjustable chrome dumbbell pairs ranging from 5 kg to 25 kg. Ideal for home gym setups. Rubber-coated heads protect floors and minimize noise during intense workout sessions.",
    features: ["Chrome Plated", "Rubber Coated", "Hexagonal Shape", "Non-Slip Grip"]
  },
  {
    id: 12,
    name: "Men's Leather Bifold Wallet",
    category: "men",
    price: 699,
    originalPrice: 1499,
    rating: 4.4,
    reviews: 3209,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    description: "Full-grain genuine leather bifold wallet with slim profile design. Features 6 card slots, 2 note compartments, and RFID-blocking technology to keep your cards safe.",
    features: ["Genuine Leather", "RFID Blocking", "6 Card Slots", "Slim Profile"]
  }
];

/* ==========================================
   2. CART STATE
   We load from localStorage so cart persists
   across page refreshes.
   ========================================== */
// Load cart from localStorage, or start empty
let cart = JSON.parse(localStorage.getItem('shopzone_cart')) || [];

// Current filter/search state
let currentCategory = 'all';
let currentSearch = '';
// Quantity for detail page
let detailQty = 1;

/* ==========================================
   3. UTILITY FUNCTIONS
   ========================================== */

/**
 * Save the cart array to localStorage so it
 * persists after the page is refreshed.
 */
function saveCart() {
  localStorage.setItem('shopzone_cart', JSON.stringify(cart));
}

/**
 * Update the cart badge number in the navbar.
 * Shows total item count (not unique products).
 */
function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartBadge').textContent = totalItems;
}

/**
 * Show a brief toast notification at bottom-right.
 * @param {string} msg - The message to display
 */
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  // Auto-hide after 2.5 seconds
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/**
 * Format a number as Indian currency.
 * e.g. 24999 → "₹24,999"
 */
function formatPrice(num) {
  return '₹' + num.toLocaleString('en-IN');
}

/**
 * Calculate discount percentage between original and sale price.
 */
function calcDiscount(original, sale) {
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Generate HTML star icons based on a rating (0–5).
 * Uses full, half, and empty star icons.
 */
function starsHTML(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      html += '<i class="fas fa-star"></i>';
    } else if (rating >= i - 0.5) {
      html += '<i class="fas fa-star-half-alt"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

/* ==========================================
   4. PAGE NAVIGATION
   We show/hide page divs instead of loading
   new HTML files — Single Page App (SPA) style.
   ========================================== */
/**
 * Show a specific page and hide all others.
 * @param {string} pageName - 'home' | 'detail' | 'cart'
 */
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show requested page
  document.getElementById(pageName + 'Page').classList.add('active');
  // Scroll to top on page change
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Render cart whenever we open cart page
  if (pageName === 'cart') renderCart();
}

/* ==========================================
   5. PRODUCT RENDERING
   ========================================== */

/**
 * Get the filtered + searched list of products.
 * Combines category filter AND search query.
 */
function getFilteredProducts() {
  return products.filter(p => {
    const matchCat = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });
}

/**
 * Render all filtered products into the grid.
 * Called whenever filter or search changes.
 */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const searchLabel = document.getElementById('searchLabel');
  const filtered = getFilteredProducts();

  // Show/hide search result label
  if (currentSearch) {
    searchLabel.style.display = 'block';
    searchLabel.innerHTML = `Showing <strong>${filtered.length}</strong> results for "<strong>${currentSearch}</strong>"`;
  } else {
    searchLabel.style.display = 'none';
  }

  // If no products match, show the empty state
  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  // Build HTML for each product card
  grid.innerHTML = filtered.map((p, index) => {
    const discount = calcDiscount(p.originalPrice, p.price);
    // Check if already in cart for button state
    const inCart = cart.some(c => c.id === p.id);
    return `
      <div class="product-card" onclick="showDetail(${p.id})"
           style="animation-delay: ${index * 0.05}s">
        <div class="card-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy"/>
          <span class="card-badge">${p.category}</span>
        </div>
        <div class="card-body">
          <p class="card-name">${p.name}</p>
          <div class="card-rating">
            <span class="stars">${starsHTML(p.rating)}</span>
            <span class="rating-count">(${p.reviews.toLocaleString()})</span>
          </div>
          <p class="card-price">
            ${formatPrice(p.price)}
            <span class="original-price">${formatPrice(p.originalPrice)}</span>
            <span class="discount">${discount}% off</span>
          </p>
        </div>
        <div class="card-footer">
          <button class="add-cart-btn ${inCart ? 'added' : ''}"
            onclick="event.stopPropagation(); addToCart(${p.id}, this)">
            <i class="fas ${inCart ? 'fa-check' : 'fa-shopping-bag'}"></i>
            ${inCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================
   6. CATEGORY FILTER
   ========================================== */
/**
 * Filter products by category.
 * @param {string} cat - Category name or 'all'
 * @param {Element} btn - The tab button element (to update active class)
 */
function filterCategory(cat, btn) {
  currentCategory = cat;
  currentSearch = ''; // clear search when filtering
  document.getElementById('searchInput').value = '';

  // Update active tab style
  if (btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }

  renderProducts();
}

/* ==========================================
   7. SEARCH FUNCTIONALITY
   ========================================== */
/**
 * Triggered on every keystroke in the search input.
 * Resets category to 'all' and filters by query.
 */
function handleSearch(query) {
  currentSearch = query.trim();
  currentCategory = 'all';

  // Remove active class from all tabs, set "All" active
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab')[0].classList.add('active');

  renderProducts();
  // Jump to products section
  if (query) scrollToProducts();
}

/**
 * Smooth scroll to product listing section.
 */
function scrollToProducts() {
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ==========================================
   8. ADD TO CART
   ========================================== */
/**
 * Add a product to the cart or increase its quantity.
 * @param {number} productId - The product's id
 * @param {Element} btn - The button element (for visual feedback)
 * @param {number} qty - Quantity to add (default 1, detail page can pass more)
 */
function addToCart(productId, btn, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if product already exists in cart
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += qty; // increase quantity
  } else {
    // Add new item with quantity
    cart.push({ ...product, quantity: qty });
  }

  saveCart();
  updateCartBadge();

  // Visual feedback on button
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
  }

  showToast(`${product.name.split(' ').slice(0, 3).join(' ')}... added to cart!`);
}

/* ==========================================
   9. PRODUCT DETAIL PAGE
   ========================================== */
/**
 * Show the detail page for a specific product.
 * @param {number} productId - The product's id
 */
function showDetail(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  detailQty = 1; // reset qty to 1
  const discount = calcDiscount(p.originalPrice, p.price);
  const inCart = cart.some(c => c.id === p.id);

  document.getElementById('detailLayout').innerHTML = `
    <div class="detail-img-wrap">
      <img src="${p.image}" alt="${p.name}"/>
    </div>
    <div class="detail-info">
      <p class="detail-category">${p.category}</p>
      <h1 class="detail-name">${p.name}</h1>
      <div class="detail-rating">
        <span class="stars">${starsHTML(p.rating)}</span>
        <span style="color:var(--text-muted); font-size:14px;">${p.rating} · ${p.reviews.toLocaleString()} reviews</span>
      </div>
      <p class="detail-price">
        ${formatPrice(p.price)}
        <span class="detail-original-price">${formatPrice(p.originalPrice)}</span>
        <span class="detail-discount">Save ${discount}%</span>
      </p>
      <p class="detail-desc">${p.description}</p>
      <hr class="detail-divider"/>

      <!-- Feature tags -->
      <div class="feature-tags">
        ${p.features.map(f => `<span class="feature-tag"><i class="fas fa-check" style="color:var(--success);margin-right:5px;font-size:11px;"></i>${f}</span>`).join('')}
      </div>
      <hr class="detail-divider"/>

      <!-- Quantity selector -->
      <div class="qty-wrap">
        <span class="qty-label">Quantity:</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
          <span class="qty-num" id="detailQtyDisplay">1</span>
          <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
        </div>
      </div>

      <!-- Action buttons -->
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <button class="btn-primary" id="detailCartBtn"
          onclick="addToCart(${p.id}, document.getElementById('detailCartBtn'), detailQty); renderProducts();">
          <i class="fas fa-shopping-bag"></i>
          ${inCart ? 'Add More to Cart' : 'Add to Cart'}
        </button>
        <button class="btn-outline" onclick="addToCart(${p.id}, null, detailQty); showPage('cart');">
          <i class="fas fa-bolt"></i> Buy Now
        </button>
      </div>
    </div>
  `;

  showPage('detail');
}

/**
 * Change quantity on the detail page.
 * Minimum quantity is always 1.
 */
function changeDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  document.getElementById('detailQtyDisplay').textContent = detailQty;
}

/* ==========================================
   10. CART RENDERING & MANAGEMENT
   ========================================== */
/**
 * Render the cart page with all items and price totals.
 * Called whenever the cart page is opened or modified.
 */
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');
  const emptyCart = document.getElementById('emptyCart');
  const cartLayout = document.querySelector('.cart-layout');

  if (cart.length === 0) {
    // Show empty state
    cartLayout.style.display = 'none';
    emptyCart.style.display = 'block';
    return;
  }

  cartLayout.style.display = 'grid';
  emptyCart.style.display = 'none';

  // Build cart item HTML
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" id="cartItem_${item.id}">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}"/>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-cat">${item.category}</p>
        <!-- Inline quantity control -->
        <div class="cart-qty-control">
          <button class="cart-qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="cart-qty-num" id="qty_${item.id}">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <p class="cart-item-price">${formatPrice(item.price * item.quantity)}</p>
      <!-- Remove button -->
      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.18; // 18% GST
  const tax = Math.round(subtotal * taxRate);
  const shipping = subtotal > 999 ? 0 : 99; // Free shipping over ₹999
  const grandTotal = subtotal + tax + (shipping === 0 ? 0 : shipping);

  // Update summary display
  document.getElementById('subtotal').textContent = formatPrice(subtotal);
  document.getElementById('tax').textContent = formatPrice(tax);
  document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
  document.getElementById('grandTotal').textContent = formatPrice(grandTotal);
}

/**
 * Update quantity of an item in the cart.
 * If quantity drops to 0, item is removed.
 * @param {number} productId
 * @param {number} delta - +1 or -1
 */
function updateQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartBadge();
  // Update the qty display inline without full re-render for smooth UX
  const qtyEl = document.getElementById(`qty_${productId}`);
  if (qtyEl) qtyEl.textContent = item.quantity;
  renderCart(); // re-render totals
}

/**
 * Remove an item completely from the cart.
 * @param {number} productId
 */
function removeFromCart(productId) {
  const itemName = cart.find(c => c.id === productId)?.name || 'Item';
  // Filter out the removed product
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
  showToast(`${itemName.split(' ').slice(0, 3).join(' ')}... removed from cart`);
  // Re-render product grid to reset "Added" button states
  renderProducts();
}

/**
 * Handle checkout button click.
 * In a real app, this would redirect to payment gateway.
 */
function checkout() {
  // For now, show success message
  alert('🎉 Order placed successfully!\n\nIn a real application, this would redirect to a payment gateway like Razorpay or Stripe.\n\nYour cart will now be cleared.');
  cart = [];
  saveCart();
  updateCartBadge();
  renderCart();
  renderProducts();
}

/* ==========================================
   11. HAMBURGER MENU TOGGLE
   ========================================== */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const ham = document.getElementById('hamburger');
  menu.classList.toggle('open');
  ham.classList.toggle('open');
}

/* ==========================================
   12. INITIALIZATION
   Run once when the page loads.
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();  // Draw product grid
  updateCartBadge(); // Restore badge from localStorage

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const ham = document.getElementById('hamburger');
    if (!menu.contains(e.target) && !ham.contains(e.target)) {
      menu.classList.remove('open');
      ham.classList.remove('open');
    }
  });

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,0.5)'
      : 'none';
  });
});

/* ==========================================
   13. MOBILE SEARCH
   On mobile, clicking search button in navbar
   shows search bar (CSS hides it at ≤768px).
   We expose search via mobile menu instead.
   ========================================== */
// Allow pressing Enter in the search bar to search
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch(e.target.value);
  });
});