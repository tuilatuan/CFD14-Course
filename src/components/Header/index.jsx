import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import HeaderHamburger from "./HeaderHamburger";
import HeaderLogo from "./HeaderLogo";
import HeaderAuthen from "./HeaderAuthen";
import PATHS from "../../constants/path";

const Header = () => {
  const { pathname } = useLocation();
  const isTranparent = [PATHS.HOME, PATHS.ABOUT].includes(pathname);

  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTranparent) {
          header.removeClass("--bgwhite");
        }
      }
    }

    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }
    window.addEventListener("scroll", scrollBgHeader);
    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTranparent]);

  return (
    <header id="header" className={`header --transparent ${!isTranparent ? "--bgwhite" : ""}`}>
      <div className="container-fluid">
        <HeaderHamburger />
        <HeaderLogo />
        <HeaderAuthen />
      </div>
    </header>
  );
};

export default Header;
