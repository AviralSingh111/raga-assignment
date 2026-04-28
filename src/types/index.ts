export type PatientStatus = 'Stable' | 'Critical' | 'Monitoring' | 'Discharged' | 'In Observation';
export type Department = 'Cardiology' | 'Orthopedics' | 'Neurology' | 'ICU' | 'General';
export type ViewMode = 'grid' | 'list';

export interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  department: Department;
  admittedDate: string;
  status: PatientStatus;
  diagnosis: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  avatarColor: string;
  doctor: string;
  ward: string;
  phone: string;
}

export interface DashboardStats {
  totalPatients: number;
  admissionsToday: number;
  avgRecoveryDays: number;
  bedOccupancy: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  type: 'alert' | 'info' | 'warning';
}

export interface AuthState {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}

export interface PatientsState {
  patients: Patient[];
  viewMode: ViewMode;
  filterDepartment: string;
  filterStatus: string;
  searchQuery: string;
  loading: boolean;
}

export interface NotificationsState {
  notifications: Notification[];
  fcmToken: string | null;
  permissionGranted: boolean;
}
