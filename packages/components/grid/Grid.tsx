import classnames from "classnames";
import React, { ReactNode } from "react";

// Define allowed types for grid sizes
type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | true; // `true` for auto sizing or full-width

export interface GridProps {
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xxl?: GridSize;
  size?: GridSize;
  col?: GridSize;
  className?: string;
  children: ReactNode;
}

export const Col: React.FC<GridProps> = ({
  sm,
  lg,
  md,
  xxl,
  size,
  col,
  className,
  children,
}) => {
  const colClass = classnames({
    [`col-sm-${sm}`]: sm,
    [`col-lg-${lg}`]: lg,
    [`col-md-${md}`]: md,
    [`col-xxl-${xxl}`]: xxl,
    [`col-${col}`]: col,
    [`col-${size}`]: size,
    [`${className}`]: className,
  });

  return <div className={colClass}>{children}</div>;
};

export const Row: React.FC<GridProps> = ({ className, children }) => {
  const rowClass = classnames({
    row: true,
    [`${className}`]: className,
  });

  return <div className={rowClass}>{children}</div>;
};

export const Grid: React.FC<GridProps> = ({ children }) => children;

// Attach subcomponents to the Block component for easier import and usage
export default Object.assign(Grid, {
  Row,
  Col,
});
