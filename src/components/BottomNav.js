// Porulagam Bottom Navigation Component
import { store } from '../store/state.js';

export function renderBottomNav(container) {
  const state = store.getState();
  const current = state.currentView;

  const tabs = [
    { id: 'home', label: 'Home', tamilLabel: 'முகப்பு', icon: 'home' },
    { id: 'categories', label: 'Categories', tamilLabel: 'பிரிவுகள்', icon: 'grid_view' },
    { id: 'deals', label: 'Deals', tamilLabel: 'சலுகைகள்', icon: 'local_offer' },
    { id: 'orders', label: 'Orders', tamilLabel: 'ஆர்டர்கள்', icon: 'receipt_long' },
    { id: 'account', label: 'Account', tamilLabel: 'கணக்கு', icon: 'manage_accounts' }
  ];

  const isTamil = state.lang === 'ta';

  container.innerHTML = `
    <nav class="fixed bottom-0 left-0 w-full z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-2px_12px_rgba(15,23,42,0.05)] transition-all">
      <div class="max-w-md md:max-w-xl mx-auto flex items-center justify-around h-16 px-2">
        ${tabs.map(tab => {
          const isActive = current === tab.id;
          return `
            <button 
              data-nav-tab="${tab.id}"
              class="flex flex-col items-center justify-center flex-1 h-14 py-1 rounded-xl transition-all select-none relative group ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
              }"
            >
              ${isActive ? `
                <div class="absolute top-1 w-8 h-1 bg-primary rounded-full"></div>
              ` : ''}
              <div class="relative flex items-center justify-center w-10 h-7 ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform">
                <span 
                  class="material-symbols-outlined text-[24px]"
                  style="font-variation-settings: 'FILL' ${isActive ? 1 : 0};"
                >
                  ${tab.icon}
                </span>
                ${tab.id === 'orders' && state.orders.filter(o => o.status === 'transit').length > 0 ? `
                  <span class="absolute top-0 right-1 w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span class="absolute top-0 right-1 w-2 h-2 rounded-full bg-primary"></span>
                ` : ''}
              </div>
              <span class="font-label-sm text-[11px] sm:text-[12px] leading-none mt-0.5 tracking-tight">
                ${isTamil ? tab.tamilLabel : tab.label}
              </span>
            </button>
          `;
        }).join('')}
      </div>
    </nav>
  `;

  // Attach click listeners to tabs
  const tabButtons = container.querySelectorAll('[data-nav-tab]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-nav-tab');
      store.setView(tabId);
    });
  });
}
