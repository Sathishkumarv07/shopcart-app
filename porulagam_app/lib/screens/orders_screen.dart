import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/marketplace_provider.dart';
import '../models/order.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final isTamil = provider.isTamil;
    final allOrders = provider.orders;

    return Scaffold(
      appBar: AppBar(
        title: Text(isTamil ? 'எனது ஆர்டர்கள்' : 'My Orders'),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          labelColor: const Color(0xFF0039B1),
          unselectedLabelColor: const Color(0xFF434654),
          indicatorColor: const Color(0xFF0039B1),
          tabs: [
            Tab(text: '${isTamil ? "அனைத்தும்" : "All"} (${allOrders.length})'),
            Tab(text: '${isTamil ? "வழியில்" : "In Transit"} (${allOrders.where((o) => o.status == "transit").length})'),
            Tab(text: '${isTamil ? "டெலிவரி ஆனது" : "Delivered"} (${allOrders.where((o) => o.status == "delivered").length})'),
            Tab(text: '${isTamil ? "ரத்து" : "Cancelled"} (${allOrders.where((o) => o.status == "cancelled").length})'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildOrderList(context, allOrders),
          _buildOrderList(context, allOrders.where((o) => o.status == 'transit').toList()),
          _buildOrderList(context, allOrders.where((o) => o.status == 'delivered').toList()),
          _buildOrderList(context, allOrders.where((o) => o.status == 'cancelled').toList()),
        ],
      ),
    );
  }

  Widget _buildOrderList(BuildContext context, List<OrderModel> orders) {
    if (orders.isEmpty) {
      return const Center(child: Text('No orders found'));
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: orders.length,
      separatorBuilder: (_, __) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final order = orders[index];
        final isTransit = order.status == 'transit';

        return Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE2E7FF)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Order #${order.id}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: isTransit ? const Color(0xFFDCE1FF) : const Color(0xFFE2E7FF),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      isTransit ? 'LIVE TRACK' : order.status.toUpperCase(),
                      style: TextStyle(
                        color: isTransit ? const Color(0xFF0039B1) : Colors.black87,
                        fontWeight: FontWeight.bold,
                        fontSize: 10,
                      ),
                    ),
                  ),
                ],
              ),
              const Divider(height: 16),
              if (order.items.isNotEmpty)
                Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.network(
                        order.items.first.productImage,
                        width: 55,
                        height: 55,
                        fit: BoxFit.contain,
                        errorBuilder: (_, __, ___) => const Icon(Icons.shopping_bag, size: 40),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(order.items.first.productName, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          Text('Qty: ${order.items.first.quantity} • ${order.items.first.color}', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                          const SizedBox(height: 2),
                          Text('₹${order.totalAmount.toStringAsFixed(0)}', style: const TextStyle(color: Color(0xFF0039B1), fontWeight: FontWeight.bold, fontSize: 14)),
                        ],
                      ),
                    ),
                  ],
                ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFFF2F3FF),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.local_shipping, size: 16, color: Color(0xFF0039B1)),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(order.statusText, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0039B1))),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  if (isTransit)
                    ElevatedButton.icon(
                      onPressed: () => _showTrackingDialog(context, order),
                      icon: const Icon(Icons.navigation, size: 14),
                      label: const Text('Track Order', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF0039B1),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        minimumSize: Size.zero,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                    )
                  else
                    OutlinedButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Invoice for #${order.id} downloaded!')));
                      },
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        minimumSize: Size.zero,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      child: const Text('Invoice', style: TextStyle(fontSize: 11)),
                    ),
                  TextButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Support line: 1800-419-0155')));
                    },
                    child: const Text('Need Help?', style: TextStyle(fontSize: 11)),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  void _showTrackingDialog(BuildContext context, OrderModel order) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Live Tracking #${order.id}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Courier: ${order.courier}', style: const TextStyle(fontSize: 12, color: Colors.grey)),
              Text('Tracking: ${order.trackingNumber}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
              const SizedBox(height: 14),
              ...order.steps.map((step) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4),
                    child: Row(
                      children: [
                        Icon(step.done ? Icons.check_circle : Icons.radio_button_unchecked, color: step.done ? const Color(0xFF0039B1) : Colors.grey, size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(step.title, style: TextStyle(fontSize: 12, fontWeight: step.done ? FontWeight.bold : FontWeight.normal)),
                              Text(step.time, style: const TextStyle(fontSize: 10, color: Colors.grey)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  )),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }
}
