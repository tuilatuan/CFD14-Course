import React from "react";
import PageLoaing from "../../components/PageLoading";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Overlay from "../../components/Overlay";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import MainContext from "../../context/MainContext";
import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/AuthContext";
import AuthModal from "../../components/AuthModal";

const MainLayout = ({ children }) => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <PageLoaing />
        <Header />
        <Navbar />
        <Overlay />
        {/* hien thi cac trang  */}
        <Outlet />

        <Footer />

        {/* Modal Đăng Nhập / Đăng Ký */}
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
