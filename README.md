# MediCore — B2B Healthcare Intelligence Platform

A production-grade B2B Healthcare UI built with React, TypeScript, Redux Toolkit, Firebase Authentication, and Service Worker push notifications.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| Auth | Firebase Authentication (Email + Google OAuth) |
| Notifications | Firebase Cloud Messaging + Service Worker |
| Charts | Recharts |
| Styling | CSS Modules |

---

## Project Structure

```
src/
├── components/
│   ├── common/          # Badge, StatCard — reusable across pages
│   └── layout/          # Sidebar, Topbar, Layout
├── hooks/
│   ├── redux.ts         # Typed useAppDispatch / useAppSelector
│   └── useNotifications.ts  # FCM + Service Worker hook
├── pages/
│   ├── Login/           # Firebase Email + Google OAuth
│   ├── Dashboard/       # KPI cards, charts, recent admissions
│   ├── Analytics/       # Trends, radar, distribution charts
│   └── Patients/        # Grid View / List View with Redux filters
├── services/
│   └── firebase.ts      # All Firebase SDK calls
├── store/
│   ├── index.ts         # Redux store
│   └── slices/
│       ├── authSlice.ts
│       ├── patientsSlice.ts
│       └── notificationsSlice.ts
├── types/
│   └── index.ts         # All TypeScript interfaces
└── utils/
    └── mockData.ts      # Sample patient data
public/
└── firebase-messaging-sw.js   # Service Worker (FCM background messages)
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

App runs at `http://localhost:3000`

---

## Firebase Setup

Your Firebase project (`raga-b0c7c`) is already configured in `src/services/firebase.ts`.

### Enable Authentication Providers

1. Go to [Firebase Console](https://console.firebase.google.com) → your project
2. Navigate to **Authentication → Sign-in method**
3. Enable **Email/Password**
4. Enable **Google**
5. Add `localhost` to authorized domains (it's there by default)

### Create a test user

In Firebase Console → Authentication → Users → Add user:
- Email: `test@medicore.com`
- Password: `Test@1234`

### Enable Cloud Messaging

Cloud Messaging is already set up. The VAPID key is configured in `src/services/firebase.ts`.

---

## Features

### Authentication
- Email/password login with Firebase Auth
- Google OAuth sign-in
- Auth state persisted — no re-login on refresh
- Protected routes — unauthenticated users redirected to `/login`
- Loading state + error messages shown inline

### Pages

#### Login (`/login`)
- Split-panel design with brand story
- Firebase email login + Google OAuth
- Form validation, error handling, show/hide password

#### Dashboard (`/`)
- 4 KPI stat cards with trend indicators
- Weekly Admissions vs Discharges bar chart (Recharts)
- Department load pie chart (Recharts)
- Recent admissions table with click-through to patients

#### Analytics (`/analytics`)
- Patient growth area chart
- Wait time bar chart
- Diagnosis distribution with month-over-month comparison bars
- Recovery rate radar chart by department
- Department performance table with inline progress bars

#### Patients (`/patients`)
- **Grid View** — rich cards showing vitals, status, department
- **List View** — dense data table with all fields
- Toggle between views (persisted in Redux)
- Search by name, ID, or diagnosis
- Filter by Department and Status
- Patient count display

### Notifications (Service Worker)
- Service Worker registered at startup (`/firebase-messaging-sw.js`)
- `requestNotificationPermission()` called on app load — prompts user
- FCM token obtained and stored in Redux
- Foreground messages shown as local browser notifications
- Background messages handled by the Service Worker
- "Test Notif" button in the topbar fires a local notification
- Notification panel with unread count badge, mark-as-read, mark-all-read

### State Management (Redux Toolkit)
| Slice | State managed |
|-------|--------------|
| `authSlice` | user, loading, error |
| `patientsSlice` | patients, viewMode, filters, searchQuery |
| `notificationsSlice` | notifications[], fcmToken, permissionGranted |

---

## Service Worker Details

The file `public/firebase-messaging-sw.js`:
- Imports Firebase App + Messaging compat scripts
- Handles **background** push messages (when app is not in focus)
- Shows native browser notifications with action buttons
- Caches static assets for offline fallback
- Uses Cache-first strategy for GET requests

---

## Build for Production

```bash
npm run build
```

Output in `build/`. Deploy to Firebase Hosting, Vercel, or Netlify.

### Deploy to Firebase Hosting (optional)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## Evaluation Checklist

| Criterion | Implementation |
|-----------|---------------|
| React + TypeScript | ✅ Strict mode, all components typed |
| Firebase Auth | ✅ Email + Google, session persistence |
| Service Worker | ✅ FCM background + local notification |
| Login Page | ✅ Full auth flow with error states |
| Dashboard | ✅ KPIs + charts + table |
| Analytics | ✅ 4 chart types + performance table |
| Patient Details | ✅ Grid + List view |
| View Toggle | ✅ Redux-managed, smooth transition |
| State Management | ✅ Redux Toolkit with 3 slices |
| Responsiveness | ✅ CSS Modules + media queries |
| Clean structure | ✅ Feature-based folder layout |
| Reusable components | ✅ Badge, StatCard, Layout |
| Performance | ✅ useMemo for filtering, animationDelay stagger |
