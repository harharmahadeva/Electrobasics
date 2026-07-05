import { createContext, useCallback, useContext, useState } from "react";
import Toast from "../components/shared/Toast/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "warning") => {
    setToast({ message, type, key: Date.now() });
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
