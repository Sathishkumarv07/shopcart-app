import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/marketplace_provider.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  final TextEditingController _couponController = TextEditingController();

  @override
  void dispose() {
    _couponController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final isTamil = provider.isTamil;
    final cart = provider.cart;

    return Scaffold(
      appBar: AppBar(
        title: Text(isTamil ? 'உங்கள் கூடை' : 'Shopping Cart'),
      ),
      body: cart.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.remove_shopping_cart, size: 70, color: Colors.grey),
                  const SizedBox(height: 14),
                  Text(
                    isTamil ? 'உங்கள் கூடை காலியாக உள்ளது' : 'Your cart is empty',
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: () => provider.setTab(0),
                    child: Text(isTamil ? 'கொள்முதலைத் தொடங்கவும்' : 'Start Shopping'),
                  ),
                ],
              ),
            )
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // Free delivery alert
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF6CF8BB).withOpacity(0.3),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.local_shipping, size: 18, color: Color(0xFF006C49)),
                        SizedBox(width: 8),
                        Text('Free Express Delivery unlocked for this order!', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF006C49))),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Cart Items
                  ...cart.map((item) => Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFFE2E7FF)),
                        ),
                        child: Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(10),
                              child: Container(
                                color: const Color(0xFFF2F3FF),
                                padding: const EdgeInsets.all(4),
                                child: Image.network(
                                  item.product.mainImage,
                                  width: 60,
                                  height: 60,
                                  fit: BoxFit.contain,
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item.product.shortName,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                  ),
                                  Text(
                                    '${item.selectedColor} • ${item.selectedStorage}',
                                    style: const TextStyle(fontSize: 11, color: Colors.grey),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '₹${item.totalPrice.toStringAsFixed(0)}',
                                    style: const TextStyle(color: Color(0xFF0039B1), fontWeight: FontWeight.w900, fontSize: 14),
                                  ),
                                ],
                              ),
                            ),
                            // Stepper
                            Container(
                              decoration: BoxDecoration(
                                color: const Color(0xFFF2F3FF),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Row(
                                children: [
                                  IconButton(
                                    icon: const Icon(Icons.remove, size: 16),
                                    onPressed: () => provider.updateCartQuantity(item.cartItemId, -1),
                                    constraints: const BoxConstraints(),
                                    padding: const EdgeInsets.all(6),
                                  ),
                                  Text('${item.quantity}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                                  IconButton(
                                    icon: const Icon(Icons.add, size: 16),
                                    onPressed: () => provider.updateCartQuantity(item.cartItemId, 1),
                                    constraints: const BoxConstraints(),
                                    padding: const EdgeInsets.all(6),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      )),

                  const SizedBox(height: 10),

                  // Coupon Section
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E7FF)),
                    ),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _couponController,
                                decoration: const InputDecoration(
                                  hintText: 'Enter coupon code',
                                  isDense: true,
                                  border: OutlineInputBorder(),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            ElevatedButton(
                              onPressed: () {
                                if (provider.applyCoupon(_couponController.text)) {
                                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Coupon applied!')));
                                } else {
                                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Invalid coupon! Try PORULAGAM10')));
                                }
                              },
                              child: const Text('Apply'),
                            ),
                          ],
                        ),
                        if (provider.appliedCoupon != null)
                          Padding(
                            padding: const EdgeInsets.only(top: 8),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Applied: ${provider.appliedCoupon!.code}', style: const TextStyle(color: Color(0xFF006C49), fontWeight: FontWeight.bold)),
                                TextButton(onPressed: () => provider.removeCoupon(), child: const Text('Remove', style: TextStyle(color: Colors.red))),
                              ],
                            ),
                          ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Price Breakdown
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E7FF)),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Subtotal', style: TextStyle(fontSize: 13, color: Colors.grey)),
                            Text('₹${provider.subtotal.toStringAsFixed(0)}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                          ],
                        ),
                        if (provider.discountAmount > 0) ...[
                          const SizedBox(height: 6),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('Coupon Savings', style: TextStyle(fontSize: 13, color: Color(0xFF006C49), fontWeight: FontWeight.bold)),
                              Text('-₹${provider.discountAmount.toStringAsFixed(0)}', style: const TextStyle(fontSize: 13, color: Color(0xFF006C49), fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ],
                        const SizedBox(height: 6),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Delivery Fee', style: TextStyle(fontSize: 13, color: Colors.grey)),
                            Text('FREE', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF006C49))),
                          ],
                        ),
                        const SizedBox(height: 6),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Platform Fee', style: TextStyle(fontSize: 13, color: Colors.grey)),
                            Text('₹5', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                          ],
                        ),
                        const Divider(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(isTamil ? 'மொத்தம்' : 'Total Payable', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                            Text('₹${provider.totalPayable.toStringAsFixed(0)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0039B1))),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Checkout CTA
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton.icon(
                      onPressed: () async {
                        final order = await provider.checkout();
                        if (order != null && context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Order #${order.id} placed in MySQL!')),
                          );
                          Navigator.pop(context);
                        }
                      },
                      icon: const Icon(Icons.lock, size: 18),
                      label: Text(
                        '${isTamil ? "ஆர்டரை உறுதிசெய்" : "Place Order"} • ₹${provider.totalPayable.toStringAsFixed(0)}',
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF0039B1),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
