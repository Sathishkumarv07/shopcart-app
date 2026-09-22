class UserModel {
  final String id;
  final String name;
  final String tamilName;
  final String phone;
  final String email;
  final String avatar;
  final int superCoins;
  final String membershipTier;
  final bool isLoggedIn;

  UserModel({
    required this.id,
    required this.name,
    required this.tamilName,
    required this.phone,
    required this.email,
    required this.avatar,
    this.superCoins = 240,
    this.membershipTier = 'பொருளகம் Plus Gold',
    this.isLoggedIn = true,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? 'usr-1',
      name: json['name'] ?? 'Ananya Krishnan',
      tamilName: json['tamil_name'] ?? 'அனன்யா கிருஷ்ணன்',
      phone: json['phone'] ?? '+91 98765 43210',
      email: json['email'] ?? 'ananya.k@example.com',
      avatar: json['avatar'] ?? 'https://lh3.googleusercontent.com/aida/AEtjO1VMK7LzmN11OfbTszqVMKU9MRwYeZaznwDllrDgq5bU9FagEjzWHPl7iE7IrMndkrNotBzyUF8XXPWwKS0MR6UhmUgiTsYdG2BfpHEmCWxAr93XRrvj5gimfh2qOy6m5iiMk0FzUml0NZALgeyvQolElc-M_OqYh6x6Qh_2anaqbSfmXrdet0iolaEUyERhlBGWR5vu-ByfwI5BqUvLkll9m0irF2Sjdc1DauDop15XMcbyF0i2DIaY-iw',
      superCoins: json['super_coins'] ?? 240,
      membershipTier: json['membership_tier'] ?? 'பொருளகம் Plus Gold',
      isLoggedIn: true,
    );
  }
}
