// Porulagam Header Component
import { store } from '../store/state.js';

export function renderHeader(container) {
  const state = store.getState();
  const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.size;

  const isTamil = state.lang === 'ta';

  container.innerHTML = `
    <header class="fixed top-0 left-0 w-full z-40 pt-safe bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all">
      <div class="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 py-2">
        <!-- Top Row -->
        <div class="flex items-center justify-between gap-2 sm:gap-4 h-12">
          <!-- Logo & Location Badge -->
          <div class="flex items-center gap-2 sm:gap-4">
            <button id="header-logo-btn" class="flex items-center gap-2 group focus:outline-none transition-transform active:scale-95" aria-label="Go to Home">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm shadow-primary/30 group-hover:bg-primary-container transition-colors">
                <span class="material-symbols-outlined text-[24px]">shopping_bag</span>
              </div>
              <div class="flex flex-col text-left">
                <span class="font-display-hero text-xl sm:text-2xl font-black text-primary tracking-tight leading-none">
                  பொருளகம்
                </span>
                <span class="font-label-sm text-[10px] sm:text-[11px] text-on-surface-variant font-semibold tracking-wider uppercase -mt-0.5">
                  Porulagam
                </span>
              </div>
            </button>

            <!-- Delivery Location Chip -->
            <button id="header-location-btn" class="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-primary transition-all border border-outline-variant/30 text-left">
              <span class="material-symbols-outlined text-[16px] text-primary shrink-0" style="font-variation-settings: 'FILL' 1;">location_on</span>
              <span class="font-label-sm text-label-sm text-on-surface truncate max-w-[130px] sm:max-w-[180px] font-medium">
                ${state.pincode}
              </span>
              <span class="material-symbols-outlined text-[14px] text-on-surface-variant shrink-0">expand_more</span>
            </button>
          </div>

          <!-- Desktop Search Bar In Center -->
          <div class="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <div class="relative w-full">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline">search</span>
              <input 
                id="desktop-search-input"
                type="text" 
                placeholder="${isTamil ? 'பொருட்கள், பிராண்டுகள் மற்றும் வகைகளைத் தேடவும்...' : 'Search for products, brands, smart gadgets and more...'}"
                value="${state.searchQuery || ''}"
                class="w-full h-10 pl-10 pr-24 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-all outline-none"
              />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button id="voice-search-btn-desktop" class="w-7 h-7 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container transition-colors" title="Voice Search">
                  <span class="material-symbols-outlined text-[18px]">mic</span>
                </button>
                <button id="visual-search-btn-desktop" class="w-7 h-7 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container transition-colors" title="Visual Search">
                  <span class="material-symbols-outlined text-[18px]">photo_camera</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Action Buttons: Language, Wishlist, Cart, Profile -->
          <div class="flex items-center gap-1 sm:gap-2">
            <!-- Language Switcher Pill -->
            <button id="header-lang-btn" class="h-9 px-2.5 sm:px-3 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 transition-all border border-outline-variant/30" title="Switch Language">
              <span class="material-symbols-outlined text-[16px]">translate</span>
              <span class="text-[12px]">${isTamil ? 'தமிழ்' : 'EN'}</span>
            </button>

            <!-- Wishlist Button -->
            <button id="header-wishlist-btn" class="relative w-10 h-10 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors" aria-label="Wishlist">
              <span class="material-symbols-outlined text-[24px]">favorite</span>
              ${wishlistCount > 0 ? `
                <span class="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-error text-on-error font-label-sm text-[10px] rounded-full flex items-center justify-center font-bold leading-none animate-scale">
                  ${wishlistCount}
                </span>
              ` : ''}
            </button>

            <!-- Cart Button -->
            <button id="header-cart-btn" class="relative w-10 h-10 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors" aria-label="Cart">
              <span class="material-symbols-outlined text-[24px]">shopping_cart</span>
              ${totalCartCount > 0 ? `
                <span class="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-primary text-on-primary font-label-sm text-[10px] rounded-full flex items-center justify-center font-bold leading-none animate-bounce">
                  ${totalCartCount}
                </span>
              ` : ''}
            </button>

            <!-- Profile / Avatar Button -->
            <button id="header-profile-btn" class="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-surface-container transition-colors focus:outline-none" aria-label="My Account">
              <img 
                src="${state.user.avatar}" 
                alt="${state.user.name}" 
                class="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              />
              <span class="hidden lg:block font-label-sm text-label-sm text-on-surface font-semibold max-w-[90px] truncate">
                ${state.user.name.split(' ')[0]}
              </span>
            </button>
          </div>
        </div>

        <!-- Mobile Search Bar (Row 2) -->
        <div class="flex md:hidden mt-2 pb-1">
          <div class="relative w-full">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline">search</span>
            <input 
              id="mobile-search-input"
              type="text" 
              placeholder="${isTamil ? 'பொருட்கள், பிராண்டுகள் தேடவும்...' : 'Search for products, brands...'}"
              value="${state.searchQuery || ''}"
              class="w-full h-10 pl-9 pr-20 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline border border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none"
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
              <button id="voice-search-btn-mobile" class="w-7 h-7 flex items-center justify-center text-primary" title="Voice Search">
                <span class="material-symbols-outlined text-[17px]">mic</span>
              </button>
              <button id="visual-search-btn-mobile" class="w-7 h-7 flex items-center justify-center text-primary" title="Visual Search">
                <span class="material-symbols-outlined text-[17px]">photo_camera</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  // Attach Event Listeners
  const logoBtn = container.querySelector('#header-logo-btn');
  if (logoBtn) logoBtn.addEventListener('click', () => store.setView('home'));

  const locationBtn = container.querySelector('#header-location-btn');
  if (locationBtn) locationBtn.addEventListener('click', () => store.openModal('location'));

  const langBtn = container.querySelector('#header-lang-btn');
  if (langBtn) langBtn.addEventListener('click', () => store.toggleLanguage());

  const cartBtn = container.querySelector('#header-cart-btn');
  if (cartBtn) cartBtn.addEventListener('click', () => store.openModal('cart'));

  const wishlistBtn = container.querySelector('#header-wishlist-btn');
  if (wishlistBtn) wishlistBtn.addEventListener('click', () => store.openModal('wishlist'));

  const profileBtn = container.querySelector('#header-profile-btn');
  if (profileBtn) profileBtn.addEventListener('click', () => store.setView('account'));

  // Search input listeners
  const handleSearch = (e) => {
    store.setSearch(e.target.value);
  };
  const desktopSearch = container.querySelector('#desktop-search-input');
  if (desktopSearch) {
    desktopSearch.addEventListener('input', handleSearch);
  }
  const mobileSearch = container.querySelector('#mobile-search-input');
  if (mobileSearch) {
    mobileSearch.addEventListener('input', handleSearch);
  }

  // Voice Search animation
  const voiceBtns = container.querySelectorAll('#voice-search-btn-desktop, #voice-search-btn-mobile');
  voiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      store.showToast('Listening... Speak now', 'info');
      btn.classList.add('animate-ping');
      setTimeout(() => btn.classList.remove('animate-ping'), 1000);
    });
  });

  // Visual Search simulation
  const visualBtns = container.querySelectorAll('#visual-search-btn-desktop, #visual-search-btn-mobile');
  visualBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      store.showToast('Camera search ready! Point camera at product', 'info');
    });
  });
}
