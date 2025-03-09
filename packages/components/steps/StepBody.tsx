import React from "react";

interface StepBodyProps {
  children: React.ReactNode;
}

const StepBody: React.FC<StepBodyProps> = ({ children }) => {
  return <div className="nk-stepper-step-body">{children}</div>;
};

export default StepBody;
