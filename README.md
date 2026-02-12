# MERN Store Rating Platform

A full-stack MERN application for rating and managing stores with **role-based access control**. Users can submit ratings for stores, and dashboards provide analytics for admins and store owners. Built with **React, Redux Toolkit, Express.js, MongoDB, JWT authentication, and Cloudinary**.

---

## 🚀 Features

### **System Administrator**

* Add new stores, normal users, and admin users.
* Dashboard with:

  * Total users, stores, and submitted ratings.
* View and filter lists of users and stores.
* View user details including ratings for store owners.
* Logout functionality.

### **Normal User**

* Sign up and log in.
* Update password.
* View all registered stores.
* Search stores by name and address.
* Submit or modify ratings (1–5) for stores.
* Logout functionality.

### **Store Owner**

* Log in and update password.
* Dashboard showing:

  * Users who submitted ratings for their store.
  * Average rating of their store.
* Logout functionality.

### **Form Validations**

* **Name:** 20–60 characters
* **Address:** Max 400 characters
* **Password:** 8–16 characters, at least 1 uppercase & 1 special character
* **Email:** Standard email format

---

## 🛠️ Tech Stack

**Frontend:**

* React 19 + Vite
* Redux Toolkit + React Redux
* Axios
* Tailwind CSS + DaisyUI
* react-icons
* react-hot-toast
* Chart.js + react-chartjs-2

**Backend:**

* Node.js + Express.js
* MongoDB + Mongoose
* JWT Authentication + bcryptjs + cookies
* Multer + Cloudinary (optional for media)
* Nodemailer (email verification/password reset)
* Morgan (request logging)
* CORS + dotenv

---

## 📁 Project Structure

### Backend

```
backend/
├── config/             # Database connection
├── controllers/        # Request handling logic
├── middleware/         # Security & validation
├── models/             # Mongoose schemas
├── routes/             # API endpoint definitions
├── app.js              # Express app config
├── server.js           # Server entry point
├── .env                # Environment variables
└── package.json
```

### Frontend

```
frontend/
├── public/             # Static assets
├── src/
│   ├── app/            # Redux store config
│   ├── assets/         # Images, icons, fonts
│   ├── components/     # Reusable UI
│   ├── features/       # Redux slices
│   ├── pages/          # Views by role
│   ├── services/       # API calls
│   ├── App.css         # Global styling
│   └── main.jsx        # React DOM entry
├── .env                # Frontend env vars
└── package.json
```

---

## 🔐 Authentication Flow

* **Login:** JWT issued and stored in HttpOnly cookie
* **Security:** bcryptjs password hashing
* **Role-based Access Control:** Middleware validates user role before access

---

## 📊 Dashboards

* **Admin:** User/store counts, charts, sortable tables.
* **Store Owner:** Average ratings, list of users who rated their store.

---

## ⚡ Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Add your REACT_APP_API_URL=http://localhost:5000/api
npm run dev
```

---

## 🌐 Usage

1. Open frontend: `http://localhost:5173`
2. Sign up as a normal user or log in as admin/store owner
3. Explore dashboards and submit ratings

---

## 💡 Notes

* All tables support sorting (ascending/descending).
* Store and user listings are searchable and filterable.
* Optional features: File uploads via Cloudinary, email verification via Nodemailer.

---

## 📌 License

MIT License © 2026
