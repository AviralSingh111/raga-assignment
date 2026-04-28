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
