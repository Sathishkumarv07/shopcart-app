// Porulagam Deals & Offers View
import { store } from '../store/state.js';
import { products } from '../data/products.js';
import { dealCategories, coupons, bankOffers, offerSalesBanners } from '../data/deals.js';

export function renderDealsView(container) {
  const state = store.getState();
  const isTamil = state.lang === 'ta';
  const activeDealFilter = state.dealFilter || 'all';

  // Filter products according to selected filter
  let dealProducts = products;
  if (activeDealFilter === 'offersale') {
    dealProducts = products.filter(p => p.discountPercent >= 25 || p.badge?.includes('OFF') || p.badge === 'HOT');
  } else if (activeDealFilter === 'lightning') {
    dealProducts = products.filter(p => p.discountPercent >= 20);
  } else if (activeDealFilter === 'under499') {
    dealProducts = products.filter(p => p.price <= 2500);
  } else if (activeDealFilter === 'tech50') {
    dealProducts = products.filter(p => p.discountPercent >= 40);
  } else if (activeDealFilter === 'fashionclearance') {
    dealProducts = products.filter(p => p.category === 'fashion');
  } else if (activeDealFilter === 'bogo') {
    dealProducts = products.filter(p => p.price < 5000);
  }

  container.innerHTML = `
    <div class="flex flex-col w-full pb-16 space-y-4">
      
      <!-- Sticky Deal Header & Filter Chips -->
      <div class="sticky top-[108px] sm:top-16 z-30 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container py-2.5 shadow-xs">
        <div class="px-4 sm:px-6 flex items-center justify-between gap-3 mb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">sell</span>
            </div>
            <div>
              <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                ${isTamil ? 'மெகா சலுகை விற்பனை' : 'Offer Sales & Super Drops'}
              </h2>
              <span class="text-[11px] text-tertiary font-bold">
                ${isTamil ? 'உச்சக்கட்ட 80% வரை நேரடி தள்ளுபடி!' : 'Exclusive Festive Discounts & Coupons'}
              </span>
            </div>
          </div>
          <span class="font-label-sm text-primary font-bold text-[12px] bg-primary-fixed px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span> Live Sale
          </span>
        </div>

        <!-- Deal Filter Chips -->
        <div class="flex items-center gap-2 overflow-x-auto px-4 sm:px-6 py-1 no-scrollbar">
          ${dealCategories.map(cat => {
            const isSelected = activeDealFilter === cat.id;
            const label = isTamil && cat.tamilLabel ? cat.tamilLabel : cat.label;
            return `
              <button 
                data-deal-filter="${cat.id}"
                class="shrink-0 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? 'bg-primary text-on-primary font-bold shadow-sm' 
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                }"
              >
                ${cat.icon ? `<span class="material-symbols-outlined text-[16px]">${cat.icon}</span>` : ''}
                <span>${label}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="px-4 sm:px-6 space-y-5">
        
        <!-- Live Grand Offer Sale Hero Banner -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-container to-inverse-surface p-5 sm:p-7 text-on-primary shadow-xl">
          <div class="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          
          <div class="relative z-10 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                <span class="material-symbols-outlined text-secondary-fixed text-[18px] animate-pulse" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
                <span class="font-label-sm text-[11px] font-black uppercase tracking-wider text-secondary-fixed">
                  ${isTamil ? 'மெகா விழாக்கால பெருந்தள்ளுபடி' : 'FESTIVE OFFER SALE'}
                </span>
              </div>
              <span class="font-label-sm text-[11px] font-bold text-inverse-primary bg-primary/70 px-3 py-0.5 rounded-full border border-inverse-primary/30">
                ${isTamil ? 'விரைவில் முடிகிறது' : 'Ends Soon'}
              </span>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h3 class="font-headline-lg text-xl sm:text-3xl font-black text-white leading-tight">
                  ${isTamil ? 'உச்சக்கட்ட 80% வரை நேரடி தள்ளுபடி!' : 'Peak Festive Hours: Up to 80% Off!'}
                </h3>
                <p class="font-body-sm text-[13px] text-primary-fixed mt-1">
                  ${isTamil ? 'ஸ்மார்ட்போன்கள், லேப்டாப்கள், ஆடைகள் & வீட்டு உபயோக பொருட்களுக்கு அதிரடி சலுகை' : 'Valid on Flagship Phones, Audio, Shoes, Fashion & Smart Home'}
                </p>
              </div>

              <!-- Live Flash Countdown -->
              <div class="flex items-center gap-2 self-start sm:self-auto bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-md">
                <div class="flex flex-col items-center">
                  <span class="font-mono text-sm sm:text-lg font-black text-white">03</span>
                  <span class="text-[9px] text-white/70 uppercase">Hours</span>
                </div>
                <span class="text-white font-bold text-sm">:</span>
                <div class="flex flex-col items-center">
                  <span class="font-mono text-sm sm:text-lg font-black text-white">45</span>
                  <span class="text-[9px] text-white/70 uppercase">Mins</span>
                </div>
                <span class="text-white font-bold text-sm">:</span>
                <div class="flex flex-col items-center">
                  <span class="font-mono text-sm sm:text-lg font-black text-secondary-fixed animate-pulse">20</span>
                  <span class="text-[9px] text-white/70 uppercase">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Claimable Coupons Strip with Offer Sale specials -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-[20px]" style="font-variation-settings: 'FILL' 1;">confirmation_number</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                ${isTamil ? 'ஆஃபர் விற்பனை சிறப்பு கூப்பன்கள்' : 'Offer Sale Exclusive Coupons'}
              </h3>
            </div>
            <span class="text-xs text-outline font-semibold">${coupons.length} Active Codes</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${coupons.map(cp => `
              <div class="p-4 rounded-2xl bg-surface-container-lowest border border-dashed border-primary/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="font-label-sm text-[11px] font-mono font-black text-primary px-2.5 py-0.5 rounded-md bg-primary-fixed tracking-wide">
                        ${cp.code}
                      </span>
                      ${cp.code === 'MEGAOFFER70' ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-black bg-tertiary text-on-tertiary">SUPER SALE</span>' : ''}
                    </div>
                    <h4 class="font-label-md text-label-md text-on-surface font-bold mt-2">
                      ${isTamil && cp.tamilTitle ? cp.tamilTitle : cp.title}
                    </h4>
                    <p class="font-body-sm text-[11px] text-on-surface-variant mt-1 leading-snug">
                      ${cp.description}
                    </p>
                  </div>
                </div>
                <button 
                  data-apply-coupon="${cp.code}"
                  class="mt-3.5 w-full py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-bold hover:bg-primary-container active:scale-95 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>${isTamil ? 'கூப்பனைப் பயன்படுத்து' : 'Apply Coupon'}</span>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Deals Products Grid -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between">
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
              ${isTamil ? 'சிறப்பு சலுகைப் பொருட்கள்' : 'Offer Sale Products & Super Drops'}
            </h3>
            <span class="font-label-sm text-secondary font-bold">${dealProducts.length} ${isTamil ? 'பொருட்கள்' : 'Items'}</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            ${dealProducts.map(p => `
              <div class="rounded-2xl bg-surface-container-lowest border border-surface-container p-3 sm:p-4 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group relative">
                
                <div class="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  <span class="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-[10px] font-extrabold shadow-xs">
                    ${p.discountPercent}% OFF
                  </span>
                  ${p.badge ? `
                    <span class="px-1.5 py-0.5 rounded-md bg-secondary text-on-secondary font-label-sm text-[9px] font-bold">
                      ${p.badge}
                    </span>
                  ` : ''}
                </div>

                <div 
                  data-view-product="${p.id}"
                  class="w-full aspect-square rounded-xl bg-surface-container-low p-3 flex items-center justify-center overflow-hidden cursor-pointer mt-3"
                >
                  <img src="${p.mainImage}" alt="${p.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>

                <div class="flex flex-col mt-3 flex-1 justify-between">
                  <div>
                    <span class="text-[10px] text-outline uppercase font-bold tracking-wider">${p.brand}</span>
                    <h4 
                      data-view-product="${p.id}"
                      class="font-label-md text-label-md text-on-surface font-bold line-clamp-2 mt-0.5 cursor-pointer hover:text-primary transition-colors leading-snug"
                    >
                      ${p.shortName || p.name}
                    </h4>
                  </div>

                  <div class="pt-2 border-t border-surface-container mt-2.5">
                    <div class="flex items-baseline gap-1.5 mb-2">
                      <span class="font-price-md text-price-md text-primary font-black">₹${p.price.toLocaleString('en-IN')}</span>
                      ${p.originalPrice ? `
                        <span class="font-body-sm text-[11px] text-outline line-through">₹${p.originalPrice.toLocaleString('en-IN')}</span>
                      ` : ''}
                    </div>

                    <button 
                      data-deal-add-cart="${p.id}"
                      class="w-full py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs cursor-pointer hover:bg-primary-container"
                    >
                      <span class="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                      <span>${isTamil ? 'ஆஃபர் பெறு' : 'Claim Deal'}</span>
                    </button>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bank Offers Row -->
        <div class="space-y-3 pt-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]" style="font-variation-settings: 'FILL' 1;">account_balance</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
              ${isTamil ? 'வங்கி கூட்டாண்மை சலுகைகள்' : 'Bank Partnership Discounts'}
            </h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${bankOffers.map(bo => `
              <div class="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-headline-sm text-sm text-primary font-bold">${bo.bank}</span>
                    <span class="px-2 py-0.5 rounded-md bg-secondary text-on-secondary font-label-sm text-[9px] font-black">${bo.badge}</span>
                  </div>
                  <p class="font-label-md text-label-md text-on-surface font-semibold">${bo.offer}</p>
                  <span class="font-body-sm text-[11px] text-outline block mt-1">${bo.minTxn}</span>
                </div>
                <button 
                  data-apply-coupon="PORULAGAM10"
                  class="mt-3 text-left font-label-sm text-[12px] text-primary font-bold hover:underline cursor-pointer"
                >
                  ${isTamil ? 'பயன்படுத்துக →' : 'Apply at Checkout →'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;

  // Filter clicks
  container.querySelectorAll('[data-deal-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-deal-filter');
      state.dealFilter = filter;
      renderDealsView(container);
    });
  });

  // Apply coupon click
  container.querySelectorAll('[data-apply-coupon]').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-apply-coupon');
      store.applyCoupon(code);
      store.openModal('cart');
    });
  });

  // Product detail view
  container.querySelectorAll('[data-view-product]').forEach(el => {
    el.addEventListener('click', () => {
      const prodId = el.getAttribute('data-view-product');
      const p = products.find(prod => prod.id === prodId);
      if (p) {
        store.setSelectedProduct(p);
      }
    });
  });

  // Quick add to cart
  container.querySelectorAll('[data-deal-add-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-deal-add-cart');
      const p = products.find(prod => prod.id === prodId);
      if (p) {
        store.addToCart(p, 1);
        store.showToast(isTamil ? `${p.shortName || p.name} கூடையில் சேர்க்கப்பட்டது!` : `${p.shortName || p.name} added to cart!`);
      }
    });
  });
}
