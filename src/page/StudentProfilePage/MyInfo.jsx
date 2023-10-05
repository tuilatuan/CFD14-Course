import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import { regrexRule, requireRule } from "../../utils/validate";
import Button from "../../components/Button";
const rules = {
  firstName: [requireRule("Vui lòng nhập tên")],
  email: [requireRule("Vui lòng nhập email"), regrexRule("email", "Vui long nhập đúng định dạng email")],
  phone: [requireRule("Vui lòng nhập phone"), regrexRule("phone", "Vui long nhập đúng định dạng phone")],
  password: [requireRule("Vui lòng nhập mật khẩu")],
};
const MyInfo = () => {
  const { profile, handleUpdateProfile } = useAuthContext();
  const { form, setForm, register, validate } = useForm(
    {
      firstName: "",
      email: "",
      phone: "",
      password: "*********",
      website: "",
      introduce: "",
    },
    rules
  );
  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error", errorObject);
    } else {
      handleUpdateProfile?.(form);
    }
  };

  useEffect(() => {
    if (profile) {
      setForm({ ...form, ...profile });
    }
  }, [profile]);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <Input label="Họ và Tên" required placeholder="Họ và Tên" {...register("firstName")} />
          <Input label="Số điện thoại" required placeholder="Số điện thoại" {...register("phone")} />
        </div>
        <div className="form-container">
          <Input label="Email" required disabled placeholder="Email" {...register("email")} />
          <Input label="Mật khẩu" required disabled placeholder="Mật khẩu" {...register("password")} />
        </div>
        <Input label="Facebook URL" placeholder="Facebook URL" {...register("facebookURL")} />
        <Input label="Website" placeholder="Website" {...register("website")} />

        <Input
          label="Giới thiệu bản thân"
          renderInput={(inputProps) => {
            return <Textarea {...inputProps} />;
          }}
          {...register("introduce")}
        />
        <div className="form-group">
          <div className="btnsubmit">
            <Button style={{ width: "100%" }} variant="primary" onClick={_onSubmit}>
              Gửi
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
