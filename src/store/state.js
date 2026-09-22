// Porulagam Central Reactive State Store
import { products } from '../data/products.js';
import { initialOrders } from '../data/orders.js';
import { coupons } from '../data/deals.js';

class Store {
  constructor() {
    this.listeners = [];
    
    // Load persisted cart and wishlist from localStorage if available
    const savedCart = localStorage.getItem('porulagam_cart');
    const savedWishlist = localStorage.getItem('porulagam_wishlist');
    const savedOrders = localStorage.getItem('porulagam_orders');

    this.state = {
      currentView: 'home', // home, categories, deals, orders, account, product_detail
      previousView: 'home',
      activeProduct: products[0],
      selectedCategory: 'electronics',
      selectedSubcategory: null,
      dealFilter: 'all',
      searchQuery: '',
      cart: savedCart ? JSON.parse(savedCart) : [
        {
          cartItemId: 'cart-1',
          product: products[0],
          selectedColor: 'Celestial Blue',
          selectedStorage: '256 GB',
          quantity: 1
        },
        {
          cartItemId: 'cart-2',
          product: products[1],
          selectedColor: 'Matte Black',
          selectedStorage: 'Standard',
          quantity: 1
        }
      ],
      wishlist: savedWishlist ? new Set(JSON.parse(savedWishlist)) : new Set(['prod-1', 'prod-2', 'prod-3', 'prod-4']),
      orders: savedOrders ? JSON.parse(savedOrders) : initialOrders,
      user: {
        name: 'Ananya Krishnan',
        tamilName: 'அனன்யா கிருஷ்ணன்',
        phone: '+91 98765 43210',
        email: 'ananya.k@example.com',
        avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1VMK7LzmN11OfbTszqVMKU9MRwYeZaznwDllrDgq5bU9FagEjzWHPl7iE7IrMndkrNotBzyUF8XXPWwKS0MR6UhmUgiTsYdG2BfpHEmCWxAr93XRrvj5gimfh2qOy6m5iiMk0FzUml0NZALgeyvQolElc-M_OqYh6x6Qh_2anaqbSfmXrdet0iolaEUyERhlBGWR5vu-ByfwI5BqUvLkll9m0irF2Sjdc1DauDop15XMcbyF0i2DIaY-iw',
        isLoggedIn: true,
        superCoins: 240,
        membershipTier: 'பொருளகம் Plus Gold'
      },
      pincode: '560001 - Bengaluru',
      lang: 'ta', // 'ta' for Tamil / 'en' for English
      appliedCoupon: null,
      activeModal: null, // 'cart', 'auth', 'location', 'tracking', 'wishlist', 'checkout'
      trackingOrder: null,
      toast: null
    };
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.persist();
    this.listeners.forEach(listener => listener(this.state));
  }

