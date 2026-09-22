import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/marketplace_provider.dart';
import 'home_screen.dart';
import 'categories_screen.dart';
import 'deals_screen.dart';
import 'orders_screen.dart';
import 'account_screen.dart';
import 'cart_screen.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<MarketplaceProvider>();
    final isTamil = provider.isTamil;

    final screens = const [
      HomeScreen(),
      CategoriesScreen(),
      DealsScreen(),
      OrdersScreen(),
      AccountScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFF0039B1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.shopping_bag, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 8),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'பொருளகம்',
                  style: TextStyle(fontWeight: FontWeight.w900, fontSize: 17, color: Color(0xFF0039B1), height: 1.1),
                ),
                Text(
                  provider.pincode,
                  style: const TextStyle(fontSize: 10, color: Color(0xFF434654)),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Language toggle
          TextButton(
            onPressed: () => provider.toggleLanguage(),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFFF2F3FF),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                isTamil ? 'தமிழ்' : 'EN',
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0039B1)),
              ),
            ),
          ),

          // Wishlist badge
          IconButton(
            icon: Stack(
              children: [
                const Icon(Icons.favorite_border, color: Color(0xFF434654)),
                if (provider.wishlistCount > 0)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: CircleAvatar(
                      radius: 7,
                      backgroundColor: Colors.red,
                      child: Text(
                        '${provider.wishlistCount}',
                        style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
              ],
            ),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Wishlist has ${provider.wishlistCount} saved items')),
              );
            },
          ),

          // Cart badge
          IconButton(
            icon: Stack(
              children: [
                const Icon(Icons.shopping_cart_outlined, color: Color(0xFF434654)),
                if (provider.totalCartCount > 0)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: CircleAvatar(
                      radius: 7,
                      backgroundColor: const Color(0xFF0039B1),
                      child: Text(
                        '${provider.totalCartCount}',
                        style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
              ],
            ),
            onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const CartScreen()));
            },
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: IndexedStack(
        index: provider.currentTab,
        children: screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: provider.currentTab,
        onTap: (index) => provider.setTab(index),
        items: [
          BottomNavigationBarItem(
            icon: const Icon(Icons.home_outlined),
            activeIcon: const Icon(Icons.home),
            label: isTamil ? 'முகப்பு' : 'Home',
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.grid_view_outlined),
            activeIcon: const Icon(Icons.grid_view),
            label: isTamil ? 'பிரிவுகள்' : 'Categories',
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.local_offer_outlined),
            activeIcon: const Icon(Icons.local_offer),
            label: isTamil ? 'சலுகைகள்' : 'Deals',
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.receipt_long_outlined),
            activeIcon: const Icon(Icons.receipt_long),
            label: isTamil ? 'ஆர்டர்கள்' : 'Orders',
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.manage_accounts_outlined),
            activeIcon: const Icon(Icons.manage_accounts),
            label: isTamil ? 'கணக்கு' : 'Account',
          ),
        ],
      ),
    );
  }
}
