import classNames from "classnames";
import React, { CSSProperties } from "react";

// Define the props type for the Icon component
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string; // Name of the icon (e.g., 'home', 'user', etc.)
  id?: string; // Optional id
  className?: string; // Optional custom class
  style?: CSSProperties; // Optional inline style
}

const Icon: React.FC<IconProps> = ({
  name,
  id,
  className,
  style,
  ...props
}) => {
  const iconClass = classNames({
    [`${className}`]: className,
    icon: true,
    ni: true,
    [`ni-${name}`]: true, // Apply the icon name dynamically
  });

  return <em className={iconClass} id={id} style={style} {...props} />;
};

export default Icon;
