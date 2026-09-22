import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'providers/marketplace_provider.dart';
import 'screens/main_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => MarketplaceProvider()),
      ],
      child: const PorulagamApp(),
    ),
  );
}

class PorulagamApp extends StatelessWidget {
  const PorulagamApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'பொருளகம் | Porulagam Marketplace',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const MainScreen(),
    );
  }
}
