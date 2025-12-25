# Edu Shop (LMS + Online Store)
پروژه ترکیبی سیستم مدیریت دوره‌های آموزشی (LMS ساده) + فروشگاه فایل‌های آموزشی.


## Features
- مدیریت کاربران (دانشجو، استاد)
- دوره‌ها و جزوه‌ها
- سیستم ثبت‌نام و پرداخت (Cart)
- داشبورد دانشجو و استاد
- فرانت‌اند مدرن با React/Vite



## Project Structure
- `backend/` → Django apps (users, lessons, cart, orders, etc.)
- `frontend/` → React + Vite
- `.venv/` → Python virtual environment

## Clone the project 
```bash
git clone https://github.com/alireza-sepehri-dev/edo_shop.git
cd edo_shop

 python3 -m venv .venv
 source .venv/bin/activate  # یا در ویندوز: .venv\Scripts\activate
 pip install -r requirements.txt

## Run

### Backend
   cd backend
   python manage.py runserver

### Frontend
   cd frontend
   npm run dev


## Tech Stack

### Backend
- **Python 3.11+**
- **Django** – Web framework
- **Django REST Framework (DRF)** – API development
- **mysqlclient / PyMySQL** – Database connector
- **Pillow** – Image processing (course covers, product images)
- **django-cors-headers** – CORS management for frontend-backend communication
- **SimpleJWT** – Authentication with JSON Web Tokens

### Frontend
- **React 18** – UI library
- **Vite** – Fast build tool
- **Axios** – HTTP client for API requests
- **React Router DOM** – Routing and navigation
- **Zustand** – State management
- **ESLint + Prettier** – Code quality and formatting

### DevOps / Deployment
- **cPanel (shared hosting)** – Deployment environment
- **Git & GitHub** – Version control and project hosting
- **npm** – Package manager for frontend
- **pip** – Package manager for backend
