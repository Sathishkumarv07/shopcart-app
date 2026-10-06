// Porulagam Orders View
import { store } from '../store/state.js';

export function renderOrdersView(container) {
  const state = store.getState();
  const isTamil = state.lang === 'ta';

  let currentOrderTab = state.orderTab || 'all';
  let orderSearchQuery = state.orderSearchQuery || '';

  // Filter orders
  let filteredOrders = state.orders;
  if (currentOrderTab !== 'all') {
    filteredOrders = filteredOrders.filter(o => o.status === currentOrderTab);
  }
  if (orderSearchQuery.trim() !== '') {
    const q = orderSearchQuery.toLowerCase();
    filteredOrders = filteredOrders.filter(o => 
      o.id.toLowerCase().includes(q) || 
      o.item.name.toLowerCase().includes(q)
    );
  }

  const allCount = state.orders.length;
  const transitCount = state.orders.filter(o => o.status === 'transit').length;
  const deliveredCount = state.orders.filter(o => o.status === 'delivered').length;
  const cancelledCount = state.orders.filter(o => o.status === 'cancelled').length;

  container.innerHTML = `
    <div class="flex flex-col w-full pb-16 space-y-4 max-w-4xl mx-auto">
      
      <!-- Top Orders Header & Search -->
      <div class="px-4 sm:px-6 pt-2 pb-3 bg-surface-container-lowest border-b border-surface-container shadow-xs">
        <div class="flex items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-2.5">
            <h1 class="font-headline-lg text-xl sm:text-2xl font-extrabold text-on-surface">
              ${isTamil ? 'எனது ஆர்டர்கள்' : 'My Orders'}
            </h1>
            <span class="px-2.5 py-0.5 bg-surface-container-highest text-primary font-label-sm text-[11px] font-bold rounded-full">
              ${allCount} Total
            </span>
          </div>

          <button id="toggle-order-search-btn" class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>

        <!-- Search Bar (Collapsible or live) -->
        <div id="order-search-container" class="mb-3">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <span class="material-symbols-outlined text-[18px] text-outline">manage_search</span>
            <input 
              id="order-search-input"
              type="text" 
              placeholder="${isTamil ? 'ஆர்டர் எண் அல்லது தயாரிப்பு பெயர்...' : 'Search by Order ID or Product name...'}"
              value="${orderSearchQuery}"
              class="bg-transparent font-body-sm text-body-sm text-on-surface outline-none w-full placeholder:text-outline"
            />
            ${orderSearchQuery ? `
              <button id="clear-order-search" class="text-outline hover:text-on-surface">
                <span class="material-symbols-outlined text-[16px]">close</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Order Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button 
            data-order-tab="all" 
            class="order-tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all ${
              currentOrderTab === 'all' 
                ? 'bg-primary text-on-primary font-bold shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
            }"
          >
            ${isTamil ? 'அனைத்தும்' : 'All Orders'} (${allCount})
          </button>

          <button 
            data-order-tab="transit" 
            class="order-tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all ${
              currentOrderTab === 'transit' 
                ? 'bg-primary text-on-primary font-bold shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
            }"
          >
            ${isTamil ? 'வழியில் உள்ளது' : 'In Transit'} (${transitCount})
          </button>

          <button 
            data-order-tab="delivered" 
            class="order-tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all ${
              currentOrderTab === 'delivered' 
                ? 'bg-primary text-on-primary font-bold shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
            }"
          >
            ${isTamil ? 'டெலிவரி ஆனது' : 'Delivered'} (${deliveredCount})
          </button>

          <button 
            data-order-tab="cancelled" 
            class="order-tab-btn px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all ${
              currentOrderTab === 'cancelled' 
                ? 'bg-primary text-on-primary font-bold shadow-xs' 
                : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
            }"
          >
            ${isTamil ? 'ரத்து செய்யப்பட்டது' : 'Cancelled'} (${cancelledCount})
          </button>
        </div>
      </div>

      <!-- Orders List Container -->
      <div class="px-4 sm:px-6 space-y-4">
        ${filteredOrders.length === 0 ? `
          <div class="py-12 flex flex-col items-center justify-center text-center p-6 bg-surface-container-lowest rounded-2xl border border-surface-container">
            <span class="material-symbols-outlined text-[42px] text-outline mb-2">package_2</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">No orders found</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Try changing your filters or search terms.</p>
          </div>
        ` : filteredOrders.map(order => {
          const isTransit = order.status === 'transit';
          const isDelivered = order.status === 'delivered';
          const isCancelled = order.status === 'cancelled';

          return `
            <div class="rounded-2xl bg-surface-container-lowest border border-surface-container p-4 sm:p-5 shadow-xs hover:shadow-md transition-all space-y-3.5">
              
              <!-- Card Header -->
              <div class="flex items-center justify-between pb-2 border-b border-surface-container/60">
                <div class="flex items-center gap-2">
                  <span class="font-label-md text-label-md text-on-surface font-bold">#${order.id}</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                  <span class="font-body-sm text-[12px] text-outline">${order.date}</span>
                </div>

                ${isTransit ? `
                  <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-[11px] font-extrabold flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Live Track
                  </span>
                ` : isDelivered ? `
                  <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">check_circle</span> Delivered
                  </span>
                ` : `
                  <span class="px-2.5 py-0.5 rounded-full bg-surface-container text-outline font-label-sm text-[11px] font-bold">
                    Cancelled
                  </span>
                `}
              </div>

              <!-- Item Info -->
              <div class="flex gap-3.5 items-center">
                <img 
                  src="${order.item.image}" 
                  alt="${order.item.name}" 
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-surface-container-low p-1.5 shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-headline-sm text-sm sm:text-base text-on-surface font-bold line-clamp-1 leading-snug">
                    ${order.item.name}
                  </h3>
                  <p class="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                    Qty: ${order.item.quantity} • ${order.item.color}
                  </p>
                  <span class="font-price-md text-price-md text-primary font-extrabold block mt-1">
                    ₹${order.item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <!-- Status Alert Strip -->
              <div class="p-2.5 rounded-xl ${isTransit ? 'bg-primary-fixed/20 text-primary border border-primary/20' : isDelivered ? 'bg-surface-container-low text-secondary' : 'bg-surface-container-low text-outline'} flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">
                  ${isTransit ? 'local_shipping' : isDelivered ? 'verified' : 'cancel'}
                </span>
                <span class="font-label-sm text-[12px] font-bold">
                  ${order.statusText}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center justify-between pt-1 gap-2">
                <div class="flex items-center gap-2">
                  ${isTransit ? `
                    <button 
                      data-track-order="${order.id}"
                      class="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center gap-1.5 active:scale-95 shadow-sm shadow-primary/20"
                    >
                      <span class="material-symbols-outlined text-[16px]">navigation</span> Track Order
                    </button>
                  ` : `
                    <button 
                      data-invoice-order="${order.id}"
                      class="px-3 py-1.5 rounded-xl border border-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container flex items-center gap-1"
                    >
                      <span class="material-symbols-outlined text-[16px]">receipt</span> Invoice
                    </button>
                  `}
                  <button 
                    data-help-order="${order.id}"
                    class="px-3 py-1.5 rounded-xl border border-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container"
                  >
                    Need Help?
                  </button>
                </div>

                <button 
                  data-order-again="${order.id}"
                  class="font-label-sm text-label-sm text-primary font-bold hover:underline"
                >
                  Buy Again →
                </button>
              </div>

            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;

  // Filter tab buttons
  container.querySelectorAll('[data-order-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.orderTab = btn.getAttribute('data-order-tab');
      renderOrdersView(container);
    });
  });

  // Search input
  const searchInput = container.querySelector('#order-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.orderSearchQuery = e.target.value;
      renderOrdersView(container);
    });
  }

  // Clear search
  const clearBtn = container.querySelector('#clear-order-search');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.orderSearchQuery = '';
      renderOrdersView(container);
    });
  }

  // Track order click
  container.querySelectorAll('[data-track-order]').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.getAttribute('data-track-order');
      const found = state.orders.find(o => o.id === orderId);
      if (found) {
        store.openModal('tracking', found);
      }
    });
  });

  // Invoice simulation
  container.querySelectorAll('[data-invoice-order]').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.getAttribute('data-invoice-order');
      store.showToast(`Invoice for Order #${orderId} downloaded!`, 'success');
    });
  });

  // Help button
  container.querySelectorAll('[data-help-order]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.showToast('24/7 Support: Our agent will call you shortly.', 'info');
    });
  });

  // Buy Again button
  container.querySelectorAll('[data-order-again]').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.getAttribute('data-order-again');
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        store.showToast(`Added '${order.item.name}' to cart!`, 'success');
        store.openModal('cart');
      }
    });
  });
}
