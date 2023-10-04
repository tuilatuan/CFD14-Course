import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import { MODAL_TYPE } from "../../constants/general";
import Input from "../Input";
import { Link } from "react-router-dom";
import PATHS from "../../constants/path";
import ComponentLoading from "../ComponentLoading";

import Button from "../Button";
import { message } from "antd";

const RegisterFrom = () => {
  const { handleShowModal, handleCloseModal, handleRegister } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: [requireRule("vui long nhap ho ten")],
      email: [requireRule("Vui long nhap email"), regrexRule("email", "vui long nhap dung dinh dang email")],
      password: [requireRule("vui long nhap mat khau")],
      confirmPassword: [
        requireRule("vui long nhap lai mat khau"),
        (value, values) => {
          if (values.password && value !== values.password) {
            return "mat khau xac nha khong dung";
          }
          return false;
        },
      ],
    }
  );
  const _onSubmit = (e) => {
    e.preventDefault();
    // 1: dki xog chuyen sang dang nhap, 2: auto login va dong modal di
    const errObj = validate();
    console.log("form", form);
    if (Object.keys(errObj)?.length > 0) {
      console.log("Submit error", errObj);
    } else {
      setLoading(true);
      handleRegister?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    }
  };

  return (
    <div className="modal__wrapper-content mdregister active" style={{ position: "relative" }}>
      {loading && <ComponentLoading />}

      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div className="color--primary btnmodal" data-modal="mdlogin" onClick={() => handleShowModal(MODAL_TYPE.login)}>
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <Input label="Họ và tên" placeholder="Họ và tên" required {...register("name")} />
        <Input label="Email" placeholder="Email" required {...register("email")} />
        <Input label="Mật Khấu" placeholder="Mật Khấu" type="password" required {...register("password")} />
        <Input
          label="Xác nhập mật khẩu"
          placeholder="Xác nhập mật khẩu"
          type="password"
          required
          {...register("confirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý{" "}
          <Link className="color--primary" to={PATHS.PRIVACY} onClick={handleCloseModal}>
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className=" form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterFrom;
