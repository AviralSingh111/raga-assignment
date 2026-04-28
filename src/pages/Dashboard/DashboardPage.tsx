import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts';
import { useAppSelector } from '../../hooks/redux';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import styles from './DashboardPage.module.css';

const weekData = [
  { day: 'Mon', admissions: 32, discharges: 24 },
  { day: 'Tue', admissions: 40, discharges: 32 },
  { day: 'Wed', admissions: 28, discharges: 36 },
  { day: 'Thu', admissions: 45, discharges: 28 },
  { day: 'Fri', admissions: 35, discharges: 38 },
  { day: 'Sat', admissions: 22, discharges: 20 },
  { day: 'Sun', admissions: 18, discharges: 14 },
];

const deptData = [
  { name: 'Cardiology', value: 40 },
  { name: 'Orthopedics', value: 20 },
  { name: 'Neurology', value: 12 },
  { name: 'ICU', value: 8 },
  { name: 'Other', value: 20 },
];

const COLORS = ['#1a5cff', '#00c6a7', '#f6b400', '#e53e3e', '#e2e8f0'];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const patients = useAppSelector((s) => s.patients.patients);
  const recent = patients.slice(0, 5);

  return (
    <div className={styles.page}>
      <div className={styles.statGrid}>
        <StatCard label="Total Patients" value="2,481" change="↑ 12.4% this month" changeType="up" delay={0}
          icon={<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Admissions Today" value="38" change="↑ 3 vs yesterday" changeType="up" delay={60}
          icon={<svg viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Avg. Recovery Days" value="6.2" change="↓ 0.8 days improved" changeType="down" delay={120}
          icon={<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>}
        />
        <StatCard label="Bed Occupancy" value="84%" change="⚠ High capacity" changeType="warn" delay={180}
          icon={<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="9" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M3 9V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="1.3"/></svg>}
        />
      </div>

      <div className={styles.chartRow}>
        <div className={`${styles.chartCard} animate-fadeInUp`} style={{ animationDelay: '200ms' }}>
          <div className={styles.chartTitle}>Weekly Admissions vs Discharges</div>
          <div className={styles.chartSub}>Last 7 days comparison</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weekData} barCategoryGap="30%" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false}/>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}/>
              <Bar dataKey="admissions" fill="#1a5cff" radius={[4, 4, 0, 0]} name="Admissions"/>
              <Bar dataKey="discharges" fill="#00c6a7" radius={[4, 4, 0, 0]} name="Discharges"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${styles.chartCard} animate-fadeInUp`} style={{ animationDelay: '260ms' }}>
          <div className={styles.chartTitle}>Department Load</div>
          <div className={styles.chartSub}>Current occupancy</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {deptData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}/>
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11, color: 'var(--text2)' }}>{v}</span>}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Recent Admissions</div>
          <button className={styles.sectionAction} onClick={() => navigate('/patients')}>View all patients →</button>
        </div>
        <div className={`${styles.tableWrap} animate-fadeInUp`} style={{ animationDelay: '300ms' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Patient</th><th>Department</th><th>Admitted</th><th>Diagnosis</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id} onClick={() => navigate('/patients')} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className={styles.patientCell}>
                      <div className={styles.avatar} style={{ background: p.avatarColor }}>{p.initials}</div>
                      <div>
                        <div className={styles.patientName}>{p.name}</div>
                        <div className={styles.patientId}>{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.department}</td>
                  <td>{new Date(p.admittedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>{p.diagnosis}</td>
                  <td><Badge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
