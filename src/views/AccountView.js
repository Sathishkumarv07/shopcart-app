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
                <div class="flex items-center gap-1.5">
                  <span class="font-headline-sm text-base sm:text-lg text-on-surface font-extrabold truncate">
                    ${isTamil ? user.tamilName : user.name}
                  </span>
                </div>
                <span class="font-body-sm text-[13px] text-on-surface-variant truncate">${user.phone}</span>
                <span class="font-body-sm text-[11px] text-outline truncate">${user.email}</span>
              </div>
            </div>

            <button id="account-edit-profile-btn" class="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 shrink-0 transition-all border border-surface-container">
              <span class="material-symbols-outlined text-[16px]">edit</span>
              <span>Edit</span>
            </button>
          </div>

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
              <button id="account-logout-btn" class="w-full py-2.5 rounded-xl border border-error/30 text-error hover:bg-error/10 font-label-md text-label-md font-bold transition-colors flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">logout</span>
                <span>${isTamil ? 'வெளியேறு (Logout)' : 'Logout of Account'}</span>
              </button>
            ` : `
              <button id="account-login-btn" class="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all">
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

  container.querySelector('#supercoins-btn')?.addEventListener('click', () => {
    store.showToast('You have 240 SuperCoins worth ₹240 direct savings!', 'success');
  });

  container.querySelector('#account-edit-profile-btn')?.addEventListener('click', () => {
    store.showToast('Profile editing enabled for Ananya Krishnan', 'info');
  });

  // Auth triggers
  container.querySelector('#account-logout-btn')?.addEventListener('click', () => {
    store.logout();
  });

  container.querySelector('#account-login-btn')?.addEventListener('click', () => {
    store.openModal('auth');
  });
}
