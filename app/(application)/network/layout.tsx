import React, { ReactNode } from "react";
import { LayoutNoSidebar } from "@/packages";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <LayoutNoSidebar>
    <div className="p-4">{children}</div>
  </LayoutNoSidebar>
);

export default Layout;
