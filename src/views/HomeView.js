// Porulagam Home Marketplace View
import { store } from '../store/state.js';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';

export function renderHomeView(container) {
  const state = store.getState();
  const isTamil = state.lang === 'ta';

  // Filter products by search if query exists
  let displayProducts = products;
  if (state.searchQuery && state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    displayProducts = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q)
    );
  }

  container.innerHTML = `
    <div class="flex flex-col w-full pb-10 space-y-4">
      
      <!-- Bank / Payment Offers Ticker Strip -->
      <div class="px-4 sm:px-6">
        <div class="bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-3 rounded-2xl flex items-center justify-between shadow-xs border border-outline-variant/30">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
            </div>
            <div class="flex flex-col min-w-0">
              <p class="font-label-md text-label-md text-on-surface font-bold truncate">
                ${isTamil ? 'உடனடி 10% கேஷ்பேக் ஆஃபர்' : 'Flat 10% Instant Bank Cashback'}
              </p>
              <p class="font-body-sm text-[11px] text-on-surface-variant truncate">
                ${isTamil ? 'HDFC, ICICI & SBI கார்டுகளுக்கு | குறைந்தபட்சம் ₹4,999' : 'On HDFC, ICICI & SBI Bank Cards | Min ₹4,999'}
              </p>
            </div>
          </div>
          <button id="claim-bank-offer-btn" class="shrink-0 px-3.5 py-1.5 bg-primary text-on-primary rounded-xl font-label-sm text-[11px] font-bold hover:bg-primary-container transition-all active:scale-95 shadow-sm">
            ${isTamil ? 'பெறுக' : 'Claim'}
          </button>
        </div>
      </div>

      <!-- Horizontal Circular Category Nav -->
      <section class="w-full">
        <div class="flex overflow-x-auto gap-4 sm:gap-6 px-4 sm:px-6 py-2 no-scrollbar scroll-smooth">
          ${categories.map(cat => `
            <button 
              data-cat-nav="${cat.id}"
              class="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            >
              <div class="w-14 h-14 rounded-full ${cat.colorClass} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <span class="material-symbols-outlined text-[26px]">${cat.icon}</span>
              </div>
              <span class="font-label-sm text-[12px] text-on-surface font-semibold text-center group-hover:text-primary transition-colors">
                ${isTamil ? cat.tamilName : cat.name}
              </span>
            </button>
          `).join('')}
        </div>
      </section>

      <!-- Hero Promotional Carousel Banner -->
      <section class="px-4 sm:px-6">
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-on-primary-fixed text-on-primary shadow-lg p-5 sm:p-8">
          <!-- Glow effects -->
          <div class="absolute -right-8 -top-8 w-44 h-44 bg-inverse-primary/25 rounded-full blur-2xl pointer-events-none"></div>
          <div class="absolute -left-10 -bottom-10 w-36 h-36 bg-secondary-fixed/20 rounded-full blur-xl pointer-events-none"></div>
          
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex flex-col gap-2 max-w-lg">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-on-primary/20 backdrop-blur-md text-on-primary font-label-sm text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
                  ${isTamil ? 'வரையறுக்கப்பட்ட சலுகை' : 'Limited Time Super Drop'}
                </span>
                <span class="text-secondary-fixed font-mono text-[12px] font-bold" id="hero-timer">04h : 22m : 18s</span>
              </div>
              <h2 class="font-display-hero text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                ${isTamil ? 'மின்னணுவியல் பெருந்தள்ளுபடி' : 'Electronics & Gadgets Mega Drop'}
              </h2>
              <p class="font-body-md text-body-md text-primary-fixed leading-relaxed">
                ${isTamil ? 'ஸ்மார்ட்போன்கள் மற்றும் ஹெட்போன்களுக்கு 70% வரை தள்ளுபடி. கூடுதல் எக்ஸ்சேஞ்ச் போனஸ்!' : 'Up to 70% off on flagship smartphones, active noise cancellation buds & M2 iPads.'}
              </p>
              <div class="flex items-center gap-3 pt-2">
                <button id="hero-shop-now-btn" class="px-5 py-2.5 rounded-xl bg-white text-primary font-label-md text-label-md font-extrabold hover:bg-surface-container-low transition-all active:scale-95 shadow-md">
                  ${isTamil ? 'இப்போதே வாங்குங்கள்' : 'Shop Flagships'}
                </button>
                <span class="font-label-sm text-[12px] text-white/80">No Cost EMI from ₹1,499/mo</span>
              </div>
            </div>

            <!-- Hero graphic / badge -->
            <div class="relative shrink-0 hidden sm:flex items-center justify-center">
              <div class="w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-3 flex flex-col items-center justify-center text-center shadow-inner">
                <span class="material-symbols-outlined text-[42px] text-secondary-fixed">bolt</span>
                <span class="font-price-lg text-xl font-black text-white mt-1">UP TO 70%</span>
                <span class="font-label-sm text-[10px] uppercase text-white/90 font-bold">DISCOUNT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Today's Super Drops / Flash Deals -->
      <section class="px-4 sm:px-6 pt-2">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-error text-[24px]">local_fire_department</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
              ${isTamil ? 'இன்றைய சூப்பர் சலுகைகள்' : "Today's Super Drops"}
            </h3>
          </div>
          <button id="view-all-deals-btn" class="font-label-sm text-label-sm text-primary font-bold hover:underline flex items-center gap-0.5">
            ${isTamil ? 'அனைத்தும் காண்க' : 'View All'}
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <!-- Product Grid (Responsive: 2 cols on mobile, 4 on desktop) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          ${displayProducts.map(product => {
            const inWishlist = store.isInWishlist(product.id);
            return `
              <div class="group rounded-2xl bg-surface-container-lowest border border-surface-container p-3 sm:p-4 shadow-xs hover:shadow-xl hover:border-outline-variant transition-all flex flex-col justify-between relative">
                
                <!-- Badges & Wishlist -->
                <div class="flex items-center justify-between absolute top-4 left-4 right-4 z-10 pointer-events-none">
                  <span class="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold shadow-xs">
                    ${product.badge || `${product.discountPercent}% OFF`}
                  </span>
                  <button 
                    data-wishlist-toggle="${product.id}"
                    class="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm flex items-center justify-center text-on-surface-variant hover:text-error active:scale-90 transition-transform pointer-events-auto"
                    title="Wishlist"
                  >
                    <span 
                      class="material-symbols-outlined text-[18px] ${inWishlist ? 'text-error' : ''}"
                      style="font-variation-settings: 'FILL' ${inWishlist ? 1 : 0};"
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <!-- Product Image -->
                <div 
                  data-view-product="${product.id}"
                  class="w-full aspect-square rounded-xl bg-surface-container-low p-4 flex items-center justify-center overflow-hidden cursor-pointer mt-3"
                >
                  <img 
                    src="${product.mainImage}" 
                    alt="${product.name}" 
                    class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <!-- Product Metadata -->
                <div class="flex flex-col mt-3 flex-1 justify-between">
                  <div>
                    <div class="flex items-center gap-1.5 text-outline text-[11px] font-semibold uppercase tracking-wider">
                      <span>${product.brand}</span>
                      ${product.assured ? `
                        <span class="inline-flex items-center text-primary font-bold">
                          • <span class="material-symbols-outlined text-[12px] ml-0.5">verified</span> Assured
                        </span>
                      ` : ''}
                    </div>

                    <h4 
                      data-view-product="${product.id}"
                      class="font-headline-sm text-[13px] sm:text-[14px] text-on-surface font-semibold line-clamp-2 mt-1 cursor-pointer hover:text-primary transition-colors leading-snug"
                    >
                      ${product.shortName || product.name}
                    </h4>

                    <!-- Star Rating -->
                    <div class="flex items-center gap-1 mt-1.5">
                      <div class="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-[10px] font-bold">
                        <span>${product.rating}</span>
                        <span class="material-symbols-outlined text-[10px]" style="font-variation-settings: 'FILL' 1;">star</span>
                      </div>
                      <span class="text-[11px] text-outline">(${product.reviewCount.toLocaleString('en-IN')})</span>
                    </div>
                  </div>

                  <!-- Price & Add to Cart -->
                  <div class="pt-3 border-t border-surface-container mt-3">
                    <div class="flex items-baseline gap-1.5 mb-2.5">
                      <span class="font-price-md text-price-md text-primary font-extrabold">
                        ₹${product.price.toLocaleString('en-IN')}
                      </span>
                      ${product.originalPrice ? `
                        <span class="font-body-sm text-[11px] text-outline line-through">
                          ₹${product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      ` : ''}
                    </div>

                    <button 
                      data-add-cart="${product.id}"
                      class="w-full py-2 rounded-xl bg-primary-fixed hover:bg-primary text-primary hover:text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
                    >
                      <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>${isTamil ? 'கூடையில் சேர்' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- Featured Brands Carousel -->
      <section class="px-4 sm:px-6 pt-4">
        <div class="p-4 rounded-2xl bg-surface-container-low border border-surface-container">
          <div class="flex items-center justify-between mb-3">
            <span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold">
              ${isTamil ? 'முன்னணி பிராண்டுகள்' : 'Official Storefronts & Brands'}
            </span>
            <span class="text-[11px] text-secondary font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">verified</span> 100% Genuine
            </span>
          </div>
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar">
            ${['Apple', 'Samsung', 'Sony', 'boAt', 'Dell', 'HP', 'Anker', 'OnePlus'].map(brand => `
              <button 
                data-search-brand="${brand}"
                class="px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container shadow-xs text-on-surface font-label-md text-label-md font-bold shrink-0 flex items-center gap-2 border border-surface-container transition-all active:scale-95"
              >
                <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span>${brand}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </section>

    </div>
  `;

  // Attach Event Listeners
  const claimBtn = container.querySelector('#claim-bank-offer-btn');
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      store.applyCoupon('PORULAGAM10');
      store.openModal('cart');
    });
  }

  const shopNowBtn = container.querySelector('#hero-shop-now-btn');
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', () => store.setView('deals'));
  }

  const viewAllDealsBtn = container.querySelector('#view-all-deals-btn');
  if (viewAllDealsBtn) {
    viewAllDealsBtn.addEventListener('click', () => store.setView('deals'));
  }

  // Category navigation click
  container.querySelectorAll('[data-cat-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-cat-nav');
      store.selectCategory(catId);
      store.setView('categories');
    });
  });

  // Product card detail view
  container.querySelectorAll('[data-view-product]').forEach(el => {
    el.addEventListener('click', () => {
      const prodId = el.getAttribute('data-view-product');
      const p = products.find(prod => prod.id === prodId);
      if (p) store.viewProduct(p);
    });
  });

  // Wishlist toggle
  container.querySelectorAll('[data-wishlist-toggle]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-wishlist-toggle');
      store.toggleWishlist(prodId);
    });
  });

  // Quick Add to cart
  container.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-add-cart');
      const p = products.find(prod => prod.id === prodId);
      if (p) store.addToCart(p);
    });
  });

  // Brand chip search
  container.querySelectorAll('[data-search-brand]').forEach(btn => {
    btn.addEventListener('click', () => {
      const brand = btn.getAttribute('data-search-brand');
      store.setSearch(brand);
    });
  });
}
