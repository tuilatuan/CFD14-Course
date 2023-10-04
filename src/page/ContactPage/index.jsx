import React from "react";
import ContactTitle from "./ContactTitle";
import ContactSidebar from "./ContactSidebar";
import ContactForm from "./ContactForm";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/subscribesService";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  const { execute, data, loading, error } = useMutation(subscribesService.subscribes);
  const handleFormSubmit = (formData) => {
    const payload = {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      title: formData?.title || "",
      topic: formData?.topic || "",
      description: formData?.content || "",
    };
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        navigate("/");
      },
      onFail: (error) => {
        console.log("error", error);
      },
    });
  };
  // console.log("fasdf", data);
  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
