// Porulagam Header Component (with Live Instant Search & Google Auth Integration)
import { store } from '../store/state.js';
import { products } from '../data/products.js';

export function renderHeader(container) {
  const state = store.getState();
  const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.size;
  const isTamil = state.lang === 'ta';
  const isLoggedIn = state.user && state.user.isLoggedIn;

  // Preserve search focus & cursor if user is actively typing
  const activeId = document.activeElement ? document.activeElement.id : null;
  const cursorStart = document.activeElement && 'selectionStart' in document.activeElement ? document.activeElement.selectionStart : null;
  const cursorEnd = document.activeElement && 'selectionEnd' in document.activeElement ? document.activeElement.selectionEnd : null;

  container.innerHTML = `
    <header class="fixed top-0 left-0 w-full z-40 pt-safe bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all">
      <div class="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 py-2">
        <!-- Top Row -->
        <div class="flex items-center justify-between gap-2 sm:gap-4 h-12">
          <!-- Logo & Location Badge -->
          <div class="flex items-center gap-2 sm:gap-4">
            <button id="header-logo-btn" class="flex items-center gap-2 group focus:outline-none transition-transform active:scale-95 cursor-pointer" aria-label="Go to Home">
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
            <button id="header-location-btn" class="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-primary transition-all border border-outline-variant/30 text-left cursor-pointer">
              <span class="material-symbols-outlined text-[16px] text-primary shrink-0" style="font-variation-settings: 'FILL' 1;">location_on</span>
              <span class="font-label-sm text-label-sm text-on-surface truncate max-w-[120px] sm:max-w-[170px] font-medium">
                ${state.pincode}
              </span>
              <span class="material-symbols-outlined text-[14px] text-on-surface-variant shrink-0">expand_more</span>
            </button>
          </div>

          <!-- Desktop Search Bar In Center (with Live Suggestions) -->
          <div class="hidden md:flex items-center flex-1 max-w-xl mx-4 relative" id="desktop-search-wrapper">
            <div class="relative w-full">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline pointer-events-none">search</span>
              <input 
                id="desktop-search-input"
                type="text" 
                placeholder="${isTamil ? 'பொருட்கள், பிராண்டுகள் மற்றும் வகைகளைத் தேடவும்...' : 'Search for products, brands, smart gadgets and more...'}"
                value="${state.searchQuery || ''}"
                autocomplete="off"
                class="w-full h-10 pl-10 pr-24 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15 transition-all outline-none"
              />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                ${state.searchQuery ? `
                  <button id="clear-desktop-search" class="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer" title="Clear">
                    <span class="material-symbols-outlined text-[16px]">close</span>
                  </button>
                ` : ''}
                <button id="voice-search-btn-desktop" class="w-7 h-7 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer" title="Voice Search">
                  <span class="material-symbols-outlined text-[18px]">mic</span>
                </button>
                <button id="visual-search-btn-desktop" class="w-7 h-7 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer" title="Visual Search">
                  <span class="material-symbols-outlined text-[18px]">photo_camera</span>
                </button>
              </div>
            </div>

            <!-- Instant Search Suggestions Dropdown -->
            <div id="desktop-search-dropdown" class="hidden absolute top-full left-0 right-0 mt-1.5 bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden z-50 animate-scale">
            </div>
          </div>

          <!-- Action Buttons: Desktop App, Language, Wishlist, Cart, Profile -->
          <div class="flex items-center gap-1 sm:gap-2">
            <!-- Desktop App Install Icon -->
            <button id="header-install-app-btn" class="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-label-sm text-xs font-bold transition-all border border-primary/20 cursor-pointer" title="Install Desktop App">
              <span class="material-symbols-outlined text-[16px]">desktop_windows</span>
              <span>${isTamil ? 'செயலி' : 'Desktop App'}</span>
            </button>

            <!-- Language Switcher Pill -->
            <button id="header-lang-btn" class="h-9 px-2.5 sm:px-3 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 transition-all border border-outline-variant/30 cursor-pointer" title="Switch Language">
              <span class="material-symbols-outlined text-[16px]">translate</span>
              <span class="text-[12px]">${isTamil ? 'தமிழ்' : 'EN'}</span>
            </button>

            <!-- Wishlist Button -->
            <button id="header-wishlist-btn" class="relative w-10 h-10 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors cursor-pointer" aria-label="Wishlist">
              <span class="material-symbols-outlined text-[24px]">favorite</span>
              ${wishlistCount > 0 ? `
                <span class="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-error text-on-error font-label-sm text-[10px] rounded-full flex items-center justify-center font-bold leading-none animate-scale">
                  ${wishlistCount}
                </span>
              ` : ''}
            </button>

            <!-- Cart Button -->
            <button id="header-cart-btn" class="relative w-10 h-10 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors cursor-pointer" aria-label="Cart">
              <span class="material-symbols-outlined text-[24px]">shopping_cart</span>
              ${totalCartCount > 0 ? `
                <span class="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-primary text-on-primary font-label-sm text-[10px] rounded-full flex items-center justify-center font-bold leading-none animate-bounce">
                  ${totalCartCount}
                </span>
              ` : ''}
            </button>

            <!-- Profile / Avatar Button -->
            ${isLoggedIn ? `
              <button id="header-profile-btn" class="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-surface-container transition-colors focus:outline-none cursor-pointer" aria-label="My Account">
                <img 
                  src="${state.user.avatar}" 
                  alt="${state.user.name}" 
                  class="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                />
                <span class="hidden lg:block font-label-sm text-label-sm text-on-surface font-semibold max-w-[90px] truncate">
                  ${state.user.name.split(' ')[0]}
                </span>
              </button>
            ` : `
              <button id="header-login-btn" class="h-9 px-3.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-sm text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">login</span>
                <span>${isTamil ? 'உள்நுழைக' : 'Sign In'}</span>
              </button>
            `}
          </div>
        </div>

        <!-- Mobile Search Bar (Row 2 with Suggestions) -->
        <div class="flex md:hidden mt-2 pb-1 relative" id="mobile-search-wrapper">
          <div class="relative w-full">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline pointer-events-none">search</span>
            <input 
              id="mobile-search-input"
              type="text" 
              placeholder="${isTamil ? 'பொருட்கள், பிராண்டுகள் தேடவும்...' : 'Search for products, brands...'}"
              value="${state.searchQuery || ''}"
              autocomplete="off"
              class="w-full h-10 pl-9 pr-20 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline border border-transparent focus:border-primary focus:bg-surface-container-lowest outline-none"
            />
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
              ${state.searchQuery ? `
                <button id="clear-mobile-search" class="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-on-surface cursor-pointer" title="Clear">
                  <span class="material-symbols-outlined text-[15px]">close</span>
                </button>
              ` : ''}
              <button id="voice-search-btn-mobile" class="w-7 h-7 flex items-center justify-center text-primary cursor-pointer" title="Voice Search">
                <span class="material-symbols-outlined text-[17px]">mic</span>
              </button>
              <button id="visual-search-btn-mobile" class="w-7 h-7 flex items-center justify-center text-primary cursor-pointer" title="Visual Search">
                <span class="material-symbols-outlined text-[17px]">photo_camera</span>
              </button>
            </div>
          </div>
          <!-- Mobile Dropdown -->
          <div id="mobile-search-dropdown" class="hidden absolute top-full left-0 right-0 mt-1.5 bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden z-50 animate-scale">
          </div>
        </div>
      </div>
    </header>
  `;

  // Restore focus if needed
  if (activeId && (activeId === 'desktop-search-input' || activeId === 'mobile-search-input')) {
    const el = container.querySelector('#' + activeId);
    if (el) {
      el.focus();
      if (cursorStart !== null && cursorEnd !== null) {
        try { el.setSelectionRange(cursorStart, cursorEnd); } catch (e) {}
      }
    }
  }

  // --- Attach Event Listeners ---
  const logoBtn = container.querySelector('#header-logo-btn');
  if (logoBtn) logoBtn.addEventListener('click', () => {
    store.clearSearch();
    store.setView('home');
  });

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

  const loginBtn = container.querySelector('#header-login-btn');
  if (loginBtn) loginBtn.addEventListener('click', () => store.openModal('auth'));

  // Desktop App install button
  const installAppBtn = container.querySelector('#header-install-app-btn');
  if (installAppBtn) {
    installAppBtn.addEventListener('click', () => {
      if (window.__pwaInstallPrompt) {
        window.__pwaInstallPrompt.prompt();
      } else {
        store.showToast('To add to Desktop: Click the Install (⊕) icon in your browser address bar or use Edge/Chrome App settings.', 'info');
      }
    });
  }

  // --- Instant Product Search Logic ---
  function getMatchingProducts(query) {
    if (!query || query.trim() === '') return [];
    const q = query.trim().toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
      (p.tamilName && p.tamilName.includes(q))
    ).slice(0, 5);
  }

  function renderSearchDropdown(dropdownEl, query) {
    if (!dropdownEl) return;
    const matches = getMatchingProducts(query);
    if (!query || query.trim().length === 0) {
      dropdownEl.classList.add('hidden');
      dropdownEl.innerHTML = '';
      return;
    }

    if (matches.length === 0) {
      dropdownEl.innerHTML = `
        <div class="p-4 text-center">
          <p class="font-body-sm text-xs text-on-surface-variant">No direct product matches for "${query}"</p>
          <button id="dropdown-view-all-btn" class="mt-2 text-primary font-label-sm text-xs font-bold hover:underline cursor-pointer">
            Press Enter to search full catalog →
          </button>
        </div>
      `;
    } else {
      dropdownEl.innerHTML = `
        <div class="py-2">
          <div class="px-3 pb-1.5 flex items-center justify-between border-b border-surface-container">
            <span class="font-label-sm text-[11px] text-outline uppercase font-bold tracking-wider">Matching Products (${matches.length})</span>
            <span class="text-[10px] text-primary font-semibold">Instant Results</span>
          </div>
          <div class="divide-y divide-surface-container">
            ${matches.map(p => `
              <div 
                data-search-prod-id="${p.id}"
                class="search-suggestion-item p-2.5 flex items-center gap-3 hover:bg-surface-container-low transition-colors cursor-pointer group"
              >
                <img src="${p.mainImage}" alt="${p.name}" class="w-10 h-10 object-contain rounded-lg bg-surface-container-lowest border border-surface-container p-0.5 shrink-0" />
                <div class="flex-1 min-w-0 text-left">
                  <div class="font-label-md text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                    ${p.name}
                  </div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="font-price-md text-xs font-black text-primary">₹${p.price.toLocaleString('en-IN')}</span>
                    ${p.discountPercent ? `<span class="px-1.5 py-0.2 rounded bg-secondary/10 text-secondary text-[10px] font-bold">${p.discountPercent}% OFF</span>` : ''}
                    <span class="text-[10px] text-outline truncate">${p.brand}</span>
                  </div>
                </div>
                <span class="material-symbols-outlined text-[18px] text-outline group-hover:text-primary shrink-0">chevron_right</span>
              </div>
            `).join('')}
          </div>
          <div class="p-2 border-t border-surface-container bg-surface-container-low/40 text-center">
            <button id="dropdown-view-all-btn" class="w-full py-1.5 text-center text-primary font-label-sm text-xs font-bold hover:underline cursor-pointer">
              View all results for "${query}" →
            </button>
          </div>
        </div>
      `;
    }

    dropdownEl.classList.remove('hidden');

    // Attach click to suggestions
    dropdownEl.querySelectorAll('[data-search-prod-id]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = item.getAttribute('data-search-prod-id');
        const prod = products.find(p => p.id === pid);
        if (prod) {
          dropdownEl.classList.add('hidden');
          store.viewProduct(prod);
        }
      });
    });

    dropdownEl.querySelector('#dropdown-view-all-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownEl.classList.add('hidden');
      store.setSearch(query);
    });
  }

  // Setup desktop search
  const desktopSearch = container.querySelector('#desktop-search-input');
  const desktopDropdown = container.querySelector('#desktop-search-dropdown');
  if (desktopSearch) {
    desktopSearch.addEventListener('input', (e) => {
      renderSearchDropdown(desktopDropdown, e.target.value);
    });

    desktopSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (desktopDropdown) desktopDropdown.classList.add('hidden');
        store.setSearch(e.target.value);
      } else if (e.key === 'Escape') {
        if (desktopDropdown) desktopDropdown.classList.add('hidden');
      }
    });

    desktopSearch.addEventListener('focus', (e) => {
      if (e.target.value) renderSearchDropdown(desktopDropdown, e.target.value);
    });
  }

  // Setup mobile search
  const mobileSearch = container.querySelector('#mobile-search-input');
  const mobileDropdown = container.querySelector('#mobile-search-dropdown');
  if (mobileSearch) {
    mobileSearch.addEventListener('input', (e) => {
      renderSearchDropdown(mobileDropdown, e.target.value);
    });

    mobileSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (mobileDropdown) mobileDropdown.classList.add('hidden');
        store.setSearch(e.target.value);
      } else if (e.key === 'Escape') {
        if (mobileDropdown) mobileDropdown.classList.add('hidden');
      }
    });

    mobileSearch.addEventListener('focus', (e) => {
      if (e.target.value) renderSearchDropdown(mobileDropdown, e.target.value);
    });
  }

  // Clear search buttons
  container.querySelector('#clear-desktop-search')?.addEventListener('click', (e) => {
    e.stopPropagation();
    store.clearSearch();
    if (desktopDropdown) desktopDropdown.classList.add('hidden');
  });

  container.querySelector('#clear-mobile-search')?.addEventListener('click', (e) => {
    e.stopPropagation();
    store.clearSearch();
    if (mobileDropdown) mobileDropdown.classList.add('hidden');
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#desktop-search-wrapper') && desktopDropdown) {
      desktopDropdown.classList.add('hidden');
    }
    if (!e.target.closest('#mobile-search-wrapper') && mobileDropdown) {
      mobileDropdown.classList.add('hidden');
    }
  });

  // Voice Search animation
  const voiceBtns = container.querySelectorAll('#voice-search-btn-desktop, #voice-search-btn-mobile');
  voiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      store.showToast('Listening... Speak product name now', 'info');
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
