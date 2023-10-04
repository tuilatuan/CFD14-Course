import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);

  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setIsShowNavbar(false);
  }, [pathName]);

  const handleShowNavbar = (isShow) => {
    setIsShowNavbar(isShow);
  };

  return <MainContext.Provider value={{ isShowNavbar, handleShowNavbar }}> {children}</MainContext.Provider>;
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
