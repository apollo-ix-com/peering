import React, { ReactNode } from "react";
import { LayoutNoSidebar } from "@/packages";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <LayoutNoSidebar>
    <div className="nk-split nk-split-page nk-split-lg">{children}</div>
  </LayoutNoSidebar>
);

export default Layout;
