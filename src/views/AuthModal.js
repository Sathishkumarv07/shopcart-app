// Porulagam Authentication Modal (Login & OTP Verification)
import { store } from '../store/state.js';

export function renderAuthModal(container) {
  const state = store.getState();
  if (state.activeModal !== 'auth') {
    container.innerHTML = '';
    return;
  }

  const isTamil = state.lang === 'ta';
  let authStep = 'phone'; // 'phone' or 'otp'
  let enteredPhone = '9876543210';

  function updateModalHTML() {
    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div id="auth-backdrop" class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"></div>

        <div class="relative w-full max-w-md rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-2xl border border-surface-container animate-scale">
          
          <!-- Close Button -->
          <button id="close-auth-btn" class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>

          <!-- Step 1: Phone / Mobile Input -->
          ${authStep === 'phone' ? `
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-on-primary mb-3 shadow-md shadow-primary/25">
                <span class="material-symbols-outlined text-[28px]">shopping_bag</span>
              </div>

              <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-secondary text-[11px] font-bold mb-2">
                <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
                <span>மின்வேகக் கொள்முதல் • Fast Commerce</span>
              </div>

              <h2 class="font-headline-lg text-xl font-extrabold text-on-surface">
                ${isTamil ? 'மீண்டும் வருக!' : 'Welcome to Porulagam'}
              </h2>
              <p class="font-body-sm text-[13px] text-on-surface-variant mt-1 max-w-xs">
                ${isTamil ? 'உங்கள் ஆர்டர்கள் மற்றும் சலுகைகளை அணுக உள்நுழையவும்.' : 'Enter your 10-digit mobile number to login or create account.'}
              </p>

              <!-- Phone Input Form -->
              <div class="w-full mt-6 space-y-4 text-left">
                <div>
                  <label class="block font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold mb-1.5">
                    கைபேசி எண் / Mobile Number
                  </label>
                  <div class="flex items-center gap-2">
                    <div class="h-12 px-3 rounded-xl bg-surface-container-low flex items-center gap-1.5 shrink-0 text-on-surface font-bold text-sm">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input 
                      id="auth-phone-input"
                      type="tel"
                      maxlength="10"
                      value="${enteredPhone}"
                      placeholder="98765 43210"
                      class="flex-1 h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-base outline-none border border-outline-variant/40 focus:border-primary focus:bg-surface-container-lowest transition-all"
                    />
                  </div>
                </div>

                <div class="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="auth-terms" checked class="rounded text-primary focus:ring-primary h-4 w-4" />
                  <label for="auth-terms" class="font-body-sm text-[11px] text-on-surface-variant">
                    I agree to the Terms of Service & Privacy Policy
                  </label>
                </div>

                <button 
                  id="get-otp-btn"
                  class="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>${isTamil ? 'OTP பெறுக' : 'Get OTP Verification Code'}</span>
                  <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ` : `
            <!-- Step 2: OTP Entry -->
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-3">
                <span class="material-symbols-outlined text-[28px]">mark_email_read</span>
              </div>

              <h2 class="font-headline-lg text-xl font-extrabold text-on-surface">
                ${isTamil ? 'OTP சரிபார்ப்பு' : 'Verify OTP'}
              </h2>
              <p class="font-body-sm text-[13px] text-on-surface-variant mt-1">
                Enter the 4-digit code sent to <span class="font-bold text-on-surface">+91 ${enteredPhone}</span>
              </p>

              <!-- 4-digit OTP Inputs -->
              <div class="flex items-center justify-center gap-3 my-6">
                <input type="text" maxlength="1" value="7" class="otp-box w-12 h-14 rounded-2xl bg-surface-container-low text-center text-xl font-black text-primary border border-outline-variant/40 focus:border-primary outline-none" />
                <input type="text" maxlength="1" value="2" class="otp-box w-12 h-14 rounded-2xl bg-surface-container-low text-center text-xl font-black text-primary border border-outline-variant/40 focus:border-primary outline-none" />
                <input type="text" maxlength="1" value="9" class="otp-box w-12 h-14 rounded-2xl bg-surface-container-low text-center text-xl font-black text-primary border border-outline-variant/40 focus:border-primary outline-none" />
                <input type="text" maxlength="1" value="4" class="otp-box w-12 h-14 rounded-2xl bg-surface-container-low text-center text-xl font-black text-primary border border-outline-variant/40 focus:border-primary outline-none" />
              </div>

              <div class="flex items-center justify-between w-full text-[12px] text-on-surface-variant mb-4 px-2">
                <span>Resend OTP in <strong class="text-primary">24s</strong></span>
                <button id="resend-otp-btn" class="font-bold text-primary hover:underline">Resend Now</button>
              </div>

              <button 
                id="verify-otp-btn"
                class="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span class="material-symbols-outlined text-[18px]">verified_user</span>
                <span>${isTamil ? 'சரிபார்த்து தொடர்க' : 'Verify & Sign In'}</span>
              </button>

              <button id="change-phone-btn" class="mt-3 font-label-sm text-[12px] text-outline hover:text-on-surface font-semibold">
                ← Change mobile number
              </button>
            </div>
          `}

        </div>
      </div>
    `;

    // Listeners
    container.querySelector('#close-auth-btn')?.addEventListener('click', () => store.closeModal());
    container.querySelector('#auth-backdrop')?.addEventListener('click', () => store.closeModal());

    const getOtpBtn = container.querySelector('#get-otp-btn');
    if (getOtpBtn) {
      getOtpBtn.addEventListener('click', () => {
        const phoneInput = container.querySelector('#auth-phone-input');
        if (phoneInput && phoneInput.value.length >= 10) {
          enteredPhone = phoneInput.value;
          authStep = 'otp';
          updateModalHTML();
          store.showToast(`OTP 7294 sent to +91 ${enteredPhone}`, 'info');
        } else {
          store.showToast('Please enter a valid 10-digit mobile number', 'error');
        }
      });
    }

    const verifyOtpBtn = container.querySelector('#verify-otp-btn');
    if (verifyOtpBtn) {
      verifyOtpBtn.addEventListener('click', () => {
        store.login(enteredPhone, 'Ananya Krishnan');
      });
    }

    const changePhoneBtn = container.querySelector('#change-phone-btn');
    if (changePhoneBtn) {
      changePhoneBtn.addEventListener('click', () => {
        authStep = 'phone';
        updateModalHTML();
      });
    }

    const resendBtn = container.querySelector('#resend-otp-btn');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => {
        store.showToast('New OTP sent: 7294', 'success');
      });
    }

    // Auto advance OTP boxes
    const otpBoxes = container.querySelectorAll('.otp-box');
    otpBoxes.forEach((box, idx) => {
      box.addEventListener('input', () => {
        if (box.value && idx < otpBoxes.length - 1) {
          otpBoxes[idx + 1].focus();
        }
      });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && idx > 0) {
          otpBoxes[idx - 1].focus();
        }
      });
    });
  }

  updateModalHTML();
}
