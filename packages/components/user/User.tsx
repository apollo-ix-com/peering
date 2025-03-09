import classNames from "classnames";
import Image from "next/image";
import React, { ReactNode } from "react";
import Icon from "../icon/Icon";

// Available sizes {xs, sm, md, lg, xl}
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

// Available themes
type AvatarTheme =
  | "blue-dim"
  | "blue"
  | "azure-dim"
  | "azure"
  | "indigo-dim"
  | "indigo"
  | "purple-dim"
  | "purple"
  | "pink-dim"
  | "pink"
  | "orange-dim"
  | "orange"
  | "teal-dim"
  | "teal"
  | "primary-dim"
  | "primary"
  | "secondary-dim"
  | "secondary"
  | "success-dim"
  | "success"
  | "info-dim"
  | "info"
  | "warning-dim"
  | "warning"
  | "danger-dim"
  | "danger"
  | "dark-dim"
  | "dark"
  | "gray-dim"
  | "gray"
  | "lighter"
  | "light";

export interface UserProps {
  className?: string;
  size?: AvatarSize;
  theme?: AvatarTheme;
  icon?: string; // Assuming the icon is passed as a string (name of the icon)
  text?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}

const Avatar: React.FC<UserProps> = ({
  className,
  size,
  theme,
  icon,
  text,
  image,
  imageAlt = "",
  children,
  ...props
}) => {
  const classes = classNames({
    "user-avatar": true,
    [`${className}`]: className,
    [`user-avatar-${size}`]: size,
    [`bg-${theme}`]: theme,
  });

  return (
    <div className={classes} {...props}>
      {icon && <Icon name={icon} />}

      {image && <Image alt={imageAlt} src={image} />}

      {text && !image && <span>{text}</span>}

      {children}
    </div>
  );
};

const Group: React.FC<UserProps> = ({ className, children }) => {
  return (
    <div className={`user-avatar-group ${className ? className : ""}`}>
      {children}
    </div>
  );
};

// Attach subcomponents to the User component
export const User = ({ children }: { children?: React.ReactNode }) => children;

export default Object.assign(User, {
  Avatar,
  Group,
});
