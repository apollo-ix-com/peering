"use client";

import classNames from "classnames";
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
  isPro?: boolean;
  icon?: string;
  subText?: string;
}

interface RadioInputProProps {
  name: string;
  label?: string;
  options: Option[];
}

const RadioInputPro: React.FC<RadioInputProProps> = ({ name, options }) => {
  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message as string;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ul className="custom-control-group custom-control-stacked w-100">
            {options.map((option, index) => (
              <li
                className="col-12 col-sm-6 d-flex align-items-stretch pe-2 mb-3"
                key={index}
              >
                <div
                  className={classNames(
                    "custom-control custom-control-sm custom-radio custom-control-pro w-100 d-flex align-items-center flex-wrap",
                    {
                      "is-invalid": !!errorMessage,
                      "border-danger text-danger":
                        !!errorMessage && option.isPro,
                    },
                  )}
                >
                  <Form.Control
                    {...field}
                    checked={field.value === option.value}
                    className="custom-control-input d-none" // Hide default radio
                    id={`${name}-${option.value}`}
                    isInvalid={!!errorMessage}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      trigger(name); // Trigger validation
                    }}
                    type="radio"
                    value={option.value}
                  />

                  <Form.Label
                    className={classNames(
                      "custom-control-label d-flex align-items-center w-100",
                      {
                        "text-danger border border-danger":
                          !!errorMessage && option.isPro,
                      },
                    )}
                    htmlFor={`${name}-${option.value}`}
                    style={{ cursor: "pointer" }}
                  >
                    {option.icon && (
                      <span className="user-avatar sq bg-secondary-dim me-2">
                        <em className={option.icon} />
                      </span>
                    )}

                    <span className="flex-grow-1">
                      <span className="lead-text d-block">{option.label}</span>

                      <span className="sub-text text-muted">
                        {option.subText}
                      </span>
                    </span>
                  </Form.Label>
                </div>
              </li>
            ))}
          </ul>
        )}
      />

      {errorMessage && (
        <Form.Control.Feedback className="d-block mt-2" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default RadioInputPro;
