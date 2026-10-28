# S.S. Memorial School Portal - Backend API

Modular RESTful backend service built with Node.js and Express for the S.S. Memorial School Portal.

---

## Features

- **Profile Management**: Get student record and update contact/personal details.
- **Dynamic Daily Timetables**: Complete schedules for Monday through Friday with real-time class period filtering.
- **Announcements & Notices**: School notices categorized by Important, Academic, and Sports, with support for mark-as-read and mark-all-read.
- **Curriculum & Subjects**: Course progress tracking, syllabus modules, and materials count.
- **Homework & Submissions**: Pending and submitted assignments with deadline tracking.
- **Morning Assembly Roster**: Today's host class, theme, and weekly schedule.
- **Academic Results**: Mid-term grades, overall score, rank, and individual subject marks.
- **Zero External Database Setup**: Backed by a persistent file store (`src/data/db.json`) auto-seeded on first run.

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node.js v24.20.0)

### 2. Installation
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

### 3. Running the Server

#### Development Mode (with auto-reload on file changes):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server starts at `http://localhost:5000`.

---

## API Reference

### Health
- `GET /api/health` — Check server status, uptime, and timestamp.

### Student Profile
- `GET /api/student` — Fetch student details.
- `PUT /api/student` — Update student profile.

### Daily Timetable
- `GET /api/timetable` — Fetch weekly timetable.
- `GET /api/timetable?day=Monday` — Fetch timetable for a specific day (Monday-Friday).

### Notices
- `GET /api/notices` — List all notices (Optional filters: `?category=Important&search=closed`).
- `GET /api/notices/:id` — Get single notice details.
- `PATCH /api/notices/:id/read` — Mark a notice as read.
- `POST /api/notices/mark-all-read` — Mark all notices as read.
- `POST /api/notices` — Create a new notice announcement.

### Subjects
- `GET /api/subjects` — List all subjects (Optional filter: `?type=Compulsory`).
- `GET /api/subjects/:id` — Get syllabus and details for a subject.

### Homework
- `GET /api/homework` — List homework (Optional filter: `?status=Pending`).
- `PATCH /api/homework/:id/submit` — Mark assignment as completed.

### Assemblies
- `GET /api/assemblies` — Get today's morning assembly and weekly roster.

### Results
- `GET /api/results` — Get mid-term report card and subject breakdowns.
