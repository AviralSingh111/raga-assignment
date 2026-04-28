import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setViewMode, setFilterDepartment, setFilterStatus, setSearchQuery } from '../../store/slices/patientsSlice';
import Badge from '../../components/common/Badge';
import { Patient } from '../../types';
import styles from './PatientsPage.module.css';

const GridCard: React.FC<{ patient: Patient }> = ({ patient: p }) => (
  <div className={styles.patientCard}>
    <div className={styles.cardHeader}>
      <div className={styles.avatar} style={{ background: p.avatarColor }}>{p.initials}</div>
      <div className={styles.cardHeaderText}>
        <div className={styles.patientName}>{p.name}</div>
        <div className={styles.patientId}>{p.id}</div>
      </div>
      <Badge status={p.status} />
    </div>
    <div className={styles.vitalsGrid}>
      {[['Age', `${p.age}y`], ['Ward', p.ward], ['Blood Pressure', p.bloodPressure], ['Heart Rate', `${p.heartRate} bpm`], ['Temp', `${p.temperature}°F`], ['Doctor', p.doctor.split(' ').slice(-1)[0]]].map(([label, val]) => (
        <div key={label} className={styles.vitalItem}>
          <div className={styles.vitalLabel}>{label}</div>
          <div className={styles.vitalVal}>{val}</div>
        </div>
      ))}
    </div>
    <div className={styles.cardFooter}>
      <span className={styles.dept}>{p.department}</span>
      <span className={styles.date}>{new Date(p.admittedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
    </div>
  </div>
);

const PatientsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { patients, viewMode, filterDepartment, filterStatus, searchQuery } = useAppSelector((s) => s.patients);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchDept = filterDepartment === 'All' || p.department === filterDepartment;
      const matchStatus = filterStatus === 'All' || p.status === filterStatus;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.diagnosis.toLowerCase().includes(q);
      return matchDept && matchStatus && matchSearch;
    });
  }, [patients, filterDepartment, filterStatus, searchQuery]);

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <div className={styles.viewToggle}>
          <button className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`} onClick={() => dispatch(setViewMode('grid'))}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><rect x="0.5" y="0.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/><rect x="7.5" y="0.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/><rect x="0.5" y="7.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/><rect x="7.5" y="7.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.1"/></svg>
            Grid
          </button>
          <button className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`} onClick={() => dispatch(setViewMode('list'))}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M0.5 2.5h11M0.5 6h11M0.5 9.5h11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
            List
          </button>
        </div>

        <div className={styles.searchBox}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="var(--text3)" strokeWidth="1.4"/><path d="M11 11l3 3" stroke="var(--text3)" strokeWidth="1.4" strokeLinecap="round"/></svg>
          <input placeholder="Search by name, ID, diagnosis..." value={searchQuery} onChange={(e) => dispatch(setSearchQuery(e.target.value))}/>
        </div>

        <select className={styles.select} value={filterDepartment} onChange={(e) => dispatch(setFilterDepartment(e.target.value))}>
          {['All', 'Cardiology', 'Orthopedics', 'Neurology', 'ICU', 'General'].map((d) => <option key={d}>{d}</option>)}
        </select>

        <select className={styles.select} value={filterStatus} onChange={(e) => dispatch(setFilterStatus(e.target.value))}>
          {['All', 'Stable', 'Critical', 'Monitoring', 'In Observation', 'Discharged'].map((s) => <option key={s}>{s}</option>)}
        </select>

        <div className={styles.count}>{filtered.length} patients</div>
        <button className={styles.addBtn}>+ Add Patient</button>
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <svg width="40" height="40" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="var(--text3)" strokeWidth="1.3"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="var(--text3)" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <div>No patients match your filters</div>
        </div>
      )}

      {viewMode === 'grid' && filtered.length > 0 && (
        <div className={styles.gridView}>
          {filtered.map((p, i) => (
            <div key={p.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 40}ms` }}>
              <GridCard patient={p} />
            </div>
          ))}
        </div>
      )}

      {viewMode === 'list' && filtered.length > 0 && (
        <div className={`${styles.tableWrap} animate-fadeIn`}>
          <table className={styles.table}>
            <thead>
              <tr><th>Patient</th><th>Age / Gender</th><th>Department</th><th>Diagnosis</th><th>Admitted</th><th>BP</th><th>HR</th><th>Doctor</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.listPatient}>
                      <div className={styles.avatarSm} style={{ background: p.avatarColor }}>{p.initials}</div>
                      <div>
                        <div className={styles.listName}>{p.name}</div>
                        <div className={styles.listId}>{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.age}y / {p.gender[0]}</td>
                  <td>{p.department}</td>
                  <td>{p.diagnosis}</td>
                  <td>{new Date(p.admittedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  <td><span className={styles.mono}>{p.bloodPressure}</span></td>
                  <td><span className={styles.mono}>{p.heartRate}</span></td>
                  <td>{p.doctor}</td>
                  <td><Badge status={p.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
