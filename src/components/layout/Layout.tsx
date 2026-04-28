import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Layout.module.css';

const Layout: React.FC = () => (
  <div className={styles.app}>
    <Sidebar />
    <div className={styles.main}>
      <Topbar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
