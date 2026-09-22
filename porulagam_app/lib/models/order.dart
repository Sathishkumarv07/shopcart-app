class TrackingStep {
  final String title;
  final String time;
  final bool done;
  final bool current;

  TrackingStep({
    required this.title,
    required this.time,
    required this.done,
    this.current = false,
  });

  factory TrackingStep.fromJson(Map<String, dynamic> json) {
    return TrackingStep(
      title: json['title'] ?? '',
      time: json['time'] ?? '',
      done: json['done'] ?? false,
      current: json['current'] ?? false,
    );
  }
}

class OrderItemModel {
  final String productId;
  final String productName;
  final String productImage;
  final String color;
  final int quantity;
  final double price;

  OrderItemModel({
    required this.productId,
    required this.productName,
    required this.productImage,
    required this.color,
    required this.quantity,
    required this.price,
  });

  factory OrderItemModel.fromJson(Map<String, dynamic> json) {
    return OrderItemModel(
      productId: json['product_id'] ?? '',
      productName: json['product_name'] ?? '',
      productImage: json['product_image'] ?? '',
      color: json['color'] ?? 'Default',
      quantity: json['quantity'] ?? 1,
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'product_id': productId,
      'product_name': productName,
      'product_image': productImage,
      'color': color,
      'quantity': quantity,
      'price': price,
    };
  }
}

class OrderModel {
  final String id;
  final String userId;
  final String orderDate;
  final String status; // 'transit', 'delivered', 'cancelled'
  final String statusText;
  final String deliveryDate;
  final String courier;
  final String trackingNumber;
  final double totalAmount;
  final String deliveryAddress;
  final String paymentMethod;
  final List<TrackingStep> steps;
  final List<OrderItemModel> items;

  OrderModel({
    required this.id,
    required this.userId,
    required this.orderDate,
    required this.status,
    required this.statusText,
    required this.deliveryDate,
    required this.courier,
    required this.trackingNumber,
    required this.totalAmount,
    required this.deliveryAddress,
    required this.paymentMethod,
    this.steps = const [],
    this.items = const [],
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) {
    var stepList = <TrackingStep>[];
    if (json['steps'] != null) {
      stepList = (json['steps'] as List)
          .map((s) => TrackingStep.fromJson(s))
          .toList();
    }

    var itemList = <OrderItemModel>[];
    if (json['items'] != null) {
      itemList = (json['items'] as List)
          .map((i) => OrderItemModel.fromJson(i))
          .toList();
    }

    return OrderModel(
      id: json['id'] ?? '',
      userId: json['user_id'] ?? 'usr-1',
      orderDate: json['order_date'] ?? 'Recent',
      status: json['status'] ?? 'transit',
      statusText: json['status_text'] ?? 'Processing',
      deliveryDate: json['delivery_date'] ?? 'In 2 Days',
      courier: json['courier'] ?? 'Porulagam Express',
      trackingNumber: json['tracking_number'] ?? '',
      totalAmount: (json['total_amount'] as num?)?.toDouble() ?? 0.0,
      deliveryAddress: json['delivery_address'] ?? '',
      paymentMethod: json['payment_method'] ?? 'UPI',
      steps: stepList,
      items: itemList,
    );
  }
}
