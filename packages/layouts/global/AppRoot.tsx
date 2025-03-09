import classNames from "classnames";
import React from "react";
import { AppProps } from "./AppMain";

const AppRoot: React.FC<AppProps> = ({
  className = "",
  children,
  ...props
}) => {
  const compClass = classNames({
    "nk-app-root": true,
    [className]: className, // Using `!` because `className` is optional
  });

  return (
    <div className={compClass} {...props}>
      {children}
    </div>
  );
};

export default AppRoot;
