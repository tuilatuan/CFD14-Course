import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { authService } from "../services/authService";
import { message } from "antd";
import PATHS from "../constants/path";
import tokenMethod from "../utils/token";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState("");
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [profile, setProfile] = useState({});

  // dong mo modal
  const handleShowModal = (modalType) => {
    setShowModal(modalType || "");
  };
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowModal("");
  };
  //dang ky, dang nhap
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

  //lay thong tin
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

  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("getCourseHistories error", error);
    }
  };

  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  };

  //cap nhat thong tin tai khoan
  const handleUpdateProfile = async (profileData) => {
    try {
      const { firstName, email, password, facebookURL, introduce, phone, website } = profileData;
      const payload = {
        firstName: firstName,
        lastName: "",
        email,
        password,
        facebookURL,
        website,
        introduce,
        phone,
      };

      const res = await authService.updateProfiles(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhật thông tin thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    tokenMethod.remove();
    setProfile(undefined);
    navigate(PATHS.HOME);
  };

  useEffect(() => {
    if (tokenMethod.get()) {
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        paymentInfo,
        courseInfo,
        showModal,
        handleShowModal,
        handleCloseModal,
        handleRegister,
        handleGetProfilePayment,
        handleGetProfileCourse,
        handleUpdateProfile,
        handleLogin,
        handleLogout,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
