"""
Porulagam Database Setup and Seed Script
Creates porulagam_db in MySQL Server and seeds all catalog tables.
"""
import pymysql
import json
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env
env_file = Path(__file__).parent / ".env"
if env_file.exists():
    load_dotenv(dotenv_path=env_file)
else:
    load_dotenv()

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = int(os.getenv('DB_PORT', '3306'))
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'sathish')
DB_NAME = os.getenv('DB_NAME', 'porulagam_db')

DB_CONFIG = {
    'host': DB_HOST,
    'user': DB_USER,
    'password': DB_PASSWORD,
    'port': DB_PORT,
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def setup_database():
    print(f"Connecting to MySQL server at {DB_HOST}:{DB_PORT} as '{DB_USER}'...")
    conn = pymysql.connect(**DB_CONFIG)
    try:
        with conn.cursor() as cursor:
            print(f"Creating database '{DB_NAME}' if not exists...")
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
            cursor.execute(f"USE `{DB_NAME}`;")

            print("Creating tables...")
            # 1. Categories
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS categories (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                tamil_name VARCHAR(100) NOT NULL,
                icon VARCHAR(50) NOT NULL,
                color_class VARCHAR(100),
                banner_title VARCHAR(200),
                banner_subtitle VARCHAR(255),
                banner_icon VARCHAR(50)
            );
            """)

            # 2. Subcategories
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS subcategories (
                id VARCHAR(50) PRIMARY KEY,
                category_id VARCHAR(50) NOT NULL,
                name VARCHAR(100) NOT NULL,
                icon VARCHAR(50) NOT NULL,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
            );
            """)

            # 3. Products
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                short_name VARCHAR(150),
                brand VARCHAR(100) NOT NULL,
                category_id VARCHAR(50) NOT NULL,
                subcategory VARCHAR(100),
                price DECIMAL(10, 2) NOT NULL,
                original_price DECIMAL(10, 2),
                discount_percent INT DEFAULT 0,
                rating DECIMAL(2, 1) DEFAULT 4.5,
                review_count INT DEFAULT 0,
                badge VARCHAR(50),
                assured BOOLEAN DEFAULT TRUE,
                in_stock BOOLEAN DEFAULT TRUE,
                main_image TEXT NOT NULL,
                images_json JSON,
                colors_json JSON,
                storage_json JSON,
                specs_json JSON,
                highlights_json JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
            );
            """)

            # 4. Coupons
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS coupons (
                code VARCHAR(50) PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description VARCHAR(255),
                discount_percent INT DEFAULT 0,
                flat_discount DECIMAL(10, 2) DEFAULT 0,
                max_discount DECIMAL(10, 2) DEFAULT 0,
                min_cart_value DECIMAL(10, 2) DEFAULT 0
            );
            """)

            # 5. Bank Offers
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS bank_offers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                bank VARCHAR(100) NOT NULL,
                tag VARCHAR(100),
                offer VARCHAR(255) NOT NULL,
                min_txn VARCHAR(100),
                badge VARCHAR(50)
            );
            """)

            # 6. Users
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(50) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                tamil_name VARCHAR(100),
                phone VARCHAR(20) UNIQUE NOT NULL,
                email VARCHAR(100),
                avatar TEXT,
                super_coins INT DEFAULT 0,
                membership_tier VARCHAR(50) DEFAULT 'Plus Gold'
            );
            """)

            # 7. Orders
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id VARCHAR(50) PRIMARY KEY,
                user_id VARCHAR(50),
                order_date VARCHAR(50),
                status VARCHAR(50) DEFAULT 'transit',
                status_text VARCHAR(150),
                delivery_date VARCHAR(100),
                courier VARCHAR(100),
                tracking_number VARCHAR(100),
                total_amount DECIMAL(10, 2) NOT NULL,
                delivery_address TEXT,
                payment_method VARCHAR(100),
                steps_json JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)

            # 8. Order Items
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id VARCHAR(50) NOT NULL,
                product_id VARCHAR(50),
                product_name VARCHAR(255) NOT NULL,
                product_image TEXT,
                color VARCHAR(50),
                quantity INT DEFAULT 1,
                price DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            );
            """)

            conn.commit()
            print("Tables created successfully.")

            # SEED DATA
            print("Seeding categories...")
            categories_data = [
                ('electronics', 'Electronics', 'மின்னணுவியல்', 'devices_other', 'text-primary bg-primary-fixed', 'Electronics Clearance', 'Up to 70% Off on Tech Essentials', 'headphones'),
                ('mobiles', 'Mobiles', 'கைபேசிகள்', 'smartphone', 'text-secondary bg-secondary-fixed', 'Flagship 5G Smart Phones', 'Exchange Bonus up to ₹8,000 Extra', 'smartphone'),
                ('fashion', 'Fashion', 'ஆடைகள் & பேஷன்', 'checkroom', 'text-tertiary bg-tertiary-fixed', 'Festive Season Grand Sale', 'Min 50% - 80% Off on Top Brands', 'apparel'),
                ('home-living', 'Home & Living', 'வீட்டு உபயோகம்', 'chair', 'text-primary-container bg-surface-container-highest', 'Modern Home Makeover', 'Upto 65% Off on Furniture & Mattresses', 'chair'),
                ('appliances', 'Appliances', 'மின்சாதனங்கள்', 'kitchen', 'text-secondary bg-secondary-container', 'Smart Cooling & Appliances', 'Inverter ACs & Double Door Fridges', 'ac_unit'),
                ('beauty', 'Beauty & Care', 'அழகு & பராமரிப்பு', 'spa', 'text-error bg-error-container', 'Glow & Wellness Festival', 'Buy 2 Get 1 Free on Serums', 'spa'),
                ('groceries', 'Groceries', 'மளிகைப் பொருட்கள்', 'local_mall', 'text-secondary bg-secondary-fixed-dim', 'Daily Super Pantry', 'Delivered in 10-20 Mins', 'local_mall'),
                ('sports', 'Sports & Fitness', 'விளையாட்டு & உடற்பயிற்சி', 'fitness_center', 'text-primary bg-surface-container-low', 'Peak Performance Gear', 'Flat 40% Off on Gym Equipment', 'fitness_center'),
                ('books', 'Books', 'புத்தகங்கள்', 'menu_book', 'text-tertiary bg-tertiary-fixed-dim', 'Literary Treasures & Fiction', 'Buy 3 Books at Flat ₹799', 'menu_book')
            ]
            cursor.executemany("""
            INSERT INTO categories (id, name, tamil_name, icon, color_class, banner_title, banner_subtitle, banner_icon)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE name=VALUES(name), tamil_name=VALUES(tamil_name);
            """, categories_data)

            print("Seeding subcategories...")
            subcategories_data = [
                ('smartphones', 'electronics', 'Smart Phones', 'phone_iphone'),
                ('laptops', 'electronics', 'Laptops & PCs', 'laptop_chromebook'),
                ('audio', 'electronics', 'Audio & Buds', 'headset'),
                ('watches', 'electronics', 'Smart Watches', 'watch'),
                ('cameras', 'electronics', 'Cameras & Air', 'photo_camera'),
                ('gaming', 'electronics', 'Gaming Consoles', 'sports_esports'),
                ('tablets', 'electronics', 'Tablets & iPads', 'tablet_mac'),
                ('power', 'electronics', 'Power & Cables', 'battery_charging_full'),
                ('smarthome', 'electronics', 'Smart Home', 'home_iot_device'),
                ('flagship5g', 'mobiles', 'Flagship 5G', '5g'),
                ('budgetmobiles', 'mobiles', 'Budget Phones', 'phone_android'),
                ('menstopwear', 'fashion', "Men's Topwear", 'checkroom'),
                ('footwear', 'fashion', 'Footwear & Sneakers', 'steps'),
                ('living', 'home-living', 'Living Room Furniture', 'chair'),
                ('skincare', 'beauty', 'Face Care & Serums', 'spa')
            ]
            cursor.executemany("""
            INSERT INTO subcategories (id, category_id, name, icon)
            VALUES (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE name=VALUES(name);
            """, subcategories_data)

            print("Seeding products...")
            products_data = [
                # --- ELECTRONICS ---
                (
                    'prod-1',
                    'UltraTech Neo 15 Pro 5G (Celestial Blue, 256 GB, 12 GB RAM)',
                    'UltraTech Neo 15 Pro 5G',
                    'UltraTech Pro',
                    'electronics',
                    'Smart Phones',
                    34999.00,
                    42999.00,
                    19,
                    4.6,
                    14208,
                    'Best Seller',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Celestial Blue', 'hex': '#1E50D8'}, {'name': 'Phantom Graphite', 'hex': '#283044'}]),
                    json.dumps(['128 GB', '256 GB', '512 GB']),
                    json.dumps({'Display': '6.78-inch 1.5K 120Hz LTPO AMOLED', 'Processor': 'Snapdragon 8 Gen 3', 'Battery': '5400 mAh with 100W SuperVOOC', 'Camera': '50MP Sony LYT-808 OIS'}),
                    json.dumps(['50MP Triple OIS Flagship Camera', 'Ultra-bright 4500 nits Display', 'SuperVOOC 100W Fast Charger Included'])
                ),
                (
                    'prod-2',
                    'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
                    'Sony WH-1000XM5 ANC',
                    'Sony',
                    'electronics',
                    'Audio & Buds',
                    24990.00,
                    29990.00,
                    17,
                    4.8,
                    8940,
                    '42% OFF',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Matte Black', 'hex': '#131B2E'}, {'name': 'Silver White', 'hex': '#FAF8FF'}]),
                    json.dumps(['Standard']),
                    json.dumps({'Driver': '30mm carbon fiber driver', 'Noise Cancellation': 'Dual Processor V1 + QN1', 'Battery': '30 hrs with ANC on'}),
                    json.dumps(['Industry-leading 8-mic ANC', 'Auto NC Optimizer', 'Crystal-clear hands-free calling'])
                ),
                (
                    'prod-3',
                    'Apple iPad Air 11" (M2 Chip, Liquid Retina, 128GB, Space Gray)',
                    'iPad Air 11" M2',
                    'Apple',
                    'electronics',
                    'Tablets & iPads',
                    54900.00,
                    59900.00,
                    8,
                    4.9,
                    3120,
                    'HOT',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Space Gray', 'hex': '#434654'}, {'name': 'Starlight', 'hex': '#F2F3FF'}]),
                    json.dumps(['128 GB', '256 GB']),
                    json.dumps({'Chipset': 'Apple M2 8-core CPU', 'Display': '11-inch Liquid Retina True Tone', 'Camera': '12MP Center Stage'}),
                    json.dumps(['Blazing fast Apple M2 processor', 'Landscape Center Stage camera', 'Wi-Fi 6E connectivity'])
                ),
                (
                    'prod-4',
                    'Samsung Galaxy Watch Ultra (Titanium Gray, Orange Band, 47mm LTE)',
                    'Galaxy Watch Ultra',
                    'Samsung',
                    'electronics',
                    'Smart Watches',
                    49999.00,
                    59999.00,
                    15,
                    4.7,
                    1950,
                    '15% OFF',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Titanium Gray', 'hex': '#653E00'}]),
                    json.dumps(['47mm LTE']),
                    json.dumps({'Casing': 'Grade 4 Titanium with 10 ATM', 'Display': '1.5-inch Super AMOLED 3000 nits', 'Battery': '590 mAh'}),
                    json.dumps(['Withstands 55°C heat & 9000m altitude', 'Dual-frequency GPS', 'Personalized Energy Score via Galaxy AI'])
                ),
                (
                    'prod-5',
                    'Dell XPS 14 Premium OLED Laptop (Intel Core Ultra 7, 16GB, 1TB SSD)',
                    'Dell XPS 14 Core Ultra 7',
                    'Dell',
                    'electronics',
                    'Laptops & PCs',
                    134990.00,
                    154990.00,
                    13,
                    4.8,
                    780,
                    'Flagship',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Platinum Silver', 'hex': '#D2D9F4'}]),
                    json.dumps(['1 TB SSD']),
                    json.dumps({'Processor': 'Intel Core Ultra 7 155H', 'Display': '14.5" 3.2K 120Hz OLED Touch', 'GPU': 'RTX 4050 6GB'}),
                    json.dumps(['Stunning 3.2K InfinityEdge OLED Touch', 'Seamless glass touchpad', 'Dedicated Microsoft Copilot key'])
                ),
                (
                    'prod-6',
                    'boAt Nirvana Ion ANC True Wireless Earbuds (120 hrs Playback)',
                    'boAt Nirvana Ion ANC',
                    'boAt',
                    'electronics',
                    'Audio & Buds',
                    2499.00,
                    7990.00,
                    68,
                    4.4,
                    32410,
                    '68% OFF',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Charcoal Black', 'hex': '#131B2E'}]),
                    json.dumps(['Standard']),
                    json.dumps({'ANC': 'Up to 32dB Active Noise Cancellation', 'Battery': '120 Hours total backup', 'Drivers': 'Dual 10mm Crystal Bionic'}),
                    json.dumps(['120 Hours industry leading backup', 'Crystal Bionic Sound', 'In-ear detection sensor'])
                ),
                (
                    'prod-7',
                    'Apple AirTag (4 Pack) - Precision Finding with U1 Ultra Wideband',
                    'Apple AirTag 4-Pack',
                    'Apple',
                    'electronics',
                    'Smart Home',
                    9990.00,
                    11900.00,
                    16,
                    4.9,
                    5620,
                    'Must Have',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Silver White', 'hex': '#FFFFFF'}]),
                    json.dumps(['4 Pack']),
                    json.dumps({'Water Resistance': 'IP67 rated', 'Battery': 'CR2032 coin battery (1+ year)', 'Tracking': 'Precision Finding UWB'}),
                    json.dumps(['Keep track of keys, wallet, luggage in Find My app', 'One-tap setup', 'Built-in speaker sound'])
                ),
                (
                    'prod-8',
                    'Anker Prime 20,000mAh Power Bank (200W Output with Smart Digital Display)',
                    'Anker Prime 200W Power Bank',
                    'Anker',
                    'electronics',
                    'Power & Cables',
                    8499.00,
                    12999.00,
                    35,
                    4.8,
                    4210,
                    '35% OFF',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Space Gray', 'hex': '#283044'}]),
                    json.dumps(['20,000 mAh']),
                    json.dumps({'Output': '200W Multi-device simultaneous', 'Ports': '2x USB-C + 1x USB-A', 'Display': 'Color digital LCD'}),
                    json.dumps(['Charge two MacBook Pro laptops at 100W', 'Compact soda-can form factor', 'ActiveShield 2.0 temperature safety'])
                ),

                # --- MOBILES ---
                (
                    'prod-m1',
                    'Apple iPhone 16 Pro Max (Desert Titanium, 256 GB)',
                    'iPhone 16 Pro Max 256GB',
                    'Apple',
                    'mobiles',
                    'Flagship 5G',
                    139900.00,
                    144900.00,
                    3,
                    4.9,
                    18450,
                    'Super Flagship',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Desert Titanium', 'hex': '#C5A98B'}, {'name': 'Black Titanium', 'hex': '#212123'}]),
                    json.dumps(['256 GB', '512 GB', '1 TB']),
                    json.dumps({'Processor': 'A18 Pro chip', 'Display': '6.9" Super Retina XDR OLED 120Hz', 'Camera': '48MP Fusion + 48MP UW + 12MP 5x'}),
                    json.dumps(['Grade 5 Titanium build', 'Dedicated Camera Control button', 'Apple Intelligence built-in'])
                ),
                (
                    'prod-m2',
                    'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB RAM, 256GB Storage)',
                    'Galaxy S24 Ultra 5G',
                    'Samsung',
                    'mobiles',
                    'Flagship 5G',
                    119999.00,
                    134999.00,
                    11,
                    4.8,
                    15300,
                    'Galaxy AI',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Titanium Gray', 'hex': '#58585A'}]),
                    json.dumps(['256 GB', '512 GB']),
                    json.dumps({'Processor': 'Snapdragon 8 Gen 3 for Galaxy', 'Display': '6.8" Dynamic AMOLED 2X 2600 nits', 'Camera': '200MP Quad Tele 100x Zoom'}),
                    json.dumps(['Circle to Search with Google', 'Gorilla Armor anti-reflective glass', 'Built-in S-Pen stylus'])
                ),
                (
                    'prod-m3',
                    'OnePlus 12 5G (Flowy Emerald, 16GB RAM, 512GB Storage)',
                    'OnePlus 12 5G',
                    'OnePlus',
                    'mobiles',
                    'Flagship 5G',
                    64999.00,
                    69999.00,
                    7,
                    4.7,
                    9400,
                    'Trending',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Flowy Emerald', 'hex': '#1C4B40'}]),
                    json.dumps(['256 GB', '512 GB']),
                    json.dumps({'Processor': 'Snapdragon 8 Gen 3', 'Battery': '5400 mAh with 100W SUPERVOOC', 'Display': '6.82" 2K 120Hz ProXDR 4500 nits'}),
                    json.dumps(['4500 nits brightest display with Aqua Touch', '100W fast charge in 26 mins', 'Hasselblad portrait camera'])
                ),
                (
                    'prod-m4',
                    'Google Pixel 9 Pro XL (Porcelain, 16GB RAM, 256GB Storage)',
                    'Pixel 9 Pro XL',
                    'Google',
                    'mobiles',
                    'Flagship 5G',
                    124999.00,
                    129999.00,
                    4,
                    4.8,
                    4200,
                    'Gemini AI',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Porcelain', 'hex': '#F5F5F0'}]),
                    json.dumps(['128 GB', '256 GB']),
                    json.dumps({'Chipset': 'Google Tensor G4', 'Display': '6.8" Super Actua LTPO OLED 3000 nits', 'Camera': '50MP + 48MP UW + 48MP 5x'}),
                    json.dumps(['Next-gen Gemini Live conversational assistant', 'Add Me camera tool', '7 years of OS updates'])
                ),

                # --- FASHION ---
                (
                    'prod-f1',
                    'Nike Air Jordan 1 Retro High OG (Chicago Lost & Found)',
                    'Nike Air Jordan 1 Retro OG',
                    'Nike',
                    'fashion',
                    'Footwear & Sneakers',
                    16995.00,
                    19995.00,
                    15,
                    4.9,
                    6810,
                    'Iconic Kick',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Varsity Red / Black', 'hex': '#BA1A1A'}]),
                    json.dumps(['UK 8', 'UK 9', 'UK 10']),
                    json.dumps({'Upper': 'Premium cracked full-grain leather', 'Sole': 'Encapsulated Air-Sole unit'}),
                    json.dumps(['Legendary 1985 silhouette', 'Padded high-top collar', 'Durable solid rubber traction'])
                ),
                (
                    'prod-f2',
                    "Allen Solly Men's Slim Fit Cotton Oxford Shirt (Sky Blue)",
                    "Allen Solly Cotton Oxford Shirt",
                    'Allen Solly',
                    'fashion',
                    "Men's Topwear",
                    1499.00,
                    2499.00,
                    40,
                    4.5,
                    11200,
                    '40% OFF',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Sky Blue', 'hex': '#87CEEB'}]),
                    json.dumps(['M', 'L', 'XL']),
                    json.dumps({'Fabric': '100% Breathable Long-Staple Cotton', 'Weave': 'Classic Oxford Weave'}),
                    json.dumps(['Versatile smart-casual piece', 'Signature embroidered stag logo', 'Pre-shrunk cotton fabric'])
                ),
                (
                    'prod-f3',
                    'Fossil Neutra Minimalist Chronograph Watch (Brown Leather Strap)',
                    'Fossil Neutra Chrono Watch',
                    'Fossil',
                    'fashion',
                    'Luxury Watches',
                    8995.00,
                    14995.00,
                    40,
                    4.7,
                    4890,
                    'Luxury Pick',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Amber Brown Leather', 'hex': '#8B4513'}]),
                    json.dumps(['44mm Dial']),
                    json.dumps({'Case': '44mm Stainless Steel', 'Movement': 'Quartz Chronograph', 'Water Resistance': '5 ATM'}),
                    json.dumps(['Bauhaus-inspired dial', 'Scratch-resistant mineral crystal glass', 'Luminous hands'])
                ),
                (
                    'prod-f4',
                    'Ray-Ban Classic Aviator Polarized Sunglasses (Gold Frame / Green G-15)',
                    'Ray-Ban Aviator Polarized',
                    'Ray-Ban',
                    'fashion',
                    'Sunglasses & Specs',
                    9490.00,
                    12290.00,
                    23,
                    4.8,
                    7420,
                    'Classics',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Arista Gold', 'hex': '#D4AF37'}]),
                    json.dumps(['Standard 58mm']),
                    json.dumps({'Lens': 'Polarized G-15 Mineral Glass 100% UV400', 'Frame': 'Hypoallergenic Metal Alloy'}),
                    json.dumps(['Eliminates 99% glare', 'True-to-life color perception', 'Iconic teardrop shape'])
                ),

                # --- HOME & LIVING ---
                (
                    'prod-h1',
                    'Herman Miller Aeron Ergonomic Office Chair (Graphite, Fully Loaded)',
                    'Herman Miller Aeron Chair',
                    'Herman Miller',
                    'home-living',
                    'Living Room Furniture',
                    109990.00,
                    135000.00,
                    19,
                    4.9,
                    2300,
                    'Ergo Gold',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1580481077195-c3f912224016?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1580481077195-c3f912224016?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Graphite Black', 'hex': '#2B2B2B'}]),
                    json.dumps(['Size B (Medium)']),
                    json.dumps({'Suspension': 'Pellicle 8Z breathable mesh', 'Support': 'PostureFit SL dual-pad', 'Warranty': '12-Year Warranty'}),
                    json.dumps(['Pioneering ergonomic benchmark', 'Zero pressure points', 'Smooth Harmonic 2 tilt mechanism'])
                ),
                (
                    'prod-h2',
                    "De'Longhi Magnifica S Compact Bean-to-Cup Espresso Machine",
                    "De'Longhi Espresso Coffee Maker",
                    "De'Longhi",
                    'home-living',
                    'Living Room Furniture',
                    39990.00,
                    49990.00,
                    20,
                    4.7,
                    3100,
                    'Barista Choice',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Silver / Black', 'hex': '#4A4A4A'}]),
                    json.dumps(['1.8L Tank']),
                    json.dumps({'Pressure': '15 Bar Italian Pump', 'Grinder': 'Steel Conical Burr Grinder 13 settings'}),
                    json.dumps(['Brews authentic espresso and cappuccino in 40s', 'Customizable coffee strength', 'Removable brewing unit'])
                ),
                (
                    'prod-h3',
                    'Philips Hue Smart 2M Gradient Ambient Lightstrip with Bridge',
                    'Philips Hue Gradient Lightstrip',
                    'Philips',
                    'home-living',
                    'Smart Home',
                    7999.00,
                    11999.00,
                    33,
                    4.8,
                    5410,
                    'Smart Home',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Multicolor RGBW', 'hex': '#FF007F'}]),
                    json.dumps(['2 Meter Base Kit']),
                    json.dumps({'Colors': '16 Million Colors + tunable white', 'Brightness': '1800 Lumens', 'Compatibility': 'Alexa, HomeKit, Google'}),
                    json.dumps(['Seamless gradient color blending', 'Sync with movies & gaming', 'App sunrise automation'])
                ),

                # --- APPLIANCES ---
                (
                    'prod-a1',
                    'LG 55" 4K OLED evo C4 Smart TV (Dolby Vision Atmos, 144Hz Gaming)',
                    'LG 55" OLED evo 4K Smart TV',
                    'LG',
                    'appliances',
                    'Smart Cooling & Appliances',
                    114990.00,
                    169990.00,
                    32,
                    4.9,
                    4620,
                    '32% OFF',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Meteor Titan', 'hex': '#1C1C1E'}]),
                    json.dumps(['55 Inch']),
                    json.dumps({'Display': 'Self-lit OLED evo', 'Processor': 'a9 AI Processor 4K Gen7', 'Gaming': '4x HDMI 2.1 144Hz VRR'}),
                    json.dumps(['Infinite contrast with perfect deep blacks', '0.1ms ultra-fast gaming response', 'webOS 24 with 5 yrs updates'])
                ),
                (
                    'prod-a2',
                    'Dyson Hot+Cool HP07 Purifying Fan Heater (HEPA H13 Filtration)',
                    'Dyson HP07 Purifier Heater',
                    'Dyson',
                    'appliances',
                    'Smart Cooling & Appliances',
                    49900.00,
                    62900.00,
                    21,
                    4.7,
                    3890,
                    'Pure Air',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'White / Silver', 'hex': '#F0F0F0'}]),
                    json.dumps(['Standard Tower']),
                    json.dumps({'Filtration': 'HEPA H13 captures 99.95% PM0.1', 'Functions': 'Purifier + Fan + Ceramic Heater'}),
                    json.dumps(['Cleans whole room while providing warmth', 'Destroys formaldehyde', '350 degree oscillation'])
                ),

                # --- BEAUTY & CARE ---
                (
                    'prod-b1',
                    'Minimalist 10% Niacinamide Face Serum with Zinc & EUK-134 (30ml)',
                    'Minimalist 10% Niacinamide Serum',
                    'Minimalist',
                    'beauty',
                    'Face Care & Serums',
                    599.00,
                    699.00,
                    14,
                    4.6,
                    42100,
                    'Top Seller',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Transparent Clear', 'hex': '#FFFFFF'}]),
                    json.dumps(['30 ml']),
                    json.dumps({'Actives': '10% Niacinamide + 1% Zinc PCA', 'Formula': 'Fragrance-free, Non-comedogenic'}),
                    json.dumps(['Reduces acne marks & hyperpigmentation', 'Balances sebum production', 'Lightweight water-based formula'])
                ),
                (
                    'prod-b2',
                    'Dyson Supersonic Nural Intelligent Hair Dryer (Patented Scalp Protect)',
                    'Dyson Supersonic Nural Dryer',
                    'Dyson',
                    'beauty',
                    'Face Care & Serums',
                    41900.00,
                    47900.00,
                    13,
                    4.9,
                    2910,
                    'Innovator',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Ceramic Patina / Topaz', 'hex': '#005555'}]),
                    json.dumps(['Full Styling Kit']),
                    json.dumps({'Motor': 'Dyson Digital V9 110,000 RPM', 'Sensors': 'ToF sensor regulates 55C heat'}),
                    json.dumps(['Scalp protect mode keeps 55C warmth', 'Dries 2x faster with zero extreme heat', 'Smart attachment learning'])
                ),

                # --- GROCERIES ---
                (
                    'prod-g1',
                    'Blue Tokai Specialty Whole Roasted Coffee Beans - Attikan Estate (500g)',
                    'Blue Tokai Coffee Beans 500g',
                    'Blue Tokai',
                    'groceries',
                    'Daily Super Pantry',
                    650.00,
                    750.00,
                    13,
                    4.8,
                    8900,
                    'Fresh Roast',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Medium-Dark Roast', 'hex': '#533422'}]),
                    json.dumps(['500g']),
                    json.dumps({'Estate': 'Attikan Estate, BR Hills (1750m MSL)', 'Notes': 'Dark Chocolate, Figs, Roasted Almonds'}),
                    json.dumps(['100% Arabica specialty coffee roasted within 48h', 'Ideal for French Press & Filter', 'Nitrogen flushed valve bag'])
                ),

                # --- SPORTS ---
                (
                    'prod-s1',
                    'Garmin Forerunner 265 GPS AMOLED Running Smartwatch (Aqua)',
                    'Garmin Forerunner 265 GPS',
                    'Garmin',
                    'sports',
                    'Peak Performance Gear',
                    44990.00,
                    50490.00,
                    11,
                    4.9,
                    3240,
                    'Triathlon Ready',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Aqua / Black', 'hex': '#00C4CC'}]),
                    json.dumps(['46mm Dial']),
                    json.dumps({'Display': '1.3" AMOLED Touch Gorilla Glass 3', 'Battery': 'Up to 13 days', 'GPS': 'Multi-band GNSS SatIQ'}),
                    json.dumps(['Morning Report summarizes sleep and recovery', 'Wrist-based running power dynamics', 'Garmin Pay & offline Spotify'])
                ),

                # --- BOOKS ---
                (
                    'prod-bk1',
                    'Ponniyin Selvan Complete 5-Volume Boxed Deluxe Edition (Tamil - கல்கி)',
                    'பொன்னியின் செல்வன் 5 பாகங்கள்',
                    'Vanathi Pathippagam',
                    'books',
                    'Literary Treasures & Fiction',
                    1199.00,
                    1750.00,
                    31,
                    5.0,
                    24500,
                    'Classic Heritage',
                    True,
                    True,
                    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80',
                    json.dumps(['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80']),
                    json.dumps([{'name': 'Royal Gold Hardcover', 'hex': '#C5A059'}]),
                    json.dumps(['5 Volumes Set']),
                    json.dumps({'Author': 'Kalki Krishnamurthy', 'Language': 'Tamil', 'Pages': '2,400+ Pages with Maniam art'}),
                    json.dumps(['The greatest historical magnum opus of Tamil literature', 'Deluxe Gold-Embossed Collector Box Set', 'Fold-out maps of Chola Empire'])
                )
            ]
            cursor.executemany("""
            INSERT INTO products (id, name, short_name, brand, category_id, subcategory, price, original_price, discount_percent, rating, review_count, badge, assured, in_stock, main_image, images_json, colors_json, storage_json, specs_json, highlights_json)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE 
                name=VALUES(name), short_name=VALUES(short_name), brand=VALUES(brand), category_id=VALUES(category_id),
                subcategory=VALUES(subcategory), price=VALUES(price), original_price=VALUES(original_price),
                discount_percent=VALUES(discount_percent), rating=VALUES(rating), review_count=VALUES(review_count),
                badge=VALUES(badge), main_image=VALUES(main_image), images_json=VALUES(images_json),
                colors_json=VALUES(colors_json), storage_json=VALUES(storage_json), specs_json=VALUES(specs_json),
                highlights_json=VALUES(highlights_json);
            """, products_data)

            print("Seeding coupons & bank offers...")
            coupons_data = [
                ('PORULAGAM10', 'Flat 10% Off up to ₹1,500', 'Valid on all Electronics & Mobiles', 10, 0, 1500, 2999),
                ('WELCOME500', 'Flat ₹500 Welcome Discount', 'Applicable on first order', 0, 500, 500, 1999),
                ('SUPER50', 'SuperCoin Saver - Flat ₹250 Off', 'Redeem Porulagam Plus coins', 0, 250, 250, 999)
            ]
            cursor.executemany("""
            INSERT INTO coupons (code, title, description, discount_percent, flat_discount, max_discount, min_cart_value)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE title=VALUES(title);
            """, coupons_data)

            bank_data = [
                ('HDFC Bank', 'Credit & Debit Cards', '10% Instant Cashback up to ₹1,500', 'Min order ₹4,999', 'INSTANT'),
                ('ICICI Bank', 'No Cost EMI', 'Zero processing fee on 6 & 12 month EMIs', 'Min order ₹7,000', 'NO COST EMI'),
                ('SBI Card', 'Credit Cards', 'Flat ₹1,000 Instant Discount', 'Min order ₹10,000', 'BANK DROP')
            ]
            cursor.executemany("""
            INSERT INTO bank_offers (bank, tag, offer, min_txn, badge)
            VALUES (%s, %s, %s, %s, %s);
            """, bank_data)

            print("Seeding demo user...")
            cursor.execute("""
            INSERT INTO users (id, name, tamil_name, phone, email, avatar, super_coins, membership_tier)
            VALUES ('usr-1', 'Ananya Krishnan', 'அனன்யா கிருஷ்ணன்', '+91 98765 43210', 'ananya.k@example.com', 'https://lh3.googleusercontent.com/aida/AEtjO1VMK7LzmN11OfbTszqVMKU9MRwYeZaznwDllrDgq5bU9FagEjzWHPl7iE7IrMndkrNotBzyUF8XXPWwKS0MR6UhmUgiTsYdG2BfpHEmCWxAr93XRrvj5gimfh2qOy6m5iiMk0FzUml0NZALgeyvQolElc-M_OqYh6x6Qh_2anaqbSfmXrdet0iolaEUyERhlBGWR5vu-ByfwI5BqUvLkll9m0irF2Sjdc1DauDop15XMcbyF0i2DIaY-iw', 240, 'பொருளகம் Plus Gold')
            ON DUPLICATE KEY UPDATE name=VALUES(name);
            """)

            print("Seeding initial orders...")
            orders_data = [
                (
                    'POR-892410', 'usr-1', '24 Oct 2024', 'transit', 'In Transit - Out for Delivery Today',
                    'Arriving Today by 8:00 PM', 'Porulagam Express (Air Speed)', 'PE-IND-90821948', 34999.00,
                    'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103', 'UPI (Google Pay)',
                    json.dumps([
                        {'title': 'Order Confirmed', 'time': '24 Oct, 09:15 AM', 'done': True},
                        {'title': 'Packed at Hub', 'time': '24 Oct, 01:40 PM', 'done': True},
                        {'title': 'Shipped via Express Air', 'time': '24 Oct, 07:10 PM', 'done': True},
                        {'title': 'Out for Delivery', 'time': 'Today, 08:30 AM', 'done': True, 'current': True},
                        {'title': 'Delivered', 'time': 'Expected by 08:00 PM', 'done': False}
                    ])
                )
            ]
            cursor.executemany("""
            INSERT INTO orders (id, user_id, order_date, status, status_text, delivery_date, courier, tracking_number, total_amount, delivery_address, payment_method, steps_json)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE status=VALUES(status);
            """, orders_data)

            cursor.execute("""
            INSERT INTO order_items (order_id, product_id, product_name, product_image, color, quantity, price)
            VALUES ('POR-892410', 'prod-1', 'UltraTech Neo 15 Pro 5G (Celestial Blue, 256 GB)', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2PzbGKvccLfzdlcXqTbR0LlXY-buu4Q-GVyThXXtSgGIV2ePGZmycarqo15LKK-Qw4eaB74_KGLaq-ZrQNA4WmYyNYe84lJDIcrcvGS4hfpPsBS0B7DBz3So3wgGuZd142LyZ5lLuMwMiq1rm5XAnVrISq2uCK7dv8sjmv3mpESWOK9k1XSh33S-Ba1EmGSk0tWEepBQnvZFqF426SZsQlk37pEokCq5BKVnp6cZUsvJ5hDZEaCp', 'Celestial Blue', 1, 34999.00)
            ON DUPLICATE KEY UPDATE quantity=VALUES(quantity);
            """)

            conn.commit()
            print("Successfully initialized and seeded porulagam_db in MySQL!")

    finally:
        conn.close()

if __name__ == '__main__':
    setup_database()
