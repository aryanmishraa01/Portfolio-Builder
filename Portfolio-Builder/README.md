# ⚡ Portfolio Builder - MERN Stack Application

A clean, beginner-friendly, and responsive **MERN Stack Portfolio Maker** application built specifically for freshers. This project enables users to create account, build a live interactive portfolio with instant real-time preview, manage projects, and share a public portfolio URL with recruiters and on social media.

---

## 🚀 Tech Stack

- **Frontend**: React.js, JavaScript (ES6+), HTML5, Plain Vanilla CSS (No Tailwind / No Redux)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose (with automatic in-memory fallback)
- **Authentication**: Simple JSON Web Token (JWT) + Password Hashing with Bcrypt

---

## 🌟 Key Features

1. **User Authentication**: Secure registration and login with JWT tokens and hashed passwords.
2. **Protected Dashboard**: View portfolio summary, public sharing link, and list of added projects.
3. **Live Preview Editor**: Edit full name, professional title, bio, skills, GitHub, LinkedIn, and avatar with **instant live rendering**.
4. **Project Management**: Full CRUD operations (Add, Edit, Delete, View) for user projects with tech tags and demo links.
5. **Responsive Public Portfolio Page**: Accessible via `/portfolio/:userId` without login required.
6. **Mobile Friendly**: Clean responsive layout using Vanilla CSS media queries.

---

## 📂 Project Structure

```text
portfolio-maker/
├── server/                   # Node.js + Express Backend
│   ├── config/
│   │   └── db.js             # Database connection & memory fallback
│   ├── controllers/          # Request handlers
│   │   ├── authController.js
│   │   ├── portfolioController.js
│   │   └── projectController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT protection middleware
│   │   └── errorHandler.js   # Centralized error handler
│   ├── models/               # MongoDB Mongoose schemas
│   │   ├── User.js
│   │   ├── Portfolio.js
│   │   └── Project.js
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js
│   │   ├── portfolioRoutes.js
│   │   └── projectRoutes.js
│   ├── server.js             # Main server entry point
│   ├── .env.example          # Environment variables template
│   └── package.json
│
└── client/                   # React.js Frontend
    ├── src/
    │   ├── components/       # Reusable UI Components
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── InputField.jsx
    │   │   ├── PortfolioForm.jsx
    │   │   ├── PortfolioPreview.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── ProjectForm.jsx
    │   │   ├── Loading.jsx
    │   │   └── ErrorMessage.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx # React Context for User Auth
    │   ├── pages/            # Application Pages
    │   │   ├── HomePage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── EditPortfolioPage.jsx
    │   │   ├── AddEditProjectPage.jsx
    │   │   ├── PublicPortfolioPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── services/
    │   │   └── api.js        # Axios instance with JWT interceptor
    │   ├── App.jsx           # Main router container
    │   ├── index.css         # Custom Vanilla CSS styling
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## ⚙️ Environment Variables

### Server (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_builder
JWT_SECRET=super_secret_jwt_key_portfolio_builder
NODE_ENV=development
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🛠️ How to Run Locally

### 1. Backend Setup

```bash
cd server
npm install
npm run dev   # Runs backend server on http://localhost:5000
```

> **Note:** If local MongoDB service is not running, the backend will automatically start an in-memory MongoDB instance (`MongoMemoryServer`) so you can run the app without manual database installation!

### 2. Frontend Setup

In a separate terminal window:

```bash
cd client
npm install
npm run dev   # Runs Vite development server on http://localhost:5173
```

---

## 📡 REST API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user & receive JWT token

### Portfolio
- `GET /api/portfolio` - Fetch logged-in user's portfolio *(Protected)*
- `POST /api/portfolio` - Create portfolio for logged-in user *(Protected)*
- `PUT /api/portfolio` - Update portfolio for logged-in user *(Protected)*
- `GET /api/portfolio/public/:userId` - Fetch public portfolio and projects by userId *(Public)*

### Projects
- `GET /api/projects` - Get all projects for logged-in user *(Protected)*
- `POST /api/projects` - Add a new project *(Protected)*
- `PUT /api/projects/:id` - Update existing project *(Protected)*
- `DELETE /api/projects/:id` - Delete project *(Protected)*

---

## 🎓 Interview Explanation Guide for Freshers

When explaining this project in a technical interview:

1. **Architecture**: "I built a Full-Stack MERN application with a decoupled architecture. Node/Express serves a RESTful API with MongoDB as the database, while React handles client-side routing and state."
2. **Authentication**: "I implemented JWT authentication. When a user logs in, the server generates a signed JSON Web Token using `jsonwebtoken` and sends it to the frontend. The React application stores the token in `localStorage` and attaches it to the `Authorization` header (`Bearer <token>`) using an Axios interceptor for protected API routes."
3. **Live Preview**: "The live preview editor is powered by React `useState`. Form input changes immediately update state in the parent component, which passes the updated state down to the `PortfolioPreview` component, providing real-time UI feedback."
4. **Data Isolation**: "Every portfolio and project entry is tied to the logged-in user's MongoDB `ObjectId` (`userId`), ensuring users can only edit or delete their own data."
