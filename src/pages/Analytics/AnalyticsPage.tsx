import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  AreaChart, Area,
} from 'recharts';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import styles from './AnalyticsPage.module.css';
import { deptPerformance, diagnosisData, monthlyData, radarData, waitTimeData } from 'constants/mockData';

const AnalyticsPage: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.statGrid}>
      <StatCard label="Patient Satisfaction" value="4.8/5" change="↑ 0.3 vs last quarter" changeType="up" delay={0} />
      <StatCard label="Avg. Wait Time" value="14 min" change="↓ 22% vs last month" changeType="down" delay={60} />
      <StatCard label="Revenue (Apr)" value="₹2.4 Cr" change="↑ 18.3% vs March" changeType="up" delay={120} />
      <StatCard label="Readmission Rate" value="4.2%" change="↓ 1.1% improvement" changeType="down" delay={180} />
    </div>

    <div className={styles.chartRow}>
      <div className={`${styles.chartCard} animate-fadeInUp`} style={{ animationDelay: '200ms' }}>
        <div className={styles.chartTitle}>Patient Growth Trend</div>
        <div className={styles.chartSub}>Monthly admissions Jan–Apr 2026</div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="patGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a5cff" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1a5cff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="patients" stroke="#1a5cff" strokeWidth={2} fill="url(#patGrad)" dot={{ fill: '#1a5cff', r: 4 }} name="Patients" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={`${styles.chartCard} animate-fadeInUp`} style={{ animationDelay: '240ms' }}>
        <div className={styles.chartTitle}>Avg. Wait Time</div>
        <div className={styles.chartSub}>This week (minutes)</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={waitTimeData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v} min`, 'Wait']} />
            <Bar dataKey="wait" fill="#00c6a7" radius={[4, 4, 0, 0]} name="Wait (min)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className={styles.chartRow}>
      <div className={`${styles.chartCard} animate-fadeInUp`} style={{ animationDelay: '280ms' }}>
        <div className={styles.chartTitle}>Diagnosis Distribution</div>
        <div className={styles.chartSub}>Top conditions — April 2026 vs March</div>
        <div className={styles.barList}>
          {diagnosisData.map((d) => (
            <div key={d.name} className={styles.barItem}>
              <div className={styles.barLabel}>
                <span>{d.name}</span>
                <span className={styles.barPct}>{d.value}%</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${d.value}%` }} />
                <div className={styles.barPrev} style={{ width: `${d.prev}%` }} />
              </div>
            </div>
          ))}
          <div className={styles.barLegend}>
            <span><span className={styles.dot} style={{ background: 'var(--accent)' }} />This month</span>
            <span><span className={styles.dot} style={{ background: 'var(--border2)' }} />Last month</span>
          </div>
        </div>
      </div>

      <div className={`${styles.chartCard} animate-fadeInUp`} style={{ animationDelay: '320ms' }}>
        <div className={styles.chartTitle}>Recovery Rate Radar</div>
        <div className={styles.chartSub}>By department (%)</div>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--text3)' }} />
            <Radar name="Recovery %" dataKey="A" stroke="#1a5cff" fill="#1a5cff" fillOpacity={0.15} />
            <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`, 'Recovery']} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className={`animate-fadeInUp`} style={{ animationDelay: '360ms' }}>
      <div className={styles.sectionTitle}>Department Performance</div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr><th>Department</th><th>Patients</th><th>Avg Stay</th><th>Recovery Rate</th><th>Status</th></tr>
          </thead>
          <tbody>
            {deptPerformance.map((d) => (
              <tr key={d.dept}>
                <td style={{ fontWeight: 500, color: 'var(--text)' }}>{d.dept}</td>
                <td>{d.patients.toLocaleString()}</td>
                <td>{d.stay}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2, maxWidth: 80 }}>
                      <div style={{ width: `${d.recovery}%`, height: '100%', background: d.recovery >= 90 ? 'var(--success)' : d.recovery >= 80 ? 'var(--warn)' : 'var(--danger)', borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>{d.recovery}%</span>
                  </div>
                </td>
                <td><Badge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AnalyticsPage;
