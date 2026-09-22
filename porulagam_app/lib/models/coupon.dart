import 'product.dart';

class CartItemModel {
  final String cartItemId;
  final ProductModel product;
  final String selectedColor;
  final String selectedStorage;
  int quantity;

  CartItemModel({
    required this.cartItemId,
    required this.product,
    required this.selectedColor,
    required this.selectedStorage,
    this.quantity = 1,
  });

  double get totalPrice => product.price * quantity;
}

class CouponModel {
  final String code;
  final String title;
  final String description;
  final int discountPercent;
  final double flatDiscount;
  final double maxDiscount;
  final double minCartValue;

  CouponModel({
    required this.code,
    required this.title,
    required this.description,
    this.discountPercent = 0,
    this.flatDiscount = 0.0,
    this.maxDiscount = 0.0,
    this.minCartValue = 0.0,
  });

  factory CouponModel.fromJson(Map<String, dynamic> json) {
    return CouponModel(
      code: json['code'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      discountPercent: json['discount_percent'] ?? 0,
      flatDiscount: (json['flat_discount'] as num?)?.toDouble() ?? 0.0,
      maxDiscount: (json['max_discount'] as num?)?.toDouble() ?? 0.0,
      minCartValue: (json['min_cart_value'] as num?)?.toDouble() ?? 0.0,
    );
  }
}

class BankOfferModel {
  final String bank;
  final String tag;
  final String offer;
  final String minTxn;
  final String badge;

  BankOfferModel({
    required this.bank,
    required this.tag,
    required this.offer,
    required this.minTxn,
    required this.badge,
  });

  factory BankOfferModel.fromJson(Map<String, dynamic> json) {
    return BankOfferModel(
      bank: json['bank'] ?? '',
      tag: json['tag'] ?? '',
      offer: json['offer'] ?? '',
      minTxn: json['min_txn'] ?? '',
      badge: json['badge'] ?? 'INSTANT',
    );
  }
}
