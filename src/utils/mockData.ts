import { Patient } from '../types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PT-00421', name: 'Priya Sharma', initials: 'PS', age: 42, gender: 'Female',
    department: 'Cardiology', admittedDate: '2026-04-26', status: 'Monitoring',
    diagnosis: 'Arrhythmia', bloodPressure: '130/85', heartRate: 78,
    temperature: 98.6, avatarColor: 'linear-gradient(135deg,#667eea,#764ba2)',
    doctor: 'Dr. Riya Mehta', ward: 'C-204', phone: '+91 98765 00421',
  },
  {
    id: 'PT-00420', name: 'Rohan Patel', initials: 'RP', age: 58, gender: 'Male',
    department: 'Orthopedics', admittedDate: '2026-04-25', status: 'Stable',
    diagnosis: 'Knee Replacement', bloodPressure: '118/76', heartRate: 72,
    temperature: 98.2, avatarColor: 'linear-gradient(135deg,#11998e,#38ef7d)',
    doctor: 'Dr. Arjun Das', ward: 'O-112', phone: '+91 98765 00420',
  },
  {
    id: 'PT-00419', name: 'Aditi Nair', initials: 'AN', age: 67, gender: 'Female',
    department: 'ICU', admittedDate: '2026-04-25', status: 'Critical',
    diagnosis: 'Stroke', bloodPressure: '155/95', heartRate: 92,
    temperature: 100.4, avatarColor: 'linear-gradient(135deg,#f7971e,#ffd200)',
    doctor: 'Dr. Sneha Kulkarni', ward: 'ICU-03', phone: '+91 98765 00419',
  },
  {
    id: 'PT-00418', name: 'Vikram Joshi', initials: 'VJ', age: 35, gender: 'Male',
    department: 'Neurology', admittedDate: '2026-04-24', status: 'In Observation',
    diagnosis: 'Migraine Management', bloodPressure: '122/80', heartRate: 68,
    temperature: 98.4, avatarColor: 'linear-gradient(135deg,#fc4a1a,#f7b733)',
    doctor: 'Dr. Riya Mehta', ward: 'N-307', phone: '+91 98765 00418',
  },
  {
    id: 'PT-00417', name: 'Sneha Kapoor', initials: 'SK', age: 29, gender: 'Female',
    department: 'Cardiology', admittedDate: '2026-04-24', status: 'Stable',
    diagnosis: 'Palpitations', bloodPressure: '112/72', heartRate: 65,
    temperature: 98.1, avatarColor: 'linear-gradient(135deg,#8e2de2,#4a00e0)',
    doctor: 'Dr. Riya Mehta', ward: 'C-201', phone: '+91 98765 00417',
  },
  {
    id: 'PT-00416', name: 'Arjun Reddy', initials: 'AR', age: 51, gender: 'Male',
    department: 'Orthopedics', admittedDate: '2026-04-23', status: 'In Observation',
    diagnosis: 'Hip Fracture', bloodPressure: '128/82', heartRate: 74,
    temperature: 98.8, avatarColor: 'linear-gradient(135deg,#1a9850,#91cf60)',
    doctor: 'Dr. Arjun Das', ward: 'O-115', phone: '+91 98765 00416',
  },
  {
    id: 'PT-00415', name: 'Meera Iyer', initials: 'MI', age: 44, gender: 'Female',
    department: 'Neurology', admittedDate: '2026-04-23', status: 'Stable',
    diagnosis: 'Epilepsy Monitoring', bloodPressure: '116/74', heartRate: 70,
    temperature: 98.3, avatarColor: 'linear-gradient(135deg,#ee0979,#ff6a00)',
    doctor: 'Dr. Sneha Kulkarni', ward: 'N-310', phone: '+91 98765 00415',
  },
  {
    id: 'PT-00414', name: 'Karan Mehta', initials: 'KM', age: 63, gender: 'Male',
    department: 'Cardiology', admittedDate: '2026-04-22', status: 'Critical',
    diagnosis: 'Myocardial Infarction', bloodPressure: '160/100', heartRate: 98,
    temperature: 99.1, avatarColor: 'linear-gradient(135deg,#0575e6,#021b79)',
    doctor: 'Dr. Riya Mehta', ward: 'ICU-01', phone: '+91 98765 00414',
  },
  {
    id: 'PT-00413', name: 'Divya Singh', initials: 'DS', age: 38, gender: 'Female',
    department: 'General', admittedDate: '2026-04-22', status: 'Discharged',
    diagnosis: 'Appendicitis (Post-op)', bloodPressure: '110/70', heartRate: 66,
    temperature: 98.0, avatarColor: 'linear-gradient(135deg,#56ab2f,#a8e063)',
    doctor: 'Dr. Arjun Das', ward: 'G-108', phone: '+91 98765 00413',
  },
];
