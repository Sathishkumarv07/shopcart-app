import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/product.dart';
import '../providers/marketplace_provider.dart';

class ProductDetailScreen extends StatefulWidget {
  final ProductModel product;

  const ProductDetailScreen({super.key, required this.product});

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  late String _activeImage;
  String? _selectedColor;
  String? _selectedStorage;

  @override
  void initState() {
    super.initState();
    _activeImage = widget.product.mainImage;
    if (widget.product.colors.isNotEmpty) {
      _selectedColor = widget.product.colors.first.name;
    }
    if (widget.product.storageOptions.isNotEmpty) {
      _selectedStorage = widget.product.storageOptions.first;
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final isTamil = provider.isTamil;
    final inWishlist = provider.isInWishlist(widget.product.id);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.product.brand),
        actions: [
          IconButton(
            icon: Icon(inWishlist ? Icons.favorite : Icons.favorite_border, color: inWishlist ? Colors.red : null),
            onPressed: () => provider.toggleWishlist(widget.product.id),
          ),
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Product link copied!')));
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Gallery
            Container(
              height: 320,
              width: double.infinity,
              color: Colors.white,
              padding: const EdgeInsets.all(16),
              child: Center(
                child: Image.network(
                  _activeImage,
                  fit: BoxFit.contain,
                  errorBuilder: (_, __, ___) => const Icon(Icons.devices, size: 80, color: Colors.grey),
                ),
              ),
            ),

            // Thumbnails
            if (widget.product.images.length > 1)
              Container(
                height: 70,
                color: Colors.white,
                padding: const EdgeInsets.only(bottom: 12),
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: widget.product.images.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 8),
                  itemBuilder: (context, index) {
                    final img = widget.product.images[index];
                    final isSelected = img == _activeImage;

                    return InkWell(
                      onTap: () => setState(() => _activeImage = img),
                      child: Container(
                        width: 55,
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF2F3FF),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: isSelected ? const Color(0xFF0039B1) : Colors.transparent,
                            width: 2,
                          ),
                        ),
                        child: Image.network(img, fit: BoxFit.contain),
                      ),
                    );
                  },
                ),
              ),

            // Info Card
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(widget.product.brand.toUpperCase(), style: const TextStyle(color: Color(0xFF0039B1), fontWeight: FontWeight.bold, fontSize: 12)),
                      const Row(
                        children: [
                          Icon(Icons.bolt, color: Color(0xFF006C49), size: 16),
                          SizedBox(width: 2),
                          Text('In Stock', style: TextStyle(color: Color(0xFF006C49), fontWeight: FontWeight.bold, fontSize: 12)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    widget.product.name,
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, height: 1.3),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFF006C49),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            Text('${widget.product.rating}', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 11)),
                            const SizedBox(width: 2),
                            const Icon(Icons.star, color: Colors.white, size: 12),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text('${widget.product.reviewCount} Ratings & Reviews', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text('₹${widget.product.price.toStringAsFixed(0)}', style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Color(0xFF0039B1))),
                      if (widget.product.originalPrice != null) ...[
                        const SizedBox(width: 8),
                        Text('₹${widget.product.originalPrice!.toStringAsFixed(0)}', style: const TextStyle(fontSize: 14, color: Colors.grey, decoration: TextDecoration.lineThrough)),
                        const SizedBox(width: 8),
                        Text('${widget.product.discountPercent}% OFF', style: const TextStyle(fontSize: 12, color: Color(0xFF006C49), fontWeight: FontWeight.bold)),
                      ],
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),

            // Color Selector
            if (widget.product.colors.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(16),
                color: Colors.white,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${isTamil ? "நிறம்" : "Color"}: ${_selectedColor ?? ""}',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: widget.product.colors.map((c) {
                        final isSelected = c.name == _selectedColor;
                        return Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: InkWell(
                            onTap: () => setState(() => _selectedColor = c.name),
                            borderRadius: BorderRadius.circular(20),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: isSelected ? const Color(0xFF0039B1) : Colors.grey.shade300, width: isSelected ? 2 : 1),
                                color: isSelected ? const Color(0xFFDCE1FF).withOpacity(0.5) : Colors.white,
                              ),
                              child: Text(c.name, style: TextStyle(fontSize: 12, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ],
                ),
              ),

            // Storage Selector
            if (widget.product.storageOptions.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(16),
                color: Colors.white,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${isTamil ? "அளவு" : "Storage"}: ${_selectedStorage ?? ""}',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: widget.product.storageOptions.map((st) {
                        final isSelected = st == _selectedStorage;
                        return Padding(
                          padding: const EdgeInsets.only(right: 12),
                          child: InkWell(
                            onTap: () => setState(() => _selectedStorage = st),
                            borderRadius: BorderRadius.circular(10),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                                color: isSelected ? const Color(0xFF0039B1) : Colors.white,
                                border: Border.all(color: isSelected ? const Color(0xFF0039B1) : Colors.grey.shade300),
                              ),
                              child: Text(
                                st,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: isSelected ? Colors.white : Colors.black87,
                                ),
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ],
                ),
              ),

            // Specs
            if (widget.product.specs.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(16),
                color: Colors.white,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(isTamil ? 'தொழில்நுட்ப விவரங்கள்' : 'Specifications', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                    const SizedBox(height: 10),
                    ...widget.product.specs.entries.map((entry) => Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(
                                width: 120,
                                child: Text(entry.key, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                              ),
                              Expanded(
                                child: Text(entry.value.toString(), style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                              ),
                            ],
                          ),
                        )),
                  ],
                ),
              ),
            const SizedBox(height: 80),
          ],
        ),
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 10, offset: const Offset(0, -4)),
          ],
        ),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () {
                  provider.addToCart(widget.product, color: _selectedColor, storage: _selectedStorage);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('${widget.product.shortName} added to cart!')),
                  );
                },
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  side: const BorderSide(color: Color(0xFF0039B1)),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text(isTamil ? 'கூடையில் சேர்' : 'Add to Cart', style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0039B1))),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  provider.addToCart(widget.product, color: _selectedColor, storage: _selectedStorage);
                  provider.setTab(3); // Go to Orders
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF0039B1),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text(isTamil ? 'உடனடி கொள்முதல்' : 'Buy Now', style: const TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
