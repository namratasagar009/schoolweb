# S.S. Memorial School Portal

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-black.svg)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)

A modern, responsive, mobile-first student and parent portal for **S.S. Memorial School**. Built with React, Vite, Tailwind CSS, and a modular Node.js/Express REST backend.

---

## 🌟 Key Features

- **📊 Student Dashboard**: Real-time overview of attendance percentage, academic grade, class rank, and an "Up Next" class card with period countdown.
- **📅 Dynamic Daily Timetable**: Interactive period schedule for Monday through Friday with live period status indicators (`Live Now`, `Upcoming`, `Completed`).
- **📢 Notices & Announcements**: Categorized school circulars (*Important*, *Academic*, *Sports*) with search, priority flags, and mark-as-read functionality.
- **📚 Subjects & Curriculum**: Subject overview cards with teacher information, syllabus completion progress bars, and study resource counters.
- **📝 Homework & Submissions**: Assignment tracker with due dates, priority tags, and completion toggle.
- **🏛️ Morning Assembly Roster**: Daily morning assembly tracker displaying host classes, weekly rotation, and daily conservation themes.
- **🏆 Academic Results & Report Card**: Detailed marks breakdown by subject, grade calculation, and rank status.
- **📱 Mobile-First UI**: Bottom navigation bar, floating action buttons, contextual bottom sheets/modals, and smooth transition animations.
- **🛡️ Built-in Offline Fallback**: Frontend gracefully falls back to local data if the backend server is unreachable, ensuring zero downtime or blank screens.

---

## 📁 Repository Structure

```text
schoolweb/
├── backend/                       # Express REST API backend
│   ├── src/
│   │   ├── config/config.js       # Server configuration & environment parsing
│   │   ├── controllers/           # Route controller logic
│   │   ├── data/                  # Persistent store (db.json) & seed data
│   │   ├── middleware/            # Error handler & request logging
│   │   ├── routes/                # Modular API route definitions
│   │   └── server.js              # Express app entry point
│   ├── .env.example               # Backend environment template
│   ├── package.json
│   └── README.md
│
├── frontend/                      # React + Vite frontend application
│   ├── src/
│   │   ├── components/            # Header, BottomNavBar, DetailModal, etc.
│   │   ├── context/               # Global PortalContext & state management
│   │   ├── pages/                 # Dashboard, Timetable, Notices, Subjects, Profile
│   │   ├── services/api.js        # Centralized API service with base URL support
│   │   ├── App.jsx                # Main routing & layout
│   │   └── main.jsx               # Application entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json                # Frontend Vercel SPA routing configuration
│
├── vercel.json                    # Root Vercel monorepo deployment config
├── .gitignore                     # Git ignore rules for node_modules & secrets
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

### 1. Clone the Repository

```bash
git clone https://github.com/namratasagar009/schoolweb.git
cd schoolweb
```

---

### 2. Frontend Setup (Client)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: In development mode, Vite automatically proxies all `/api` requests to `http://localhost:5000`.

---

### 3. Backend Setup (API Server)

1. In a separate terminal, navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your environment configuration:
   ```bash
   cp .env.example .env
   ```
   *Default `.env`:*
   ```env
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```
4. Start the backend server:
   ```bash
   # Development mode (auto-reload on changes)
   npm run dev

   # Production mode
   npm start
   ```
5. The API will be active at [http://localhost:5000](http://localhost:5000) (Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)).

---

## 📡 REST API Reference

All backend routes are prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Health check, uptime, and system status |
| **GET** | `/api/student` | Retrieve logged-in student profile & stats |
| **PUT** | `/api/student` | Update student profile details |
| **GET** | `/api/timetable` | Get weekly timetable |
| **GET** | `/api/timetable?day=Monday` | Get timetable filtered by specific day |
| **GET** | `/api/notices` | List notices (Supports `?category=Important` & `?search=term`) |
| **PATCH** | `/api/notices/:id/read` | Mark a specific notice as read |
| **POST** | `/api/notices/mark-all-read` | Mark all notices as read |
| **GET** | `/api/subjects` | List all subjects & syllabus progress |
| **GET** | `/api/subjects/:id` | Get individual subject syllabus breakdown |
| **GET** | `/api/homework` | List homework assignments (Supports `?status=Pending`) |
| **PATCH** | `/api/homework/:id/submit` | Mark a homework assignment as submitted |
| **GET** | `/api/assemblies` | Get morning assembly host roster & weekly theme |
| **GET** | `/api/results` | Get report card & subject marks breakdown |

---

## 🌐 Deployment

### Frontend (Vercel)

The frontend is configured with both root [`vercel.json`](./vercel.json) and [`frontend/vercel.json`](./frontend/vercel.json) for zero-config deployment:

1. Import your GitHub repository (`schoolweb`) on [Vercel](https://vercel.com).
2. Set the **Root Directory** to `frontend` *(recommended)* or leave as `./` (both are supported).
3. Vercel will run `npm install` and `npm run build`, serving static assets from `dist/`.
4. Client-side routing is handled automatically with SPA rewrites to `/index.html`.

### Backend (Render.com)

To deploy the Express server for free on [Render](https://render.com):

1. Click **New +** → **Web Service** on Render.
2. Select your `schoolweb` repository.
3. Configure the service:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Deploy the service to get your public API URL (e.g., `https://your-api.onrender.com`).

### Linking Frontend to Deployed Backend

In your **Vercel Project Settings** → **Environment Variables**, add:
- **Key:** `VITE_API_BASE_URL`
- **Value:** `https://your-api.onrender.com/api`

Redeploy the frontend to enable live synchronization with your production backend.

---

## 🛠️ Built With

- **Frontend**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/), [React Router v6](https://reactrouter.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [CORS](https://www.npmjs.com/package/cors), [dotenv](https://www.npmjs.com/package/dotenv)
- **Data Persistence**: JSON Document Store (`src/data/db.json`) with automated seeding on first run

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
