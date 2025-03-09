import classNames from "classnames";
import React from "react";
import { AppProps } from "./AppMain";

const AppWrap: React.FC<AppProps> = ({
  className = "",
  children,
  ...props
}) => {
  const compClass = classNames({
    "nk-wrap": true,
    [className]: className, // `!` is used because className is optional
  });

  return (
    <div className={compClass} {...props}>
      {children}
    </div>
  );
};

export default AppWrap;
