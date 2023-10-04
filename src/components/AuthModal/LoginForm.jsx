import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";
import Button from "../Button";
import Input from "../Input";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import ComponentLoading from "../ComponentLoading";
import { message } from "antd";
import { authService } from "../../services/authService";

const LoginForm = () => {
  const { handleShowModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [requireRule("vui long nhap email"), regrexRule("email", "vui long nhap dung dinh danh  email")],
      password: [requireRule("vui long nhap password")],
    }
  );

  const _onSubmit = (e) => {
    e.preventDefault();
    const errObj = validate();
    if (Object.keys(errObj)?.length > 0) {
      console.log("SubmitError", errObj);
    } else {
      setLoading(true);
      handleLogin?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  };
  return (
    <div className="modal__wrapper-content mdlogin active" style={{ position: "relative" }}>
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPE.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <Input label="Email" placeholder="Email" required {...register("email")} />
        <Input label="Password" placeholder="Password" required type="password" {...register("password")} />
        <div className="form__bottom">
          <a className="color--primary" href="#">
            Quên mật khẩu?
          </a>
        </div>
        <Button className=" form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
