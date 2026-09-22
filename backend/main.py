"""
Porulagam Marketplace Backend API Service (FastAPI + MySQL)
Powers the Flutter mobile app and web frontend.
"""
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import pymysql
import json
import random

app = FastAPI(
    title="Porulagam Marketplace API",
    description="Backend API for Porulagam (பொருளகம்) eCommerce app, backed by MySQL.",
    version="1.0.0"
)

# Enable CORS for Flutter mobile apps, emulators, and local web app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'sathish',
    'database': 'porulagam_db',
    'port': 3306,
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def get_db():
    return pymysql.connect(**DB_CONFIG)

# Pydantic Schemas
class OrderItemCreate(BaseModel):
    product_id: str
    product_name: str
    product_image: str
    color: Optional[str] = "Default"
    quantity: int = 1
    price: float

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    total_amount: float
    delivery_address: str
    payment_method: str = "UPI"
    user_id: Optional[str] = "usr-1"

class LoginRequest(BaseModel):
    phone: str

class VerifyOtpRequest(BaseModel):
    phone: str
    otp: str

# API Endpoints
@app.get("/")
def root():
    return {
        "status": "online",
        "app": "Porulagam (பொருளகம்) Marketplace API",
        "database": "MySQL (porulagam_db)",
        "version": "1.0.0"
    }

@app.get("/api/categories")
def get_categories():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM categories;")
            categories = cursor.fetchall()
            
            cursor.execute("SELECT * FROM subcategories;")
            subcategories = cursor.fetchall()

            # Group subcategories under categories
            sub_map = {}
            for sub in subcategories:
                cat_id = sub['category_id']
                if cat_id not in sub_map:
                    sub_map[cat_id] = []
                sub_map[cat_id].append({
                    "id": sub['id'],
                    "name": sub['name'],
                    "icon": sub['icon']
                })

            for cat in categories:
                cat['subcategories'] = sub_map.get(cat['id'], [])
            
            return categories
    finally:
        conn.close()

@app.get("/api/products")
def get_products(
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(50, le=100)
):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            query = "SELECT * FROM products WHERE in_stock = 1"
            params = []

            if category:
                query += " AND category_id = %s"
                params.append(category)
            if subcategory:
                query += " AND subcategory = %s"
                params.append(subcategory)
            if search:
                query += " AND (name LIKE %s OR brand LIKE %s OR subcategory LIKE %s)"
                term = f"%{search}%"
                params.extend([term, term, term])

            query += " ORDER BY id LIMIT %s"
            params.append(limit)

            cursor.execute(query, params)
            products = cursor.fetchall()

            # Parse JSON fields
            for p in products:
                p['price'] = float(p['price'])
                p['original_price'] = float(p['original_price']) if p['original_price'] else None
                p['rating'] = float(p['rating'])
                p['images'] = json.loads(p['images_json']) if p['images_json'] else [p['main_image']]
                p['colors'] = json.loads(p['colors_json']) if p['colors_json'] else []
                p['storage_options'] = json.loads(p['storage_json']) if p['storage_json'] else []
                p['specs'] = json.loads(p['specs_json']) if p['specs_json'] else {}
                p['highlights'] = json.loads(p['highlights_json']) if p['highlights_json'] else []
                # Clean up raw JSON column strings
                del p['images_json']
                del p['colors_json']
                del p['storage_json']
                del p['specs_json']
                del p['highlights_json']

            return products
    finally:
        conn.close()

