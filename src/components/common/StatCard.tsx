import React from 'react';
import styles from './StatCard.module.css';

interface Props {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'warn';
  icon?: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<Props> = ({ label, value, change, changeType = 'up', icon, delay = 0 }) => (
  <div className={`${styles.card} animate-fadeInUp`} style={{ animationDelay: `${delay}ms` }}>
    <div className={styles.top}>
      <div className={styles.label}>{label}</div>
      {icon && <div className={styles.icon}>{icon}</div>}
    </div>
    <div className={styles.value}>{value}</div>
    {change && (
      <div className={`${styles.change} ${styles[changeType]}`}>{change}</div>
    )}
  </div>
);

export default StatCard;
