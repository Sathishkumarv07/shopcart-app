// Porulagam Product Catalog
export const products = [
  // --- ELECTRONICS & COMPUTING ---
  {
    id: 'prod-1',
    name: 'UltraTech Neo 15 Pro 5G (Celestial Blue, 256 GB, 12 GB RAM)',
    shortName: 'UltraTech Neo 15 Pro 5G',
    brand: 'UltraTech Pro',
    category: 'electronics',
    subcategory: 'Smart Phones',
    price: 34999,
    originalPrice: 42999,
    discountPercent: 19,
    rating: 4.6,
    reviewCount: 14208,
    badge: 'Best Seller',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Celestial Blue', hex: '#1E50D8', active: true },
      { name: 'Phantom Graphite', hex: '#283044', active: false },
      { name: 'Titanium Silver', hex: '#D2D9F4', active: false }
    ],
    storageOptions: ['128 GB', '256 GB', '512 GB'],
    specs: {
      'Display': '6.78-inch 1.5K 120Hz LTPO AMOLED, 4500 nits peak',
      'Processor': 'Snapdragon 8 Gen 3 (4nm TSMC Flagship)',
      'Primary Camera': '50MP Sony LYT-808 OIS + 50MP Periscope 3x Optical',
      'Front Camera': '32MP Ultra-clear 4K HDR Selfie',
      'Battery & Charging': '5400 mAh Battery with 100W SuperVOOC Charge',
      'Operating System': 'OxygenOS 14 (Android 14) with 4-yr Android upgrades'
    },
    highlights: [
      '50MP Triple OIS Flagship Camera System with Hasselblad Color Engine',
      'Ultra-bright 4500 nits ProXDR Display with Aqua Touch',
      'Dual Cryo-velocity VC Liquid Cooling System for extreme gaming',
      'SuperVOOC 100W GaN Fast Charger included in box'
    ]
  },
  {
    id: 'prod-2',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    shortName: 'Sony WH-1000XM5 ANC',
    brand: 'Sony',
    category: 'electronics',
    subcategory: 'Audio & Buds',
    price: 24990,
    originalPrice: 29990,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 8940,
    badge: '42% OFF',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Black', hex: '#131B2E', active: true },
      { name: 'Silver White', hex: '#FAF8FF', active: false }
    ],
    storageOptions: ['Standard'],
    specs: {
      'Driver Size': '30mm specially designed carbon fiber driver',
      'Noise Cancellation': 'Dual Processor V1 + HD Noise Cancelling Processor QN1',
      'Battery Life': 'Up to 30 hours with ANC on (40 hrs ANC off)',
      'Charging': '3 min charge gives 3 hours playback with PD charger',
      'Connectivity': 'Bluetooth 5.2, Multipoint connection, LDAC codec'
    },
    highlights: [
      'Industry-leading 8-microphone active noise cancellation',
      'Auto NC Optimizer dynamically adapts to atmospheric pressure',
      'Crystal-clear hands-free calling with 4 beamforming microphones',
      'Ultra-comfortable lightweight soft fit leather'
    ]
  },
  {
    id: 'prod-3',
    name: 'Apple iPad Air 11" (M2 Chip, Liquid Retina, 128GB, Space Gray)',
    shortName: 'iPad Air 11" M2',
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'Tablets & iPads',
    price: 54900,
    originalPrice: 59900,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 3120,
    badge: 'HOT',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#434654', active: true },
      { name: 'Starlight', hex: '#F2F3FF', active: false },
      { name: 'Blue', hex: '#1E50D8', active: false }
    ],
    storageOptions: ['128 GB', '256 GB', '512 GB'],
    specs: {
      'Chipset': 'Apple M2 8-core CPU, 9-core GPU, 16-core Neural Engine',
      'Display': '11-inch Liquid Retina with True Tone and P3 wide color',
      'Camera': '12MP Center Stage Landscape Ultra Wide front camera',
      'Pencil Support': 'Supports Apple Pencil Pro and Apple Pencil (USB-C)',
      'Security': 'Touch ID sensor integrated in top button'
    },
    highlights: [
      'Blazing-fast M2 chip delivers breakthrough performance and all-day battery',
      'Gorgeous Liquid Retina display with antireflective coating',
      'Wi-Fi 6E provides super-fast wireless connections'
    ]
  },
  {
    id: 'prod-4',
    name: 'Samsung Galaxy Watch Ultra (Titanium Gray, Orange Band, 47mm LTE)',
    shortName: 'Galaxy Watch Ultra',
    brand: 'Samsung',
    category: 'electronics',
    subcategory: 'Smart Watches',
    price: 49999,
    originalPrice: 59999,
    discountPercent: 15,
    rating: 4.7,
    reviewCount: 1950,
    badge: '15% OFF',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#653E00', active: true },
      { name: 'Titanium White', hex: '#FFFFFF', active: false }
    ],
    storageOptions: ['47mm LTE'],
    specs: {
      'Casing': 'Grade 4 Titanium cushion frame with 10 ATM / IP68 + MIL-STD-810H',
      'Display': '1.5-inch Super AMOLED 3000 nits peak brightness Sapphire Crystal',
      'Sensors': 'BioActive Sensor (ECG, Heart Rate, BIA, Sleep Apnea, Temperature)',
      'Battery': '590 mAh (Up to 100 hours in Power Saving mode)',
      'Connectivity': 'Embedded 4G LTE eSIM, Dual-Frequency GPS (L1+L5)'
    },
    highlights: [
      'Built for the extreme: Withstands 55°C heat, 9,000m altitude, 100m water',
      'Dual-frequency GPS accurately tracks trails in dense cities & forests',
      'Personalized Energy Score powered by Galaxy AI'
    ]
  },
  {
    id: 'prod-5',
    name: 'Dell XPS 14 Premium OLED Laptop (Intel Core Ultra 7, 16GB, 1TB SSD)',
    shortName: 'Dell XPS 14 Core Ultra 7',
    brand: 'Dell',
    category: 'electronics',
    subcategory: 'Laptops & PCs',
    price: 134990,
    originalPrice: 154990,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 780,
    badge: 'Flagship',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Platinum Silver', hex: '#D2D9F4', active: true },
      { name: 'Graphite', hex: '#283044', active: false }
    ],
    storageOptions: ['512 GB SSD', '1 TB SSD'],
    specs: {
      'Processor': 'Intel Core Ultra 7 155H (16 Cores, 22 Threads, NPU AI Engine)',
      'Display': '14.5" 3.2K (3200 x 2000) 120Hz Touch OLED, 100% DCI-P3',
      'Graphics': 'NVIDIA GeForce RTX 4050 6GB GDDR6',
      'Weight': '1.68 kg CNC Machined Aluminum chassis',
      'Audio': 'Quad-speaker design with Waves MaxxAudio 8W peak output'
    },
    highlights: [
      'Stunning 3.2K InfinityEdge OLED Touch with Corning Gorilla Glass Victus',
      'Seamless glass touchpad with subtle haptic feedback',
      'Dedicated Microsoft Copilot key for instant generative AI'
    ]
  },
  {
    id: 'prod-6',
    name: 'boAt Nirvana Ion ANC True Wireless Earbuds (120 hrs Playback)',
    shortName: 'boAt Nirvana Ion ANC',
    brand: 'boAt',
    category: 'electronics',
    subcategory: 'Audio & Buds',
    price: 2499,
    originalPrice: 7990,
    discountPercent: 68,
    rating: 4.4,
    reviewCount: 32410,
    badge: '68% OFF',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#131B2E', active: true },
      { name: 'Ivory White', hex: '#FAF8FF', active: false }
    ],
    storageOptions: ['Standard'],
    specs: {
      'ANC': 'Up to 32dB Active Noise Cancellation with Quad Mics ENx',
      'Battery': 'Total 120 Hours total playback (24 hrs per bud charge)',
      'Drivers': 'Dual 10mm Crystal Bionic Audio drivers by HiFi DSP',
      'Latency': '60ms BEAST Mode low latency for gaming'
    },
    highlights: [
      'Unmatched 120 hours industry-leading battery backup',
      'Crystal Bionic Sound powered by HiFi DSP for deep bass',
      'In-ear detection automatically pauses music when removed'
    ]
  },
  {
    id: 'prod-7',
    name: 'Apple AirTag (4 Pack) - Precision Finding with U1 Ultra Wideband',
    shortName: 'Apple AirTag 4-Pack',
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'Smart Home',
    price: 9990,
    originalPrice: 11900,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 5620,
    badge: 'Must Have',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Silver White', hex: '#FFFFFF', active: true }],
    storageOptions: ['4 Pack'],
    specs: {
      'Water Resistance': 'IP67 rated water and dust resistant (1m up to 30 mins)',
      'Battery': 'Standard user-replaceable CR2032 coin battery (1+ year life)',
      'Tracking': 'Precision Finding with Ultra Wideband technology',
      'Privacy': 'End-to-end encrypted Find My network location tracking'
    },
    highlights: [
      'Keep track of and find your keys, wallet, luggage, and backpack in Find My app',
      'Simple one-tap setup instantly connects AirTag with your iPhone or iPad',
      'Play a sound on the built-in speaker to help locate lost items'
    ]
  },
  {
    id: 'prod-8',
    name: 'Anker Prime 20,000mAh Power Bank (200W Output with Smart Digital Display)',
    shortName: 'Anker Prime 200W Power Bank',
    brand: 'Anker',
    category: 'electronics',
    subcategory: 'Power & Cables',
    price: 8499,
    originalPrice: 12999,
    discountPercent: 35,
    rating: 4.8,
    reviewCount: 4210,
    badge: '35% OFF',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Space Gray', hex: '#283044', active: true }],
    storageOptions: ['20,000 mAh'],
    specs: {
      'Total Output': '200W Simultaneous Multi-device fast charging',
      'Ports': '2 x USB-C (100W max each) + 1 x USB-A (65W max)',
      'Recharge Time': 'Recharges in just 1 hour 15 mins via 100W USB-C input',
      'Display': 'Real-time color digital LCD showing power, wattage & remaining time'
    },
    highlights: [
      'Charge two MacBook Pro laptops at 100W simultaneously',
      'Compact soda-can form factor fits easily in travel bags',
      'ActiveShield 2.0 temperature monitoring safety system'
    ]
  },

  // --- MOBILES & SMARTPHONES (கைபேசிகள்) ---
  {
    id: 'prod-m1',
    name: 'Apple iPhone 16 Pro Max (Desert Titanium, 256 GB)',
    shortName: 'iPhone 16 Pro Max 256GB',
    brand: 'Apple',
    category: 'mobiles',
    subcategory: 'Flagship 5G',
    price: 139900,
    originalPrice: 144900,
    discountPercent: 3,
    rating: 4.9,
    reviewCount: 18450,
    badge: 'Super Flagship',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C5A98B', active: true },
      { name: 'Natural Titanium', hex: '#9E9A93', active: false },
      { name: 'Black Titanium', hex: '#212123', active: false }
    ],
    storageOptions: ['256 GB', '512 GB', '1 TB'],
    specs: {
      'Processor': 'A18 Pro chip with 6-core GPU & Apple Intelligence',
      'Display': '6.9-inch Super Retina XDR OLED with ProMotion 120Hz',
      'Camera': '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto',
      'Camera Control': 'Dedicated tactile capacitive Camera Control button',
      'Battery': 'Best battery life ever in iPhone with up to 33 hours playback'
    },
    highlights: [
      'Stunning Grade 5 Titanium build with micro-blasted textured finish',
      'Camera Control button for instant 4K 120fps Dolby Vision video',
      'Powered by Apple Intelligence for personal, private AI assistance'
    ]
  },
  {
    id: 'prod-m2',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB RAM, 256GB Storage)',
    shortName: 'Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    category: 'mobiles',
    subcategory: 'Flagship 5G',
    price: 119999,
    originalPrice: 134999,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 15300,
    badge: 'Galaxy AI',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titanium Gray', hex: '#58585A', active: true },
      { name: 'Titanium Black', hex: '#212121', active: false },
      { name: 'Titanium Violet', hex: '#4B3F72', active: false }
    ],
    storageOptions: ['256 GB', '512 GB', '1 TB'],
    specs: {
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'Display': '6.8-inch Dynamic AMOLED 2X, 2600 nits, Gorilla Armor',
      'Camera': '200MP Quad Tele OIS Camera with 100x Space Zoom',
      'S-Pen': 'Built-in Bluetooth S-Pen with air actions',
      'Battery': '5000 mAh with 45W Fast Charging'
    },
    highlights: [
      'Circle to Search with Google & Live Call Translation',
      'Gorilla Armor glass reduces glare by 75% for ultimate outdoor clarity',
      '200MP sensor produces crystal-clear night shots and portraits'
    ]
  },
  {
    id: 'prod-m3',
    name: 'OnePlus 12 5G (Flowy Emerald, 16GB RAM, 512GB Storage)',
    shortName: 'OnePlus 12 5G',
    brand: 'OnePlus',
    category: 'mobiles',
    subcategory: 'Flagship 5G',
    price: 64999,
    originalPrice: 69999,
    discountPercent: 7,
    rating: 4.7,
    reviewCount: 9400,
    badge: 'Trending',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Flowy Emerald', hex: '#1C4B40', active: true },
      { name: 'Silky Black', hex: '#181818', active: false }
    ],
    storageOptions: ['256 GB', '512 GB'],
    specs: {
      'Processor': 'Snapdragon 8 Gen 3 with 16GB LPDDR5X RAM',
      'Camera': '4th Gen Hasselblad Camera System with 64MP 3X Periscope',
      'Battery': '5400 mAh Battery with 100W SUPERVOOC + 50W AIRVOOC',
      'Display': '6.82" 2K 120Hz ProXDR Display with 4500 nits peak'
    },
    highlights: [
      '4500 nits brightest display with Aqua Touch technology',
      '100W charging fills 1-100% in just 26 minutes',
      'Hasselblad portrait mode with cinematic bokeh'
    ]
  },
  {
    id: 'prod-m4',
    name: 'Google Pixel 9 Pro XL (Porcelain, 16GB RAM, 256GB Storage)',
    shortName: 'Pixel 9 Pro XL',
    brand: 'Google',
    category: 'mobiles',
    subcategory: 'Flagship 5G',
    price: 124999,
    originalPrice: 129999,
    discountPercent: 4,
    rating: 4.8,
    reviewCount: 4200,
    badge: 'Gemini AI',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Porcelain', hex: '#F5F5F0', active: true },
      { name: 'Obsidian', hex: '#212121', active: false },
      { name: 'Hazel', hex: '#63655E', active: false }
    ],
    storageOptions: ['128 GB', '256 GB', '512 GB'],
    specs: {
      'Chipset': 'Google Tensor G4 with Titan M2 security coprocessor',
      'Display': '6.8-inch Super Actua LTPO OLED, 1-120Hz, 3000 nits peak',
      'Camera': '50MP wide + 48MP ultrawide + 48MP 5x telephoto, 8K Video Boost',
      'AI Features': 'Pixel Screenshots, Add Me camera tool, Gemini Live'
    },
    highlights: [
      'Next-generation Gemini Live conversational assistant built-in',
      'Add Me feature merges multiple shots so nobody is left out of group photos',
      '7 years of guaranteed Android OS and security feature drops'
    ]
  },

  // --- FASHION & LIFESTYLE (ஆடைகள் & பேஷன்) ---
  {
    id: 'prod-f1',
    name: 'Nike Air Jordan 1 Retro High OG (Chicago Lost & Found)',
    shortName: 'Nike Air Jordan 1 Retro OG',
    brand: 'Nike',
    category: 'fashion',
    subcategory: 'Footwear & Sneakers',
    price: 16995,
    originalPrice: 19995,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 6810,
    badge: 'Iconic Kick',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Varsity Red / Black', hex: '#BA1A1A', active: true },
      { name: 'Royal Blue', hex: '#0039B1', active: false }
    ],
    storageOptions: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specs: {
      'Upper Material': 'Premium cracked full-grain aged leather',
      'Sole': 'Air-Sole unit encapsulated in rubber cupsole',
      'Colorway': 'Varsity Red / Black / Sail / Muslin',
      'Closure': 'Lace-Up with extra vintage laces included'
    },
    highlights: [
      'Legendary 1985 silhouette with vintage aesthetic touches',
      'High-top padded collar for ankle lockdown and retro styling',
      'Durable solid rubber outsole with deep flex grooves'
    ]
  },
  {
    id: 'prod-f2',
    name: "Allen Solly Men's Slim Fit Cotton Oxford Shirt (Sky Blue)",
    shortName: "Allen Solly Cotton Oxford Shirt",
    brand: 'Allen Solly',
    category: 'fashion',
    subcategory: "Men's Topwear",
    price: 1499,
    originalPrice: 2499,
    discountPercent: 40,
    rating: 4.5,
    reviewCount: 11200,
    badge: '40% OFF',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB', active: true },
      { name: 'Pure White', hex: '#FFFFFF', active: false },
      { name: 'Navy Blue', hex: '#001A4D', active: false }
    ],
    storageOptions: ['S', 'M', 'L', 'XL', 'XXL'],
    specs: {
      'Fabric': '100% Breathable Long-Staple Combed Cotton',
      'Weave': 'Classic Oxford Weave with Soft-Washed Finish',
      'Collar': 'Button-Down Collar with contrast neck tape',
      'Care': 'Machine wash cold, easy iron formulation'
    },
    highlights: [
      'Versatile smart-casual piece suitable for work and weekend outings',
      'Signature embroidered stag logo on chest',
      'Pre-shrunk cotton fabric prevents fading and shrinking'
    ]
  },
  {
    id: 'prod-f3',
    name: 'Fossil Neutra Minimalist Chronograph Watch (Brown Leather Strap)',
    shortName: 'Fossil Neutra Chrono Watch',
    brand: 'Fossil',
    category: 'fashion',
    subcategory: 'Luxury Watches',
    price: 8995,
    originalPrice: 14995,
    discountPercent: 40,
    rating: 4.7,
    reviewCount: 4890,
    badge: 'Luxury Pick',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Amber Brown Leather', hex: '#8B4513', active: true },
      { name: 'Smoky Gunmetal', hex: '#2F4F4F', active: false }
    ],
    storageOptions: ['44mm Dial'],
    specs: {
      'Case Size': '44mm Stainless Steel with satin finish',
      'Movement': 'Quartz Chronograph with stopwatch sub-dials',
      'Water Resistance': '5 ATM (50 meters pressure test)',
      'Strap': 'Genuine eco-tanned leather interchangeable 22mm strap'
    },
    highlights: [
      'Bauhaus-inspired mid-century architecture dial design',
      'Scratch-resistant hardened mineral crystal glass',
      'Luminous hands for clear night reading'
    ]
  },
  {
    id: 'prod-f4',
    name: 'Ray-Ban Classic Aviator Polarized Sunglasses (Gold Frame / Green G-15)',
    shortName: 'Ray-Ban Aviator Polarized',
    brand: 'Ray-Ban',
    category: 'fashion',
    subcategory: 'Sunglasses & Specs',
    price: 9490,
    originalPrice: 12290,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 7420,
    badge: 'Classics',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Arista Gold', hex: '#D4AF37', active: true },
      { name: 'Gunmetal Gray', hex: '#4A4A4A', active: false }
    ],
    storageOptions: ['Standard 58mm', 'Large 62mm'],
    specs: {
      'Lens Technology': 'Polarized G-15 Mineral Glass, 100% UV400 Protection',
      'Frame Material': 'Hypoallergenic High-Grade Metal Alloy',
      'Bridge Width': '14 mm with adjustable soft silicone nose pads',
      'Includes': 'Authentic Leather Case & Microfiber Cleaning Cloth'
    },
    highlights: [
      'Eliminates 99% of reflected surface glare from roads and water',
      'True-to-life natural color perception with classic green tint',
      'Iconic teardrop shape that complements every face structure'
    ]
  },

  // --- HOME & LIVING (வீட்டு உபயோகம்) ---
  {
    id: 'prod-h1',
    name: 'Herman Miller Aeron Ergonomic Office Chair (Graphite, Fully Loaded)',
    shortName: 'Herman Miller Aeron Chair',
    brand: 'Herman Miller',
    category: 'home-living',
    subcategory: 'Living Room Furniture',
    price: 109990,
    originalPrice: 135000,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 2300,
    badge: 'Ergo Gold',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1580481077195-c3f912224016?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3f912224016?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Graphite Black', hex: '#2B2B2B', active: true },
      { name: 'Mineral White', hex: '#EAEAEA', active: false }
    ],
    storageOptions: ['Size B (Medium)', 'Size C (Large)'],
    specs: {
      'Suspension': 'Pellicle 8Z breathable mesh with 8 tension zones',
      'Spine Support': 'PostureFit SL dual-pad adjustable sacral support',
      'Armrests': 'Fully adjustable 4D leather arm pads (height, depth, angle)',
      'Warranty': '12-Year Official Herman Miller comprehensive warranty'
    },
    highlights: [
      'Pioneering ergonomic benchmark designed to keep the spine naturally aligned',
      'Zero pressure points with weight-neutralizing Pellicle mesh',
      'Smooth Harmonic 2 tilt mechanism matches body movement seamlessly'
    ]
  },
  {
    id: 'prod-h2',
    name: "De'Longhi Magnifica S Compact Bean-to-Cup Espresso Machine",
    shortName: "De'Longhi Espresso Coffee Maker",
    brand: "De'Longhi",
    category: 'home-living',
    subcategory: 'Living Room Furniture',
    price: 39990,
    originalPrice: 49990,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 3100,
    badge: 'Barista Choice',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Silver / Black', hex: '#4A4A4A', active: true }],
    storageOptions: ['1.8L Tank'],
    specs: {
      'Pump Pressure': 'Professional 15 Bar Italian Pump',
      'Grinder': 'Built-in Conical Steel Burr Grinder with 13 grind settings',
      'Milk System': 'Manual Cappuccino steam wand for microfoam art',
      'Bean Capacity': '250g Hopper with aroma-saving rubber seal lid'
    },
    highlights: [
      'Brews authentic Italian espresso and cappuccino from freshly ground beans in 40s',
      'Customizable coffee strength, temperature, and cup length',
      'Removable brewing unit for effortless cleaning under running water'
    ]
  },
  {
    id: 'prod-h3',
    name: 'Philips Hue Smart 2M Gradient Ambient Lightstrip with Bridge',
    shortName: 'Philips Hue Gradient Lightstrip',
    brand: 'Philips',
    category: 'home-living',
    subcategory: 'Smart Home',
    price: 7999,
    originalPrice: 11999,
    discountPercent: 33,
    rating: 4.8,
    reviewCount: 5410,
    badge: 'Smart Home',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Multicolor RGBW', hex: '#FF007F', active: true }],
    storageOptions: ['2 Meter Base Kit'],
    specs: {
      'Color Output': '16 Million Colors + tunable warm-to-cool white (2000K-6500K)',
      'Brightness': '1800 Lumens output with rich diffuse glow',
      'Connectivity': 'Zigbee + Bluetooth, works with Alexa, Apple HomeKit & Google',
      'Features': 'Sync with TV movies, music Spotify & PC gaming'
    },
    highlights: [
      'Seamless gradient color blending across a single strip',
      'Smart app scheduling for natural morning sunrise simulation',
      'Extendable up to 10 meters with plug-and-play extensions'
    ]
  },

  // --- APPLIANCES (மின்சாதனங்கள்) ---
  {
    id: 'prod-a1',
    name: 'LG 55" 4K OLED evo C4 Smart TV (Dolby Vision Atmos, 144Hz Gaming)',
    shortName: 'LG 55" OLED evo 4K Smart TV',
    brand: 'LG',
    category: 'appliances',
    subcategory: 'Smart Cooling & Appliances',
    price: 114990,
    originalPrice: 169990,
    discountPercent: 32,
    rating: 4.9,
    reviewCount: 4620,
    badge: '32% OFF',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Meteor Titan', hex: '#1C1C1E', active: true }],
    storageOptions: ['55 Inch', '65 Inch'],
    specs: {
      'Display Panel': 'Self-lit OLED evo with Brightness Booster',
      'Processor': 'α9 AI Processor 4K Gen7 with AI Picture Pro & Sound Pro',
      'Gaming': '4x HDMI 2.1 (4K 144Hz, VRR, G-Sync & FreeSync Premium)',
      'Audio': '40W 2.2 Channel Dolby Atmos with AI Acoustic Tuning'
    },
    highlights: [
      'Infinite contrast with perfect deep blacks and 100% color fidelity',
      'Ultra-fast 0.1ms response time makes it the pinnacle display for PS5 & PC gaming',
      'webOS 24 with 5 years of guaranteed Re:New software updates'
    ]
  },
  {
    id: 'prod-a2',
    name: 'Dyson Hot+Cool HP07 Purifying Fan Heater (HEPA H13 Filtration)',
    shortName: 'Dyson HP07 Purifier Heater',
    brand: 'Dyson',
    category: 'appliances',
    subcategory: 'Smart Cooling & Appliances',
    price: 49900,
    originalPrice: 62900,
    discountPercent: 21,
    rating: 4.7,
    reviewCount: 3890,
    badge: 'Pure Air',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'White / Silver', hex: '#F0F0F0', active: true }],
    storageOptions: ['Standard Tower'],
    specs: {
      'Filtration': 'Fully sealed to HEPA H13 standard, captures 99.95% of PM0.1 particles',
      'Functions': 'Triple Action: Purifier + Cooling Fan + Ceramic Room Heater',
      'Airflow': 'Air Multiplier technology projects 290 liters of clean air per second',
      'Smart App': 'MyDyson App with real-time AQI, PM2.5, NO2 and VOC monitoring'
    },
    highlights: [
      'Cleans the entire room air while providing customizable thermostatic warmth',
      'Solid-state formaldehyde sensor destroys toxins for life',
      '350-degree adjustable oscillation distributes purified air evenly'
    ]
  },

  // --- BEAUTY & CARE (அழகு & பராமரிப்பு) ---
  {
    id: 'prod-b1',
    name: 'Minimalist 10% Niacinamide Face Serum with Zinc & EUK-134 (30ml)',
    shortName: 'Minimalist 10% Niacinamide Serum',
    brand: 'Minimalist',
    category: 'beauty',
    subcategory: 'Face Care & Serums',
    price: 599,
    originalPrice: 699,
    discountPercent: 14,
    rating: 4.6,
    reviewCount: 42100,
    badge: 'Top Seller',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Transparent Clear', hex: '#FFFFFF', active: true }],
    storageOptions: ['30 ml', '60 ml'],
    specs: {
      'Key Actives': '10% Pure Niacinamide (Vitamin B3) + 1% Zinc PCA + EUK-134',
      'Skin Type': 'All skin types; best for acne-prone & oily skin with large pores',
      'Formula': 'Fragrance-free, Essential oil-free, Non-comedogenic & Vegan',
      'Benefits': 'Fades blemishes, balances sebum production, repairs skin barrier'
    },
    highlights: [
      'Clinically proven to reduce acne marks and hyperpigmentation in 2 weeks',
      'Formulated with pharmaceutical-grade Lonza Niacinamide',
      'Lightweight water-based formula absorbs in seconds without stickiness'
    ]
  },
  {
    id: 'prod-b2',
    name: 'Dyson Supersonic Nural Intelligent Hair Dryer (Patented Scalp Protect)',
    shortName: 'Dyson Supersonic Nural Dryer',
    brand: 'Dyson',
    category: 'beauty',
    subcategory: 'Face Care & Serums',
    price: 41900,
    originalPrice: 47900,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 2910,
    badge: 'Innovator',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Ceramic Patina / Topaz', hex: '#005555', active: true },
      { name: 'Vinca Blue / Rose', hex: '#2A3492', active: false }
    ],
    storageOptions: ['Full Styling Kit'],
    specs: {
      'Motor': 'Dyson Digital Motor V9 spinning at 110,000 RPM',
      'Sensors': 'Time-of-Flight sensor measures distance to automatically regulate 55°C heat',
      'Attachment Memory': 'Smart Hall sensor learns your styling preferences for each magnetic nozzle',
      'Attachments': 'Includes Wave+Curl diffuser, Gentle air attachment, Flyaway smoother'
    },
    highlights: [
      'Scalp protect mode keeps temperature at a constant soothing 55°C',
      'Dries hair 2x faster with zero extreme heat damage',
      'Illuminates capsule lighting to indicate real-time heat level'
    ]
  },

  // --- GROCERIES (மளிகைப் பொருட்கள்) ---
  {
    id: 'prod-g1',
    name: 'Blue Tokai Specialty Whole Roasted Coffee Beans - Attikan Estate (500g)',
    shortName: 'Blue Tokai Coffee Beans 500g',
    brand: 'Blue Tokai',
    category: 'groceries',
    subcategory: 'Daily Super Pantry',
    price: 650,
    originalPrice: 750,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 8900,
    badge: 'Fresh Roast',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Medium-Dark Roast', hex: '#533422', active: true }],
    storageOptions: ['250g', '500g', '1kg'],
    specs: {
      'Estate': 'Attikan Estate, Biligiriranga Hills, Karnataka (1750m MSL)',
      'Notes': 'Dark Chocolate, Figs, Roasted Almonds & Roasted Cocoa',
      'Roast Profile': 'Medium-Dark artisanal small-batch roast',
      'Process': 'Washed & Sun-Dried Arabica Beans'
    },
    highlights: [
      '100% Arabica specialty coffee roasted within 48 hours of dispatch',
      'Ideal for French Press, Espresso machines, South Indian Filter & Moka Pot',
      'Nitrogen flushed valve bag keeps beans fresh for up to 6 months'
    ]
  },

  // --- SPORTS & FITNESS (விளையாட்டு & உடற்பயிற்சி) ---
  {
    id: 'prod-s1',
    name: 'Garmin Forerunner 265 GPS AMOLED Running Smartwatch (Aqua)',
    shortName: 'Garmin Forerunner 265 GPS',
    brand: 'Garmin',
    category: 'sports',
    subcategory: 'Peak Performance Gear',
    price: 44990,
    originalPrice: 50490,
    discountPercent: 11,
    rating: 4.9,
    reviewCount: 3240,
    badge: 'Triathlon Ready',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Aqua / Black', hex: '#00C4CC', active: true },
      { name: 'Black / Slate', hex: '#2B2B2B', active: false }
    ],
    storageOptions: ['46mm Dial'],
    specs: {
      'Display': '1.3-inch Ultra-crisp Brilliant AMOLED Touchscreen with Gorilla Glass 3',
      'Battery Life': 'Up to 13 days in smartwatch mode (20 hours in full GPS mode)',
      'GPS': 'Multi-band GNSS with SatIQ technology for pinpoint precision in woods',
      'Training': 'Training Readiness score, HRV Status, VO2 Max & Daily Suggested Workouts'
    },
    highlights: [
      'Morning Report summarizes sleep score, recovery and training outlook at dawn',
      'Built-in wrist-based running power and running dynamics metrics',
      'Garmin Pay contactless payments and offline Spotify music storage'
    ]
  },

  // --- BOOKS (புத்தகங்கள்) ---
  {
    id: 'prod-bk1',
    name: 'Ponniyin Selvan Complete 5-Volume Boxed Deluxe Edition (Tamil - கல்கி)',
    shortName: 'பொன்னியின் செல்வன் 5 பாகங்கள்',
    brand: 'Vanathi Pathippagam',
    category: 'books',
    subcategory: 'Literary Treasures & Fiction',
    price: 1199,
    originalPrice: 1750,
    discountPercent: 31,
    rating: 5.0,
    reviewCount: 24500,
    badge: 'Classic Heritage',
    assured: true,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80'
    ],
    colors: [{ name: 'Royal Gold Hardcover', hex: '#C5A059', active: true }],
    storageOptions: ['5 Volumes Complete Set'],
    specs: {
      'Author': 'Kalki Krishnamurthy (கல்கி கிருஷ்ணமூர்த்தி)',
      'Language': 'Tamil (தமிழ் இலக்கிய காவியம்)',
      'Format': 'Hardbound Deluxe Gold-Embossed Collector Box Set',
      'Pages': '2,400+ Pages across all 5 volumes with classic Maniam illustrations'
    },
    highlights: [
      'The greatest historical magnum opus of Tamil literature covering the Chola empire',
      'High-grade acid-free paper with restored vintage Maniam artwork plates',
      'Includes exclusive historical fold-out maps of ancient Tamil Nadu & Sri Lanka'
    ]
  }
];
