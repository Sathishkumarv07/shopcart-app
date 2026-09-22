import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/marketplace_provider.dart';
import '../models/category.dart';
import 'product_detail_screen.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final isTamil = provider.isTamil;
    final categories = provider.categories;
    final selectedCat = provider.selectedCategory;
    final products = provider.products.where((p) => p.categoryId == selectedCat?.id).toList();

    return Scaffold(
      appBar: AppBar(
        title: Text(isTamil ? 'அனைத்து பிரிவுகள்' : 'Explore Categories'),
      ),
      body: Row(
        children: [
          // Left Rail
          Container(
            width: 85,
            color: const Color(0xFFF2F3FF),
            child: ListView.builder(
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final cat = categories[index];
                final isSelected = cat.id == selectedCat?.id;

                return InkWell(
                  onTap: () => provider.selectCategory(cat),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 4),
                    decoration: BoxDecoration(
                      color: isSelected ? Colors.white : Colors.transparent,
                      border: Border(
                        left: BorderSide(
                          color: isSelected ? const Color(0xFF0039B1) : Colors.transparent,
                          width: 4,
                        ),
                      ),
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        CircleAvatar(
                          radius: 18,
                          backgroundColor: isSelected ? const Color(0xFFDCE1FF) : const Color(0xFFEAEDFF),
                          child: Icon(
                            _getIcon(cat.icon),
                            color: isSelected ? const Color(0xFF0039B1) : const Color(0xFF434654),
                            size: 18,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          isTamil ? cat.tamilName : cat.name,
                          textAlign: TextAlign.center,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                            color: isSelected ? const Color(0xFF0039B1) : const Color(0xFF131B2E),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          // Right Panel
          Expanded(
            child: selectedCat == null
                ? const Center(child: CircularProgressIndicator())
                : SingleChildScrollView(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Promo Banner
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF0039B1), Color(0xFF1E50D8), Color(0xFF006C49)],
                            ),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text('CLEARANCE SALE', style: TextStyle(color: Color(0xFF6CF8BB), fontSize: 9, fontWeight: FontWeight.bold)),
                                    const SizedBox(height: 2),
                                    Text(
                                      selectedCat.bannerTitle,
                                      style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                                    ),
                                    Text(
                                      selectedCat.bannerSubtitle,
                                      style: const TextStyle(color: Color(0xFFDCE1FF), fontSize: 10),
                                    ),
                                  ],
                                ),
                              ),
                              const Icon(Icons.bolt, color: Colors.white, size: 32),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Subcategories
                        Text(
                          isTamil ? 'துணைப் பிரிவுகள்' : 'Subcategories',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 10),

                        GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 3,
                            childAspectRatio: 0.85,
                            crossAxisSpacing: 8,
                            mainAxisSpacing: 8,
                          ),
                          itemCount: selectedCat.subcategories.isNotEmpty ? selectedCat.subcategories.length : 6,
                          itemBuilder: (context, index) {
                            final sub = selectedCat.subcategories.isNotEmpty
                                ? selectedCat.subcategories[index]
                                : Subcategory(id: 'sub-$index', name: 'Item ${index + 1}', icon: 'devices');

                            return Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: const Color(0xFFE2E7FF)),
                              ),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  CircleAvatar(
                                    radius: 18,
                                    backgroundColor: const Color(0xFFF2F3FF),
                                    child: Icon(_getIcon(sub.icon), size: 18, color: const Color(0xFF0039B1)),
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    sub.name,
                                    textAlign: TextAlign.center,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                        const SizedBox(height: 16),

                        // Trending in Category
                        Text(
                          isTamil ? 'டிரெண்டிங் தயாரிப்புகள்' : 'Trending Products',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 10),

                        ListView.separated(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: products.isNotEmpty ? products.length : provider.products.take(3).length,
                          separatorBuilder: (_, __) => const SizedBox(height: 8),
                          itemBuilder: (context, index) {
                            final product = products.isNotEmpty ? products[index] : provider.products[index];

                            return InkWell(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product)),
                                );
                              },
                              child: Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: const Color(0xFFE2E7FF)),
                                ),
                                child: Row(
                                  children: [
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(8),
                                      child: Image.network(
                                        product.mainImage,
                                        width: 50,
                                        height: 50,
                                        fit: BoxFit.contain,
                                      ),
                                    ),
                                    const SizedBox(width: 10),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            product.shortName,
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                                          ),
                                          Text(
                                            '₹${product.price.toStringAsFixed(0)}',
                                            style: const TextStyle(color: Color(0xFF0039B1), fontWeight: FontWeight.bold, fontSize: 13),
                                          ),
                                        ],
                                      ),
                                    ),
                                    ElevatedButton(
                                      onPressed: () => provider.addToCart(product),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color(0xFFDCE1FF),
                                        foregroundColor: const Color(0xFF0039B1),
                                        elevation: 0,
                                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                        minimumSize: Size.zero,
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                      ),
                                      child: const Text('Add', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  static IconData _getIcon(String iconName) {
    switch (iconName) {
      case 'phone_iphone': return Icons.phone_iphone;
      case 'laptop_chromebook': return Icons.laptop_chromebook;
      case 'headset': return Icons.headset;
      case 'watch': return Icons.watch;
      case 'photo_camera': return Icons.photo_camera;
      case 'sports_esports': return Icons.sports_esports;
      case 'tablet_mac': return Icons.tablet_mac;
      case 'battery_charging_full': return Icons.battery_charging_full;
      case 'home_iot_device': return Icons.home;
      case 'smartphone': return Icons.smartphone;
      case 'checkroom': return Icons.checkroom;
      case 'chair': return Icons.chair;
      case 'kitchen': return Icons.kitchen;
      case 'spa': return Icons.spa;
      case 'local_mall': return Icons.local_mall;
      case 'fitness_center': return Icons.fitness_center;
      case 'menu_book': return Icons.menu_book;
      default: return Icons.category;
    }
  }
}
