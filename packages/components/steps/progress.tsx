import React from "react";
import { useStepContext } from "@/packages";

const Progress: React.FC = () => {
  const { progress } = useStepContext();

  return (
    <div className="nk-stepper-progress stepper-progress mb-4">
      <div className="stepper-progress-count mb-2" />

      <div className="progress progress-md">
        <div
          className="progress-bar stepper-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
