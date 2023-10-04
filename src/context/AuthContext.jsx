import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { authService } from "../services/authService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import PATHS from "../constants/path";
import tokenMethod from "../utils/token";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState("");
  const [profile, setProfile] = useState({});
  const handleShowModal = (modalType) => {
    setShowModal(modalType || "");
  };
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowModal("");
  };
  const handleLogin = async (loginData, callback) => {
    try {
      const { email, password } = { ...loginData };
      const payload = { email: email, password: password };
      const res = await authService.login(payload);
      if (res?.data.data) {
        console.log("tr ve", res.data.data);
        message.success("Đăng nhập thành công");
        const { token: accessToken, refreshToken } = res.data.data || {};
        //luu token
        tokenMethod.set({ accessToken, refreshToken });

        handleGetProfile();

        handleCloseModal();
      }
    } catch (error) {
      message.success("Đăng nhập thất bại");
      console.log("error", error);
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    try {
      const { name, email, password } = registerData;
      const payload = {
        firstName: name,
        lastName: "",
        email: email,
        password: password,
      };
      const res = await authService.register(payload);
      if (res?.data?.data.id) {
        console.log("res", res);
        handleLogin({ email, password });
        handleCloseModal();
        message.success("Đăng ký thành công!");
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 403) {
        message.error("Email đã tồn tại!!");
      } else {
        message.error("Đăng ký không thành công");
      }
    } finally {
      callback?.();
    }
  };
  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      // console.log("profileRes.data.?.data", profileRes.data?.data);
      if (profileRes.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("lay profile khong thanh cong");
    }
  };
  const handleLogout = () => {
    tokenMethod.remove();
    setProfile(undefined);
    navigate(PATHS.HOME);
  };
  console.log("profilepage", profile);

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{ showModal, handleShowModal, handleCloseModal, handleRegister, handleLogin, handleLogout, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
