# MERN Note Taking App

A full-stack note management application built with React + TypeScript on the frontend and Express 5 + MongoDB + Upstash Redis rate limiting on the backend.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, DaisyUI, TanStack React Query, React Router v7, Axios, React Hot Toast |
| **Backend** | Node.js, Express 5 (ESM), MongoDB & Mongoose, Upstash Redis (`@upstash/ratelimit`, `@upstash/redis`) |

---

## Project Structure

```text
mern_notetakingapp/
├── backend/
│   └── src/
│       ├── config/        # MongoDB & Upstash Redis config
│       ├── controllers/   # Notes CRUD handlers
│       ├── middleware/    # Sliding-window rate limiter
│       ├── models/        # Note Mongoose schema
│       ├── routes/        # Notes API routes
│       └── server.js      # Express entry point & production static serving
├── frontend/
│   └── src/
│       ├── api/           # Axios API functions
│       ├── components/    # Reusable UI components
│       ├── hooks/         # Custom React Query hooks
│       ├── libs/          # Client utilities
│       ├── pages/         # Application pages
│       └── types/         # TypeScript definitions
└── package.json           # Root production build & start scripts
```

---

## Environment Variables

Create `backend/.env`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

---

## Local Development

**Backend**

```bash
cd backend
npm install
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```