  persist() {
    try {
      localStorage.setItem('porulagam_cart', JSON.stringify(this.state.cart));
      localStorage.setItem('porulagam_wishlist', JSON.stringify(Array.from(this.state.wishlist)));
      localStorage.setItem('porulagam_orders', JSON.stringify(this.state.orders));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  // Navigation Actions
  setView(viewName, payload = null) {
    if (this.state.currentView !== 'product_detail') {
      this.state.previousView = this.state.currentView;
    }
    this.state.currentView = viewName;
    if (payload && payload.product) {
      this.state.activeProduct = payload.product;
    }
    if (payload && payload.category) {
      this.state.selectedCategory = payload.category;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify();
  }

  viewProduct(product) {
    this.state.previousView = this.state.currentView === 'product_detail' ? 'home' : this.state.currentView;
    this.state.activeProduct = product;
    this.state.currentView = 'product_detail';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify();
  }

  goBack() {
    this.state.currentView = this.state.previousView || 'home';
    this.notify();
  }

  // Category Actions
  selectCategory(catId) {
    this.state.selectedCategory = catId;
    this.state.selectedSubcategory = null;
    this.notify();
  }

  // Cart Actions
  addToCart(product, color = null, storage = null, quantity = 1) {
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    const selectedStorage = storage || (product.storageOptions && product.storageOptions[0] ? product.storageOptions[0] : 'Standard');
    
    const existingIndex = this.state.cart.findIndex(
      item => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedStorage === selectedStorage
    );

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({
        cartItemId: 'cart-' + Date.now() + Math.random().toString(36).substr(2, 4),
        product,
        selectedColor,
        selectedStorage,
        quantity
      });
    }

    this.showToast(`'${product.shortName || product.name}' Added to Cart!`, 'success');
    this.notify();
  }

  removeFromCart(cartItemId) {
    this.state.cart = this.state.cart.filter(item => item.cartItemId !== cartItemId);
    this.showToast('Item removed from cart', 'info');
    this.notify();
  }

  updateCartQuantity(cartItemId, delta) {
    const item = this.state.cart.find(i => i.cartItemId === cartItemId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      this.removeFromCart(cartItemId);
    } else {
      item.quantity = newQty;
      this.notify();
    }
  }

  applyCoupon(code) {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      this.showToast('Invalid Coupon Code', 'error');
      return false;
    }
    const subtotal = this.getCartSubtotal();
    if (subtotal < (found.minCartValue || 0)) {
      this.showToast(`Min order value of ₹${found.minCartValue} required for this coupon`, 'error');
      return false;
    }
    this.state.appliedCoupon = found;
    this.showToast(`Coupon '${found.code}' applied successfully!`, 'success');
    this.notify();
    return true;
  }

  removeCoupon() {
    this.state.appliedCoupon = null;
    this.showToast('Coupon removed', 'info');
    this.notify();
  }

  getCartSubtotal() {
    return this.state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  getCartDiscount() {
    if (!this.state.appliedCoupon) return 0;
    const subtotal = this.getCartSubtotal();
    if (this.state.appliedCoupon.flatDiscount) {
      return this.state.appliedCoupon.flatDiscount;
    }
    if (this.state.appliedCoupon.discountPercent) {
      const calc = Math.round((subtotal * this.state.appliedCoupon.discountPercent) / 100);
      return Math.min(calc, this.state.appliedCoupon.maxDiscount || calc);
    }
    return 0;
  }

  getCartTotal() {
    const subtotal = this.getCartSubtotal();
    const discount = this.getCartDiscount();
    return Math.max(0, subtotal - discount);
  }

  // Wishlist Actions
  toggleWishlist(productId) {
    if (this.state.wishlist.has(productId)) {
      this.state.wishlist.delete(productId);
      this.showToast('Removed from Wishlist', 'info');
    } else {
      this.state.wishlist.add(productId);
      this.showToast('Added to Wishlist!', 'success');
    }
    this.notify();
  }

  isInWishlist(productId) {
    return this.state.wishlist.has(productId);
  }

  // Checkout & Order Placement
  checkoutCart(paymentMethod = 'UPI (Google Pay / PhonePe)', deliveryAddress = 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103') {
    if (this.state.cart.length === 0) return null;

    const newOrder = {
      id: 'POR-' + Math.floor(100000 + Math.random() * 900000),
      date: 'Just Now',
      status: 'transit',
      statusText: 'Order Placed - Being Packed',
      deliveryDate: 'Arriving in 2 Days',
      courier: 'Porulagam Speed Express',
      trackingNumber: 'PE-EXP-' + Math.floor(10000000 + Math.random() * 90000000),
      item: {
        name: this.state.cart[0].product.name,
        image: this.state.cart[0].product.mainImage,
        color: this.state.cart[0].selectedColor,
        quantity: this.state.cart.reduce((s, i) => s + i.quantity, 0),
        price: this.getCartTotal()
      },
      address: deliveryAddress,
      paymentMethod,
      steps: [
        { title: 'Order Confirmed', time: 'Just now', done: true, current: true },
        { title: 'Packed at Hub', time: 'Expected within 4 hrs', done: false },
        { title: 'Shipped via Express Air', time: 'Tomorrow', done: false },
        { title: 'Out for Delivery', time: 'In 2 days', done: false },
        { title: 'Delivered', time: 'Expected 2 days', done: false }
      ]
    };

    this.state.orders.unshift(newOrder);
    this.state.cart = [];
    this.state.appliedCoupon = null;
    this.closeModal();
    this.setView('orders');
    this.showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    this.notify();
    return newOrder;
  }

  // Modal Actions
  openModal(modalName, payload = null) {
    this.state.activeModal = modalName;
    if (modalName === 'tracking' && payload) {
      this.state.trackingOrder = payload;
    }
    this.notify();
  }

  closeModal() {
    this.state.activeModal = null;
    this.state.trackingOrder = null;
    this.notify();
  }

  // Toast Notification
  showToast(message, type = 'info') {
    this.state.toast = { message, type, id: Date.now() };
    this.notify();
    setTimeout(() => {
      if (this.state.toast && this.state.toast.message === message) {
        this.state.toast = null;
        this.notify();
      }
    }, 3200);
  }

  // Language Switcher
  toggleLanguage() {
    this.state.lang = this.state.lang === 'ta' ? 'en' : 'ta';
    this.showToast(this.state.lang === 'ta' ? 'தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது' : 'Language switched to English', 'info');
    this.notify();
  }

  // User Auth
  login(phone, name = 'Ananya Krishnan') {
    this.state.user = {
      name,
      tamilName: 'அனன்யா கிருஷ்ணன்',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: 'ananya.k@example.com',
      avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1VMK7LzmN11OfbTszqVMKU9MRwYeZaznwDllrDgq5bU9FagEjzWHPl7iE7IrMndkrNotBzyUF8XXPWwKS0MR6UhmUgiTsYdG2BfpHEmCWxAr93XRrvj5gimfh2qOy6m5iiMk0FzUml0NZALgeyvQolElc-M_OqYh6x6Qh_2anaqbSfmXrdet0iolaEUyERhlBGWR5vu-ByfwI5BqUvLkll9m0irF2Sjdc1DauDop15XMcbyF0i2DIaY-iw',
      isLoggedIn: true,
      superCoins: 240,
      membershipTier: 'பொருளகம் Plus Gold'
    };
    this.closeModal();
    this.showToast('Logged in successfully!', 'success');
    this.notify();
  }

  logout() {
    this.state.user.isLoggedIn = false;
    this.showToast('You have been logged out', 'info');
    this.notify();
  }

  // Delivery Location
  setPincode(pincode) {
    this.state.pincode = pincode;
    this.closeModal();
    this.showToast(`Delivery location updated to ${pincode}`, 'success');
    this.notify();
  }

  setSearch(query) {
    this.state.searchQuery = query;
    this.notify();
  }
}

export const store = new Store();
window.__porulagamStore = store;
