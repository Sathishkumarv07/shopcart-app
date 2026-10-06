# Porulagam (பொருளகம்) Backend API

FastAPI backend connected directly to **MySQL 8.0** (`porulagam_db`).

---

## 🚀 Quick Start

### 1. Configure MySQL Credentials
Edit `backend/.env` (or copy from `.env.example`):
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sathish
DB_NAME=porulagam_db
API_HOST=0.0.0.0
API_PORT=8000
```

### 2. Verify MySQL Connection
Run the connection test script:
```bash
python test_db_connection.py
```

### 3. Initialize / Seed Database
If setting up for the first time or re-seeding:
```bash
python setup_database.py
```

### 4. Start the API Server
**Option A: Double-click launcher**
```
start_backend.bat
```

**Option B: Terminal**
```bash
python main.py
```
Or via uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Service status & database info |
| `GET` | `/api/health` | Live MySQL connectivity check & record counts |
| `GET` | `/api/categories` | Categories and nested subcategories |
| `GET` | `/api/products` | Filterable products (`category`, `subcategory`, `search`) |
| `GET` | `/api/products/{id}` | Single product details |
| `GET` | `/api/deals` | Flash deals, coupons & bank offers |
| `GET` | `/api/coupons` | Active discount coupons |
| `GET` | `/api/orders` | User order history (with items & tracking steps) |
| `POST` | `/api/orders` | Place a new order (stored directly in MySQL) |
| `POST` | `/api/auth/login` | Mobile OTP authentication |
| `POST` | `/api/auth/verify-otp` | Verify OTP and return profile |
| `GET` | `/api/user/profile` | User profile details |

- **Swagger Interactive UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