@app.get("/api/products/{product_id}")
def get_product_detail(product_id: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM products WHERE id = %s;", (product_id,))
            p = cursor.fetchone()
            if not p:
                raise HTTPException(status_code=404, detail="Product not found")

            p['price'] = float(p['price'])
            p['original_price'] = float(p['original_price']) if p['original_price'] else None
            p['rating'] = float(p['rating'])
            p['images'] = json.loads(p['images_json']) if p['images_json'] else [p['main_image']]
            p['colors'] = json.loads(p['colors_json']) if p['colors_json'] else []
            p['storage_options'] = json.loads(p['storage_json']) if p['storage_json'] else []
            p['specs'] = json.loads(p['specs_json']) if p['specs_json'] else {}
            p['highlights'] = json.loads(p['highlights_json']) if p['highlights_json'] else []

            del p['images_json']
            del p['colors_json']
            del p['storage_json']
            del p['specs_json']
            del p['highlights_json']

            return p
    finally:
        conn.close()

@app.get("/api/deals")
def get_deals():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM products WHERE discount_percent >= 15 ORDER BY discount_percent DESC;")
            deal_products = cursor.fetchall()
            for p in deal_products:
                p['price'] = float(p['price'])
                p['original_price'] = float(p['original_price']) if p['original_price'] else None
                p['rating'] = float(p['rating'])
                p['images'] = json.loads(p['images_json']) if p['images_json'] else [p['main_image']]
                del p['images_json']
                del p['colors_json']
                del p['storage_json']
                del p['specs_json']
                del p['highlights_json']

            cursor.execute("SELECT * FROM coupons;")
            coupons = cursor.fetchall()
            for c in coupons:
                c['flat_discount'] = float(c['flat_discount'])
                c['max_discount'] = float(c['max_discount'])
                c['min_cart_value'] = float(c['min_cart_value'])

            cursor.execute("SELECT * FROM bank_offers;")
            bank_offers = cursor.fetchall()

            return {
                "featured_drop_title": "Mega Flash Drop",
                "countdown_seconds": 9840,
                "deal_products": deal_products,
                "coupons": coupons,
                "bank_offers": bank_offers
            }
    finally:
        conn.close()

@app.get("/api/coupons")
def get_coupons():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM coupons;")
            coupons = cursor.fetchall()
            for c in coupons:
                c['flat_discount'] = float(c['flat_discount'])
                c['max_discount'] = float(c['max_discount'])
                c['min_cart_value'] = float(c['min_cart_value'])
            return coupons
    finally:
        conn.close()

@app.get("/api/orders")
def get_orders(user_id: str = "usr-1"):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
            SELECT * FROM orders WHERE user_id = %s ORDER BY created_at DESC;
            """, (user_id,))
            orders = cursor.fetchall()

            for o in orders:
                o['total_amount'] = float(o['total_amount'])
                o['steps'] = json.loads(o['steps_json']) if o['steps_json'] else []
                del o['steps_json']

                # Fetch items for this order
                cursor.execute("SELECT * FROM order_items WHERE order_id = %s;", (o['id'],))
                items = cursor.fetchall()
                for i in items:
                    i['price'] = float(i['price'])
                o['items'] = items

            return orders
    finally:
        conn.close()

@app.post("/api/orders")
def create_order(payload: OrderCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            order_id = f"POR-{random.randint(100000, 999999)}"
            tracking_num = f"PE-EXP-{random.randint(10000000, 99999999)}"
            steps = [
                {"title": "Order Confirmed", "time": "Just now", "done": True, "current": True},
                {"title": "Packed at Hub", "time": "Expected in 4 hours", "done": False},
                {"title": "Shipped via Express Air", "time": "Tomorrow", "done": False},
                {"title": "Out for Delivery", "time": "In 2 days", "done": False},
                {"title": "Delivered", "time": "Expected in 2 days", "done": False}
            ]

            cursor.execute("""
            INSERT INTO orders (id, user_id, order_date, status, status_text, delivery_date, courier, tracking_number, total_amount, delivery_address, payment_method, steps_json)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """, (
                order_id,
                payload.user_id,
                "Just Now",
                "transit",
                "Order Placed - Being Packed at Hub",
                "Arriving in 2 Days",
                "Porulagam Speed Express",
                tracking_num,
                payload.total_amount,
                payload.delivery_address,
                payload.payment_method,
                json.dumps(steps)
            ))

            for item in payload.items:
                cursor.execute("""
                INSERT INTO order_items (order_id, product_id, product_name, product_image, color, quantity, price)
                VALUES (%s, %s, %s, %s, %s, %s, %s);
                """, (
                    order_id,
                    item.product_id,
                    item.product_name,
                    item.product_image,
                    item.color,
                    item.quantity,
                    item.price
                ))

            conn.commit()

            return {
                "success": True,
                "order_id": order_id,
                "tracking_number": tracking_num,
                "status": "Order Placed Successfully",
                "message": f"Order #{order_id} recorded in MySQL database!"
            }
    finally:
        conn.close()

@app.post("/api/auth/login")
def request_login(payload: LoginRequest):
    return {
        "success": True,
        "phone": payload.phone,
        "message": f"OTP sent to +91 {payload.phone}",
        "demo_otp": "7294"
    }

@app.post("/api/auth/verify-otp")
def verify_otp(payload: VerifyOtpRequest):
    if payload.otp == "7294" or len(payload.otp) == 4:
        return {
            "success": True,
            "token": "demo-jwt-porulagam-auth-token-892410",
            "user": {
                "id": "usr-1",
                "name": "Ananya Krishnan",
                "tamil_name": "அனன்யா கிருஷ்ணன்",
                "phone": f"+91 {payload.phone}",
                "email": "ananya.k@example.com",
                "super_coins": 240,
                "membership_tier": "பொருளகம் Plus Gold"
            }
        }
    raise HTTPException(status_code=400, detail="Invalid OTP code")

@app.get("/api/user/profile")
def get_user_profile(user_id: str = "usr-1"):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id = %s;", (user_id,))
            user = cursor.fetchone()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            return user
    finally:
        conn.close()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
