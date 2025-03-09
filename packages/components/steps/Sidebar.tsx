"use client";

import classNames from "classnames";
import React from "react";
import { useStepContext } from "./StepContext";

export interface StepperProps {
  stepsData: { title: string; subText: string }[]; // Added a type for better clarity
}

export const Sidebar: React.FC<StepperProps> = ({ stepsData }) => {
  const { current } = useStepContext();

  return (
    <nav
      aria-label="Stepper Navigation"
      className="nk-stepper-nav nk-stepper-nav-s1 stepper-nav is-vr"
    >
      <ul>
        {stepsData.map((step, index) => {
          // Simplify logic using a more readable approach for class names
          const isDone = current > index;
          const isCurrent = current === index;

          const stepClass = classNames({
            done: isDone,
            current: isCurrent,
          });

          return (
            <li className={stepClass} key={index}>
              <button
                aria-current={isCurrent ? "step" : undefined} // Adds current step for accessibility
                className="step-item"
                onClick={() => {}}
                type="button"
              >
                <div className="step-text">
                  <div className="lead-text">{step.title}</div>

                  <div className="sub-text">{step.subText}</div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
