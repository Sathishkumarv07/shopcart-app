// Porulagam Wishlist Modal / Drawer Component
import { store } from '../store/state.js';
import { products } from '../data/products.js';

export function renderWishlistModal(container) {
  const state = store.getState();
  if (state.activeModal !== 'wishlist') {
    container.innerHTML = '';
    return;
  }

  const isTamil = state.lang === 'ta';
  const wishlistProducts = products.filter(p => state.wishlist.has(p.id));

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden">
      <div id="wishlist-backdrop" class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"></div>

      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in-right">
          
          <div class="px-5 py-4 bg-surface-container-lowest border-b border-surface-container flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-error text-[24px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
              <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                ${isTamil ? 'விருப்பப்பட்டியல்' : 'My Wishlist'}
              </h2>
              <span class="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">
                ${wishlistProducts.length}
              </span>
            </div>
            <button id="close-wishlist-btn" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            ${wishlistProducts.length === 0 ? `
              <div class="h-full flex flex-col items-center justify-center text-center p-8">
                <div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline mb-3">
                  <span class="material-symbols-outlined text-[36px]">favorite_border</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">No saved items</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Tap the heart icon on any product to save it here for later.</p>
              </div>
            ` : wishlistProducts.map(product => `
              <div class="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-xs flex items-center gap-3">
                <img 
                  src="${product.mainImage}" 
                  alt="${product.name}" 
                  class="w-16 h-16 rounded-lg object-contain bg-surface-container-low p-1 shrink-0 cursor-pointer"
                  data-view-prod="${product.id}"
                />
                <div class="flex-1 min-w-0">
                  <h4 
                    class="font-label-md text-label-md text-on-surface font-bold line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                    data-view-prod="${product.id}"
                  >
                    ${product.shortName || product.name}
                  </h4>
                  <div class="flex items-baseline gap-1.5 mt-0.5">
                    <span class="font-price-md text-price-md text-primary font-bold">₹${product.price.toLocaleString('en-IN')}</span>
                    ${product.originalPrice ? `
                      <span class="text-[11px] text-outline line-through">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                    ` : ''}
                  </div>
                  <div class="flex items-center gap-2 mt-2">
                    <button 
                      data-wish-add-cart="${product.id}"
                      class="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <span class="material-symbols-outlined text-[14px]">add_shopping_cart</span> Add to Cart
                    </button>
                    <button 
                      data-wish-remove="${product.id}"
                      class="text-outline hover:text-error text-[12px] p-1"
                      title="Remove"
                    >
                      <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </div>
    </div>
  `;

  // Listeners
  const closeBtn = container.querySelector('#close-wishlist-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => store.closeModal());

  const backdrop = container.querySelector('#wishlist-backdrop');
  if (backdrop) backdrop.addEventListener('click', () => store.closeModal());

  container.querySelectorAll('[data-view-prod]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-view-prod');
      const p = products.find(prod => prod.id === id);
      if (p) {
        store.closeModal();
        store.viewProduct(p);
      }
    });
  });

  container.querySelectorAll('[data-wish-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-wish-add-cart');
      const p = products.find(prod => prod.id === id);
      if (p) {
        store.addToCart(p);
      }
    });
  });

  container.querySelectorAll('[data-wish-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-wish-remove');
      store.toggleWishlist(id);
    });
  });
}
