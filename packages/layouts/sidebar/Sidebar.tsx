"use client";

import classNames from "classnames";
import React, { useState } from "react";
import SimpleBar from "simplebar-react";
// import Menu from "../menu/Menu";
import Navside from "../navside/Navside";
import { useTheme, useThemeUpdate } from "../provider/Theme";

interface SidebarProps {
  fixed?: boolean; // Optional fixed sidebar
  className?: string; // Optional additional classNames
}

const Sidebar: React.FC<SidebarProps> = ({ fixed, className = "" }) => {
  const [currentMenuTab, setCurrentMenuTab] = useState<string>("Dashboards");

  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const mainClass = classNames("nk-sidebar-main", {
    "is-light": theme.sidebar === "white",
    [`is-${theme.sidebar}`]:
      theme.sidebar !== "white" && theme.sidebar !== "light",
    [className]: !!className, // Optional className
  });

  const sidebarClass = classNames("nk-sidebar", {
    "nk-sidebar-fixed": fixed,
    "nk-sidebar-mobile": theme.sidebarMobile,
    "nk-sidebar-active": theme.sidebarVisibility && theme.sidebarMobile,
  });

  const handleOverlayClick = () => {
    themeUpdate.sidebarVisibility();
  };

  return (
    <>
      <div className={sidebarClass}>
        <Navside setCurrentMenuTab={setCurrentMenuTab} />
        <div className={mainClass}>
          <SimpleBar className="nk-sidebar-inner">
            {/* <Menu currentMenuTab={currentMenuTab} /> */}
          </SimpleBar>
        </div>
      </div>

      {theme.sidebarVisibility && (
        <div
          className="nk-sidebar-overlay"
          onClick={handleOverlayClick}
          role="button"
          aria-label="Close Sidebar"
        />
      )}
    </>
  );
};

export default Sidebar;
