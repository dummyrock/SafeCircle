import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

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
    const now = new Date();
    const id = `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
    const time = now.toLocaleTimeString();
    setNotifications((prev) => [{ id, message, time }, ...prev]);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
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
