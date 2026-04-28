import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signOutUser } from '../../store/slices/authSlice';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  {
    to: '/', label: 'Dashboard', exact: true,
    icon: <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" /></svg>,
  },
  {
    to: '/analytics', label: 'Analytics', exact: false,
    icon: <svg viewBox="0 0 16 16" fill="none"><path d="M2 12 L5 7 L8 9 L11 4 L14 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 14h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    to: '/patients', label: 'Patients', exact: false, badge: '248',
    icon: <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3" /><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const initials = user?.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || 'DR';

  const handleSignOut = async () => {
    await dispatch(signOutUser());
    navigate('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M8 2v12M2 8h12M5 5l6 6M11 5l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className={styles.logoText}>MediCore</div>
          <div className={styles.logoSub}>Enterprise</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSectionLabel}>Main</div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </NavLink>
        ))}

        <div className={styles.navSectionLabel} style={{ marginTop: 12 }}>System</div>
        <button className={styles.navItem} onClick={handleSignOut}>
          <span className={styles.navIcon}>
            <svg viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          Sign Out
        </button>
      </nav>

      <div className={styles.footer}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user?.displayName || 'Dr. User'}</div>
          <div className={styles.userRole}>{user?.email || ''}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
