import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import { ROLE } from "../../constants/roles";
import { formatCurrency } from "../../utils/format";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import { orderService } from "../../services/orderService";
import { message } from "antd";
import PATHS from "../../constants/path";

const CourseOrderPage = () => {
  const navigate = useNavigate();
  const { courseSlug } = useParams();
  const { profile, courseInfo, handleGetProfileCourse, handleGetProfilePayment } = useAuthContext();
  const { firstName: profileName, email: profileEmail, phone: profilePhone } = profile || {};

  const { form, register, validate, setForm } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui long nhap tên")],
      email: [requireRule("Vui long nhập email"), regrexRule("email", "Vui lòng nhập đúng định dạng email")],
      phone: [requireRule("Vui long nhập phone"), regrexRule("phone", "Vui lòng nhập đúng định dạng phone")],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );
  //kiem tra slug co slug trung ko
  const isAlreadyOrder = courseInfo?.some((item) => item?.course?.slug === courseSlug);
  //lay thong tin chi tiet khoa hoc
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(courseService.getCourseBySlug);

  useEffect(() => {
    if (courseSlug) executeCourseDetail(courseSlug, {});
  }, [courseSlug]);
  const { teams, price, tags } = courseDetailData || {};

  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLE.teacher)) || {},
    price: formatCurrency(price),
  };

  //setform
  useEffect(() => {
    if (isAlreadyOrder && courseInfo?.length > 0) {
      const orderedCourse = courseInfo?.find((item) => item?.course?.slug === courseSlug);
      setForm({
        name: orderedCourse.name || "",
        email: profile.email || "",
        phone: orderedCourse.phone || "",
        type: orderedCourse.type,
      });
      setPaymentMethod(orderedCourse.paymentMethod);
    } else {
      setForm({
        name: profile.firstName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        type: "",
      });
    }
  }, [profileName, profileEmail, profilePhone, isAlreadyOrder, courseInfo]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };

  //handle orderCourse
  const { loading: orderLoading, execute: orderCourse } = useMutation(orderService.orderCourse);
  //khi nhan nut dang ky
  const _onOrder = () => {
    const profileError = validate();

    if (Object.keys(profileError).length > 0) {
      console.log("Profile form validate failed", profileError);
    } else {
      if (paymentMethod) {
        // setup payload
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.id,
          type: form.type,
          paymentMethod,
        };
        // call api order
        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATHS.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn hình thức thanh toán");
      }
    }
  };
  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder register={register} types={tags || []} disabled={isAlreadyOrder} />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrder}
          />

          {/* addclass --processing khi bấm đăng ký */}
          <Button
            style={{ width: "100%" }}
            onClick={_onOrder}
            className={`${orderLoading ? "--processing" : ""}`}
            disabled={isAlreadyOrder}
            loading={orderLoading}
          >
            <span>{isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
