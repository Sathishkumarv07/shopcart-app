# பொருளகம் (Porulagam) - Online Marketplace Web Platform

**பொருளகம் (Porulagam)** is a modern, high-velocity e-commerce marketplace web application built with a responsive Single Page Application (SPA) frontend, backed by a high-performance **Python FastAPI** service and a **MySQL** database (`porulagam_db`).

---

## 🏗️ Architecture

```
Web Browser (Desktop & Mobile Responsive)
       │ HTTP / REST API
       ▼
Python FastAPI Backend (http://localhost:8000)
       │ SQL Queries (PyMySQL)
       ▼
MySQL 8.0 Database (porulagam_db on localhost:3306)
```

---

## 📁 Project Structure

```
porundhagam/
├── backend/                       # Python FastAPI + MySQL Backend
│   ├── .env                      # Database credentials (MySQL 8.0)
│   ├── main.py                   # FastAPI application & API endpoints
│   ├── setup_database.py         # MySQL schema creation & catalog seeding
│   ├── test_db_connection.py     # MySQL connection test script
│   ├── start_backend.bat         # Backend launcher script
│   └── requirements.txt          # Python dependencies
│
├── frontend/                      # Web Application (Vite + Modern JavaScript + Tailwind)
│   ├── src/
│   │   ├── components/           # Header, BottomNav, Modals, Toast, CartDrawer
│   │   ├── data/                 # Products, Categories, Deals, Orders catalog
│   │   ├── store/                # Reactive state management (Cart, Wishlist, Language)
│   │   ├── views/                # HomeView, DealsView, CategoriesView, OrdersView, AccountView
│   │   ├── main.js               # Web app entry point & router
│   │   └── style.css             # Tailwind & typography styles
│   ├── public/                   # SVGs (logo, logo-with-text) & web manifest
│   ├── index.html                # Single-page application entry HTML
│   ├── vite.config.js            # Vite build configuration
│   ├── start_frontend.bat        # Frontend launcher script
│   └── package.json              # Node dependencies
│
└── Launch-Porulagam-Desktop.bat   # Unified site launcher (Starts Backend + Frontend + Opens Browser)
```

---

## 🌐 Web Platform Features

1. **Material 3 Design & Responsive Web Layout**:
   - Seamlessly responsive on **Desktop**, **Tablet**, and **Mobile browsers**.
   - Custom branding with Electric Royal Blue (`#0039B1`), Emerald Green (`#006C49`), and Amber Gold accents.
   - Custom vector branding ([logo.svg](frontend/public/logo.svg) & [logo-with-text.svg](frontend/public/logo-with-text.svg)).

2. **Core Pages & Views**:
   - **Home (முகப்பு)**: Bank ticker, category explorer, countdown hero promotional banner, Super Drops grid, official brand chips.
   - **Categories (பிரிவுகள்)**: Split-rail category browser with subcategories and brand filtering.
   - **Offer Sales & Deals (சலுகைகள்)**: Live flash drops countdown, claimable coupons (`MEGAOFFER70`, `PORULAGAM10`, `WELCOME500`), bank offers.
   - **Orders (ஆர்டர்கள்)**: Status filters (In-Transit, Delivered, Cancelled) with step-by-step parcel tracking.
   - **Account (கணக்கு)**: Profile overview, Porulagam Plus SuperCoins balance, English / தமிழ் bilingual language switch.

3. **Cart, Coupons & Checkout**:
   - Slide-out Cart Drawer with item quantity steppers (`+`/`-`), coupon code validation, and checkout.
   - Real-time stock and pricing calculation.

---

## 🚀 How to Run the Website

### Option 1: Unified Launcher (Recommended)
Double-click **`Launch-Porulagam-Desktop.bat`** from the root folder. It will:
1. Start the **Python FastAPI Backend** on `http://localhost:8000`
2. Start the **Vite Web Frontend** on `http://localhost:5173`
3. Launch the web store in your default web browser.

---

### Option 2: Running Services Individually

#### 1. Backend Service (`backend/`)
```powershell
cd backend
python test_db_connection.py   # Test MySQL connectivity
python main.py                 # Launch FastAPI server
```
- **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

#### 2. Web Frontend (`frontend/`)
```powershell
cd frontend
npm.cmd run dev                # Start Vite dev server
```
- **Web Storefront**: [http://localhost:5173](http://localhost:5173)
