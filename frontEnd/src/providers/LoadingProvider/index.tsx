
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import "./style.css";

type LoadingStatus = "loading" | "success" | "error";

type LoadingContextType = {
  showLoading: (text?: string) => void;
  hideLoading: (time?: number) => void;
  setMsgLoading: (text: string) => void;
  setSuccessLoading: (text: string) => void;
  setErrorLoading: (text: string) => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Carregando...");
  const [status, setStatus] = useState<LoadingStatus>("loading");

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function showLoading(text = "Carregando...") {
    clearTimer();
    setMessage(text);
    setStatus("loading");
    setVisible(true);
  }

  function hideLoading(time = 0) {
    clearTimer();

    if (time <= 0) {
      setVisible(false);
      return;
    }

    timer.current = setTimeout(() => {
      setVisible(false);
      timer.current = null;
    }, time);
  }

  function setMsgLoading(text: string) {
    setMessage(text);
  }

  function setSuccessLoading(text: string) {
    setMessage(text);
    setStatus("success");
    setVisible(true);
  }

  function setErrorLoading(text: string) {
    setMessage(text);
    setStatus("error");
    setVisible(true);
  }

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
        setMsgLoading,
        setSuccessLoading,
        setErrorLoading,
      }}
    >
      {children}

      {visible && (
        <div className="loading-overlay" role="dialog" aria-modal="true" aria-label={message}>
          <div className="loading-card" role="status" aria-live="polite">
            {status === "loading" && (
              <div className="loading-spinner" />
            )}

            {status === "success" && (
              <div className="loading-icon success">✓</div>
            )}

            {status === "error" && (
              <div className="loading-icon error">!</div>
            )}

            <span className="loading-message">{message}</span>

            <span className="loading-description">
              {status === "loading"
                ? "Aguarde um instante"
                : status === "success"
                ? "Operação concluída"
                : "Não foi possível concluir"}
            </span>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading deve ser utilizado dentro do LoadingProvider.");
  }

  return context;
}
