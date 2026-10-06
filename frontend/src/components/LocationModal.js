// Porulagam Delivery Location & Pincode Selector
import { store } from '../store/state.js';

export function renderLocationModal(container) {
  const state = store.getState();
  if (state.activeModal !== 'location') {
    container.innerHTML = '';
    return;
  }

  const isTamil = state.lang === 'ta';

  const commonLocations = [
    { city: 'Bengaluru', pincode: '560001', state: 'Karnataka' },
    { city: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
    { city: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu' },
    { city: 'Madurai', pincode: '625001', state: 'Tamil Nadu' },
    { city: 'Tiruchirappalli', pincode: '620001', state: 'Tamil Nadu' },
    { city: 'Hyderabad', pincode: '500001', state: 'Telangana' },
    { city: 'Mumbai', pincode: '400001', state: 'Maharashtra' }
  ];

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div id="location-backdrop" class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"></div>

      <div class="relative w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container animate-scale">
        <div class="flex items-center justify-between pb-3 border-b border-surface-container">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[24px]">location_on</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
              ${isTamil ? 'டெலிவரி இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்' : 'Choose Delivery Location'}
            </h3>
          </div>
          <button id="close-location-btn" class="text-on-surface-variant hover:text-on-surface p-1">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div class="mt-4 space-y-4">
          <p class="font-body-sm text-body-sm text-on-surface-variant">
            ${isTamil ? 'உங்கள் பகுதியில் விரைவு டெலிவரி மற்றும் தயாரிப்பு கிடைக்கும் தன்மையைக் காண அஞ்சல் குறியீட்டை உள்ளிடவும்.' : 'Enter your 6-digit delivery pincode to check instant delivery options and availability.'}
          </p>

          <div class="flex gap-2">
            <input 
              id="pincode-input"
              type="text" 
              maxlength="6"
              placeholder="Enter 6-digit pincode" 
              class="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/40 focus:border-primary outline-none"
            />
            <button id="apply-pincode-btn" class="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold active:scale-95 transition-all">
              Apply
            </button>
          </div>

          <div>
            <span class="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold block mb-2">
              Popular Cities
            </span>
            <div class="grid grid-cols-2 gap-2">
              ${commonLocations.map(loc => `
                <button 
                  data-select-pincode="${loc.pincode} - ${loc.city}"
                  class="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-left transition-colors border border-surface-container flex flex-col"
                >
                  <span class="font-label-md text-label-md text-on-surface font-semibold">${loc.city}</span>
                  <span class="font-body-sm text-[11px] text-primary font-bold">${loc.pincode}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const closeBtn = container.querySelector('#close-location-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => store.closeModal());

  const backdrop = container.querySelector('#location-backdrop');
  if (backdrop) backdrop.addEventListener('click', () => store.closeModal());

  const applyBtn = container.querySelector('#apply-pincode-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const input = container.querySelector('#pincode-input');
      if (input && input.value && input.value.length === 6) {
        store.setPincode(`${input.value} - Area Delivery`);
      } else {
        store.showToast('Please enter a valid 6-digit pincode', 'error');
      }
    });
  }

  container.querySelectorAll('[data-select-pincode]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-select-pincode');
      store.setPincode(val);
    });
  });
}
