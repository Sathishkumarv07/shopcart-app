# Porulagam (பொருளகம்) Marketplace Platform

Full-stack e-commerce marketplace platform with separated frontend and backend services.

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
├── frontend/                      # Web Application (Vite + JavaScript)
│   ├── src/                      # Components, Views, Reactive Store, Styles
│   ├── public/                   # Static assets & web manifest
│   ├── index.html                # Single-page application entry HTML
│   ├── vite.config.js            # Vite build configuration
│   ├── start_frontend.bat        # Frontend launcher script
│   └── package.json              # Node dependencies
│
├── porulagam_app/                 # Mobile Application (Flutter)
│   └── lib/                      # Flutter UI screens, providers & API client
│
├── stitch_shopkart_marketplace_platform/  # UI designs & screen specs
│
└── Launch-Porulagam-Desktop.bat   # Unified desktop launcher (Starts Backend + Frontend)
```

---

## 🚀 Running the Project

### 1. Unified Launcher (Recommended)
Double-click **`Launch-Porulagam-Desktop.bat`** from the root folder. It will:
1. Start the **FastAPI MySQL Backend** on `http://localhost:8000`
2. Start the **Vite Web Frontend** on `http://localhost:5173`
3. Open the desktop app window

---

### 2. Running Individually

#### **Backend (`backend/`)**
```bash
cd backend
python test_db_connection.py   # Verify MySQL connection
python main.py                 # Start FastAPI server
```
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)

#### **Frontend (`frontend/`)**
```bash
cd frontend
npm.cmd run dev                # Start Vite dev server
```
- Web Application: [http://localhost:5173](http://localhost:5173)