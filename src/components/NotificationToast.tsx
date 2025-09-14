import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { Button } from './ui/button';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationToastProps {
  notifications: ToastNotification[];
  onRemove: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const toastColors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500'
};

export function NotificationToast({ notifications, onRemove }: NotificationToastProps) {
  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(notification.id);
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemove]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const Icon = toastIcons[notification.type];
        
        return (
          <div
            key={notification.id}
            className={`max-w-sm w-full border rounded-xl shadow-lg p-4 ${toastColors[notification.type]} animate-in slide-in-from-right duration-300`}
          >
            <div className="flex items-start">
              <Icon className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${iconColors[notification.type]}`} />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-sm opacity-90 mt-1">{notification.message}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(notification.id)}
                className="ml-2 h-6 w-6 p-0 hover:bg-black/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Hook for managing toast notifications
export function useToast() {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const addToast = (notification: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeToast = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toast = {
    success: (title: string, message: string, duration?: number) =>
      addToast({ type: 'success', title, message, duration }),
    error: (title: string, message: string, duration?: number) =>
      addToast({ type: 'error', title, message, duration }),
    warning: (title: string, message: string, duration?: number) =>
      addToast({ type: 'warning', title, message, duration }),
    info: (title: string, message: string, duration?: number) =>
      addToast({ type: 'info', title, message, duration })
  };

  return {
    notifications,
    toast,
    removeToast
  };
}