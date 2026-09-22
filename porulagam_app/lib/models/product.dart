class ColorOption {
  final String name;
  final String hex;

  ColorOption({required this.name, required this.hex});

  factory ColorOption.fromJson(Map<String, dynamic> json) {
    return ColorOption(
      name: json['name'] ?? 'Default',
      hex: json['hex'] ?? '#1E50D8',
    );
  }
}

class ProductModel {
  final String id;
  final String name;
  final String shortName;
  final String brand;
  final String categoryId;
  final String subcategory;
  final double price;
  final double? originalPrice;
  final int discountPercent;
  final double rating;
  final int reviewCount;
  final String badge;
  final bool assured;
  final bool inStock;
  final String mainImage;
  final List<String> images;
  final List<ColorOption> colors;
  final List<String> storageOptions;
  final Map<String, dynamic> specs;
  final List<String> highlights;

  ProductModel({
    required this.id,
    required this.name,
    required this.shortName,
    required this.brand,
    required this.categoryId,
    required this.subcategory,
    required this.price,
    this.originalPrice,
    this.discountPercent = 0,
    this.rating = 4.5,
    this.reviewCount = 0,
    this.badge = '',
    this.assured = true,
    this.inStock = true,
    required this.mainImage,
    this.images = const [],
    this.colors = const [],
    this.storageOptions = const [],
    this.specs = const {},
    this.highlights = const [],
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    var imgs = <String>[];
    if (json['images'] != null) {
      imgs = List<String>.from(json['images']);
    } else if (json['main_image'] != null) {
      imgs = [json['main_image']];
    }

    var cols = <ColorOption>[];
    if (json['colors'] != null) {
      cols = (json['colors'] as List).map((c) => ColorOption.fromJson(c)).toList();
    }

    var storages = <String>[];
    if (json['storage_options'] != null) {
      storages = List<String>.from(json['storage_options']);
    }

    var highlts = <String>[];
    if (json['highlights'] != null) {
      highlts = List<String>.from(json['highlights']);
    }

    return ProductModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      shortName: json['short_name'] ?? json['name'] ?? '',
      brand: json['brand'] ?? '',
      categoryId: json['category_id'] ?? '',
      subcategory: json['subcategory'] ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      originalPrice: (json['original_price'] as num?)?.toDouble(),
      discountPercent: json['discount_percent'] ?? 0,
      rating: (json['rating'] as num?)?.toDouble() ?? 4.5,
      reviewCount: json['review_count'] ?? 0,
      badge: json['badge'] ?? '',
      assured: json['assured'] ?? true,
      inStock: json['in_stock'] ?? true,
      mainImage: json['main_image'] ?? (imgs.isNotEmpty ? imgs[0] : ''),
      images: imgs,
      colors: cols,
      storageOptions: storages,
      specs: json['specs'] != null ? Map<String, dynamic>.from(json['specs']) : {},
      highlights: highlts,
    );
  }
}
