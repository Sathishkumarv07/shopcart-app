class Subcategory {
  final String id;
  final String name;
  final String icon;

  Subcategory({required this.id, required this.name, required this.icon});

  factory Subcategory.fromJson(Map<String, dynamic> json) {
    return Subcategory(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      icon: json['icon'] ?? 'category',
    );
  }
}

class CategoryModel {
  final String id;
  final String name;
  final String tamilName;
  final String icon;
  final String colorClass;
  final String bannerTitle;
  final String bannerSubtitle;
  final String bannerIcon;
  final List<Subcategory> subcategories;

  CategoryModel({
    required this.id,
    required this.name,
    required this.tamilName,
    required this.icon,
    this.colorClass = '',
    this.bannerTitle = '',
    this.bannerSubtitle = '',
    this.bannerIcon = 'shopping_bag',
    this.subcategories = const [],
  });

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    var subs = <Subcategory>[];
    if (json['subcategories'] != null) {
      subs = (json['subcategories'] as List)
          .map((item) => Subcategory.fromJson(item))
          .toList();
    }
    return CategoryModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      tamilName: json['tamil_name'] ?? json['name'] ?? '',
      icon: json['icon'] ?? 'devices_other',
      colorClass: json['color_class'] ?? '',
      bannerTitle: json['banner_title'] ?? '',
      bannerSubtitle: json['banner_subtitle'] ?? '',
      bannerIcon: json['banner_icon'] ?? 'bolt',
      subcategories: subs,
    );
  }
}
