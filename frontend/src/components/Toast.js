// Porulagam Toast Notification Component
import { store } from '../store/state.js';

export function renderToast(container) {
  const state = store.getState();
  if (!state.toast) {
    container.innerHTML = '';
    return;
  }

  const { message, type } = state.toast;

  let icon = 'info';
  let badgeColor = 'bg-primary text-on-primary';

  if (type === 'success') {
    icon = 'check_circle';
    badgeColor = 'bg-secondary text-on-secondary';
  } else if (type === 'error') {
    icon = 'error';
    badgeColor = 'bg-error text-on-error';
  }

  container.innerHTML = `
    <div class="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div class="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-inverse-surface text-inverse-on-surface shadow-2xl shadow-black/20 border border-outline-variant/20 animate-slide-up pointer-events-auto max-w-sm sm:max-w-md">
        <div class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${badgeColor}">
          <span class="material-symbols-outlined text-[16px]">${icon}</span>
        </div>
        <span class="font-label-md text-label-md leading-tight text-white">${message}</span>
      </div>
    </div>
  `;
}
