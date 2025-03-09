import classNames from "classnames";
import React from "react";
import { Icon } from "../../index";

interface ToggleProps {
  className?: string; // Optional className
  click: (ev: React.MouseEvent<HTMLAnchorElement>) => void; // Event handler with correct type
  icon: string; // Icon name
}

const Toggle: React.FC<ToggleProps> = ({ className, click, icon }) => {
  const handleClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault(); // Prevent default link behavior
    click(ev);
  };

  return (
    <a
      href="#toggle"
      className={classNames(className)}
      onClick={handleClick}
      aria-label="Toggle"
    >
      <Icon name={icon} />
    </a>
  );
};

export default Toggle;
