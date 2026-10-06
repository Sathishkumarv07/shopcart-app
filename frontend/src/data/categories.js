// Porulagam Categories & Subcategories
export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    tamilName: 'மின்னணுவியல்',
    icon: 'devices_other',
    colorClass: 'text-primary bg-primary-fixed',
    bannerTitle: 'Electronics Clearance',
    bannerSubtitle: 'Up to 70% Off on Tech Essentials',
    bannerIcon: 'headphones',
    subcategories: [
      { id: 'smartphones', name: 'Smart Phones', icon: 'phone_iphone' },
      { id: 'laptops', name: 'Laptops & PCs', icon: 'laptop_chromebook' },
      { id: 'audio', name: 'Audio & Buds', icon: 'headset' },
      { id: 'watches', name: 'Smart Watches', icon: 'watch' },
      { id: 'cameras', name: 'Cameras & Air', icon: 'photo_camera' },
      { id: 'gaming', name: 'Gaming Consoles', icon: 'sports_esports' },
      { id: 'tablets', name: 'Tablets & iPads', icon: 'tablet_mac' },
      { id: 'power', name: 'Power & Cables', icon: 'battery_charging_full' },
      { id: 'smarthome', name: 'Smart Home', icon: 'home_iot_device' }
    ],
    brands: ['Apple', 'Samsung', 'Sony', 'boAt', 'Dell', 'HP', 'Anker']
  },
  {
    id: 'mobiles',
    name: 'Mobiles',
    tamilName: 'கைபேசிகள்',
    icon: 'smartphone',
    colorClass: 'text-secondary bg-secondary-fixed',
    bannerTitle: 'Flagship 5G Smart Phones',
    bannerSubtitle: 'Exchange Bonus up to ₹8,000 Extra',
    bannerIcon: 'smartphone',
    subcategories: [
      { id: 'flagship5g', name: 'Flagship 5G', icon: '5g' },
      { id: 'budgetmobiles', name: 'Budget Phones', icon: 'phone_android' },
      { id: 'chargers', name: 'Chargers & Cables', icon: 'cable' },
      { id: 'covers', name: 'Cases & Covers', icon: 'shield' },
      { id: 'screenprotector', name: 'Tempered Glass', icon: 'screenshot' },
      { id: 'selfiesticks', name: 'Gimbals & Tripods', icon: 'videocam' }
    ],
    brands: ['Apple', 'Samsung', 'OnePlus', 'Google Pixel', 'Xiaomi', 'Realme']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    tamilName: 'ஆடைகள் & பேஷன்',
    icon: 'checkroom',
    colorClass: 'text-tertiary bg-tertiary-fixed',
    bannerTitle: 'Festive Season Grand Sale',
    bannerSubtitle: 'Min 50% - 80% Off on Top Brands',
    bannerIcon: 'apparel',
    subcategories: [
      { id: 'menstopwear', name: "Men's Topwear", icon: 'checkroom' },
      { id: 'ethnicwear', name: 'Ethnic & Traditional', icon: 'styler' },
      { id: 'footwear', name: 'Footwear & Sneakers', icon: 'steps' },
      { id: 'watches-fashion', name: 'Luxury Watches', icon: 'watch' },
      { id: 'eyewear', name: 'Sunglasses & Specs', icon: 'visibility' },
      { id: 'bags', name: 'Backpacks & Wallets', icon: 'work' }
    ],
    brands: ['Zara', 'H&M', 'Levi’s', 'Nike', 'Puma', 'Titan', 'Raymond']
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    tamilName: 'வீட்டு உபயோகம்',
    icon: 'chair',
    colorClass: 'text-primary-container bg-surface-container-highest',
    bannerTitle: 'Modern Home Makeover',
    bannerSubtitle: 'Upto 65% Off on Furniture & Mattresses',
    bannerIcon: 'chair',
    subcategories: [
      { id: 'living', name: 'Living Room Furniture', icon: 'chair' },
      { id: 'bedroom', name: 'Beds & Mattresses', icon: 'bed' },
      { id: 'cookware', name: 'Cookware & Dining', icon: 'restaurant' },
      { id: 'decor', name: 'Wall Art & Clocks', icon: 'palette' },
      { id: 'lighting', name: 'Smart Ambient Lamps', icon: 'lightbulb' },
      { id: 'storage', name: 'Organizers & Boxes', icon: 'inventory_2' }
    ],
    brands: ['Wakefit', 'IKEA', 'Sleepwell', 'Prestige', 'Wonderchef', 'Philips']
  },
  {
    id: 'appliances',
    name: 'Appliances',
    tamilName: 'மின்சாதனங்கள்',
    icon: 'kitchen',
    colorClass: 'text-secondary bg-secondary-container',
    bannerTitle: 'Smart Cooling & Appliances',
    bannerSubtitle: 'Inverter ACs & Double Door Fridges with 10-Yr Warranty',
    bannerIcon: 'ac_unit',
    subcategories: [
      { id: 'acs', name: 'Air Conditioners', icon: 'mode_fan' },
      { id: 'fridges', name: 'Refrigerators', icon: 'kitchen' },
      { id: 'washing', name: 'Washing Machines', icon: 'local_laundry_service' },
      { id: 'microwaves', name: 'Microwaves & Ovens', icon: 'microwave' },
      { id: 'chimneys', name: 'Kitchen Chimneys', icon: 'air' }
    ],
    brands: ['LG', 'Samsung', 'Whirlpool', 'Voltas', 'Daikin', 'IFB', 'Bosch']
  },
  {
    id: 'beauty',
    name: 'Beauty & Care',
    tamilName: 'அழகு & பராமரிப்பு',
    icon: 'spa',
    colorClass: 'text-error bg-error-container',
    bannerTitle: 'Glow & Wellness Festival',
    bannerSubtitle: 'Buy 2 Get 1 Free on Luxury Serums & Perfumes',
    bannerIcon: 'spa',
    subcategories: [
      { id: 'skincare', name: 'Face Care & Serums', icon: 'spa' },
      { id: 'haircare', name: 'Hair Shampoos & Oils', icon: 'shower' },
      { id: 'fragrances', name: 'Luxury Perfumes', icon: 'air' },
      { id: 'makeup', name: 'Lipsticks & Foundations', icon: 'brush' },
      { id: 'grooming', name: "Men's Trimmers & Beard", icon: 'face' }
    ],
    brands: ['Minimalist', 'The Ordinary', 'Mamaearth', 'Plum', 'L’Oréal', 'Nivea']
  },
  {
    id: 'groceries',
    name: 'Groceries',
    tamilName: 'மளிகைப் பொருட்கள்',
    icon: 'local_mall',
    colorClass: 'text-secondary bg-secondary-fixed-dim',
    bannerTitle: 'Daily Super Pantry',
    bannerSubtitle: 'Fresh Farm Groceries Delivered in 10-20 Mins',
    bannerIcon: 'local_mall',
    subcategories: [
      { id: 'staples', name: 'Rice, Atta & Dals', icon: 'grain' },
      { id: 'oils', name: 'Cold Pressed Oils & Ghee', icon: 'water_drop' },
      { id: 'beverages', name: 'Tea, Coffee & Health', icon: 'coffee' },
      { id: 'snacks', name: 'Snacks, Nuts & Biscuits', icon: 'cookie' },
      { id: 'dairy', name: 'Milk, Butter & Paneer', icon: 'egg' }
    ],
    brands: ['Aashirvaad', 'Tata Sampann', 'Fortune', 'Amul', 'Nestlé', 'Organic Tattva']
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    tamilName: 'விளையாட்டு & உடற்பயிற்சி',
    icon: 'fitness_center',
    colorClass: 'text-primary bg-surface-container-low',
    bannerTitle: 'Peak Performance Gear',
    bannerSubtitle: 'Flat 40% Off on Home Gym & Running Shoes',
    bannerIcon: 'fitness_center',
    subcategories: [
      { id: 'gym', name: 'Dumbbells & Barbells', icon: 'fitness_center' },
      { id: 'yoga', name: 'Yoga Mats & Straps', icon: 'self_improvement' },
      { id: 'cardio', name: 'Treadmills & Spin Bikes', icon: 'directions_bike' },
      { id: 'sportswear', name: 'Sweat-wicking Tees', icon: 'accessibility_new' },
      { id: 'sportshoes', name: 'Running & Court Shoes', icon: 'sprint' }
    ],
    brands: ['Decathlon', 'Nike', 'Adidas', 'Under Armour', 'Boldfit', 'Nivia']
  },
  {
    id: 'books',
    name: 'Books',
    tamilName: 'புத்தகங்கள்',
    icon: 'menu_book',
    colorClass: 'text-tertiary bg-tertiary-fixed-dim',
    bannerTitle: 'Literary Treasures & Fiction',
    bannerSubtitle: 'Buy 3 Books at Flat ₹799',
    bannerIcon: 'menu_book',
    subcategories: [
      { id: 'tamilnovels', name: 'தமிழ் நாவல்கள் & இலக்கியம்', icon: 'auto_stories' },
      { id: 'selfhelp', name: 'Self-Help & Mindset', icon: 'psychology' },
      { id: 'bestsellers', name: 'Global Bestsellers', icon: 'star' },
      { id: 'examstudy', name: 'Civil Services & Prep', icon: 'school' },
      { id: 'childrenbooks', name: 'Kids Illustrated Tales', icon: 'child_care' }
    ],
    brands: ['Penguin', 'HarperCollins', 'Vikatan', 'Kizhakku', 'Bloomsbury']
  }
];
