"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { X } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  productName?: string;
  productImage?: string;
  link?: {
    text: string;
    href: string;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-0 right-0 z-50 space-y-4 p-6 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-4 border border-border bg-white p-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {toast.productImage && (
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={toast.productImage}
                alt={toast.productName}
                className="h-16 w-16 object-contain"
                width={64}
                height={64}
              />
            </div>
          )}

          <div className="flex-1 text-sm">
            <p className="font-medium">{toast.message}</p>
            {toast.link && (
              <a href={toast.link.href} className="mt-1 inline-block text-xs underline hover:opacity-70">
                {toast.link.text}
              </a>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 transition-opacity hover:opacity-60"
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
