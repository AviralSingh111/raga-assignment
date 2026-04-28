import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import {
  requestNotificationPermission,
  onForegroundMessage,
  showLocalNotification,
} from '../services/firebase';
import { addNotification, setFcmToken, setPermissionGranted } from '../store/slices/notificationsSlice';
import { Notification } from '../types';

export const useNotifications = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initNotifications = async () => {
      const token = await requestNotificationPermission();
      if (token) {
        dispatch(setFcmToken(token));
        dispatch(setPermissionGranted(true));
        console.log('[FCM] Token:', token);
      }
    };
    initNotifications();
  }, [dispatch]);

  useEffect(() => {
    const unsub = onForegroundMessage((payload) => {
      const { title, body } = payload.notification || {};
      if (title) {
        const notification: Notification = {
          id: Date.now().toString(),
          title,
          body: body || '',
          timestamp: Date.now(),
          read: false,
          type: 'info',
        };
        dispatch(addNotification(notification));
        showLocalNotification(title, body || '');
      }
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [dispatch]);

  const triggerLocalNotification = (title: string, body: string, type: Notification['type'] = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      title,
      body,
      timestamp: Date.now(),
      read: false,
      type,
    };
    dispatch(addNotification(notification));
    showLocalNotification(title, body);
  };

  return { triggerLocalNotification };
};
