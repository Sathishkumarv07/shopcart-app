// Porulagam My Account View
import { store } from '../store/state.js';

export function renderAccountView(container) {
  const state = store.getState();
  const user = state.user;
  const isTamil = state.lang === 'ta';

  container.innerHTML = `
    <div class="flex flex-col w-full pb-20 space-y-4 max-w-4xl mx-auto">
      
      <!-- Profile Card -->
      <div class="px-4 sm:px-6 pt-2">
        <div class="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container relative overflow-hidden flex flex-col gap-4">
          <div class="absolute -right-12 -top-12 w-36 h-36 bg-surface-container-high rounded-full blur-2xl opacity-60 pointer-events-none"></div>

          ${user.isLoggedIn ? `
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3.5 min-w-0">
                <div class="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary-container shrink-0">
                  <img 
                    alt="${user.name}" 
                    class="w-full h-full object-cover rounded-full bg-surface-container-low" 
                    src="${user.avatar}"
                  />
                  <span class="absolute bottom-0 right-0 bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    <span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                  </span>
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-headline-sm text-base sm:text-lg text-on-surface font-extrabold truncate">
                      ${isTamil ? user.tamilName : user.name}
                    </span>
                    ${user.authProvider === 'google' ? `
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low border border-outline-variant/40 text-[10px] font-bold text-on-surface">
                        <svg class="w-3 h-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span>Google</span>
                      </span>
                    ` : ''}
                  </div>
                  ${user.phone ? `<span class="font-body-sm text-[13px] text-on-surface-variant truncate">${user.phone}</span>` : ''}
                  ${user.email ? `<span class="font-body-sm text-[11px] text-outline truncate">${user.email}</span>` : ''}
                </div>
              </div>

              <button id="account-edit-profile-btn" class="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 shrink-0 transition-all border border-surface-container cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit</span>
              </button>
            </div>
          ` : `
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3.5 min-w-0">
                <div class="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-outline shrink-0">
                  <span class="material-symbols-outlined text-[28px]">person</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="font-headline-sm text-base sm:text-lg text-on-surface font-extrabold">
                    ${isTamil ? 'வணக்கம், விருந்தினர்!' : 'Hello, Guest Shopper!'}
                  </span>
                  <span class="font-body-sm text-[12px] text-on-surface-variant">
                    ${isTamil ? 'ஆர்டர்கள் மற்றும் சலுகைகளைக் கண்காணிக்க உள்நுழையவும்.' : 'Sign in to track orders, save wishlist, and use coupons.'}
                  </span>
                </div>
              </div>
              <button id="account-card-google-btn" class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          `}

          <!-- Loyalty & Rewards Banner -->
          <div class="bg-gradient-to-r from-tertiary-fixed via-tertiary-fixed-dim/70 to-tertiary-fixed text-on-tertiary-fixed p-3 sm:p-4 rounded-xl flex items-center justify-between relative overflow-hidden shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-container shrink-0">
                <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-1.5">
                  <span class="font-label-md text-label-md font-extrabold tracking-tight text-on-tertiary-fixed">
                    ${isTamil ? 'பொருளகம் பிளஸ் உறுப்பினர்' : 'Porulagam Plus Member'}
                  </span>
                  <span class="px-1.5 py-0.2 rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm text-[9px] font-extrabold">GOLD</span>
                </div>
                <span class="font-body-sm text-[11px] text-on-tertiary-fixed-variant">
                  ${user.superCoins} SuperCoins available • Redeem ₹250 on orders
                </span>
              </div>
            </div>
            <button id="supercoins-btn" class="flex items-center text-tertiary font-label-sm text-[12px] font-bold pl-1 hover:underline shrink-0">
              Benefits <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Action Grid -->
      <div class="px-4 sm:px-6">
        <div class="grid grid-cols-4 gap-2 sm:gap-3">
          <!-- Orders -->
          <button id="quick-orders-btn" class="bg-surface-container-lowest border border-surface-container p-3 rounded-2xl flex flex-col items-center text-center shadow-xs hover:bg-surface-container-low transition-colors group">
            <div class="relative w-11 h-11 rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">local_shipping</span>
              <span class="absolute -top-1 -right-1 bg-primary text-on-primary font-label-sm text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">2</span>
            </div>
            <span class="font-label-sm text-[11px] sm:text-[12px] text-on-surface font-semibold">Orders</span>
            <span class="font-body-sm text-[10px] text-outline">2 active</span>
          </button>

          <!-- Wishlist -->
          <button id="quick-wishlist-btn" class="bg-surface-container-lowest border border-surface-container p-3 rounded-2xl flex flex-col items-center text-center shadow-xs hover:bg-surface-container-low transition-colors group">
            <div class="w-11 h-11 rounded-full bg-surface-container-low text-error flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
            </div>
            <span class="font-label-sm text-[11px] sm:text-[12px] text-on-surface font-semibold">Wishlist</span>
            <span class="font-body-sm text-[10px] text-outline">${state.wishlist.size} items</span>
          </button>

          <!-- Coupons -->
          <button id="quick-coupons-btn" class="bg-surface-container-lowest border border-surface-container p-3 rounded-2xl flex flex-col items-center text-center shadow-xs hover:bg-surface-container-low transition-colors group">
            <div class="w-11 h-11 rounded-full bg-surface-container-low text-tertiary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">redeem</span>
            </div>
            <span class="font-label-sm text-[11px] sm:text-[12px] text-on-surface font-semibold">Coupons</span>
            <span class="font-body-sm text-[10px] text-outline">3 available</span>
          </button>

          <!-- Help Center -->
          <button id="quick-help-btn" class="bg-surface-container-lowest border border-surface-container p-3 rounded-2xl flex flex-col items-center text-center shadow-xs hover:bg-surface-container-low transition-colors group">
            <div class="w-11 h-11 rounded-full bg-surface-container-low text-secondary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">support_agent</span>
            </div>
            <span class="font-label-sm text-[11px] sm:text-[12px] text-on-surface font-semibold">24/7 Care</span>
            <span class="font-body-sm text-[10px] text-outline">Help</span>
          </button>
        </div>
      </div>

      <!-- Account Settings Options List -->
      <div class="px-4 sm:px-6">
        <div class="rounded-2xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-xs divide-y divide-surface-container">
          
          <!-- Saved Addresses -->
          <button id="settings-address-btn" class="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-[22px]">home_pin</span>
              <div>
                <span class="font-label-md text-label-md text-on-surface font-semibold block">Saved Addresses</span>
                <span class="font-body-sm text-[11px] text-on-surface-variant">Home (Bengaluru 560103), Office (Chennai 600001)</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </button>

          <!-- Payment Methods -->
          <button id="settings-cards-btn" class="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-[22px]">credit_card</span>
              <div>
                <span class="font-label-md text-label-md text-on-surface font-semibold block">Payment Modes & Saved Cards</span>
                <span class="font-body-sm text-[11px] text-on-surface-variant">HDFC Regalia Visa (•• 8912), Google Pay UPI</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </button>

          <!-- Language Preference -->
          <button id="settings-lang-btn" class="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-[22px]">translate</span>
              <div>
                <span class="font-label-md text-label-md text-on-surface font-semibold block">Language / மொழி</span>
                <span class="font-body-sm text-[11px] text-primary font-bold">
                  ${isTamil ? 'தமிழ் (செயலில் உள்ளது)' : 'English (Active)'}
                </span>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline text-[20px]">swap_horiz</span>
          </button>

          <!-- Notifications -->
          <button id="settings-notifications-btn" class="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-[22px]">notifications</span>
              <div>
                <span class="font-label-md text-label-md text-on-surface font-semibold block">Notifications & Alerts</span>
                <span class="font-body-sm text-[11px] text-on-surface-variant">WhatsApp alerts, SMS, Order Tracking</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </button>

          <!-- Desktop App -->
          <button id="settings-desktop-app-btn" class="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors bg-primary/5 border-t border-b border-primary/10">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0">
                <span class="material-symbols-outlined text-[18px]">desktop_windows</span>
              </div>
              <div>
                <span class="font-label-md text-label-md text-primary font-bold block">
                  ${isTamil ? 'டெஸ்க்டாப் செயலியாக நிறுவவும்' : 'Install Desktop Application'}
                </span>
                <span class="font-body-sm text-[11px] text-on-surface-variant">
                  ${isTamil ? 'விண்டோஸ் கணினியில் தனியாக இயக்கலாம்' : 'Launch as a standalone borderless Windows Desktop App'}
                </span>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] font-bold">PWA App</span>
          </button>

          <!-- Security & Privacy -->
          <button id="settings-security-btn" class="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-[22px]">security</span>
              <div>
                <span class="font-label-md text-label-md text-on-surface font-semibold block">Login Security & Password</span>
                <span class="font-body-sm text-[11px] text-on-surface-variant">Biometrics & 2-Factor OTP verification enabled</span>
              </div>
            </div>
            <span class="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </button>

          <!-- Login / Logout Action -->
          <div class="p-4 flex items-center justify-between bg-surface-container-low/50">
            ${user.isLoggedIn ? `
              <button id="account-logout-btn" class="w-full py-2.5 rounded-xl border border-error/30 text-error hover:bg-error/10 font-label-md text-label-md font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-[18px]">logout</span>
                <span>${isTamil ? 'வெளியேறு (Logout)' : 'Logout of Account'}</span>
              </button>
            ` : `
              <button id="account-login-btn" class="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[18px]">login</span>
                <span>${isTamil ? 'உள்நுழையவும் (Login)' : 'Sign In / Register'}</span>
              </button>
            `}
          </div>

        </div>
      </div>

    </div>
  `;

  // Quick buttons
  container.querySelector('#quick-orders-btn')?.addEventListener('click', () => store.setView('orders'));
  container.querySelector('#quick-wishlist-btn')?.addEventListener('click', () => store.openModal('wishlist'));
  container.querySelector('#quick-coupons-btn')?.addEventListener('click', () => store.setView('deals'));
  container.querySelector('#quick-help-btn')?.addEventListener('click', () => {
    store.showToast('24/7 Porulagam Care: Toll-free 1800-419-0155', 'info');
  });

  // Settings
  container.querySelector('#settings-address-btn')?.addEventListener('click', () => {
    store.openModal('location');
  });

  container.querySelector('#settings-cards-btn')?.addEventListener('click', () => {
    store.showToast('Saved Card: HDFC Regalia Visa Ending 8912', 'info');
  });

  container.querySelector('#settings-lang-btn')?.addEventListener('click', () => {
    store.toggleLanguage();
  });

  container.querySelector('#settings-notifications-btn')?.addEventListener('click', () => {
    store.showToast('Notification preferences are up to date.', 'info');
  });

  container.querySelector('#settings-security-btn')?.addEventListener('click', () => {
    store.openModal('auth');
  });

  // Desktop App install button
  container.querySelector('#settings-desktop-app-btn')?.addEventListener('click', () => {
    if (window.__pwaInstallPrompt) {
      window.__pwaInstallPrompt.prompt();
    } else {
      store.showToast('To add to desktop: Click "Install" (⊕ icon) in your browser address bar!', 'info');
    }
  });

  container.querySelector('#supercoins-btn')?.addEventListener('click', () => {
    store.showToast('You have 240 SuperCoins worth ₹240 direct savings!', 'success');
  });

  container.querySelector('#account-edit-profile-btn')?.addEventListener('click', () => {
    store.showToast(`Profile editing for ${user.name}`, 'info');
  });

  container.querySelector('#account-card-google-btn')?.addEventListener('click', () => {
    store.openModal('auth');
  });

  // Auth triggers
  container.querySelector('#account-logout-btn')?.addEventListener('click', () => {
    store.logout();
  });

  container.querySelector('#account-login-btn')?.addEventListener('click', () => {
    store.openModal('auth');
  });
}

