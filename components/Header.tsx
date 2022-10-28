import Image from "next/image";
import React from "react";
import style from "./Header.module.scss";
import logo from "../public/assets/weatherlogo.png";

const Header = () => {
  return (
    <div className={style.head}>
      <div>
        <Image src={logo} alt='' width={100} height={100} />
      </div>
      <span className={style.name}>Weather</span>
    </div>
  );
};

export default Header;
