"use client";

import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { FormButton, useStepContext } from "@/packages";
import { PaginationStepProps } from "./lib//types";

const Pagination: React.FC<PaginationStepProps> = ({ steps, isLoading }) => {
  const { next, prev, isFirst, isLast, current } = useStepContext();
  const { trigger } = useFormContext();

  // Handle next step logic
  const handleNext = useCallback(async () => {
    const currentStepFields = steps[current].fields.map((field) => field.name);

    const isValid = await trigger(currentStepFields);

    if (isValid) {
      next();
    } else {
      console.log("Validation failed for the current step.");
    }
  }, [steps, current, trigger, next]);

  return (
    <ul className="nk-stepper-pagination pt-4 gx-4 gy-2 stepper-pagination">
      {!isFirst && (
        <li
          className="step-prev"
          style={{ display: !isFirst ? "block" : "none" }}
        >
          <FormButton
            aria-disabled={isFirst}
            dim
            disabled={isFirst}
            onClick={prev}
            outline
          >
            Previous
          </FormButton>
        </li>
      )}

      <li
        className={`step-next ${isLast ? "step-submit" : ""}`}
        style={{ display: "block" }}
      >
        <FormButton
          isLoading={isLoading}
          onClick={
            !isLast
              ? async (e) => {
                e.preventDefault(); // Prevent submission in case of misconfiguration
                await handleNext();
              }
              : undefined
          }
          type={isLast ? "submit" : "button"}
        >
          {isLast ? "Submit" : "Next"}
        </FormButton>
      </li>
    </ul>
  );
};

export default Pagination;
