import { useState, useCallback, useEffect, useRef } from 'react';

interface Toast {
  id: number;
  message: string;
  emoji?: string;
}

let toastId = 0;
let globalAddToast: ((message: string, emoji?: string) => void) | null = null;

export function useToast() {
  const addToast = useCallback((message: string, emoji?: string) => {
    if (globalAddToast) globalAddToast(message, emoji);
  }, []);
  return { addToast };
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, emoji?: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev.slice(-2), { id, message, emoji }]);

    const timer = setTimeout(() => removeToast(id), 4000);
    timersRef.current.set(id, timer);
  }, [removeToast]);

  useEffect(() => {
    globalAddToast = addToast;
    return () => { globalAddToast = null; };
  }, [addToast]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map(toast => (
        <div key={toast.id} className="toast" role="status">
          {toast.emoji && <span aria-hidden="true">{toast.emoji} </span>}
          {toast.message}
        </div>
      ))}
    </div>
  );
}
