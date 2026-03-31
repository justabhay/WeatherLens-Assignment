# 🌦️ WeatherLens– Real-Time Weather Dashboard

WeatherLens is a sleek and responsive **weather dashboard application** that provides real-time weather updates with a modern UI. It focuses on clean design, smooth user experience, and modular frontend architecture.

---

## 🚀 Features

* 🌍 Search weather by city
* 📡 Real-time weather data integration
* 🎨 Custom-designed UI with modular CSS
* 🔐 Google Authentication support
* ⚡ Fast performance using Vite
* 🧠 State management using Redux

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Custom CSS (modular & component-based)
* **State Management:** Redux Toolkit
* **Authentication:** Google Identity Services
* **Icons:** React Icons

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd WeatherApp
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

## 📚 Required Dependencies

### Main Packages

* react
* react-dom
* react-redux
* @reduxjs/toolkit
* react-icons

### Authentication

* Google Identity Services (via script)

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_WEATHER_API_KEY=your_weather_api_key
```


## ▶️ Run the Application

```bash
npm run dev
```

App will run at:

```
http://localhost:5173/
```

---



---

## 🎨 Styling Approach

* Uses **custom CSS files instead of Tailwind**
* Component-based styling for better maintainability
* Glassmorphism and modern UI effects
* Responsive design for different screen sizes

---

## 💡 How to Use

1. Open the application
2. Click on **Sign In with Google**
3. Search for a city
4. View current weather details
5. Analyze UI-based weather insights

---

## 🔐 Authentication Flow

* Using Google Identity Services for Auth
* Currently it is frontend based so the authentication is not connected to backend.
* once connected to backend , auth could be verified by using JWT.
* Demo user is displayed as login.
* 
---

## ⚠️ Notes

* Ensure Node.js (v16+) is installed
* Add valid API keys in `.env`
* Do not push `.env` to GitHub

---

## 🚀 Future Improvements

* 📍 Location-based weather detection
* 🔔 Weather alerts system

---

## 👨‍💻 Author

Abhay Kushwaha

---

## ⭐ Project Highlights

* Clean architecture and modular code
* Real-world authentication integration
* Strong frontend + state management concepts
* Ready for production-level improvements

---

