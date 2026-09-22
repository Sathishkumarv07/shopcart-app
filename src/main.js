// Porulagam App Entry Point
import './style.css';
import { store } from './store/state.js';
import { renderHeader } from './components/Header.js';
import { renderBottomNav } from './components/BottomNav.js';
import { renderCartDrawer } from './components/CartDrawer.js';
import { renderWishlistModal } from './components/WishlistModal.js';
import { renderLocationModal } from './components/LocationModal.js';
import { renderTrackingModal } from './components/TrackingModal.js';
import { renderToast } from './components/Toast.js';

import { renderHomeView } from './views/HomeView.js';
import { renderCategoriesView } from './views/CategoriesView.js';
import { renderDealsView } from './views/DealsView.js';
import { renderProductDetailView } from './views/ProductDetailView.js';
import { renderOrdersView } from './views/OrdersView.js';
import { renderAccountView } from './views/AccountView.js';
import { renderAuthModal } from './views/AuthModal.js';

function renderApp() {
  const state = store.getState();

  const headerContainer = document.getElementById('header-container');
  const mainViewContainer = document.getElementById('main-view-container');
  const bottomNavContainer = document.getElementById('bottom-nav-container');
  const modalsContainer = document.getElementById('modals-container');
  const toastContainer = document.getElementById('toast-container');

  // Render Header
  if (headerContainer) {
    renderHeader(headerContainer);
  }

  // Render Current View
  if (mainViewContainer) {
    switch (state.currentView) {
      case 'home':
        renderHomeView(mainViewContainer);
        break;
      case 'categories':
        renderCategoriesView(mainViewContainer);
        break;
      case 'deals':
        renderDealsView(mainViewContainer);
        break;
      case 'product_detail':
        renderProductDetailView(mainViewContainer);
        break;
      case 'orders':
        renderOrdersView(mainViewContainer);
        break;
      case 'account':
        renderAccountView(mainViewContainer);
        break;
      default:
        renderHomeView(mainViewContainer);
    }
  }

  // Render Bottom Nav (Hidden on product detail page to give prominence to sticky Buy/Cart strip)
  if (bottomNavContainer) {
    if (state.currentView === 'product_detail') {
      bottomNavContainer.innerHTML = '';
    } else {
      renderBottomNav(bottomNavContainer);
    }
  }

  // Render Modals
  if (modalsContainer) {
    let modalWrapper = document.getElementById('modal-active-content');
    if (!modalWrapper) {
      modalWrapper = document.createElement('div');
      modalWrapper.id = 'modal-active-content';
      modalsContainer.appendChild(modalWrapper);
    }

    if (state.activeModal === 'cart' || state.activeModal === 'checkout') {
      renderCartDrawer(modalWrapper);
    } else if (state.activeModal === 'wishlist') {
      renderWishlistModal(modalWrapper);
    } else if (state.activeModal === 'location') {
      renderLocationModal(modalWrapper);
    } else if (state.activeModal === 'tracking') {
      renderTrackingModal(modalWrapper);
    } else if (state.activeModal === 'auth') {
      renderAuthModal(modalWrapper);
    } else {
      modalWrapper.innerHTML = '';
    }
  }

  // Render Toast
  if (toastContainer) {
    renderToast(toastContainer);
  }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  store.subscribe(renderApp);
});

// Fallback if already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderApp();
  store.subscribe(renderApp);
}
