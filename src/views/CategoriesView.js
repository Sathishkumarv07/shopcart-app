// Porulagam Categories View (Dual-Pane Split Rail Layout)
import { store } from '../store/state.js';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';

export function renderCategoriesView(container) {
  const state = store.getState();
  const isTamil = state.lang === 'ta';

  const activeCat = categories.find(c => c.id === state.selectedCategory) || categories[0];
  const catProducts = products.filter(p => p.category === activeCat.id);

  container.innerHTML = `
    <div class="flex flex-col w-full min-h-[calc(100vh-140px)]">
      
      <!-- Subcategory Search Discovery Bar -->
      <div class="px-4 sm:px-6 py-2.5 bg-surface-container-lowest border-b border-surface-container shadow-xs">
        <div class="flex items-center justify-between h-10 px-3 rounded-xl bg-surface-container-low text-on-surface-variant max-w-2xl">
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <span class="material-symbols-outlined text-[20px] text-primary">search</span>
            <input 
              id="category-search-input"
              class="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full focus:outline-none"
              placeholder="${isTamil ? '100+ துணைப் பிரிவுகளில் தேடுங்கள்...' : 'Search across 100+ categories and sub-departments'}"
              type="text"
            />
          </div>
          <button id="category-voice-btn" class="w-8 h-8 flex items-center justify-center text-primary rounded-full hover:bg-surface-container">
            <span class="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>
      </div>

      <!-- Main Category Explorer (Split Vertical Rail Layout) -->
      <div class="flex w-full flex-1 overflow-hidden">
        
        <!-- Left Category Rail -->
        <aside class="w-20 sm:w-28 shrink-0 bg-surface-container-low flex flex-col py-2 select-none border-r border-surface-container overflow-y-auto">
          <div class="flex flex-col gap-y-1">
            ${categories.map(cat => {
              const isSelected = cat.id === activeCat.id;
              return `
                <button 
                  data-select-cat="${cat.id}"
                  class="rail-item relative flex flex-col items-center justify-center py-3 px-1 text-center transition-all ${
                    isSelected 
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-xs' 
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }"
                >
                  ${isSelected ? `
                    <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-9 bg-primary rounded-r-full"></div>
                  ` : ''}
                  <div class="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${
                    isSelected ? 'bg-primary-fixed text-primary' : 'bg-surface-container text-on-surface-variant'
                  }">
                    <span 
                      class="material-symbols-outlined text-[22px]"
                      style="font-variation-settings: 'FILL' ${isSelected ? 1 : 0};"
                    >
                      ${cat.icon}
                    </span>
                  </div>
                  <span class="font-label-sm text-[11px] leading-tight line-clamp-1 px-1">
                    ${isTamil ? cat.tamilName : cat.name}
                  </span>
                </button>
              `;
            }).join('')}
          </div>
        </aside>

        <!-- Right Side Main Content Panel -->
        <section class="flex-1 min-w-0 p-3 sm:p-5 flex flex-col gap-4 overflow-y-auto pb-16">
          
          <!-- Top Promo Mini-Banner -->
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary p-4 text-on-primary shadow-sm flex items-center justify-between">
            <div class="flex flex-col z-10 max-w-[70%]">
              <span class="font-label-sm text-[10px] uppercase tracking-wider text-secondary-container font-extrabold flex items-center gap-1 mb-1">
                <span class="material-symbols-outlined text-[14px]">bolt</span> Clearance Sale
              </span>
              <h2 class="font-headline-sm text-base sm:text-lg text-on-primary font-bold leading-tight">
                ${activeCat.bannerTitle}
              </h2>
              <p class="font-body-sm text-[12px] text-primary-fixed mt-0.5">
                ${activeCat.bannerSubtitle}
              </p>
            </div>
            <div class="relative z-10 shrink-0">
              <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
                <span class="material-symbols-outlined text-[28px]">${activeCat.bannerIcon}</span>
              </div>
            </div>
            <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none"></div>
          </div>

          <!-- Subcategory Grid (3 columns on mobile, up to 5 on desktop) -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between px-1">
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                ${isTamil ? 'துணைப் பிரிவுகள்' : 'Subcategories'}
              </h3>
              <span class="font-label-sm text-label-sm text-primary font-semibold flex items-center">
                ${activeCat.subcategories.length} ${isTamil ? 'பிரிவுகள்' : 'Categories'}
              </span>
            </div>

            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
              ${activeCat.subcategories.map(sub => `
                <button 
                  data-subcat-filter="${sub.name}"
                  class="flex flex-col items-center text-center p-2.5 rounded-2xl bg-surface-container-lowest border border-surface-container hover:border-primary/40 shadow-xs hover:shadow-md transition-all active:scale-95 group focus:outline-none"
                >
                  <div class="w-12 h-12 rounded-full bg-surface-container-low group-hover:bg-primary-fixed group-hover:text-primary flex items-center justify-center text-primary mb-1.5 transition-colors">
                    <span class="material-symbols-outlined text-[24px]">${sub.icon}</span>
                  </div>
                  <span class="font-label-sm text-[11px] sm:text-[12px] text-on-surface font-semibold line-clamp-2 leading-tight">
                    ${sub.name}
                  </span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Popular Brands Section -->
          <div class="flex flex-col gap-2 pt-1">
            <h3 class="font-headline-sm text-headline-sm text-on-surface px-1 font-bold">
              ${isTamil ? 'பிரபல பிராண்டுகள்' : 'Featured Brands'}
            </h3>
            <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              ${activeCat.brands.map(brand => `
                <button 
                  data-brand-pill="${brand}"
                  class="px-3.5 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container shadow-xs text-on-surface font-label-md text-label-md shrink-0 flex items-center gap-2 hover:bg-surface-container transition-all active:scale-95"
                >
                  <span class="w-2 h-2 rounded-full bg-primary"></span>
                  <span>${brand}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Trending in Category Products -->
          <div class="flex flex-col gap-2 pt-2">
            <div class="flex items-center justify-between px-1">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[20px] text-error">local_fire_department</span>
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                  ${isTamil ? `டிரெண்டிங் ${activeCat.name}` : `Trending in ${activeCat.name}`}
                </h3>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              ${(catProducts.length > 0 ? catProducts : products.slice(0, 3)).map(prod => `
                <div class="rounded-2xl bg-surface-container-lowest border border-surface-container p-3 shadow-xs flex flex-col justify-between group">
                  <div 
                    data-view-product="${prod.id}"
                    class="w-full aspect-square rounded-xl bg-surface-container-low p-2 flex items-center justify-center overflow-hidden cursor-pointer relative"
                  >
                    <img src="${prod.mainImage}" alt="${prod.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    <span class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold">
                      ${prod.discountPercent}% OFF
                    </span>
                  </div>

                  <div class="flex flex-col mt-2">
                    <h4 
                      data-view-product="${prod.id}"
                      class="font-label-md text-label-md text-on-surface font-bold line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                    >
                      ${prod.shortName || prod.name}
                    </h4>
                    <div class="flex items-baseline gap-1 mt-1">
                      <span class="font-price-md text-price-md text-primary font-bold">₹${prod.price.toLocaleString('en-IN')}</span>
                      ${prod.originalPrice ? `
                        <span class="font-body-sm text-[10px] text-outline line-through">₹${prod.originalPrice.toLocaleString('en-IN')}</span>
                      ` : ''}
                    </div>
                  </div>

                  <button 
                    data-cat-add-cart="${prod.id}"
                    class="w-full py-1.5 mt-2.5 rounded-xl bg-primary-fixed hover:bg-primary text-primary hover:text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <span class="material-symbols-outlined text-[15px]">add_shopping_cart</span> Add
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

        </section>

      </div>
    </div>
  `;

  // Rail category selection
  container.querySelectorAll('[data-select-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-select-cat');
      store.selectCategory(catId);
    });
  });

  // Product detail view
  container.querySelectorAll('[data-view-product]').forEach(el => {
    el.addEventListener('click', () => {
      const prodId = el.getAttribute('data-view-product');
      const p = products.find(prod => prod.id === prodId);
      if (p) store.viewProduct(p);
    });
  });

  // Add to cart
  container.querySelectorAll('[data-cat-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prodId = btn.getAttribute('data-cat-add-cart');
      const p = products.find(prod => prod.id === prodId);
      if (p) store.addToCart(p);
    });
  });

  // Subcategory click filter
  container.querySelectorAll('[data-subcat-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const subName = btn.getAttribute('data-subcat-filter');
      store.showToast(`Filtering for: ${subName}`, 'info');
      store.setSearch(subName);
      store.setView('home');
    });
  });

  // Brand pill filter
  container.querySelectorAll('[data-brand-pill]').forEach(btn => {
    btn.addEventListener('click', () => {
      const brand = btn.getAttribute('data-brand-pill');
      store.setSearch(brand);
      store.setView('home');
    });
  });

  // Voice Search inside category
  const voiceBtn = container.querySelector('#category-voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      store.showToast('Voice Search listening...', 'info');
    });
  }
}
