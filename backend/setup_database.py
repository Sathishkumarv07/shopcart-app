"""
Porulagam Database Setup and Seed Script
Creates porulagam_db in MySQL Server and seeds all catalog tables.
"""
import pymysql
import json

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'sathish',
    'port': 3306,
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def setup_database():
    print("Connecting to MySQL server at localhost:3306...")
    conn = pymysql.connect(**DB_CONFIG)
    try:
        with conn.cursor() as cursor:
            print("Creating database 'porulagam_db' if not exists...")
            cursor.execute("CREATE DATABASE IF NOT EXISTS porulagam_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
            cursor.execute("USE porulagam_db;")

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
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2PzbGKvccLfzdlcXqTbR0LlXY-buu4Q-GVyThXXtSgGIV2ePGZmycarqo15LKK-Qw4eaB74_KGLaq-ZrQNA4WmYyNYe84lJDIcrcvGS4hfpPsBS0B7DBz3So3wgGuZd142LyZ5lLuMwMiq1rm5XAnVrISq2uCK7dv8sjmv3mpESWOK9k1XSh33S-Ba1EmGSk0tWEepBQnvZFqF426SZsQlk37pEokCq5BKVnp6cZUsvJ5hDZEaCp',
                    json.dumps([
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2PzbGKvccLfzdlcXqTbR0LlXY-buu4Q-GVyThXXtSgGIV2ePGZmycarqo15LKK-Qw4eaB74_KGLaq-ZrQNA4WmYyNYe84lJDIcrcvGS4hfpPsBS0B7DBz3So3wgGuZd142LyZ5lLuMwMiq1rm5XAnVrISq2uCK7dv8sjmv3mpESWOK9k1XSh33S-Ba1EmGSk0tWEepBQnvZFqF426SZsQlk37pEokCq5BKVnp6cZUsvJ5hDZEaCp',
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuDHXhbbLZZDtml-1JWvjOE-pIL-XSitJ0XEC7ukY77t1KaDfm1TxpVbc4CNP40CLmoENVwjvfc6dx3LG5ASBkNLdlTuWGEvy44fbBDVUCEkzTF68ud0j5pDHxcSlSHlr5_ZD6d5DgpVJRvEiZvcJZLCGZcK-If9epspdDoUAMHQW5Fj7bNNhlYKJXEedPpIaTITjtijcjlxwRgOPE__gMWhq_B2_puJO3S7DSDEgwHBNVZ0GtN68E-g',
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuBh5nTaDJKLKPGmfthc_1gRuU8NvhM6QvDKlPRF_mmI7txUamXfCCNGdh0mXflmX2P_G0-N0kn9fCJVjSz9PGCtWFw2IK0YxuSqa24BHZxUEpi2VVK7L1Jxt9wdC7s65OYCvBHlIh2VVz9lCGihiPG0j7-GNhA22ehJsYifgE02S6Ut0Dn4wI671bTV5x8J6BI9fpJjVDkVPvx3GA4lgO4XukcsdtRzzdTHzcmlWY-wTN9WdX-pem6u'
                    ]),
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
                    42,
                    4.8,
                    8940,
                    '42% OFF',
                    True,
                    True,
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy',
                    json.dumps(['https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy']),
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
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtxnH0Ps5EDAFkaDaYQO6Wbp_Or7PWYuX94PzyU9dlB4uSSCmNvbE-H0SxEX93v35AJq-TwanTxoZTkRCbY_F8wQKVfR2-JfQdoXjp_AJJBZId9eB5St8edR0oR9Y7Uq5PONhpsRdeSoGrZD4vgaaECm4WS66HS8cDlvSYXHfAU4UDZv-ELGliyZ7JJ19HmH-uY4vw49k7M3s3xdWIxjfMLPS-EnAZELz96oMbHrWJeLU8rkzCCqA_',
                    json.dumps(['https://lh3.googleusercontent.com/aida-public/AB6AXuAtxnH0Ps5EDAFkaDaYQO6Wbp_Or7PWYuX94PzyU9dlB4uSSCmNvbE-H0SxEX93v35AJq-TwanTxoZTkRCbY_F8wQKVfR2-JfQdoXjp_AJJBZId9eB5St8edR0oR9Y7Uq5PONhpsRdeSoGrZD4vgaaECm4WS66HS8cDlvSYXHfAU4UDZv-ELGliyZ7JJ19HmH-uY4vw49k7M3s3xdWIxjfMLPS-EnAZELz96oMbHrWJeLU8rkzCCqA_']),
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
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBfqe0gK1UaM9SqMNYla-GuUL1nptplAzfFdqSqNggFv-T1K3WQ-q9-Ppkdg1UnYRGcgCkhUipomWy67SUv-rbzGZ1Gp0s8D9gJHiexnBPtOEV7FQOPkvQ5JQd8KZYeOJx8re5wZ-ki8SmmpSAILWB577airrCC02hGkkjcCMiq2hb4DXEMlD85hbgr0HArzngnxql_l0_nRVB2yDSxiLrdytvJADJFOQCfoYr8wLVrB2xKRB_8hg24',
                    json.dumps(['https://lh3.googleusercontent.com/aida-public/AB6AXuBfqe0gK1UaM9SqMNYla-GuUL1nptplAzfFdqSqNggFv-T1K3WQ-q9-Ppkdg1UnYRGcgCkhUipomWy67SUv-rbzGZ1Gp0s8D9gJHiexnBPtOEV7FQOPkvQ5JQd8KZYeOJx8re5wZ-ki8SmmpSAILWB577airrCC02hGkkjcCMiq2hb4DXEMlD85hbgr0HArzngnxql_l0_nRVB2yDSxiLrdytvJADJFOQCfoYr8wLVrB2xKRB_8hg24']),
                    json.dumps([{'name': 'Titanium Gray', 'hex': '#653E00'}]),
                    json.dumps(['47mm LTE']),
                    json.dumps({'Casing': 'Grade 4 Titanium with 10 ATM', 'Display': '1.5-inch Super AMOLED 3000 nits', 'Battery': '590 mAh'}),
                    json.dumps(['Withstands 55°C heat & 9000m altitude', 'Dual-frequency GPS', 'Personalized Energy Score via Galaxy AI'])
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
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy',
                    json.dumps(['https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy']),
                    json.dumps([{'name': 'Charcoal Black', 'hex': '#131B2E'}]),
                    json.dumps(['Standard']),
                    json.dumps({'ANC': 'Up to 32dB Active Noise Cancellation', 'Battery': '120 Hours total backup', 'Drivers': 'Dual 10mm Crystal Bionic'}),
                    json.dumps(['120 Hours industry leading backup', 'Crystal Bionic Sound', 'In-ear detection sensor'])
                )
            ]
            cursor.executemany("""
            INSERT INTO products (id, name, short_name, brand, category_id, subcategory, price, original_price, discount_percent, rating, review_count, badge, assured, in_stock, main_image, images_json, colors_json, storage_json, specs_json, highlights_json)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE price=VALUES(price), discount_percent=VALUES(discount_percent);
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
