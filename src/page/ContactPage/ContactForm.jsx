import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";
import validate, { regrexRule, requireRule } from "../../utils/validate";
import useForm from "../../hooks/useForm";
const rules = {
  name: [requireRule("Vui lòng nhập tên")],
  email: [requireRule("Vui lòng nhập email"), regrexRule("email", "Vui long nhập đúng định dạng email")],
  phone: [requireRule("Vui lòng nhập phone"), regrexRule("phone", "Vui long nhập đúng định dạng phone")],
  topic: [requireRule("Vui lòng nhập topic")],
  content: [requireRule()],
};
const ContactForm = ({ handleFormSubmit }) => {
  const { form, error, register, validate } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      topic: "",
      content: "",
    },
    rules
  );

  const _onSubmit = () => {
    const errorObject = validate();
    console.log("Submmit form ", form);

    //end validate
    if (Object.keys(errorObject).length > 0) {
      console.log("Submmit error ", errorObject);
    } else {
      // console.log("Submmit sucess ", form);

      handleFormSubmit?.(form);
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input label="Họ và Tên" required placeholder="Họ và Tên" {...register("name")} />
      <Input label="Email" required placeholder="Email" {...register("email")} />
      <Input label="Phone" required placeholder="Phone" {...register("phone")} />

      <Input
        label="Chử đề cần hỗ trợ"
        required
        {...register("topic")}
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "React JS" },
                { value: "responsive", label: "Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
      />

      <Input
        label="Chử đề cần hỗ trợ"
        required
        {...register("content")}
        renderInput={(inputProps) => {
          // console.log("input", inputProps);
          return <Textarea {...inputProps} />;
        }}
      />
      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmit}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
