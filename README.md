# Biograd Waiting List App

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express.js-backend-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-blue)
![Deploy](https://img.shields.io/badge/deploy-Vercel%20%2B%20Render-brightgreen)

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://biograd-waiting-list.vercel.app)

![Preview](./screenshots/overview.png)

A full-stack web application for viewing hospital procedures, scheduled appointments, and available appointment slots.

The application displays hospital procedures, appointment information, available appointment slots, and scheduled patients. Users can also search appointments by JIN.

---

# Live Demo

https://biograd-waiting-list.vercel.app

---

# Project Inspiration

The idea for this project was inspired by the hospital waiting list page used by the Special Hospital for Orthopedics in Biograd na Moru.

The goal was to recreate a similar interface and functionality using React, Express.js, and PostgreSQL.

Original page:

https://lc.ortopedija-biograd.hr/

---

# Screenshots

### Overview

![Overview](./screenshots/overview.png)

### Search Appointments by JIN

![Search](./screenshots/search.png)

### Loading States

![Loading](./screenshots/loading.png)

---

# Features

- View a list of all procedures
- Display number of scheduled patients
- Show last update date
- Display first five available appointment slots
- View scheduled appointments for each procedure
- Search appointments by JIN
- Responsive layout
- Skeleton loading states

---

# Demo Data

The repository includes a complete PostgreSQL schema and seed file.

The seed file generates:

- All hospital departments
- All procedures
- Demo patients
- Demo appointments
- Available appointment slots

This allows the project to run locally without manually creating database records.

---

# Tech Stack

## Frontend

- React
- TanStack Query (React Query)
- CSS Modules
- Vite

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# Project Structure

```bash
biograd-waiting-list/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── procedures.controller.js
│   │   ├── db/
│   │   │   ├── pool.js
│   │   │   ├── schema.sql
│   │   │   └── seed.sql
│   │   ├── routes/
│   │   │   └── procedures.routes.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── procedures.js
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Info/
│   │   │   └── Menu/
│   │   ├── utils/
│   │   │   └── formatDate.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── screenshots/
├── .gitignore
└── README.md
```

---

# Local Development Setup

## 1. Clone the Repository

```bash
git clone https://github.com/jcelic/biograd-waiting-list.git
cd biograd-waiting-list
```

---

## 2. Create PostgreSQL Database

The provided schema and seed files create all required tables and generate demonstration data used by the application.

Create a local PostgreSQL database:

```bash
createdb biograd_waiting_list
```

Run the schema and seed files:

```bash
psql -d biograd_waiting_list -f backend/src/db/schema.sql
psql -d biograd_waiting_list -f backend/src/db/seed.sql
```

---

## 3. Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/biograd_waiting_list
CLIENT_URL=http://localhost:5173
PORT=3000
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```txt
http://localhost:3000
```

---

## 4. Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```txt
http://localhost:5173
```

---

# Database

This project uses PostgreSQL.

Main database tables:

- `departments`
- `procedures`
- `patients`
- `appointments`
- `available_slots`

Database setup files are included:

```txt
backend/src/db/schema.sql
backend/src/db/seed.sql
```

---

# API Endpoints

## Get all procedures

```http
GET /api/procedures
```

## Get procedure details

```http
GET /api/procedures/:id
```

## Get procedure appointments

```http
GET /api/procedures/:id/appointments
```

---

# License

This project was created for educational and portfolio purposes.
