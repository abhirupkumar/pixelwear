import React from "react";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import Link from "next/link";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={Logo} alt='logo' width={150} height={50} priority={false} />
    </Link>
  );
};

export default LogoIcon;
