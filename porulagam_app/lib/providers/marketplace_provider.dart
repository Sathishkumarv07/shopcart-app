import 'package:flutter/material.dart';
import '../models/category.dart';
import '../models/product.dart';
import '../models/order.dart';
import '../models/coupon.dart';
import '../models/user.dart';
import '../services/api_service.dart';

class MarketplaceProvider extends ChangeNotifier {
  int _currentTab = 0;
  bool _isLoading = false;
  String? _errorMessage;

  List<CategoryModel> _categories = [];
  List<ProductModel> _products = [];
  CategoryModel? _selectedCategory;
  String _dealFilter = 'all';
  String _searchQuery = '';
  bool _isTamil = true;

  String _pincode = '560001 - Bengaluru';
  UserModel _user = UserModel(
    id: 'usr-1',
    name: 'Ananya Krishnan',
    tamilName: 'அனன்யா கிருஷ்ணன்',
    phone: '+91 98765 43210',
    email: 'ananya.k@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1VMK7LzmN11OfbTszqVMKU9MRwYeZaznwDllrDgq5bU9FagEjzWHPl7iE7IrMndkrNotBzyUF8XXPWwKS0MR6UhmUgiTsYdG2BfpHEmCWxAr93XRrvj5gimfh2qOy6m5iiMk0FzUml0NZALgeyvQolElc-M_OqYh6x6Qh_2anaqbSfmXrdet0iolaEUyERhlBGWR5vu-ByfwI5BqUvLkll9m0irF2Sjdc1DauDop15XMcbyF0i2DIaY-iw',
  );

  final List<CartItemModel> _cart = [];
  final Set<String> _wishlist = {'prod-1', 'prod-2', 'prod-3', 'prod-4'};
  List<OrderModel> _orders = [];
  CouponModel? _appliedCoupon;

  // Getters
  int get currentTab => _currentTab;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  List<CategoryModel> get categories => _categories;
  List<ProductModel> get products => _products;
  CategoryModel? get selectedCategory => _selectedCategory ?? (_categories.isNotEmpty ? _categories.first : null);
  String get dealFilter => _dealFilter;
  String get searchQuery => _searchQuery;
  bool get isTamil => _isTamil;
  String get pincode => _pincode;
  UserModel get user => _user;
  List<CartItemModel> get cart => _cart;
  Set<String> get wishlist => _wishlist;
  List<OrderModel> get orders => _orders;
  CouponModel? get appliedCoupon => _appliedCoupon;

  int get totalCartCount => _cart.fold(0, (sum, item) => sum + item.quantity);
  int get wishlistCount => _wishlist.length;

  double get subtotal => _cart.fold(0.0, (sum, item) => sum + item.totalPrice);

  double get discountAmount {
    if (_appliedCoupon == null) return 0.0;
    if (_appliedCoupon!.flatDiscount > 0) return _appliedCoupon!.flatDiscount;
    if (_appliedCoupon!.discountPercent > 0) {
      final calc = (subtotal * _appliedCoupon!.discountPercent) / 100.0;
      return calc > _appliedCoupon!.maxDiscount ? _appliedCoupon!.maxDiscount : calc;
    }
    return 0.0;
  }

  double get totalPayable {
    final fee = _cart.isNotEmpty ? 5.0 : 0.0;
    final total = subtotal - discountAmount + fee;
    return total > 0 ? total : 0.0;
  }

  MarketplaceProvider() {
    init();
  }

