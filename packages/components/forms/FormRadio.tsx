"use client";

import classNames from "classnames";
import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
}

interface RadioInputProps {
  name: string;
  label: string;
  options: Option[];
  isProLayout?: boolean;
  className?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  label,
  options,
  isProLayout = false,
}) => {
  const {
    trigger,
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string;

  return (
    <FormGroup className="mb-3">
      <Form.Label
        className={classNames({
          "text-danger": errorMessage,
        })}
        htmlFor={name}
      >
        {label}
      </Form.Label>

      <div className="form-control-wrap">
        <ul className="custom-control-group">
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <>
                {options.map((option, index) => (
                  <li key={index}>
                    <div
                      className={classNames("custom-control custom-radio", {
                        "custom-control-pro no-control": isProLayout, // Conditionally apply pro control style
                        checked: option.checked,
                        disabled: option.disabled,
                        "is-invalid": errorMessage,
                      })}
                    >
                      <Form.Control
                        {...field}
                        aria-describedby={
                          errorMessage ? `${name}-error` : undefined
                        }
                        checked={field.value === option.value}
                        className="custom-control-input"
                        id={`${name}-${option.value}`}
                        isInvalid={!!errorMessage}
                        onBlur={() => {
                          field.onBlur();
                          trigger?.(name); // Trigger validation
                        }}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          trigger?.(name); // Trigger validation
                        }}
                        type="radio"
                        value={option.value}
                      />

                      <Form.Label
                        className={classNames("custom-control-label", {
                          "text-danger ": !!errorMessage,
                        })}
                        htmlFor={`${name}-${option.value}`}
                      >
                        <span className={errorMessage ? "text-danger" : ""}>
                          {option.label}
                        </span>
                      </Form.Label>
                    </div>
                  </li>
                ))}
              </>
            )}
          />

          {errorMessage && (
            <Form.Control.Feedback className="d-block" type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          )}
        </ul>
      </div>
    </FormGroup>
  );
};

export default RadioInput;
