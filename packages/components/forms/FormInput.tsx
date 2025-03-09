"use client";

import classNames from "classnames";
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

// Custom Hook to handle errors
export const useFieldError = (name: string) => {
  const {
    formState: { errors },
  } = useFormContext();

  return errors[name]?.message as string | undefined;
};

// Reusable InputField Component (Handles different types of inputs)
export interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  size?: "xl" | "lg" | "sm";
  onChange?: (value: string) => void;
}

export const InputField = ({
  name,
  type,
  placeholder,
  className,
  // rows,
  size,
  onChange,
}: InputFieldProps) => {
  const { trigger, control } = useFormContext();

  const errorMessage = useFieldError(name);

  const inputClassName = classNames(
    className,
    "form-control",
    `form-control-${size}`,
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          {type === "textarea" ? (
            <Form.Control
              {...field}
              aria-describedby={errorMessage ? `${name}-error` : undefined}
              id={name}
              isInvalid={!!errorMessage}
              onBlur={() => {
                field.onBlur();
                trigger?.(name); // Trigger validation
              }}
              onChange={(e) => {
                field.onChange(e.target.value);
                onChange?.(e.target.value); // Custom onChange handler
                trigger?.(name); // Trigger validation
              }}
              placeholder={placeholder}
              as="textarea"
              // rows={3}
              className={inputClassName}
            />
          ) : (
            <Form.Control
              {...field}
              aria-describedby={errorMessage ? `${name}-error` : undefined}
              className={inputClassName}
              id={name}
              isInvalid={!!errorMessage}
              onBlur={() => {
                field.onBlur();
                trigger?.(name); // Trigger validation
              }}
              onChange={(e) => {
                field.onChange(e.target.value);
                onChange?.(e.target.value); // Custom onChange handler
                trigger?.(name); // Trigger validation
              }}
              placeholder={placeholder}
              type={type}
            />
          )}
        </>
      )}
    />
  );
};

// Reusable FormField Component
export interface FormFieldProps extends InputFieldProps {
  label: string;
}

const TextInput: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  rows,
  size,
  className,
}) => {
  const errorMessage = useFieldError(name);

  return (
    <Form.Group className="mb-3">
      <Form.Label
        className={classNames({
          "text-danger": !!errorMessage,
        })}
        htmlFor={name}
      >
        {label}
      </Form.Label>

      <InputField
        className={className}
        name={name}
        placeholder={placeholder}
        rows={rows}
        size={size}
        type={type}
      />

      {errorMessage && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextInput;
