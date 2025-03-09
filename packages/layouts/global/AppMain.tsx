import classNames from "classnames";
import React from "react";

export interface AppProps {
  children?: React.ReactNode;
  className?: string;
}

const AppMain: React.FC<AppProps> = ({
  className = "",
  children,
  ...props
}) => {
  const compClass = classNames({
    "nk-main": true,
    [className]: className, // Using `!` because `className` is optional
  });

  return (
    <div className={compClass} {...props}>
      {children}
    </div>
  );
};

export default AppMain;
