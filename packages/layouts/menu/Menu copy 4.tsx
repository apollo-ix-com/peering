"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Icon } from "../../index";
import { useThemeUpdate } from "../provider/Theme";
import Toggle from "../sidebar/Toggle";
import menuData from "./MenuData";

export interface MenuItemType {
  heading?: string;
  icon?: string;
  text?: string;
  link?: string;
  badge?: string;
  active?: boolean;
  newTab?: boolean;
  subMenu?: MenuItemType[];
}

interface MenuItemProps extends MenuItemType {
  sidebarToggle: (e: React.MouseEvent<HTMLLIElement>) => void;
  mobileView: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  link = "",
  text,
  subMenu,
  newTab,
  sidebarToggle,
  mobileView,
  badge,
}) => {
  const [isActive, setIsActive] = useState(false);
  // const pathname = usePathname();
  const currentUrl = "pathname";

  // setIsActive(pathname === link);

  useEffect(() => {
    if (currentUrl === link) {
      setIsActive(true);
    }
  }, [currentUrl, link]);

  const menuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const menuItemClass = classNames("nk-menu-item", {
    "has-sub": subMenu,
    active: isActive,
    "current-page": currentUrl === link,
  });

  return (
    <li
      className={menuItemClass}
      onClick={(e) => !subMenu && !newTab && mobileView && sidebarToggle(e)}
    >
      {newTab ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-menu-link"
        >
          {icon && (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          )}
          <span className="nk-menu-text">{text}</span>
        </Link>
      ) : (
        <Link
          href={link}
          className={`nk-menu-link${subMenu ? " nk-menu-toggle" : ""}`}
          onClick={subMenu ? menuToggle : undefined}
        >
          {icon && (
            <span className="nk-menu-icon">
              <Icon name={icon} />
            </span>
          )}
          <span className="nk-menu-text">{text}</span>
          {badge && <span className="nk-menu-badge">{badge}</span>}
        </Link>
      )}
      {subMenu && isActive && (
        <ul className="nk-menu-wrap">
          {subMenu.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              sidebarToggle={sidebarToggle}
              mobileView={mobileView}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

interface MenuProps {
  currentMenuTab: string;
  sidebarToggle: (e: React.MouseEvent<HTMLLIElement>) => void;
  mobileView: boolean;
}

const Menu: React.FC<MenuProps> = ({
  currentMenuTab,
  sidebarToggle,
  mobileView,
}) => {
  const themeUpdate = useThemeUpdate();
  const menuItem = menuData.find((item) => item.heading === currentMenuTab);

  return (
    <div className="nk-menu-content menu-active">
      <div className="d-flex justify-between">
        <h5 className="title mt-1">{menuItem?.heading}</h5>
        <div className="mb-1">
          <Toggle
            icon="arrow-left"
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            click={themeUpdate.sidebarVisibility}
          />
        </div>
      </div>
      <ul className="nk-menu" id="main-menu">
        {menuItem?.subMenu?.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
