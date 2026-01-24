# 🏥 Hospital Management System – Frontend

This is the **frontend** of the Hospital Management System built using **React (Vite)**.  
The application supports **role-based access** for **Patients, Doctors, and Admin** with secure authentication.

🔗 **Live URL:** https://hospital-frontend-gamma-eight.vercel.app  
🔗 **Backend API:** https://hospitalbackend-kipk.onrender.com

---

## 🚀 Features

### 👤 Patient
- Register & login
- View doctors and their details
- Book appointments
- View appointment status (My Appointments)

### 🩺 Doctor
- Login
- View assigned appointments
- Approve or reject appointments

### 🛠️ Admin
- Login
- View & update hospital information
- Manage hospital details (name, description, departments, facilities, etc.)

---

## 🔐 Authentication
- JWT-based authentication
- Tokens stored securely using **HTTP-only cookies**
- Protected routes for Patient, Doctor, and Admin

---

## 🧪 Demo Credentials

### 👨‍⚕️ Doctor Login
Email: dr.anyname.example@example.com
Password: SeedPass123!

> All seeded doctors use the same password: **SeedPass123!**

### 👤 Patient Login
Register a new patient using Patient Register page

### 🛠️ Admin Login
Email: admin@example.com
Password: admin123

*(Use the credentials configured in your backend)*

---

## 🧰 Tech Stack
- React (Vite)
- React Router DOM
- Axios
- js-cookie
- CSS

---

## ⚙️ Environment Setup
Create a `.env` file in the frontend root (for local development):
```env
VITE_API_URL=http://localhost:5000/api
For production (Vercel), API URL is configured directly in the code.

📦 Installation & Run (Local)
git clone https://github.com/samba38/HospitalFrontend.git
cd HospitalFrontend
npm install
npm run dev


App runs on:
http://localhost:5173

📁 Project Structure
src/
 ├── api/
 ├── components/
 ├── context/
 ├── pages/
 ├── App.jsx
 ├── main.jsx

🌍 Deployment
Frontend deployed on Vercel
Backend deployed on Render
MongoDB Atlas used for database

👨‍💻 Author
Samba Raju (samba38)
GitHub: https://github.com/samba38/HospitalBackend.git