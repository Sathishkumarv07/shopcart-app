// Porulagam Cart Drawer & Checkout Flow
import { store } from '../store/state.js';
import { coupons } from '../data/deals.js';

export function renderCartDrawer(container) {
  const state = store.getState();
  const isOpen = state.activeModal === 'cart' || state.activeModal === 'checkout';
  const isCheckout = state.activeModal === 'checkout';

  if (!isOpen) {
    container.innerHTML = '';
    return;
  }

  const isTamil = state.lang === 'ta';
  const subtotal = store.getCartSubtotal();
  const discount = store.getCartDiscount();
  const platformFee = state.cart.length > 0 ? 5 : 0;
  const totalPayable = Math.max(0, subtotal - discount + platformFee);

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop -->
      <div id="cart-backdrop" class="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity animate-fade-in"></div>

      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in-right">
          
          <!-- Drawer Header -->
          <div class="px-5 py-4 bg-surface-container-lowest border-b border-surface-container flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[24px]">shopping_cart</span>
              <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                ${isCheckout ? (isTamil ? 'செக்அவுட் & பணம் செலுத்துதல்' : 'Review & Checkout') : (isTamil ? 'உங்கள் கூடை' : 'Your Shopping Cart')}
              </h2>
              <span class="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-[11px] font-bold">
                ${state.cart.reduce((s, i) => s + i.quantity, 0)} ${isTamil ? 'பொருட்கள்' : 'items'}
              </span>
            </div>
            <button id="close-cart-btn" class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            ${state.cart.length === 0 ? `
              <div class="h-full flex flex-col items-center justify-center text-center p-8">
                <div class="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-outline mb-4">
                  <span class="material-symbols-outlined text-[40px]">remove_shopping_cart</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                  ${isTamil ? 'உங்கள் கூடை காலியாக உள்ளது' : 'Your cart is empty'}
                </h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs">
                  ${isTamil ? 'இன்றைய சிறந்த சலுகைகளை ஆராய்ந்து பொருட்களைச் சேர்க்கவும்.' : 'Discover exclusive deals on phones, electronics, and fashion today.'}
                </p>
                <button id="cart-start-shopping-btn" class="mt-6 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-all active:scale-95 shadow-md shadow-primary/20">
                  ${isTamil ? 'கொள்முதலைத் தொடங்கவும்' : 'Explore Trending Deals'}
                </button>
              </div>
            ` : isCheckout ? `
              <!-- CHECKOUT VIEW -->
              <div class="space-y-4">
                <!-- Delivery Address Box -->
                <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <span class="font-label-sm text-label-sm text-primary uppercase font-bold flex items-center gap-1">
                      <span class="material-symbols-outlined text-[16px]">pin_drop</span> ${isTamil ? 'டெலிவரி முகவரி' : 'Delivery Address'}
                    </span>
                    <button class="font-label-sm text-[11px] text-primary hover:underline font-bold">Change</button>
                  </div>
                  <p class="font-headline-sm text-[14px] text-on-surface font-semibold">Ananya Krishnan • +91 98765 43210</p>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103</p>
                  <div class="flex items-center gap-1.5 text-secondary text-[12px] font-semibold mt-1">
                    <span class="material-symbols-outlined text-[16px]">verified</span>
                    <span>Guaranteed Express Delivery by Tomorrow 8 PM</span>
                  </div>
                </div>

                <!-- Payment Options -->
                <div class="p-4 rounded-xl bg-surface-container-lowest border border-surface-container space-y-3">
                  <span class="font-label-sm text-label-sm text-on-surface uppercase font-bold tracking-wide block">
                    ${isTamil ? 'பணம் செலுத்தும் முறை' : 'Select Payment Method'}
                  </span>
                  
                  <label class="flex items-center gap-3 p-3 rounded-xl border border-primary bg-primary-fixed/20 cursor-pointer transition-colors">
                    <input type="radio" name="paymentMethod" value="UPI" checked class="text-primary focus:ring-primary h-4 w-4" />
                    <div class="flex flex-col flex-1">
                      <span class="font-label-md text-label-md text-on-surface font-bold">UPI (Google Pay, PhonePe, Paytm)</span>
                      <span class="font-body-sm text-[11px] text-on-surface-variant">Instant, secure zero-fee payment</span>
                    </div>
                    <span class="material-symbols-outlined text-primary text-[20px]">bolt</span>
                  </label>

                  <label class="flex items-center gap-3 p-3 rounded-xl border border-outline-variant/50 hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input type="radio" name="paymentMethod" value="Cards" class="text-primary focus:ring-primary h-4 w-4" />
                    <div class="flex flex-col flex-1">
                      <span class="font-label-md text-label-md text-on-surface font-semibold">Credit / Debit Card (All Banks)</span>
                      <span class="font-body-sm text-[11px] text-on-surface-variant">10% instant cashback on HDFC & SBI cards</span>
                    </div>
                    <span class="material-symbols-outlined text-outline text-[20px]">credit_card</span>
                  </label>

                  <label class="flex items-center gap-3 p-3 rounded-xl border border-outline-variant/50 hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input type="radio" name="paymentMethod" value="COD" class="text-primary focus:ring-primary h-4 w-4" />
                    <div class="flex flex-col flex-1">
                      <span class="font-label-md text-label-md text-on-surface font-semibold">Cash on Delivery (COD)</span>
                      <span class="font-body-sm text-[11px] text-on-surface-variant">Pay in cash or UPI at delivery doorstep</span>
                    </div>
                    <span class="material-symbols-outlined text-outline text-[20px]">payments</span>
                  </label>
                </div>
              </div>
            ` : `
              <!-- Free Delivery Progress -->
              <div class="p-3 rounded-xl bg-secondary-container/30 border border-secondary/20 flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-[20px]">local_shipping</span>
                <p class="font-body-sm text-body-sm text-secondary font-semibold">
                  ${isTamil ? 'அனைத்து ஆர்டர்களுக்கும் இலவச விரைவு டெலிவரி!' : 'Free Express Delivery unlocked for this order!'}
                </p>
              </div>

              <!-- Cart Items List -->
              <div class="space-y-3">
                ${state.cart.map(item => `
                  <div class="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-xs flex gap-3 relative group">
                    <img 
                      src="${item.product.mainImage}" 
                      alt="${item.product.shortName || item.product.name}" 
                      class="w-20 h-20 rounded-lg object-contain bg-surface-container-low p-1.5 shrink-0"
                    />
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div class="flex items-start justify-between gap-1">
                          <h4 class="font-label-md text-label-md text-on-surface font-bold line-clamp-1 leading-snug">
                            ${item.product.shortName || item.product.name}
                          </h4>
                          <button 
                            data-remove-cart="${item.cartItemId}"
                            class="text-outline hover:text-error transition-colors p-1"
                            title="Remove"
                          >
                            <span class="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <p class="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                          ${item.selectedColor} • ${item.selectedStorage}
                        </p>
                      </div>

                      <div class="flex items-center justify-between mt-2">
                        <div class="flex items-baseline gap-1.5">
                          <span class="font-price-md text-price-md text-primary font-bold">
                            ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          ${item.product.originalPrice ? `
                            <span class="text-[11px] text-outline line-through">
                              ₹${(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          ` : ''}
                        </div>

                        <!-- Stepper -->
                        <div class="flex items-center rounded-lg bg-surface-container border border-surface-container-high overflow-hidden">
                          <button 
                            data-stepper-sub="${item.cartItemId}" 
                            class="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary active:bg-surface-container-high transition-colors"
                          >
                            <span class="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span class="w-8 text-center font-label-md text-label-md font-bold text-on-surface">
                            ${item.quantity}
                          </span>
                          <button 
                            data-stepper-add="${item.cartItemId}" 
                            class="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary active:bg-surface-container-high transition-colors"
                          >
                            <span class="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Coupon Code Section -->
              <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-label-sm text-label-sm text-on-surface font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px] text-primary">local_offer</span>
                    ${isTamil ? 'தள்ளுபடி கூப்பன்கள்' : 'Apply Coupon'}
                  </span>
                  ${state.appliedCoupon ? `
                    <button id="remove-coupon-btn" class="font-label-sm text-[11px] text-error font-bold hover:underline">
                      Remove
                    </button>
                  ` : ''}
                </div>

                ${state.appliedCoupon ? `
                  <div class="flex items-center justify-between p-2.5 rounded-lg bg-secondary-container/40 border border-secondary text-secondary">
                    <div class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[18px]">check_circle</span>
                      <span class="font-label-sm text-label-sm font-bold">${state.appliedCoupon.code}</span>
                      <span class="text-[11px]">Applied (Saved ₹${discount.toLocaleString('en-IN')})</span>
                    </div>
                  </div>
                ` : `
                  <div class="flex gap-2">
                    <input 
                      id="coupon-input"
                      type="text" 
                      placeholder="Enter promo code (e.g. PORULAGAM10)" 
                      class="flex-1 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm uppercase tracking-wider outline-none border border-outline-variant/40 focus:border-primary"
                    />
                    <button id="apply-coupon-btn" class="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold active:scale-95 transition-all">
                      Apply
                    </button>
                  </div>
                  <div class="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
                    <button data-quick-coupon="PORULAGAM10" class="px-2 py-0.5 rounded-md bg-surface-container text-primary font-label-sm text-[10px] font-bold border border-primary/20 shrink-0 hover:bg-primary hover:text-on-primary transition-all">
                      + PORULAGAM10 (10% Off)
                    </button>
                    <button data-quick-coupon="WELCOME500" class="px-2 py-0.5 rounded-md bg-surface-container text-primary font-label-sm text-[10px] font-bold border border-primary/20 shrink-0 hover:bg-primary hover:text-on-primary transition-all">
                      + WELCOME500 (₹500 Off)
                    </button>
                  </div>
                `}
              </div>
            `}
          </div>

          <!-- Drawer Footer / Summary & Actions -->
          ${state.cart.length > 0 ? `
            <div class="p-4 bg-surface-container-lowest border-t border-surface-container space-y-3">
              <!-- Price Breakdown -->
              <div class="space-y-1.5 text-body-sm">
                <div class="flex justify-between text-on-surface-variant text-[13px]">
                  <span>${isTamil ? 'பொருட்கள் மொத்தம்' : 'Subtotal'}</span>
                  <span>₹${subtotal.toLocaleString('en-IN')}</span>
                </div>
                ${discount > 0 ? `
                  <div class="flex justify-between text-secondary font-semibold text-[13px]">
                    <span>${isTamil ? 'கூப்பன் தள்ளுபடி' : 'Coupon Savings'}</span>
                    <span>-₹${discount.toLocaleString('en-IN')}</span>
                  </div>
                ` : ''}
                <div class="flex justify-between text-on-surface-variant text-[13px]">
                  <span>${isTamil ? 'டெலிவரி கட்டணம்' : 'Delivery Fee'}</span>
                  <span class="text-secondary font-bold uppercase">FREE</span>
                </div>
                <div class="flex justify-between text-on-surface-variant text-[13px]">
                  <span>${isTamil ? 'தளக் கட்டணம்' : 'Platform Fee'}</span>
                  <span>₹${platformFee}</span>
                </div>
                <div class="h-px bg-surface-container my-1"></div>
                <div class="flex justify-between text-on-surface font-headline-sm text-headline-sm font-bold pt-0.5">
                  <span>${isTamil ? 'செலுத்த வேண்டிய தொகை' : 'Total Payable'}</span>
                  <span class="text-primary font-price-lg text-price-lg">₹${totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <!-- CTA Button -->
              ${isCheckout ? `
                <div class="flex gap-2">
                  <button id="back-to-cart-btn" class="px-4 py-3 rounded-xl border border-outline-variant text-on-surface font-label-md text-label-md font-bold hover:bg-surface-container transition-all">
                    Back
                  </button>
                  <button id="confirm-order-btn" class="flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-[20px]">lock</span>
                    <span>${isTamil ? 'ஆர்டரை உறுதிசெய்' : 'Place Order'} • ₹${totalPayable.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              ` : `
                <button id="proceed-checkout-btn" class="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <span>${isTamil ? 'செக்அவுட்டுக்குச் செல்லவும்' : 'Proceed to Checkout'}</span>
                  <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              `}
            </div>
          ` : ''}

        </div>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const closeBtn = container.querySelector('#close-cart-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => store.closeModal());

  const backdrop = container.querySelector('#cart-backdrop');
  if (backdrop) backdrop.addEventListener('click', () => store.closeModal());

  const startShopping = container.querySelector('#cart-start-shopping-btn');
  if (startShopping) startShopping.addEventListener('click', () => {
    store.closeModal();
    store.setView('deals');
  });

  // Steppers
  container.querySelectorAll('[data-stepper-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-stepper-add');
      store.updateCartQuantity(id, 1);
    });
  });

  container.querySelectorAll('[data-stepper-sub]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-stepper-sub');
      store.updateCartQuantity(id, -1);
    });
  });

  container.querySelectorAll('[data-remove-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove-cart');
      store.removeFromCart(id);
    });
  });

  // Coupons
  const applyBtn = container.querySelector('#apply-coupon-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const input = container.querySelector('#coupon-input');
      if (input && input.value) {
        store.applyCoupon(input.value);
      }
    });
  }

  const removeCouponBtn = container.querySelector('#remove-coupon-btn');
  if (removeCouponBtn) {
    removeCouponBtn.addEventListener('click', () => store.removeCoupon());
  }

  container.querySelectorAll('[data-quick-coupon]').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-quick-coupon');
      store.applyCoupon(code);
    });
  });

  // Proceed / Checkout
  const proceedBtn = container.querySelector('#proceed-checkout-btn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => store.openModal('checkout'));
  }

  const backToCartBtn = container.querySelector('#back-to-cart-btn');
  if (backToCartBtn) {
    backToCartBtn.addEventListener('click', () => store.openModal('cart'));
  }

  const confirmOrderBtn = container.querySelector('#confirm-order-btn');
  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
      const selectedPayment = container.querySelector('input[name="paymentMethod"]:checked')?.value || 'UPI';
      store.checkoutCart(selectedPayment);
    });
  }
}
