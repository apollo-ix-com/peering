"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Icon } from "../../index";
import { useThemeUpdate } from "../provider/Theme";
import Toggle from "../sidebar/Toggle";
import menuData, { MenuItemType } from "./MenuData";

interface MenuItemProps extends MenuProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  sidebarToggle,
  mobileView,
}) => {
  const pathname = usePathname();
  const isActive = pathname === item.link;

  const handleToggle = () => {
    if (!item.subMenu && mobileView && sidebarToggle) {
      sidebarToggle();
    }
  };

  return (
    <li
      className={classNames("nk-menu-item", {
        "has-sub": item.subMenu,
        active: isActive,
      })}
    >
      <Link
        href={item.link || ""}
        className={`nk-menu-link${item.subMenu ? " nk-menu-toggle" : ""}`}
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
        <MenuSub
          subMenu={item.subMenu}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      )}
    </li>
  );
};

interface MenuSubProps extends MenuProps {
  subMenu: MenuItemType[];
}

const MenuSub: React.FC<MenuSubProps> = ({
  subMenu,
  sidebarToggle,
  mobileView,
}) => {
  return (
    <ul className="nk-menu-sub">
      {subMenu.map((subItem) => (
        <MenuItem
          key={subItem.text}
          item={subItem}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
        />
      ))}
    </ul>
  );
};

interface MenuProps {
  currentMenuTab?: string;
  sidebarToggle?: () => void;
  mobileView?: boolean;
}

const Menu: React.FC<MenuProps> = ({
  currentMenuTab,
  sidebarToggle,
  mobileView,
}) => {
  const themeUpdate = useThemeUpdate();
  // const [menuItem, setMenuItem] = useState<MenuItemType | undefined>(undefined);

  // useEffect(() => {
  //   const selectedMenu = menuData.find(
  //     (item) => item.heading === currentMenuTab,
  //   );
  //   setMenuItem(selectedMenu);
  // }, [currentMenuTab]);

  let menuItem;
  if (currentMenuTab) {
    menuItem = menuData.find((item) => item.heading === currentMenuTab);
  }

  return (
    <div className="nk-menu-content menu-active">
      <div className="d-flex justify-between">
        <h5 className="title mt-1">{menuItem?.heading}</h5>
        <div className="mb-1">
          <Toggle
            icon="arrow-left"
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            click={themeUpdate?.sidebarVisibility}
          />
        </div>
      </div>

      <ul className="nk-menu" id="main-menu">
        {menuItem?.subMenu?.map((item) => (
          <MenuItem
            key={item.text}
            item={item}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