  Future<void> init() async {
    _isLoading = true;
    notifyListeners();

    try {
      final catFuture = ApiService.getCategories();
      final prodFuture = ApiService.getProducts();
      final ordFuture = ApiService.getOrders();

      _categories = await catFuture;
      _products = await prodFuture;
      _orders = await ordFuture;

      if (_categories.isNotEmpty) {
        _selectedCategory = _categories.first;
      }

      // Initial demo cart
      if (_products.isNotEmpty) {
        _cart.add(CartItemModel(
          cartItemId: 'cart-1',
          product: _products[0],
          selectedColor: 'Celestial Blue',
          selectedStorage: '256 GB',
          quantity: 1,
        ));
      }
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void setTab(int index) {
    _currentTab = index;
    notifyListeners();
  }

  void selectCategory(CategoryModel cat) {
    _selectedCategory = cat;
    notifyListeners();
  }

  void setDealFilter(String filter) {
    _dealFilter = filter;
    notifyListeners();
  }

  void setSearch(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void setPincode(String pin) {
    _pincode = pin;
    notifyListeners();
  }

  void toggleLanguage() {
    _isTamil = !_isTamil;
    notifyListeners();
  }

  bool isInWishlist(String productId) => _wishlist.contains(productId);

  void toggleWishlist(String productId) {
    if (_wishlist.contains(productId)) {
      _wishlist.remove(productId);
    } else {
      _wishlist.add(productId);
    }
    notifyListeners();
  }

  void addToCart(ProductModel product, {String? color, String? storage, int quantity = 1}) {
    final selColor = color ?? (product.colors.isNotEmpty ? product.colors.first.name : 'Default');
    final selStorage = storage ?? (product.storageOptions.isNotEmpty ? product.storageOptions.first : 'Standard');

    final index = _cart.indexWhere((item) =>
        item.product.id == product.id &&
        item.selectedColor == selColor &&
        item.selectedStorage == selStorage);

    if (index >= 0) {
      _cart[index].quantity += quantity;
    } else {
      _cart.add(CartItemModel(
        cartItemId: 'cart-${DateTime.now().millisecondsSinceEpoch}',
        product: product,
        selectedColor: selColor,
        selectedStorage: selStorage,
        quantity: quantity,
      ));
    }
    notifyListeners();
  }

  void updateCartQuantity(String cartItemId, int delta) {
    final index = _cart.indexWhere((item) => item.cartItemId == cartItemId);
    if (index >= 0) {
      final newQty = _cart[index].quantity + delta;
      if (newQty <= 0) {
        _cart.removeAt(index);
      } else {
        _cart[index].quantity = newQty;
      }
      notifyListeners();
    }
  }

  void removeFromCart(String cartItemId) {
    _cart.removeWhere((item) => item.cartItemId == cartItemId);
    notifyListeners();
  }

  bool applyCoupon(String code) {
    if (code.toUpperCase() == 'PORULAGAM10') {
      _appliedCoupon = CouponModel(
        code: 'PORULAGAM10',
        title: 'Flat 10% Off',
        description: 'Up to ₹1,500 off',
        discountPercent: 10,
        maxDiscount: 1500,
        minCartValue: 2999,
      );
      notifyListeners();
      return true;
    } else if (code.toUpperCase() == 'WELCOME500') {
      _appliedCoupon = CouponModel(
        code: 'WELCOME500',
        title: 'Flat ₹500 Off',
        description: 'Welcome discount',
        flatDiscount: 500,
        minCartValue: 1999,
      );
      notifyListeners();
      return true;
    }
    return false;
  }

  void removeCoupon() {
    _appliedCoupon = null;
    notifyListeners();
  }

  Future<OrderModel?> checkout({String paymentMethod = 'UPI'}) async {
    if (_cart.isEmpty) return null;

    final itemsPayload = _cart.map((c) => {
      'product_id': c.product.id,
      'product_name': c.product.name,
      'product_image': c.product.mainImage,
      'color': c.selectedColor,
      'quantity': c.quantity,
      'price': c.product.price,
    }).toList();

    final result = await ApiService.createOrder(
      items: itemsPayload,
      totalAmount: totalPayable,
      deliveryAddress: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103',
      paymentMethod: paymentMethod,
    );

    final orderId = result['order_id'] ?? 'POR-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}';

    final newOrder = OrderModel(
      id: orderId,
      userId: _user.id,
      orderDate: 'Just Now',
      status: 'transit',
      statusText: 'Order Placed - Being Packed at Hub',
      deliveryDate: 'Arriving in 2 Days',
      courier: 'Porulagam Speed Express',
      trackingNumber: result['tracking_number'] ?? 'PE-EXP-89021948',
      totalAmount: totalPayable,
      deliveryAddress: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103',
      paymentMethod: paymentMethod,
      steps: [
        TrackingStep(title: 'Order Confirmed', time: 'Just now', done: true, current: true),
        TrackingStep(title: 'Packed at Hub', time: 'In 4 hours', done: false),
        TrackingStep(title: 'Shipped via Express Air', time: 'Tomorrow', done: false),
        TrackingStep(title: 'Out for Delivery', time: 'In 2 days', done: false),
        TrackingStep(title: 'Delivered', time: 'In 2 days', done: false),
      ],
      items: _cart.map((c) => OrderItemModel(
        productId: c.product.id,
        productName: c.product.name,
        productImage: c.product.mainImage,
        color: c.selectedColor,
        quantity: c.quantity,
        price: c.product.price,
      )).toList(),
    );

    _orders.insert(0, newOrder);
    _cart.clear();
    _appliedCoupon = null;
    _currentTab = 3; // Switch to Orders tab
    notifyListeners();
    return newOrder;
  }
}
