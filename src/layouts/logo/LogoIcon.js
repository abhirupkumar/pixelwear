import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/logo.png";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={Logo} alt='logo' width={150} height={50} priority={false}/>
    </Link>
  );
};

export default LogoIcon;
