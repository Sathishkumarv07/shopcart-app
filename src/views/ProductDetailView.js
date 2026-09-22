// Porulagam Product Details View
import { store } from '../store/state.js';

export function renderProductDetailView(container) {
  const state = store.getState();
  const product = state.activeProduct;
  const isTamil = state.lang === 'ta';
  const inWishlist = store.isInWishlist(product.id);

  let selectedColor = product.colors && product.colors[0] ? product.colors[0].name : 'Default';
  let selectedStorage = product.storageOptions && product.storageOptions[0] ? product.storageOptions[0] : 'Standard';
  let activeImage = product.mainImage;

  container.innerHTML = `
    <div class="flex flex-col w-full pb-24 max-w-4xl mx-auto">
      
      <!-- Back Navigation Header -->
      <div class="px-4 py-3 flex items-center justify-between border-b border-surface-container bg-surface-container-lowest sticky top-[108px] sm:top-16 z-20">
        <button id="detail-back-btn" class="flex items-center gap-1.5 text-on-surface hover:text-primary font-label-md text-label-md font-bold transition-colors">
          <span class="material-symbols-outlined text-[22px]">arrow_back</span>
          <span>${isTamil ? 'பின்னே' : 'Back'}</span>
        </button>
        <div class="flex items-center gap-2">
          <button id="detail-share-btn" class="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors" title="Share">
            <span class="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button 
            id="detail-wishlist-btn" 
            class="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" 
            title="Wishlist"
          >
            <span 
              class="material-symbols-outlined text-[22px] ${inWishlist ? 'text-error' : ''}"
              style="font-variation-settings: 'FILL' ${inWishlist ? 1 : 0};"
            >
              favorite
            </span>
          </button>
        </div>
      </div>

      <!-- Main Gallery Section -->
      <div class="relative w-full bg-surface-container-lowest p-4 sm:p-6 flex flex-col items-center border-b border-surface-container">
        
        <!-- Badges Overlay -->
        <div class="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm text-[11px] font-bold shadow-xs">
            <span class="material-symbols-outlined text-[14px] mr-1" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
            ${product.badge || 'Best Seller'}
          </span>
          ${product.assured ? `
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold shadow-xs">
              <span class="material-symbols-outlined text-[13px] mr-1">verified</span>
              Assured
            </span>
          ` : ''}
        </div>

        <!-- Main Display Image with Zoom Effect -->
        <div class="relative w-full max-w-sm aspect-square flex items-center justify-center p-4">
          <img 
            id="detail-main-img"
            src="${activeImage}" 
            alt="${product.name}" 
            class="w-full h-full object-contain transition-all duration-300 hover:scale-105 cursor-zoom-in"
          />
        </div>

        <!-- Thumbnail Strip -->
        <div class="flex items-center gap-2 mt-4 overflow-x-auto pb-1 max-w-full no-scrollbar">
          ${product.images.map((imgUrl, idx) => `
            <button 
              data-thumb-idx="${idx}"
              class="thumb-btn w-14 h-14 rounded-xl border-2 transition-all overflow-hidden p-1 bg-surface-container-low shrink-0 ${
                idx === 0 ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
              }"
            >
              <img src="${imgUrl}" alt="Angle ${idx + 1}" class="w-full h-full object-contain" />
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Primary Product Info -->
      <div class="p-4 sm:p-6 bg-surface-container-lowest border-b border-surface-container space-y-3">
        <div class="flex items-center justify-between">
          <span class="font-label-md text-label-md text-primary font-bold tracking-wider uppercase">${product.brand}</span>
          <span class="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">bolt</span> In Stock
          </span>
        </div>

        <h1 class="font-headline-lg text-lg sm:text-2xl text-on-surface font-extrabold leading-snug">
          ${product.name}
        </h1>

        <!-- Star Ratings -->
        <div class="flex items-center gap-2 pt-0.5">
          <div class="inline-flex items-center gap-1 bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-extrabold shadow-xs">
            <span>${product.rating}</span>
            <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">star</span>
          </div>
          <span class="font-body-sm text-body-sm text-on-surface-variant font-medium">
            ${product.reviewCount.toLocaleString('en-IN')} ${isTamil ? 'மதிப்பீடுகள்' : 'Ratings & Reviews'}
          </span>
        </div>

        <!-- Price Section -->
        <div class="pt-2">
          <div class="flex items-baseline gap-2.5">
            <span class="font-price-lg text-2xl sm:text-3xl font-black text-primary">
              ₹${product.price.toLocaleString('en-IN')}
            </span>
            ${product.originalPrice ? `
              <span class="font-body-md text-body-md text-outline line-through">
                ₹${product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-extrabold">
                ${product.discountPercent}% OFF
              </span>
            ` : ''}
          </div>
          <p class="font-body-sm text-[12px] text-secondary font-semibold mt-0.5">
            ${isTamil ? `நீங்கள் சேமிப்பது ₹${(product.originalPrice - product.price).toLocaleString('en-IN')}` : `You save ₹${(product.originalPrice - product.price).toLocaleString('en-IN')} including instant bank drop`}
          </p>
        </div>

        <!-- Bank Offers & EMI Strip -->
        <div class="p-3.5 rounded-xl bg-surface-container-low border border-surface-container space-y-2">
          <div class="flex items-center gap-2 text-on-surface">
            <span class="material-symbols-outlined text-primary text-[20px]">account_balance</span>
            <span class="font-label-md text-label-md font-bold">Bank Offer & No Cost EMI Available</span>
          </div>
          <p class="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
            Get 10% Instant Discount up to ₹1,500 on HDFC & SBI Bank Cards. No Cost EMI starts from <span class="font-bold text-on-surface">₹2,916/month</span>.
          </p>
        </div>
      </div>

      <!-- Variants Selection: Colors & Storage -->
      <div class="p-4 sm:p-6 bg-surface-container-lowest border-b border-surface-container space-y-4">
        
        <!-- Color Selector -->
        ${product.colors ? `
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold">
                ${isTamil ? 'நிறம்' : 'Color'}: <span id="selected-color-label" class="text-on-surface font-bold">${selectedColor}</span>
              </span>
            </div>
            <div class="flex items-center gap-3">
              ${product.colors.map(col => `
                <button 
                  data-select-color="${col.name}"
                  class="color-btn flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all ${
                    col.name === selectedColor ? 'border-primary bg-primary-fixed/20 shadow-xs' : 'border-surface-container hover:border-outline'
                  }"
                >
                  <span class="w-4 h-4 rounded-full border border-black/20" style="background-color: ${col.hex}"></span>
                  <span class="font-label-sm text-[12px] font-semibold text-on-surface">${col.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Storage Selector -->
        ${product.storageOptions ? `
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold">
                ${isTamil ? 'சேமிப்பக அளவு' : 'Storage / Size'}: <span id="selected-storage-label" class="text-on-surface font-bold">${selectedStorage}</span>
              </span>
            </div>
            <div class="flex items-center gap-2">
              ${product.storageOptions.map(st => `
                <button 
                  data-select-storage="${st}"
                  class="storage-btn px-4 py-2 rounded-xl border-2 font-label-md text-label-md font-bold transition-all ${
                    st === selectedStorage ? 'border-primary bg-primary text-on-primary shadow-xs' : 'border-surface-container text-on-surface hover:border-outline'
                  }"
                >
                  ${st}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Pincode Check -->
        <div class="pt-2">
          <span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold block mb-1.5">
            ${isTamil ? 'டெலிவரி விபரம்' : 'Delivery & Pincode'}
          </span>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container flex-1">
              <span class="material-symbols-outlined text-[18px] text-primary">location_on</span>
              <span class="font-label-md text-label-md text-on-surface font-semibold">${state.pincode}</span>
            </div>
            <button id="detail-change-location-btn" class="px-4 py-2 rounded-xl border border-primary text-primary font-label-sm text-label-sm font-bold hover:bg-primary-fixed/30 transition-colors">
              Change
            </button>
          </div>
          <p class="font-body-sm text-[12px] text-secondary font-semibold mt-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Free Express Delivery by Tomorrow, 8:00 PM</span>
          </p>
        </div>

      </div>

      <!-- Highlights & Specifications -->
      <div class="p-4 sm:p-6 bg-surface-container-lowest border-b border-surface-container space-y-4">
        <div>
          <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
            ${isTamil ? 'முக்கிய சிறப்பம்சங்கள்' : 'Product Highlights'}
          </h3>
          <ul class="space-y-1.5">
            ${product.highlights.map(h => `
              <li class="flex items-start gap-2 text-body-sm text-on-surface leading-relaxed">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="pt-2">
          <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
            ${isTamil ? 'தொழில்நுட்ப விவரக்குறிப்புகள்' : 'Technical Specifications'}
          </h3>
          <div class="rounded-xl border border-surface-container overflow-hidden">
            ${Object.entries(product.specs).map(([key, value], idx) => `
              <div class="flex flex-col sm:flex-row py-2.5 px-3.5 text-body-sm ${idx % 2 === 0 ? 'bg-surface-container-low' : 'bg-surface-container-lowest'} border-b border-surface-container/50 last:border-none">
                <span class="font-semibold text-on-surface-variant w-full sm:w-1/3 shrink-0">${key}</span>
                <span class="text-on-surface font-medium w-full sm:w-2/3 mt-0.5 sm:mt-0">${value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Sticky Purchase Bottom Bar -->
      <div class="fixed bottom-0 left-0 w-full z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container p-3 sm:px-6 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
        <div class="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div class="flex flex-col">
            <span class="font-label-sm text-[10px] uppercase text-outline font-bold">Total Price</span>
            <div class="flex items-baseline gap-1.5">
              <span class="font-price-md text-xl font-black text-primary">₹${product.price.toLocaleString('en-IN')}</span>
              ${product.originalPrice ? `
                <span class="text-[11px] text-outline line-through">₹${product.originalPrice.toLocaleString('en-IN')}</span>
              ` : ''}
            </div>
          </div>

          <div class="flex items-center gap-2 flex-1 max-w-md justify-end">
            <button 
              id="detail-add-cart-btn"
              class="flex-1 py-3 px-3 rounded-xl border border-primary text-primary hover:bg-primary-fixed/30 font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>${isTamil ? 'கூடையில் சேர்' : 'Add to Cart'}</span>
            </button>
            <button 
              id="detail-buy-now-btn"
              class="flex-1 py-3 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-lg shadow-primary/30"
            >
              <span class="material-symbols-outlined text-[18px]">bolt</span>
              <span>${isTamil ? 'உடனடி கொள்முதல்' : 'Buy Now'}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  `;

  // Back button
  const backBtn = container.querySelector('#detail-back-btn');
  if (backBtn) backBtn.addEventListener('click', () => store.goBack());

  // Share button
  const shareBtn = container.querySelector('#detail-share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({ title: product.name, url: window.location.href });
      } else {
        store.showToast('Product link copied to clipboard!', 'success');
      }
    });
  }

  // Wishlist button
  const wishlistBtn = container.querySelector('#detail-wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => store.toggleWishlist(product.id));
  }

  // Change location
  const changeLocBtn = container.querySelector('#detail-change-location-btn');
  if (changeLocBtn) {
    changeLocBtn.addEventListener('click', () => store.openModal('location'));
  }

  // Thumbnail switcher
  const mainImg = container.querySelector('#detail-main-img');
  container.querySelectorAll('.thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-thumb-idx'), 10);
      activeImage = product.images[idx] || product.mainImage;
      if (mainImg) mainImg.src = activeImage;

      container.querySelectorAll('.thumb-btn').forEach(b => {
        b.classList.remove('border-primary', 'ring-2', 'ring-primary/20', 'scale-105');
        b.classList.add('border-transparent', 'opacity-70');
      });
      btn.classList.add('border-primary', 'ring-2', 'ring-primary/20', 'scale-105');
      btn.classList.remove('border-transparent', 'opacity-70');
    });
  });

  // Color switcher
  container.querySelectorAll('[data-select-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedColor = btn.getAttribute('data-select-color');
      const label = container.querySelector('#selected-color-label');
      if (label) label.textContent = selectedColor;

      container.querySelectorAll('.color-btn').forEach(b => {
        b.classList.remove('border-primary', 'bg-primary-fixed/20');
        b.classList.add('border-surface-container');
      });
      btn.classList.add('border-primary', 'bg-primary-fixed/20');
      btn.classList.remove('border-surface-container');
    });
  });

  // Storage switcher
  container.querySelectorAll('[data-select-storage]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedStorage = btn.getAttribute('data-select-storage');
      const label = container.querySelector('#selected-storage-label');
      if (label) label.textContent = selectedStorage;

      container.querySelectorAll('.storage-btn').forEach(b => {
        b.classList.remove('border-primary', 'bg-primary', 'text-on-primary');
        b.classList.add('border-surface-container', 'text-on-surface');
      });
      btn.classList.add('border-primary', 'bg-primary', 'text-on-primary');
      btn.classList.remove('border-surface-container', 'text-on-surface');
    });
  });

  // Add to Cart CTA
  const addCartBtn = container.querySelector('#detail-add-cart-btn');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      store.addToCart(product, selectedColor, selectedStorage, 1);
    });
  }

  // Buy Now CTA
  const buyNowBtn = container.querySelector('#detail-buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      store.addToCart(product, selectedColor, selectedStorage, 1);
      store.openModal('checkout');
    });
  }
}
