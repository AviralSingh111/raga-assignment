export const monthlyData = [
    { month: 'Jan', patients: 1820, revenue: 182 },
    { month: 'Feb', patients: 1960, revenue: 196 },
    { month: 'Mar', patients: 2100, revenue: 218 },
    { month: 'Apr', patients: 2481, revenue: 240 },
];

export const diagnosisData = [
    { name: 'Cardiovascular', value: 34, prev: 30 },
    { name: 'Orthopedic', value: 22, prev: 25 },
    { name: 'Neurological', value: 18, prev: 16 },
    { name: 'Respiratory', value: 14, prev: 18 },
    { name: 'Other', value: 12, prev: 11 },
];

export const waitTimeData = [
    { day: 'Mon', wait: 18 }, { day: 'Tue', wait: 14 },
    { day: 'Wed', wait: 20 }, { day: 'Thu', wait: 12 },
    { day: 'Fri', wait: 16 }, { day: 'Sat', wait: 10 }, { day: 'Sun', wait: 9 },
];

export const radarData = [
    { subject: 'Cardiology', A: 94 }, { subject: 'Orthopedics', A: 92 },
    { subject: 'Neurology', A: 88 }, { subject: 'ICU', A: 76 }, { subject: 'General', A: 90 },
];

export const deptPerformance = [
    { dept: 'Cardiology', patients: 842, stay: '5.2d', recovery: 94.2, status: 'Stable' as const },
    { dept: 'Orthopedics', patients: 546, stay: '8.1d', recovery: 91.8, status: 'Stable' as const },
    { dept: 'Neurology', patients: 447, stay: '6.7d', recovery: 88.4, status: 'In Observation' as const },
    { dept: 'ICU', patients: 198, stay: '12.3d', recovery: 76.1, status: 'Monitoring' as const },
];