import React, { ReactNode } from "react";

export interface ContentProps {
  page?: "component" | undefined;
  nomx?: boolean;
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ page, nomx, children }) => {
  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            {!page ? children : null}

            {page === "component" ? (
              <div
                className={`components-preview wide-md ${!nomx ? "mx-auto" : ""}`}
              >
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
