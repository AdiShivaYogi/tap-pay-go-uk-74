
import { useState, useEffect, useRef, useCallback } from "react";

export const useAutoRefresh = (refreshFunction: () => Promise<void>) => {
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const refreshIntervalRef = useRef<number | null>(null);

  // Configurăm auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      // Setăm refresh la fiecare 30 secunde în loc de continuă reactualizare
      refreshIntervalRef.current = window.setInterval(() => {
        refreshFunction();
      }, 30000); // 30 secunde
    } else if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [autoRefresh, refreshFunction]);

  const toggleAutoRefresh = useCallback(() => {
    setAutoRefresh(prev => !prev);
  }, []);

  return {
    autoRefresh,
    toggleAutoRefresh
  };
};
