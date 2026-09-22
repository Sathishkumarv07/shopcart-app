import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/marketplace_provider.dart';
import 'product_detail_screen.dart';

class DealsScreen extends StatelessWidget {
  const DealsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final isTamil = provider.isTamil;
    final dealProducts = provider.products.where((p) => p.discountPercent >= 15).toList();

    return Scaffold(
      appBar: AppBar(
        title: Text(isTamil ? 'இன்றைய மெகா சலுகைகள்' : 'Deals & Flash Drops'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Flash banner
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0039B1), Color(0xFF1E50D8), Color(0xFF283044)],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text('MEGA FLASH DROP', style: TextStyle(color: Color(0xFF6FFBBE), fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                      const Text('ENDS SOON', style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    isTamil ? 'உச்சக்கட்ட 68% வரை நேரடி தள்ளுபடி!' : 'Peak Hours: Up to 68% Price Cuts!',
                    style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      _buildTimerBox('02', 'Hours'),
                      const Text(' : ', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      _buildTimerBox('45', 'Mins'),
                      const Text(' : ', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      _buildTimerBox('30', 'Secs'),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Coupons
            Text(isTamil ? 'கூப்பன்கள்' : 'Exclusive Coupons', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: _buildCouponCard(
                    context,
                    provider,
                    'PORULAGAM10',
                    'Flat 10% Off',
                    'Min ₹2,999 on Electronics',
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _buildCouponCard(
                    context,
                    provider,
                    'WELCOME500',
                    'Flat ₹500 Off',
                    'Applicable on first order',
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Deal Products
            Text(isTamil ? 'சிறப்பு சலுகைப் பொருட்கள்' : 'Flash Deal Products', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),

            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: dealProducts.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final product = dealProducts[index];

                return InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product)),
                    );
                  },
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E7FF)),
                    ),
                    child: Row(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Container(
                            color: const Color(0xFFF2F3FF),
                            padding: const EdgeInsets.all(6),
                            child: Image.network(
                              product.mainImage,
                              width: 70,
                              height: 70,
                              fit: BoxFit.contain,
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFBA1A1A),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  '${product.discountPercent}% OFF',
                                  style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                product.shortName,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                              ),
                              const SizedBox(height: 2),
                              Row(
                                children: [
                                  Text(
                                    '₹${product.price.toStringAsFixed(0)}',
                                    style: const TextStyle(color: Color(0xFF0039B1), fontWeight: FontWeight.w900, fontSize: 15),
                                  ),
                                  if (product.originalPrice != null) ...[
                                    const SizedBox(width: 6),
                                    Text(
                                      '₹${product.originalPrice!.toStringAsFixed(0)}',
                                      style: const TextStyle(color: Colors.grey, fontSize: 11, decoration: TextDecoration.lineThrough),
                                    ),
                                  ],
                                ],
                              ),
                            ],
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () => provider.addToCart(product),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF0039B1),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          ),
                          child: const Text('Claim', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
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
    );
  }

  Widget _buildTimerBox(String value, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.3),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Text(value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
          Text(label, style: const TextStyle(color: Colors.white60, fontSize: 8)),
        ],
      ),
    );
  }

  Widget _buildCouponCard(BuildContext context, MarketplaceProvider provider, String code, String title, String desc) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFF0039B1).withOpacity(0.3), style: BorderStyle.solid),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(color: const Color(0xFFDCE1FF), borderRadius: BorderRadius.circular(6)),
            child: Text(code, style: const TextStyle(color: Color(0xFF0039B1), fontWeight: FontWeight.bold, fontSize: 10)),
          ),
          const SizedBox(height: 6),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
          Text(desc, style: const TextStyle(fontSize: 10, color: Colors.grey)),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: () {
                provider.applyCoupon(code);
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Applied coupon: $code')));
              },
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 4),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
              child: const Text('Apply', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }
}
