"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

export interface StepContextProps {
  total: number;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  isLast: boolean;
  isFirst: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  progress: number;
  next: () => void;
  prev: () => void;
  jump: (step: number) => void;
}

export const StepContext = createContext<StepContextProps | undefined>(
  undefined,
);

export const StepProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  const next = useCallback(() => {
    setCurrent((prevStep) => Math.min(prevStep + 1, size - 1));
  }, [current, size]);

  const prev = useCallback(() => {
    setCurrent((prevStep) => Math.max(prevStep - 1, 0));
  }, []);

  const jump = useCallback(
    (step: number) => {
      if (step >= 0 && step < size) {
        setCurrent(step);
      }
    },
    [size],
  );

  const contextValue = useMemo(
    () => ({
      total: size,
      current,
      setCurrent,
      size,
      setSize,
      isLast: current === size - 1,
      isFirst: current === 0,
      hasPrev: current > 0,
      hasNext: current < size - 1,
      progress: size > 1 ? ((current + 1) / size) * 100 : 0,
      next,
      prev,
      jump,
    }),
    [current, size, next, prev, jump],
  );

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  );
};

// Custom Hook for StepContext
export const useStepContext = (): StepContextProps => {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }

  return context;
};
