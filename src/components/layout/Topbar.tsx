import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { markAllRead, markAsRead } from '../../store/slices/notificationsSlice';
import { useNotifications } from '../../hooks/useNotifications';
import styles from './Topbar.module.css';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/analytics': 'Analytics',
  '/patients': 'Patient Details',
};

const Topbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((s) => s.notifications.notifications);
  const unread = notifications.filter((n) => !n.read).length;
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { triggerLocalNotification } = useNotifications();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleTestNotification = () => {
    triggerLocalNotification('Vital Alert', 'Patient Aditi Nair — BP elevated to 160/100', 'alert');
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  const typeColor: Record<string, string> = {
    alert: 'var(--danger)',
    warning: 'var(--warn)',
    info: 'var(--accent)',
  };

  return (
    <header className={styles.topbar}>
      <h1 className={styles.title}>{PAGE_TITLES[location.pathname] || 'MediCore'}</h1>

      <div className={styles.right}>
        <div className={styles.searchBox}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="var(--text3)" strokeWidth="1.4"/>
            <path d="M11 11l3 3" stroke="var(--text3)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input placeholder="Search patients, records..." />
        </div>

        <button className={styles.testBtn} onClick={handleTestNotification} title="Trigger test notification">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L9.5 6.5H14L10.5 9L12 13.5L8 11L4 13.5L5.5 9L2 6.5H6.5L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          Test Notif
        </button>

        <div className={styles.notifWrap} ref={panelRef}>
          <button className={styles.iconBtn} onClick={() => setShowPanel((v) => !v)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6v3L2 11h12l-1.5-2V6A4.5 4.5 0 0 0 8 1.5z" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            {unread > 0 && <span className={styles.badge}>{unread}</span>}
          </button>

          {showPanel && (
            <div className={styles.notifPanel}>
              <div className={styles.panelHeader}>
                <span>Notifications</span>
                {unread > 0 && (
                  <button className={styles.markAll} onClick={() => dispatch(markAllRead())}>
                    Mark all read
                  </button>
                )}
              </div>
              <div className={styles.notifList}>
                {notifications.length === 0 && (
                  <div className={styles.empty}>No notifications</div>
                )}
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}
                    onClick={() => dispatch(markAsRead(n.id))}
                  >
                    <div className={styles.notifDot} style={{ background: typeColor[n.type] }} />
                    <div className={styles.notifBody}>
                      <div className={styles.notifTitle}>{n.title}</div>
                      <div className={styles.notifText}>{n.body}</div>
                      <div className={styles.notifTime}>{formatTime(n.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.avatarBtn}>DR</div>
      </div>
    </header>
  );
};

export default Topbar;
