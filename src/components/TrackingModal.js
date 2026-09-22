// Porulagam Live Order Tracking Modal Component
import { store } from '../store/state.js';

export function renderTrackingModal(container) {
  const state = store.getState();
  if (state.activeModal !== 'tracking' || !state.trackingOrder) {
    container.innerHTML = '';
    return;
  }

  const order = state.trackingOrder;
  const isTamil = state.lang === 'ta';

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div id="track-backdrop" class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"></div>

      <div class="relative w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container animate-scale max-h-[90vh] overflow-y-auto">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-surface-container">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                ${isTamil ? 'நேரடி கண்காணிப்பு' : 'Live Order Tracking'}
              </h3>
            </div>
            <span class="font-body-sm text-[12px] text-outline mt-0.5">Order #${order.id} • ${order.courier}</span>
          </div>
          <button id="close-track-btn" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Product Summary Box -->
        <div class="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center gap-3">
          <img 
            src="${order.item.image}" 
            alt="${order.item.name}" 
            class="w-14 h-14 rounded-lg object-contain bg-surface-container-lowest p-1"
          />
          <div class="flex-1 min-w-0">
            <h4 class="font-label-md text-label-md text-on-surface font-bold truncate">${order.item.name}</h4>
            <p class="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
              Tracking ID: <span class="font-mono font-semibold">${order.trackingNumber}</span>
            </p>
            <span class="inline-block px-2 py-0.5 mt-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold">
              ${order.deliveryDate}
            </span>
          </div>
        </div>

        <!-- Timeline Stepper -->
        <div class="mt-6 pl-2 space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
          ${order.steps.map((step, idx) => `
            <div class="relative flex items-start gap-4">
              <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                step.done 
                  ? 'bg-primary text-on-primary shadow-sm shadow-primary/30' 
                  : 'bg-surface-container text-outline'
              } ${step.current ? 'ring-4 ring-primary/20 animate-pulse' : ''}">
                <span class="material-symbols-outlined text-[16px]">
                  ${step.done ? 'check' : 'radio_button_unchecked'}
                </span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-md text-label-md font-bold ${step.done ? 'text-on-surface' : 'text-outline'}">
                  ${step.title}
                </span>
                <span class="font-body-sm text-[11px] text-on-surface-variant mt-0.5">${step.time}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Delivery Address info -->
        <div class="mt-6 pt-4 border-t border-surface-container">
          <span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold block mb-1">
            Delivery Address
          </span>
          <p class="font-body-sm text-body-sm text-on-surface">${order.address}</p>
        </div>

        <!-- Help buttons -->
        <div class="mt-5 flex gap-2">
          <button id="call-driver-btn" class="flex-1 py-2.5 rounded-xl bg-surface-container-low text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5">
            <span class="material-symbols-outlined text-[18px]">call</span> Call Courier Agent
          </button>
          <button id="track-help-btn" class="px-4 py-2.5 rounded-xl border border-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors">
            Help
          </button>
        </div>

      </div>
    </div>
  `;

  const closeBtn = container.querySelector('#close-track-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => store.closeModal());

  const backdrop = container.querySelector('#track-backdrop');
  if (backdrop) backdrop.addEventListener('click', () => store.closeModal());

  const callBtn = container.querySelector('#call-driver-btn');
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      store.showToast('Connecting you with Porulagam Express Delivery Executive...', 'info');
    });
  }

  const helpBtn = container.querySelector('#track-help-btn');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      store.showToast('Support ticket #TRK-9921 initiated with 24/7 Care.', 'info');
    });
  }
}
