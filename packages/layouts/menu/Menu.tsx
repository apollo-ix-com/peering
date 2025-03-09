"use client";

import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
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
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

const MenuSub: React.FC<{
  subMenu?: MenuItemType[];
  sidebarToggle: (e: React.MouseEvent<HTMLLIElement>) => void;
  mobileView: boolean;
  isOpen: boolean;
}> = ({ subMenu, sidebarToggle, mobileView, isOpen }) => {
  return (
    <ul className={classNames("nk-menu-sub", { show: isOpen })}>
      {subMenu?.map((item) => (
        <MenuItem
          key={`${item.text}-${Math.random()}`}
          link={item.link}
          icon={item.icon}
          text={item.text}
          subMenu={item.subMenu}
          badge={item.badge}
          newTab={item.newTab}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
          activeMenu=""
          setActiveMenu={() => {}}
        />
      ))}
    </ul>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  link = "",
  text,
  subMenu,
  newTab,
  sidebarToggle,
  mobileView,
  badge,
  activeMenu,
  setActiveMenu,
}) => {
  const isOpen = activeMenu === text;

  const menuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveMenu(isOpen ? "" : (text ?? ""));
  };

  const menuItemClass = classNames("nk-menu-item", {
    "has-sub": subMenu,
    active: isOpen,
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
      {subMenu && (
        <MenuSub
          subMenu={subMenu}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
          isOpen={isOpen}
        />
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
  const [activeMenu, setActiveMenu] = useState("");

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
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
