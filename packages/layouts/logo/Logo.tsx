import Image from "next/image";
import Link from "next/link"; // Use Next.js' built-in Link component
import React from "react";
import LogoDark2x from "../../../public/images/logo/logo-dark2x.png";
import LogoLight2x from "../../../public/images/logo/logo2x.png";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="logo-link">
      <Image
        className="logo-light logo-img"
        src={LogoLight2x}
        alt="Logo"
        width={100}
        height={100}
      />
      <Image
        className="logo-dark logo-img"
        src={LogoDark2x}
        alt="Logo"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
