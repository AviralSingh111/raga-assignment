import React from 'react';
import { PatientStatus } from '../../types';
import styles from './Badge.module.css';

interface Props {
  status: PatientStatus;
}

const STATUS_CONFIG: Record<PatientStatus, { label: string; cls: string }> = {
  Stable: { label: 'Stable', cls: 'success' },
  Critical: { label: 'Critical', cls: 'danger' },
  Monitoring: { label: 'Monitoring', cls: 'warn' },
  Discharged: { label: 'Discharged', cls: 'info' },
  'In Observation': { label: 'In Obs', cls: 'info' },
};

const Badge: React.FC<Props> = ({ status }) => {
  const config = STATUS_CONFIG[status] || { label: status, cls: 'info' };
  return (
    <span className={`${styles.badge} ${styles[config.cls]}`}>
      <span className={styles.dot} />
      {config.label}
    </span>
  );
};

export default Badge;
