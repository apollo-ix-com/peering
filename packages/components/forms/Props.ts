import React from "react";
import { ButtonProps } from "react-bootstrap";

// Interface for form buttons with additional styling and behavior
export interface FormButtonProps extends ButtonProps {
  children?: React.ReactNode;
  className?: string;
  // size?: "xl" | "lg" | "sm";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  dim?: boolean;
  outline?: boolean;
  rounded?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  errors?: boolean; // Error object from react-hook-form, now optional
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Updated to accept an event parameter
  // trigger?: (name?: string) => Promise<boolean>;
  name?: string;
}
