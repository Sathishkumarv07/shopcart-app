import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/marketplace_provider.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final user = provider.user;
    final isTamil = provider.isTamil;

    return Scaffold(
      appBar: AppBar(
        title: Text(isTamil ? 'எனது கணக்கு' : 'My Account'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Profile Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFE2E7FF)),
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 28,
                        backgroundImage: NetworkImage(user.avatar),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              isTamil ? user.tamilName : user.name,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            Text(user.phone, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                            Text(user.email, style: const TextStyle(fontSize: 11, color: Colors.grey)),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.edit, size: 18),
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Edit profile')));
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // SuperCoins Banner
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFFFDDB8), Color(0xFFFFB95F)],
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.workspace_premium, color: Color(0xFF835200)),
                            const SizedBox(width: 8),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  isTamil ? 'பொருளகம் பிளஸ் உறுப்பினர்' : 'Porulagam Plus Member',
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF2A1700)),
                                ),
                                Text(
                                  '${user.superCoins} SuperCoins available • Redeem ₹250',
                                  style: const TextStyle(fontSize: 10, color: Color(0xFF653E00)),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const Icon(Icons.chevron_right, color: Color(0xFF835200)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Quick Actions
            Row(
              children: [
                _buildActionTile(context, Icons.local_shipping, 'Orders', () => provider.setTab(3)),
                const SizedBox(width: 10),
                _buildActionTile(context, Icons.favorite, 'Wishlist', () {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Wishlist items: ${provider.wishlistCount}')));
                }),
                const SizedBox(width: 10),
                _buildActionTile(context, Icons.redeem, 'Coupons', () => provider.setTab(2)),
                const SizedBox(width: 10),
                _buildActionTile(context, Icons.support_agent, 'Help', () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Porulagam 24/7 Care: 1800-419-0155')));
                }),
              ],
            ),
            const SizedBox(height: 20),

            // Settings list
            Material(
              color: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
                side: const BorderSide(color: Color(0xFFE2E7FF)),
              ),
              clipBehavior: Clip.antiAlias,
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.location_on, color: Color(0xFF0039B1)),
                    title: const Text('Saved Delivery Addresses', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                    subtitle: Text(provider.pincode, style: const TextStyle(fontSize: 11)),
                    trailing: const Icon(Icons.chevron_right, size: 18),
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.translate, color: Color(0xFF0039B1)),
                    title: const Text('Language / மொழி', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                    subtitle: Text(isTamil ? 'தமிழ் (செயலில் உள்ளது)' : 'English (Active)', style: const TextStyle(fontSize: 11, color: Color(0xFF0039B1))),
                    trailing: Switch(
                      value: isTamil,
                      onChanged: (_) => provider.toggleLanguage(),
                      activeThumbColor: const Color(0xFF0039B1),
                    ),
                  ),
                  const Divider(height: 1),
                  const ListTile(
                    leading: Icon(Icons.credit_card, color: Color(0xFF0039B1)),
                    title: Text('Payment Modes & Saved Cards', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                    trailing: Icon(Icons.chevron_right, size: 18),
                  ),
                  const Divider(height: 1),
                  const ListTile(
                    leading: Icon(Icons.notifications, color: Color(0xFF0039B1)),
                    title: Text('Notifications', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                    trailing: Icon(Icons.chevron_right, size: 18),
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.logout, color: Colors.red),
                    title: Text(isTamil ? 'வெளியேறு (Logout)' : 'Logout', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.red)),
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Logged out')));
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionTile(BuildContext context, IconData icon, String label, VoidCallback onTap) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE2E7FF)),
          ),
          child: Column(
            children: [
              Icon(icon, color: const Color(0xFF0039B1), size: 24),
              const SizedBox(height: 6),
              Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
            ],
          ),
        ),
      ),
    );
  }
}
