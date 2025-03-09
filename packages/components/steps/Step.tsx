"use client";

import classNames from "classnames";
import React from "react";

interface StepProps {
  children: React.ReactNode;
  isActive: boolean;
}

const Step: React.FC<StepProps> = ({ children, isActive }) => {
  return (
    <div
      aria-current={isActive ? "step" : undefined}
      aria-hidden={!isActive}
      aria-labelledby="step-header"
      className={classNames("nk-stepper-step", { active: isActive })}
    >
      {children}
    </div>
  );
};

export default Step;
