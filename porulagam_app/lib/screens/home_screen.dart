import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/marketplace_provider.dart';
import 'product_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final isTamil = provider.isTamil;
    final products = provider.products;
    final categories = provider.categories;

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // Bank Offer Ticker
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFFE2E7FF), Color(0xFFEAEDFF), Color(0xFFE2E7FF)],
                  ),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFC4C5D7).withOpacity(0.3)),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1E50D8).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.account_balance_wallet, color: Color(0xFF0039B1), size: 20),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            isTamil ? 'உடனடி 10% வங்கி கேஷ்பேக்' : 'Flat 10% Instant Bank Cashback',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF131B2E)),
                          ),
                          Text(
                            isTamil ? 'HDFC & SBI கார்டுகளுக்கு | குறைந்தபட்சம் ₹4,999' : 'On HDFC & SBI Bank Cards | Min ₹4,999',
                            style: const TextStyle(fontSize: 11, color: Color(0xFF434654)),
                          ),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        provider.applyCoupon('PORULAGAM10');
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('PORULAGAM10 Coupon Claimed!'), duration: Duration(seconds: 2)),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF0039B1),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        minimumSize: Size.zero,
                        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      child: Text(isTamil ? 'பெறுக' : 'Claim', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Circular Category Navigation
          SliverToBoxAdapter(
            child: SizedBox(
              height: 100,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                itemCount: categories.length,
                separatorBuilder: (_, __) => const SizedBox(width: 16),
                itemBuilder: (context, index) {
                  final cat = categories[index];
                  return InkWell(
                    onTap: () {
                      provider.selectCategory(cat);
                      provider.setTab(1); // Switch to Categories tab
                    },
                    borderRadius: BorderRadius.circular(30),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        CircleAvatar(
                          radius: 26,
                          backgroundColor: const Color(0xFFDCE1FF),
                          child: Icon(_getIconData(cat.icon), color: const Color(0xFF0039B1), size: 24),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          isTamil ? cat.tamilName : cat.name,
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF131B2E)),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ),

          // Hero Promotional Banner
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF0039B1), Color(0xFF1E50D8), Color(0xFF001550)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxTheme.subtleShadow,
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.bolt, color: Color(0xFF6FFBBE), size: 14),
                              SizedBox(width: 4),
                              Text('LIMITED TIME DROP', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                        const Text('04h : 22m : 18s', style: TextStyle(color: Color(0xFF6FFBBE), fontWeight: FontWeight.bold, fontSize: 12)),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      isTamil ? 'மின்னணுவியல் பெருந்தள்ளுபடி' : 'Electronics & Gadgets Mega Drop',
                      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white, height: 1.2),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      isTamil ? '70% வரை நேரடி தள்ளுபடி + கூடுதல் எக்ஸ்சேஞ்ச் போனஸ்' : 'Up to 70% Off on flagship smartphones, ANC audio & tablets.',
                      style: const TextStyle(fontSize: 12, color: Color(0xFFDCE1FF)),
                    ),
                    const SizedBox(height: 14),
                    ElevatedButton(
                      onPressed: () => provider.setTab(2),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFF0039B1),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      ),
                      child: Text(isTamil ? 'சலுகைகளைக் காண்க' : 'Explore All Drops', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Header for Products
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.local_fire_department, color: Color(0xFFBA1A1A), size: 22),
                      const SizedBox(width: 6),
                      Text(
                        isTamil ? 'இன்றைய சூப்பர் சலுகைகள்' : "Today's Super Drops",
                        style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Color(0xFF131B2E)),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: () => provider.setTab(2),
                    child: Text(isTamil ? 'அனைத்தும் காண்க' : 'View All', style: const TextStyle(color: Color(0xFF0039B1), fontWeight: FontWeight.bold, fontSize: 12)),
                  ),
                ],
              ),
            ),
          ),

          // 2-Column Product Grid
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.65,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
              ),
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final product = products[index];
                  final inWishlist = provider.isInWishlist(product.id);

                  return Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E7FF)),
                      boxShadow: [
                        BoxShadow(color: const Color(0xFF0F172A).withOpacity(0.04), blurRadius: 4, offset: const Offset(0, 1)),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Image & Wishlist Button
                        Stack(
                          children: [
                            InkWell(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product)),
                                );
                              },
                              child: Container(
                                height: 135,
                                width: double.infinity,
                                padding: const EdgeInsets.all(8),
                                decoration: const BoxDecoration(
                                  color: Color(0xFFF2F3FF),
                                  borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
                                ),
                                child: Image.network(
                                  product.mainImage,
                                  fit: BoxFit.contain,
                                  errorBuilder: (_, __, ___) => const Icon(Icons.devices, size: 50, color: Colors.grey),
                                ),
                              ),
                            ),
                            Positioned(
                              top: 8,
                              left: 8,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF006C49),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  '${product.discountPercent}% OFF',
                                  style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                            Positioned(
                              top: 6,
                              right: 6,
                              child: InkWell(
                                onTap: () => provider.toggleWishlist(product.id),
                                child: CircleAvatar(
                                  radius: 14,
                                  backgroundColor: Colors.white.withOpacity(0.85),
                                  child: Icon(
                                    inWishlist ? Icons.favorite : Icons.favorite_border,
                                    size: 16,
                                    color: inWishlist ? Colors.red : Colors.grey,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),

                        // Title & Price
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(10),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      product.brand.toUpperCase(),
                                      style: const TextStyle(fontSize: 10, color: Color(0xFF747686), fontWeight: FontWeight.bold),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      product.shortName,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF131B2E), height: 1.2),
                                    ),
                                  ],
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Text(
                                          '₹${product.price.toStringAsFixed(0)}',
                                          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Color(0xFF0039B1)),
                                        ),
                                        if (product.originalPrice != null) ...[
                                          const SizedBox(width: 4),
                                          Text(
                                            '₹${product.originalPrice!.toStringAsFixed(0)}',
                                            style: const TextStyle(fontSize: 10, color: Colors.grey, decoration: TextDecoration.lineThrough),
                                          ),
                                        ],
                                      ],
                                    ),
                                    const SizedBox(height: 6),
                                    SizedBox(
                                      width: double.infinity,
                                      child: ElevatedButton(
                                        onPressed: () {
                                          provider.addToCart(product);
                                          ScaffoldMessenger.of(context).showSnackBar(
                                            SnackBar(
                                              content: Text('${product.shortName} added to cart!'),
                                              duration: const Duration(seconds: 2),
                                            ),
                                          );
                                        },
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: const Color(0xFFDCE1FF),
                                          foregroundColor: const Color(0xFF0039B1),
                                          elevation: 0,
                                          padding: const EdgeInsets.symmetric(vertical: 4),
                                          minimumSize: Size.zero,
                                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                        ),
                                        child: Text(isTamil ? 'கூடையில் சேர்' : 'Add', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
                childCount: products.length,
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: 30)),
        ],
      ),
    );
  }

  static IconData _getIconData(String name) {
    switch (name) {
      case 'smartphone': return Icons.smartphone;
      case 'checkroom': return Icons.checkroom;
      case 'chair': return Icons.chair;
      case 'kitchen': return Icons.kitchen;
      case 'spa': return Icons.spa;
      case 'local_mall': return Icons.local_mall;
      case 'fitness_center': return Icons.fitness_center;
      case 'menu_book': return Icons.menu_book;
      default: return Icons.devices_other;
    }
  }
}

class BoxTheme {
  static final subtleShadow = BoxShadow(
    color: const Color(0xFF0039B1).withOpacity(0.2),
    blurRadius: 10,
    offset: const Offset(0, 4),
  );
}
