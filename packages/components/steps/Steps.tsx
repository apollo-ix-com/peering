"use client";
import React, { useEffect } from "react";
import { useStepContext } from "./StepContext";

export interface StepsProps {
  startsFrom?: number;
  children: React.ReactNode;
}

const Steps: React.FC<StepsProps> = ({ children, startsFrom = 0 }) => {
  const { current, setCurrent, setSize } = useStepContext();

  useEffect(() => {
    const stepCount = React.Children.count(children);

    setSize(stepCount);

    // Adjust the initial step index
    if (startsFrom >= stepCount) {
      setCurrent(0);
      console.warn(
        "Steps: startsFrom is greater than the number of steps. First step will be rendered by default.",
      );
    } else {
      setCurrent(startsFrom);
    }
  }, [children, startsFrom, setCurrent, setSize]);

  // Render the current step
  const steps = React.Children.toArray(children)[current] || null;

  return <>{steps}</>;
};

export default Steps;
