import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsState, Notification } from '../../types';

const initialState: NotificationsState = {
  notifications: [
    { id: '1', title: 'Critical Alert', body: 'Patient Aditi Nair — vitals critical. Immediate attention required.', timestamp: Date.now() - 300000, read: false, type: 'alert' },
    { id: '2', title: 'ICU Capacity', body: 'ICU Bed occupancy at 90%. Consider transferring stable patients.', timestamp: Date.now() - 900000, read: false, type: 'warning' },
    { id: '3', title: 'Shift Reminder', body: 'Dr. Mehta — Cardiology round starts in 10 minutes.', timestamp: Date.now() - 1800000, read: true, type: 'info' },
  ],
  fcmToken: null,
  permissionGranted: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const n = state.notifications.find((n) => n.id === action.payload);
      if (n) n.read = true;
    },
    markAllRead(state) {
      state.notifications.forEach((n) => { n.read = true; });
    },
    setFcmToken(state, action: PayloadAction<string | null>) {
      state.fcmToken = action.payload;
    },
    setPermissionGranted(state, action: PayloadAction<boolean>) {
      state.permissionGranted = action.payload;
    },
  },
});

export const { addNotification, markAsRead, markAllRead, setFcmToken, setPermissionGranted } = notificationsSlice.actions;
export default notificationsSlice.reducer;
