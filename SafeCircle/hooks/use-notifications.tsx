import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

import { db } from '@/lib/firebase';

export type NotificationItem = {
  id: string;
  message: string;
  time: string;
};

type NotificationsContextValue = {
  notifications: NotificationItem[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((message: string) => {
    addDoc(collection(db, 'notifications'), {
      message,
      createdAt: serverTimestamp(),
    }).catch((error) => {
      console.warn('Failed to send notification:', error);
    });
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    const notificationsRef = collection(db, 'notifications');
    const notificationsQuery = query(notificationsRef, orderBy('createdAt', 'desc'), limit(50));

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          const data = doc.data() as { message?: string; createdAt?: { toDate?: () => Date } };
          const createdAt = data.createdAt?.toDate?.() ?? new Date();
          return {
            id: doc.id,
            message: data.message ?? 'New alert',
            time: createdAt.toLocaleTimeString(),
          };
        });
        setNotifications(items);
      },
      (error) => {
        console.warn('Failed to load notifications:', error);
      },
    );

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({ notifications, addNotification, clearNotifications }),
    [notifications, addNotification, clearNotifications],
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return ctx;
}
