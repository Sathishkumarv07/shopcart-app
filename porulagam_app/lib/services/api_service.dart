import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/category.dart';
import '../models/product.dart';
import '../models/order.dart';
import '../models/coupon.dart';

class ApiService {
  // Use 10.0.2.2 for Android emulator or localhost for Web/Desktop/iOS
  static const String baseUrl = 'http://localhost:8000/api';

  // Fetch all categories
  static Future<List<CategoryModel>> getCategories() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/categories')).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final List data = json.decode(utf8.decode(response.bodyBytes));
        return data.map((json) => CategoryModel.fromJson(json)).toList();
      }
    } catch (e) {
      // Fallback
    }
    return _getFallbackCategories();
  }

  // Fetch products with optional category, subcategory and search filter
  static Future<List<ProductModel>> getProducts({String? category, String? subcategory, String? search}) async {
    try {
      var uri = Uri.parse('$baseUrl/products').replace(queryParameters: {
        if (category != null) 'category': category,
        if (subcategory != null) 'subcategory': subcategory,
        if (search != null && search.isNotEmpty) 'search': search,
      });

      final response = await http.get(uri).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final List data = json.decode(utf8.decode(response.bodyBytes));
        return data.map((json) => ProductModel.fromJson(json)).toList();
      }
    } catch (e) {
      // Fallback
    }
    return _getFallbackProducts(category: category, search: search);
  }

  // Fetch single product detail
  static Future<ProductModel?> getProductDetail(String id) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/products/$id')).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        return ProductModel.fromJson(json.decode(utf8.decode(response.bodyBytes)));
      }
    } catch (e) {
      // Fallback
    }
    final all = _getFallbackProducts();
    try {
      return all.firstWhere((p) => p.id == id);
    } catch (_) {
      return all.isNotEmpty ? all.first : null;
    }
  }

  // Fetch deals, flash drops and coupons
  static Future<Map<String, dynamic>> getDeals() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/deals')).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final data = json.decode(utf8.decode(response.bodyBytes));
        return {
          'featured_drop_title': data['featured_drop_title'] ?? 'Mega Flash Drop',
          'countdown_seconds': data['countdown_seconds'] ?? 9840,
          'deal_products': (data['deal_products'] as List).map((p) => ProductModel.fromJson(p)).toList(),
          'coupons': (data['coupons'] as List).map((c) => CouponModel.fromJson(c)).toList(),
          'bank_offers': (data['bank_offers'] as List).map((b) => BankOfferModel.fromJson(b)).toList(),
        };
      }
    } catch (e) {
      // Fallback
    }
    return {
      'featured_drop_title': 'Mega Flash Drop',
      'countdown_seconds': 9840,
      'deal_products': _getFallbackProducts().where((p) => p.discountPercent >= 15).toList(),
      'coupons': _getFallbackCoupons(),
      'bank_offers': _getFallbackBankOffers(),
    };
  }

  // Fetch orders
  static Future<List<OrderModel>> getOrders({String userId = 'usr-1'}) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/orders?user_id=$userId')).timeout(const Duration(seconds: 4));
      if (response.statusCode == 200) {
        final List data = json.decode(utf8.decode(response.bodyBytes));
        return data.map((json) => OrderModel.fromJson(json)).toList();
      }
    } catch (e) {
      // Fallback
    }
    return _getFallbackOrders();
  }

  // Create order
  static Future<Map<String, dynamic>> createOrder({
    required List<Map<String, dynamic>> items,
    required double totalAmount,
    required String deliveryAddress,
    String paymentMethod = 'UPI',
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/orders'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'items': items,
          'total_amount': totalAmount,
          'delivery_address': deliveryAddress,
          'payment_method': paymentMethod,
          'user_id': 'usr-1',
        }),
      ).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        return json.decode(utf8.decode(response.bodyBytes));
      }
    } catch (e) {
      // Fallback
    }
    return {
      'success': true,
      'order_id': 'POR-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}',
      'status': 'Order Placed (Offline Mode)',
      'message': 'Order processed successfully!'
    };
  }

  // Mock fallbacks ensuring app always renders immediately
  static List<CategoryModel> _getFallbackCategories() {
    return [
      CategoryModel(id: 'electronics', name: 'Electronics', tamilName: 'மின்னணுவியல்', icon: 'devices_other', bannerTitle: 'Electronics Clearance', bannerSubtitle: 'Up to 70% Off on Tech Essentials'),
      CategoryModel(id: 'mobiles', name: 'Mobiles', tamilName: 'கைபேசிகள்', icon: 'smartphone', bannerTitle: 'Flagship 5G Smart Phones', bannerSubtitle: 'Exchange Bonus up to ₹8,000'),
      CategoryModel(id: 'fashion', name: 'Fashion', tamilName: 'ஆடைகள் & பேஷன்', icon: 'checkroom', bannerTitle: 'Festive Season Grand Sale', bannerSubtitle: 'Min 50% - 80% Off'),
      CategoryModel(id: 'home-living', name: 'Home & Living', tamilName: 'வீட்டு உபயோகம்', icon: 'chair', bannerTitle: 'Modern Home Makeover', bannerSubtitle: 'Upto 65% Off Furniture'),
      CategoryModel(id: 'appliances', name: 'Appliances', tamilName: 'மின்சாதனங்கள்', icon: 'kitchen', bannerTitle: 'Smart Cooling & Appliances', bannerSubtitle: 'Inverter ACs & Double Door Fridges'),
      CategoryModel(id: 'beauty', name: 'Beauty & Care', tamilName: 'அழகு & பராமரிப்பு', icon: 'spa', bannerTitle: 'Glow & Wellness Festival', bannerSubtitle: 'Buy 2 Get 1 Free on Serums'),
      CategoryModel(id: 'groceries', name: 'Groceries', tamilName: 'மளிகைப் பொருட்கள்', icon: 'local_mall', bannerTitle: 'Daily Super Pantry', bannerSubtitle: 'Delivered in 10-20 Mins'),
      CategoryModel(id: 'sports', name: 'Sports & Fitness', tamilName: 'விளையாட்டு', icon: 'fitness_center', bannerTitle: 'Peak Performance Gear', bannerSubtitle: 'Flat 40% Off on Gym Gear'),
      CategoryModel(id: 'books', name: 'Books', tamilName: 'புத்தகங்கள்', icon: 'menu_book', bannerTitle: 'Literary Treasures', bannerSubtitle: 'Buy 3 Books at Flat ₹799'),
    ];
  }

  static List<ProductModel> _getFallbackProducts({String? category, String? search}) {
    final list = [
      ProductModel(
        id: 'prod-1',
        name: 'UltraTech Neo 15 Pro 5G (Celestial Blue, 256 GB, 12 GB RAM)',
        shortName: 'UltraTech Neo 15 Pro 5G',
        brand: 'UltraTech Pro',
        categoryId: 'electronics',
        subcategory: 'Smart Phones',
        price: 34999.00,
        originalPrice: 42999.00,
        discountPercent: 19,
        rating: 4.6,
        reviewCount: 14208,
        badge: 'Best Seller',
        assured: true,
        mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2PzbGKvccLfzdlcXqTbR0LlXY-buu4Q-GVyThXXtSgGIV2ePGZmycarqo15LKK-Qw4eaB74_KGLaq-ZrQNA4WmYyNYe84lJDIcrcvGS4hfpPsBS0B7DBz3So3wgGuZd142LyZ5lLuMwMiq1rm5XAnVrISq2uCK7dv8sjmv3mpESWOK9k1XSh33S-Ba1EmGSk0tWEepBQnvZFqF426SZsQlk37pEokCq5BKVnp6cZUsvJ5hDZEaCp',
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2PzbGKvccLfzdlcXqTbR0LlXY-buu4Q-GVyThXXtSgGIV2ePGZmycarqo15LKK-Qw4eaB74_KGLaq-ZrQNA4WmYyNYe84lJDIcrcvGS4hfpPsBS0B7DBz3So3wgGuZd142LyZ5lLuMwMiq1rm5XAnVrISq2uCK7dv8sjmv3mpESWOK9k1XSh33S-Ba1EmGSk0tWEepBQnvZFqF426SZsQlk37pEokCq5BKVnp6cZUsvJ5hDZEaCp',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDHXhbbLZZDtml-1JWvjOE-pIL-XSitJ0XEC7ukY77t1KaDfm1TxpVbc4CNP40CLmoENVwjvfc6dx3LG5ASBkNLdlTuWGEvy44fbBDVUCEkzTF68ud0j5pDHxcSlSHlr5_ZD6d5DgpVJRvEiZvcJZLCGZcK-If9epspdDoUAMHQW5Fj7bNNhlYKJXEedPpIaTITjtijcjlxwRgOPE__gMWhq_B2_puJO3S7DSDEgwHBNVZ0GtN68E-g',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBh5nTaDJKLKPGmfthc_1gRuU8NvhM6QvDKlPRF_mmI7txUamXfCCNGdh0mXflmX2P_G0-N0kn9fCJVjSz9PGCtWFw2IK0YxuSqa24BHZxUEpi2VVK7L1Jxt9wdC7s65OYCvBHlIh2VVz9lCGihiPG0j7-GNhA22ehJsYifgE02S6Ut0Dn4wI671bTV5x8J6BI9fpJjVDkVPvx3GA4lgO4XukcsdtRzzdTHzcmlWY-wTN9WdX-pem6u',
        ],
        colors: [ColorOption(name: 'Celestial Blue', hex: '#1E50D8'), ColorOption(name: 'Phantom Graphite', hex: '#283044')],
        storageOptions: ['128 GB', '256 GB', '512 GB'],
        specs: {'Display': '6.78" 1.5K 120Hz LTPO AMOLED', 'Processor': 'Snapdragon 8 Gen 3', 'Battery': '5400 mAh with 100W SuperVOOC'},
        highlights: ['50MP Triple OIS Flagship Camera', 'Ultra-bright 4500 nits Display', 'SuperVOOC 100W Fast Charger Included'],
      ),
      ProductModel(
        id: 'prod-2',
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        shortName: 'Sony WH-1000XM5 ANC',
        brand: 'Sony',
        categoryId: 'electronics',
        subcategory: 'Audio & Buds',
        price: 24990.00,
        originalPrice: 29990.00,
        discountPercent: 42,
        rating: 4.8,
        reviewCount: 8940,
        badge: '42% OFF',
        assured: true,
        mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy'],
        colors: [ColorOption(name: 'Matte Black', hex: '#131B2E'), ColorOption(name: 'Silver White', hex: '#FAF8FF')],
        storageOptions: ['Standard'],
        specs: {'Driver': '30mm carbon fiber', 'Battery': '30 hrs with ANC on'},
        highlights: ['Industry-leading 8-mic ANC', 'Auto NC Optimizer'],
      ),
      ProductModel(
        id: 'prod-3',
        name: 'Apple iPad Air 11" (M2 Chip, Liquid Retina, 128GB, Space Gray)',
        shortName: 'iPad Air 11" M2',
        brand: 'Apple',
        categoryId: 'electronics',
        subcategory: 'Tablets & iPads',
        price: 54900.00,
        originalPrice: 59900.00,
        discountPercent: 8,
        rating: 4.9,
        reviewCount: 3120,
        badge: 'HOT',
        mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtxnH0Ps5EDAFkaDaYQO6Wbp_Or7PWYuX94PzyU9dlB4uSSCmNvbE-H0SxEX93v35AJq-TwanTxoZTkRCbY_F8wQKVfR2-JfQdoXjp_AJJBZId9eB5St8edR0oR9Y7Uq5PONhpsRdeSoGrZD4vgaaECm4WS66HS8cDlvSYXHfAU4UDZv-ELGliyZ7JJ19HmH-uY4vw49k7M3s3xdWIxjfMLPS-EnAZELz96oMbHrWJeLU8rkzCCqA_',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAtxnH0Ps5EDAFkaDaYQO6Wbp_Or7PWYuX94PzyU9dlB4uSSCmNvbE-H0SxEX93v35AJq-TwanTxoZTkRCbY_F8wQKVfR2-JfQdoXjp_AJJBZId9eB5St8edR0oR9Y7Uq5PONhpsRdeSoGrZD4vgaaECm4WS66HS8cDlvSYXHfAU4UDZv-ELGliyZ7JJ19HmH-uY4vw49k7M3s3xdWIxjfMLPS-EnAZELz96oMbHrWJeLU8rkzCCqA_'],
        colors: [ColorOption(name: 'Space Gray', hex: '#434654')],
        storageOptions: ['128 GB', '256 GB'],
        specs: {'Chipset': 'Apple M2 8-core CPU', 'Display': '11-inch Liquid Retina'},
        highlights: ['Blazing fast M2 chip', 'Landscape 12MP Center Stage Camera'],
      ),
      ProductModel(
        id: 'prod-4',
        name: 'Samsung Galaxy Watch Ultra (Titanium Gray, Orange Band, 47mm LTE)',
        shortName: 'Galaxy Watch Ultra',
        brand: 'Samsung',
        categoryId: 'electronics',
        subcategory: 'Smart Watches',
        price: 49999.00,
        originalPrice: 59999.00,
        discountPercent: 15,
        rating: 4.7,
        reviewCount: 1950,
        badge: '15% OFF',
        mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfqe0gK1UaM9SqMNYla-GuUL1nptplAzfFdqSqNggFv-T1K3WQ-q9-Ppkdg1UnYRGcgCkhUipomWy67SUv-rbzGZ1Gp0s8D9gJHiexnBPtOEV7FQOPkvQ5JQd8KZYeOJx8re5wZ-ki8SmmpSAILWB577airrCC02hGkkjcCMiq2hb4DXEMlD85hbgr0HArzngnxql_l0_nRVB2yDSxiLrdytvJADJFOQCfoYr8wLVrB2xKRB_8hg24',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBfqe0gK1UaM9SqMNYla-GuUL1nptplAzfFdqSqNggFv-T1K3WQ-q9-Ppkdg1UnYRGcgCkhUipomWy67SUv-rbzGZ1Gp0s8D9gJHiexnBPtOEV7FQOPkvQ5JQd8KZYeOJx8re5wZ-ki8SmmpSAILWB577airrCC02hGkkjcCMiq2hb4DXEMlD85hbgr0HArzngnxql_l0_nRVB2yDSxiLrdytvJADJFOQCfoYr8wLVrB2xKRB_8hg24'],
        colors: [ColorOption(name: 'Titanium Gray', hex: '#653E00')],
        storageOptions: ['47mm LTE'],
        specs: {'Casing': 'Grade 4 Titanium 10 ATM', 'Display': '1.5-inch Super AMOLED'},
        highlights: ['Withstands 55°C heat', 'Dual-frequency GPS'],
      ),
      ProductModel(
        id: 'prod-6',
        name: 'boAt Nirvana Ion ANC True Wireless Earbuds (120 hrs Playback)',
        shortName: 'boAt Nirvana Ion ANC',
        brand: 'boAt',
        categoryId: 'electronics',
        subcategory: 'Audio & Buds',
        price: 2499.00,
        originalPrice: 7990.00,
        discountPercent: 68,
        rating: 4.4,
        reviewCount: 32410,
        badge: '68% OFF',
        mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy'],
        colors: [ColorOption(name: 'Charcoal Black', hex: '#131B2E')],
        storageOptions: ['Standard'],
        specs: {'ANC': 'Up to 32dB ANC', 'Battery': '120 Hours total'},
        highlights: ['120 Hours backup', 'Crystal Bionic Audio'],
      ),
    ];

    var filtered = list;
    if (category != null) {
      filtered = filtered.where((p) => p.categoryId == category).toList();
    }
    if (search != null && search.isNotEmpty) {
      final q = search.toLowerCase();
      filtered = filtered.where((p) => p.name.toLowerCase().contains(q) || p.brand.toLowerCase().contains(q)).toList();
    }
    return filtered;
  }

  static List<CouponModel> _getFallbackCoupons() {
    return [
      CouponModel(code: 'PORULAGAM10', title: 'Flat 10% Off up to ₹1,500', description: 'Valid on Electronics & Mobiles', discountPercent: 10, maxDiscount: 1500, minCartValue: 2999),
      CouponModel(code: 'WELCOME500', title: 'Flat ₹500 Welcome Discount', description: 'Applicable on first order', flatDiscount: 500, minCartValue: 1999),
      CouponModel(code: 'SUPER50', title: 'SuperCoin Saver - Flat ₹250 Off', description: 'Redeem Plus SuperCoins', flatDiscount: 250, minCartValue: 999),
    ];
  }

  static List<BankOfferModel> _getFallbackBankOffers() {
    return [
      BankOfferModel(bank: 'HDFC Bank', tag: 'Credit & Debit Cards', offer: '10% Instant Cashback up to ₹1,500', minTxn: 'Min order ₹4,999', badge: 'INSTANT'),
      BankOfferModel(bank: 'ICICI Bank', tag: 'No Cost EMI', offer: 'Zero processing fee on 6 & 12 mo EMIs', minTxn: 'Min order ₹7,000', badge: 'NO COST EMI'),
      BankOfferModel(bank: 'SBI Card', tag: 'Credit Cards', offer: 'Flat ₹1,000 Instant Discount', minTxn: 'Min order ₹10,000', badge: 'BANK DROP'),
    ];
  }

  static List<OrderModel> _getFallbackOrders() {
    return [
      OrderModel(
        id: 'POR-892410',
        userId: 'usr-1',
        orderDate: '24 Oct 2024',
        status: 'transit',
        statusText: 'In Transit - Out for Delivery Today',
        deliveryDate: 'Arriving Today by 8:00 PM',
        courier: 'Porulagam Express (Air Speed)',
        trackingNumber: 'PE-IND-90821948',
        totalAmount: 34999.00,
        deliveryAddress: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103',
        paymentMethod: 'UPI (Google Pay)',
        steps: [
          TrackingStep(title: 'Order Confirmed', time: '24 Oct, 09:15 AM', done: true),
          TrackingStep(title: 'Packed at Hub', time: '24 Oct, 01:40 PM', done: true),
          TrackingStep(title: 'Shipped via Express Air', time: '24 Oct, 07:10 PM', done: true),
          TrackingStep(title: 'Out for Delivery', time: 'Today, 08:30 AM', done: true, current: true),
          TrackingStep(title: 'Delivered', time: 'Expected by 08:00 PM', done: false),
        ],
        items: [
          OrderItemModel(
            productId: 'prod-1',
            productName: 'UltraTech Neo 15 Pro 5G (Celestial Blue, 256 GB)',
            productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2PzbGKvccLfzdlcXqTbR0LlXY-buu4Q-GVyThXXtSgGIV2ePGZmycarqo15LKK-Qw4eaB74_KGLaq-ZrQNA4WmYyNYe84lJDIcrcvGS4hfpPsBS0B7DBz3So3wgGuZd142LyZ5lLuMwMiq1rm5XAnVrISq2uCK7dv8sjmv3mpESWOK9k1XSh33S-Ba1EmGSk0tWEepBQnvZFqF426SZsQlk37pEokCq5BKVnp6cZUsvJ5hDZEaCp',
            color: 'Celestial Blue',
            quantity: 1,
            price: 34999.00,
          ),
        ],
      ),
    ];
  }
}
