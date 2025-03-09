import Link from "next/link";
import React from "react";

export interface FooterProps {
  children?: React.ReactNode;
  year?: string;
  by?: string;
  href?: string;
  brand?: string;
  links?: { link: string; label: string }[];
}

const Footer: React.FC<FooterProps> = ({ year, by, href, brand, links }) => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy; Copyright {year} {by}{" "}
            <a href={href} rel="noreferrer" target="_blank">
              {brand}
            </a>{" "}
            All Rights Reserved.
          </div>

          <div className="nk-footer-links">
            <ul className="nav nav-sm">
              {links?.map((link) => (
                <li className="nav-item" key={0}>
                  <Link className="nav-link" href={link.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
