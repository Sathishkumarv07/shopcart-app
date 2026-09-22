# பொருளகம் (Porulagam) Flutter & Dart Mobile App

A modern cross-platform mobile shopping application built with **Flutter & Dart**, backed by a high-performance **Python FastAPI** service and a **MySQL** database (`porulagam_db`).

---

## 🏗️ Architecture

```
Flutter Mobile App (Dart)
       │ HTTP REST API
       ▼
Python FastAPI Backend (http://localhost:8000)
       │ SQL Queries
       ▼
MySQL 8.0 Database (porulagam_db on localhost:3306)
```

---

## 📱 Mobile App Features

1. **Material 3 UI System**: Based on Google Stitch specifications with Electric Royal Blue (`#0039B1`), Emerald Green (`#006C49`), and Amber Gold accents.
2. **Bottom Navigation**: 5 tabs matching Stitch screens:
   - **Home (முகப்பு)**: Bank ticker, circular category nav, countdown hero drop banner, Super Drops grid.
   - **Categories (பிரிவுகள்)**: Dual-pane split rail category explorer with subcategory grid and brand chips.
   - **Deals (சலுகைகள்)**: Live flash drop timer, claimable coupon cards, bank offers.
   - **Orders (ஆர்டர்கள்)**: Tab filters (Transit, Delivered, Cancelled) and live step-by-step parcel tracking modal.
   - **Account (கணக்கு)**: Profile card, Porulagam Plus SuperCoins balance, English / தமிழ் bilingual toggle.
3. **Product Details Screen**:
   - Multi-angle image gallery with interactive thumbnail switcher.
   - Color swatches and storage capacity selectors.
   - Technical specifications and review ratings.
   - Sticky bottom purchase bar with "Add to Cart" and "Buy Now".
4. **Cart & Checkout**:
   - Quantity steppers (`+`/`-`), coupon validation (`PORULAGAM10`, `WELCOME500`), and direct order placement that writes to the MySQL database.

---

## 🚀 How to Run

### Step 1: Start the Python FastAPI Backend & MySQL
Ensure MySQL Server 8.0 is running, then run the FastAPI server:
```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be live at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Step 2: Run the Flutter App
From the `porulagam_app` directory:
```bash
cd porulagam_app
flutter pub get
flutter run
```
