/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAC_AuNBf9HZHnq5_jf9OLUvtpfBBJb9co",
  authDomain: "raga-b0c7c.firebaseapp.com",
  projectId: "raga-b0c7c",
  storageBucket: "raga-b0c7c.firebasestorage.app",
  messagingSenderId: "286494407895",
  appId: "1:286494407895:web:bfec53c2053b9c73d28492",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'MediCore Alert', {
    body: body || 'You have a new notification.',
    icon: icon || '/logo192.png',
    badge: '/logo192.png',
    tag: 'medicore-notification',
    data: payload.data,
    actions: [
      { action: 'view', title: 'View Details' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  });
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Cache static assets for offline support
const CACHE_NAME = 'medicore-v1';
const STATIC_ASSETS = ['/', '/index.html', '/static/js/bundle.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
