import React from "react";
import AppMain, { AppProps } from "./global/AppMain";
import AppRoot from "./global/AppRoot";
import AppWrap from "./global/AppWrap";

const LayoutNoSidebar: React.FC<AppProps> = ({ children }) => {
  return (
    <AppRoot>
      <AppMain>
        <AppWrap className="nk-wrap-nosidebar">
          <div className="nk-content">{children}</div>
        </AppWrap>
      </AppMain>
    </AppRoot>
  );
};

export default LayoutNoSidebar;
