// Porulagam Authentication Modal (Google Sign-In, Phone & OTP Verification)
import { store } from '../store/state.js';

export function renderAuthModal(container) {
  const state = store.getState();
  if (state.activeModal !== 'auth') {
    container.innerHTML = '';
    return;
  }

  const isTamil = state.lang === 'ta';
  let authStep = 'main'; // 'main', 'google-chooser', 'otp'
  let enteredPhone = '9876543210';

  // Sample Google Accounts for authentic Google One-Tap Experience
  const googleAccounts = [
    {
      name: 'Sathish Kumar',
      tamilName: 'சதீஷ் குமார்',
      email: 'sathish.kumar@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98401 23456'
    },
    {
      name: 'Ananya Krishnan',
      tamilName: 'அனன்யா கிருஷ்ணன்',
      email: 'ananya.k@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98765 43210'
    }
  ];

  function updateModalHTML() {
    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div id="auth-backdrop" class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"></div>

        <div class="relative w-full max-w-md rounded-3xl bg-surface-container-lowest p-6 sm:p-7 shadow-2xl border border-surface-container animate-scale">
          
          <!-- Close Button -->
          <button id="close-auth-btn" class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="Close modal">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>

          <!-- Step: Main Login (Google + Phone) -->
          ${authStep === 'main' ? `
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-on-primary mb-3 shadow-md shadow-primary/25">
                <span class="material-symbols-outlined text-[28px]">shopping_bag</span>
              </div>

              <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-secondary text-[11px] font-bold mb-2">
                <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
                <span>மின்வேகக் கொள்முதல் • Fast Commerce</span>
              </div>

              <h2 class="font-headline-lg text-xl font-extrabold text-on-surface">
                ${isTamil ? 'பொருளகத்தில் உள்நுழைக' : 'Welcome to Porulagam'}
              </h2>
              <p class="font-body-sm text-[13px] text-on-surface-variant mt-1 max-w-xs">
                ${isTamil ? 'கூகிள் அல்லது மொபைல் எண் மூலம் உங்கள் கணக்கை அணுகவும்.' : 'Sign in to access your orders, wishlist, and exclusive member discounts.'}
              </p>

              <!-- Google Sign In Button (Prominent & Official Style) -->
              <div class="w-full mt-6 space-y-3">
                <button 
                  id="google-login-btn"
                  class="w-full py-3.5 px-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-sm font-semibold shadow-xs flex items-center justify-center gap-3 transition-all hover:border-primary/40 active:scale-98 group cursor-pointer"
                >
                  <!-- Google G Logo SVG -->
                  <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span class="group-hover:text-primary transition-colors">
                    ${isTamil ? 'Google மூலம் உள்நுழைக' : 'Continue with Google'}
                  </span>
                </button>

                <!-- Divider -->
                <div class="relative flex items-center justify-center my-4">
                  <div class="border-t border-outline-variant/40 w-full"></div>
                  <span class="bg-surface-container-lowest px-3 font-label-sm text-[11px] text-outline uppercase font-bold tracking-wider shrink-0">
                    ${isTamil ? 'அல்லது மொபைல் மூலம்' : 'or with mobile number'}
                  </span>
                  <div class="border-t border-outline-variant/40 w-full"></div>
                </div>

                <!-- Phone Input Form -->
                <div class="text-left space-y-3.5">
                  <div>
                    <label class="block font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold mb-1.5">
                      கைபேசி எண் / Mobile Number
                    </label>
                    <div class="flex items-center gap-2">
                      <div class="h-12 px-3 rounded-xl bg-surface-container-low flex items-center gap-1.5 shrink-0 text-on-surface font-bold text-sm border border-outline-variant/30">
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

                  <div class="flex items-center gap-2 pt-0.5">
                    <input type="checkbox" id="auth-terms" checked class="rounded text-primary focus:ring-primary h-4 w-4" />
                    <label for="auth-terms" class="font-body-sm text-[11px] text-on-surface-variant cursor-pointer">
                      I agree to the Terms of Service & Privacy Policy
                    </label>
                  </div>

                  <button 
                    id="get-otp-btn"
                    class="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>${isTamil ? 'OTP பெறுக' : 'Get OTP Verification Code'}</span>
                    <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ` : authStep === 'google-chooser' ? `
            <!-- Step: Google Account Chooser -->
            <div class="flex flex-col text-left">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span class="font-headline-sm text-lg font-bold text-on-surface">Choose an account</span>
              </div>
              <p class="font-body-sm text-[12px] text-on-surface-variant mb-4">
                to continue to <strong class="text-primary font-semibold">Porulagam (பொருளகம்)</strong>
              </p>

              <!-- Account List -->
              <div class="space-y-2 mb-4">
                ${googleAccounts.map((acc, idx) => `
                  <button 
                    data-google-acc-idx="${idx}"
                    class="google-acc-item w-full p-3 rounded-2xl border border-outline-variant/50 hover:border-primary hover:bg-surface-container-low flex items-center justify-between transition-all group text-left cursor-pointer"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <img src="${acc.avatar}" alt="${acc.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0" />
                      <div class="flex flex-col min-w-0">
                        <span class="font-label-md text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                          ${acc.name}
                        </span>
                        <span class="font-body-sm text-[12px] text-on-surface-variant truncate">
                          ${acc.email}
                        </span>
                      </div>
                    </div>
                    <span class="material-symbols-outlined text-[20px] text-outline group-hover:text-primary transition-colors shrink-0">chevron_right</span>
                  </button>
                `).join('')}

                <!-- Use Another Account Option -->
                <button 
                  id="google-use-custom-btn"
                  class="w-full p-3 rounded-2xl border border-dashed border-outline-variant hover:border-primary hover:bg-surface-container-low flex items-center gap-3 transition-all text-left text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[20px]">person_add</span>
                  </div>
                  <span class="font-label-md text-sm font-semibold">Use another account</span>
                </button>
              </div>

              <!-- Back link -->
              <div class="pt-2 border-t border-surface-container flex items-center justify-between">
                <button id="google-back-btn" class="font-label-sm text-[12px] text-outline hover:text-on-surface font-semibold flex items-center gap-1 cursor-pointer">
                  <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Back</span>
                </button>
                <span class="font-body-sm text-[11px] text-outline">Porulagam Security</span>
              </div>
            </div>
          ` : `
            <!-- Step: OTP Entry -->
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
                <button id="resend-otp-btn" class="font-bold text-primary hover:underline cursor-pointer">Resend Now</button>
              </div>

              <button 
                id="verify-otp-btn"
                class="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined text-[18px]">verified_user</span>
                <span>${isTamil ? 'சரிபார்த்து தொடர்க' : 'Verify & Sign In'}</span>
              </button>

              <button id="change-phone-btn" class="mt-3 font-label-sm text-[12px] text-outline hover:text-on-surface font-semibold cursor-pointer">
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

    // Google Sign-In click -> open account chooser
    const googleLoginBtn = container.querySelector('#google-login-btn');
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener('click', () => {
        authStep = 'google-chooser';
        updateModalHTML();
      });
    }

    // Google Account Chooser item click
    const accItems = container.querySelectorAll('.google-acc-item');
    accItems.forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-google-acc-idx'), 10);
        const selectedAcc = googleAccounts[idx] || googleAccounts[0];
        store.loginWithGoogle(selectedAcc);
      });
    });

    // Custom Google Account Click
    const customGoogleBtn = container.querySelector('#google-use-custom-btn');
    if (customGoogleBtn) {
      customGoogleBtn.addEventListener('click', () => {
        const customEmail = prompt('Enter your Google Account email (e.g. user@gmail.com):', 'sathish.kumar@gmail.com');
        if (customEmail && customEmail.includes('@')) {
          const namePart = customEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          store.loginWithGoogle({
            name: namePart,
            email: customEmail,
            tamilName: namePart,
            phone: '+91 98401 23456',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
          });
        }
      });
    }

    const googleBackBtn = container.querySelector('#google-back-btn');
    if (googleBackBtn) {
      googleBackBtn.addEventListener('click', () => {
        authStep = 'main';
        updateModalHTML();
      });
    }

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
        authStep = 'main';
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
