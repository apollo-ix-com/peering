import React from "react";
import AppMain from "./global/AppMain";
import AppRoot from "./global/AppRoot";
import AppWrap from "./global/AppWrap";
import ThemeProvider from "./provider/Theme";
import Sidebar from "./sidebar/Sidebar";
// import Header from './header/Header';
// import Footer from "./footer/Footer";

// import FileManagerProvider from "../pages/app/file-manager/components/Context";

export interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  app?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AppRoot>
        <Sidebar fixed />
        <AppMain>
          <AppWrap>
            {/* <Header fixed /> */}
            <main>{children}</main>
            {/* <Footer /> */}
          </AppWrap>
        </AppMain>
      </AppRoot>
    </ThemeProvider>
  );
};

export default Layout;
