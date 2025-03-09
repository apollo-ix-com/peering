import classNames from "classnames";
import React from "react";
import { Button as ReactButton, Spinner } from "react-bootstrap";
import { Icon } from "../../index";
import { FormButtonProps } from "./Props";

const FormButton: React.FC<FormButtonProps> = ({
  name,
  color = "primary",
  dim = false,
  rounded = false,
  outline = false,
  isLoading = false,
  loadingText = "",
  icon,
  iconPosition = "left",
  className,
  size,
  children,
  errors,
  onClick,
  type = "button",
  disabled,
  ...rest
}) => {
  // const hasError = name ? Boolean(errors?.[name]) : false;
  // const buttonVariant = hasError ? "danger" : color;
  // const isDisabled = disabled || loading || hasError;
  // Determine if there are errors for the specific field
  const hasError = Boolean(name && errors);

  // Set button color based on error state
  const buttonVariant = hasError ? "danger" : color;

  const isDisabled = disabled || isLoading || hasError;

  // Construct button class names
  const btnClass = classNames(className, {
    "btn-dim": dim,
    "btn-round": rounded,
    "btn-icon": icon && !children,
    [`btn-${size}`]: size,
    [`btn-${buttonVariant}`]: !outline,
    [`btn-outline-${buttonVariant}`]: outline,
    disabled: isDisabled,
  });

  const renderIcon = () => {
    if (!icon) return null;

    return <Icon aria-hidden="true" name={icon} />;
  };

  return (
    <ReactButton
      aria-disabled={isDisabled}
      className={btnClass}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      variant=""
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner
            aria-label={loadingText || "Loading"}
            role="status"
            size="sm"
          />

          {loadingText && <span> {loadingText}</span>}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && renderIcon()}

          {children}

          {icon && iconPosition === "right" && renderIcon()}
        </>
      )}
    </ReactButton>
  );
};

export default FormButton;
