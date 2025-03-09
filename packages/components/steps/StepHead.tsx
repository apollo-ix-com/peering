import React from "react";

interface StepHeadProps {
  title: string;
  description: string;
}

const StepHead: React.FC<StepHeadProps> = ({ title, description }) => {
  return (
    <div className="nk-stepper-step-head mb-4">
      <h5 className="title">{title}</h5>

      <p>{description}</p>
    </div>
  );
};

export default StepHead;
