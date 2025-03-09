"use client";

import classNames from "classnames";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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

interface MenuProps {
  currentMenuTab?: string;
  sidebarToggle?: () => void;
  mobileView?: boolean;
}

const MenuItem: React.FC<{
  item: MenuItemType;
  activeMenu: string | null;
  setActiveMenu: (menuName: string | null) => void;
  sidebarToggle?: () => void;
  mobileView?: boolean;
}> = ({ item, activeMenu, setActiveMenu, sidebarToggle, mobileView }) => {
  const isOpen = activeMenu === item.text;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.subMenu) {
      setActiveMenu(isOpen ? null : item.text || null);
    }
    if (!item.subMenu && mobileView && sidebarToggle) {
      sidebarToggle();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const subMenu = document.querySelector(
          `.nk-menu-sub[data-menu='${item.text}']`,
        );
        if (subMenu) {
          subMenu.setAttribute("style", `height: ${subMenu.scrollHeight}px`);
        }
      }, 0);
    } else {
      const subMenu = document.querySelector(
        `.nk-menu-sub[data-menu='${item.text}']`,
      );
      if (subMenu) {
        subMenu.setAttribute("style", "height: 0");
      }
    }
  }, [isOpen]);

  return (
    <li
      className={classNames("nk-menu-item", {
        "has-sub": item.subMenu,
        active: isOpen,
      })}
    >
      <Link
        href={item.link || "#"}
        className={classNames("nk-menu-link", {
          "nk-menu-toggle": item.subMenu,
        })}
        onClick={handleToggle}
      >
        {item.icon && (
          <span className="nk-menu-icon">
            <Icon name={item.icon} />
          </span>
        )}
        <span className="nk-menu-text">{item.text}</span>
        {item.badge && <span className="nk-menu-badge">{item.badge}</span>}
      </Link>
      {item.subMenu && (
        <ul className="nk-menu-sub" data-menu={item.text}>
          {item.subMenu.map((subItem, index) => (
            <MenuItem
              key={index}
              item={subItem}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              sidebarToggle={sidebarToggle}
              mobileView={mobileView}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Menu: React.FC<MenuProps> = ({
  currentMenuTab,
  sidebarToggle,
  mobileView,
}) => {
  const themeUpdate = useThemeUpdate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#main-menu")) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const menuItem = currentMenuTab
    ? menuData.find((item) => item.heading === currentMenuTab)
    : undefined;

  return (
    <div className="nk-menu-content menu-active">
      <div className="d-flex justify-between">
        <h5 className="title mt-1">{menuItem?.heading}</h5>
        <Toggle
          icon="arrow-left"
          className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
          click={themeUpdate?.sidebarVisibility}
        />
      </div>
      <ul className="nk-menu" id="main-menu">
        {menuItem?.subMenu?.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
