"use client";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link"; // Updated import for Next.js Link
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { User, Icon, LinkList, LinkItem } from "../../index";
import menuData, { MenuItemType } from "../menu/MenuData";
import { useTheme, useThemeUpdate } from "../provider/Theme";

interface NavsideProps {
  setCurrentMenuTab: (tab: string) => void;
}

const Navside: React.FC<NavsideProps> = ({ setCurrentMenuTab }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const [menuTab, setMenuTab] = useState<string>("Dashboards");
  const [isOpen, setOpen] = useState<boolean>(false);

  // Function to check if the current pathname matches any submenu link
  const checkMenuUrl = useCallback(
    (data: MenuItemType): MenuItemType | undefined => {
      if (!data.subMenu) {
        return;
      }
      for (const node of data.subMenu) {
        if (node.link === pathname) {
          return node;
        } else {
          const newNode = node.subMenu ? checkMenuUrl(node) : undefined;
          if (newNode) return newNode;
        }
      }
    },
    [pathname],
  );

  // Effect to update menu tab based on the current pathname
  useEffect(() => {
    menuData.forEach((item) => {
      const found = checkMenuUrl(item);
      if (found !== undefined && item.heading) {
        setMenuTab(item.heading);
      }
    });
  }, [pathname, checkMenuUrl]);

  // Effect to update the current menu tab in the parent component
  useEffect(() => {
    setCurrentMenuTab(menuTab);
  }, [menuTab, setCurrentMenuTab]);

  const appSidebarClass = classNames({
    "nk-sidebar-bar": true,
    ["is-light"]: theme.sidenav === "white",
    [`is-${theme.sidenav}`]:
      theme.sidenav !== "white" && theme.sidenav !== "light",
  });

  return (
    <div className={appSidebarClass}>
      <div className="nk-apps-brand">
        {/* <Link href={`${process.env.PUBLIC_URL}/`} passHref>
          <span className="logo-link">
            <Image className="logo-light logo-img" src={LogoSmall} alt="logo" />
            <Image
              className="logo-dark logo-img"
              src={LogoDark}
              alt="logo-dark"
            />
          </span>
        </Link> */}
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-body">
          <SimpleBar className="nk-sidebar-content">
            <div className="nk-sidebar-menu">
              <ul className="nk-menu apps-menu">
                {menuData.map((item, index) => {
                  if (item.heading !== "Components") {
                    return (
                      <React.Fragment key={index}>
                        <li
                          className={`nk-menu-item ${
                            item.heading === menuTab ? "active" : ""
                          }`}
                          id={"page" + index}
                        >
                          <a
                            href="#link"
                            className="nk-menu-link nk-menu-switch"
                            onClick={(ev) => {
                              ev.preventDefault();
                              if (item.heading) {
                                setMenuTab(item.heading);
                              }
                            }}
                          >
                            <span className="nk-menu-icon">
                              <Icon name={item.icon || ""} />
                            </span>
                          </a>
                        </li>
                      </React.Fragment>
                    );
                  } else return null;
                })}
                <li className="nk-menu-hr" />
                <li
                  className={`nk-menu-item ${
                    "Components" === menuTab ? "active" : ""
                  }`}
                  id="componentTooltip"
                >
                  <a
                    href="#link"
                    className="nk-menu-link nk-menu-switch"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setMenuTab("Components");
                    }}
                  >
                    <span className="nk-menu-icon">
                      <Icon name="layers" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="nk-sidebar-footer">
              <ul className="nk-menu nk-menu-md apps-menu">
                <li
                  className="nk-menu-item"
                  id="settingsTooltip"
                  onClick={themeUpdate.sidebarVisibility}
                >
                  <Link
                    href={`${process.env.PUBLIC_URL}/user-profile-setting`}
                    passHref
                  >
                    <span className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <Icon name="setting" />
                      </span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </SimpleBar>
          <Dropdown
            // isOpen={isOpen}
            // toggle={() => setOpen(!isOpen)}
            className="nk-sidebar-profile nk-sidebar-profile-fixed"
            // direction="end"
          >
            <DropdownToggle
              //   tag="a"
              href="#toggle"
              className="dropdown-toggle"
              onClick={(ev) => {
                ev.preventDefault();
              }}
            >
              <User.Avatar text="AB" theme="primary" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-md ms-4">
              <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                <div className="user-card sm">
                  <User.Avatar text="AB" theme="primary" />
                  <div className="user-info">
                    <span className="lead-text">Abu Bin Ishtiyak</span>
                    <span className="sub-text">info@softnio.com</span>
                  </div>
                </div>
              </div>
              <div className="dropdown-inner" onClick={themeUpdate.sidebarHide}>
                <LinkList>
                  <LinkItem link="/user-profile-regular" icon="user-alt">
                    View Profile
                  </LinkItem>
                  <LinkItem link="/user-profile-setting" icon="setting-alt">
                    Account Setting
                  </LinkItem>
                  <LinkItem link="/user-profile-activity" icon="activity-alt">
                    Login Activity
                  </LinkItem>
                </LinkList>
              </div>
              <div className="dropdown-inner">
                <LinkList>
                  <a href={`${process.env.PUBLIC_URL}/auth-login`}>
                    <Icon name="signout" />
                    <span>Sign Out</span>
                  </a>
                </LinkList>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navside;
