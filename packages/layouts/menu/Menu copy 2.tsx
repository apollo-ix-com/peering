"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
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
  header?: string;
  subMenu?: MenuItemType[];
}

interface MenuItemProps extends MenuItemType {
  sidebarToggle: (e: React.MouseEvent) => void;
  mobileView: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  link = "#",
  text,
  subMenu,
  newTab,
  sidebarToggle,
  mobileView,
  badge,
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  const toggleActionSidebar = (e: React.MouseEvent) => {
    if (!subMenu && !newTab && mobileView) {
      sidebarToggle(e);
    }
  };

  const menuItemClass = classNames("nk-menu-item", {
    "has-sub": subMenu,
    "active current-page": isActive,
  });

  const MenuLink = newTab ? "a" : Link;
  const linkProps = newTab
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { href: link };

  return (
    <li className={menuItemClass} onClick={toggleActionSidebar}>
      <MenuLink {...linkProps} className="nk-menu-link">
        {icon && (
          <span className="nk-menu-icon">
            <Icon name={icon} />
          </span>
        )}
        <span className="nk-menu-text">{text}</span>
        {badge && <span className="nk-menu-badge">{badge}</span>}
      </MenuLink>
      {subMenu && (
        <ul className="nk-menu-sub">
          {subMenu.map((item, index) => (
            <MenuItem
              key={`${item.text}-${index}`}
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

interface MenuSubProps {
  sub: MenuItemType[];
  sidebarToggle: (e: React.MouseEvent) => void;
  mobileView: boolean;
}

const MenuSub: React.FC<MenuSubProps> = ({
  sub,
  sidebarToggle,
  mobileView,
}) => (
  <ul className="nk-menu-sub">
    {sub.map((item, index) => (
      <MenuItem
        key={`${item.text}-${index}`}
        {...item}
        sidebarToggle={sidebarToggle}
        mobileView={mobileView}
      />
    ))}
  </ul>
);

interface MenuProps {
  currentMenuTab: string;
  sidebarToggle: (e: React.MouseEvent) => void;
  mobileView: boolean;
}

const Menu: React.FC<MenuProps> = ({
  currentMenuTab,
  sidebarToggle,
  mobileView,
}) => {
  const themeUpdate = useThemeUpdate();
  const menuItem = menuData.find((item) => item.heading === currentMenuTab);

  useEffect(() => {
    const mainMenu = document.getElementById("main-menu");
    if (mainMenu) {
      mainMenu.classList.toggle("has-items", !!menuItem?.subMenu?.length);
    }
  }, [menuItem]);

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
            key={`${item.text}-${index}`}
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
