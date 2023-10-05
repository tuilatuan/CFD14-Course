import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Empty } from "antd";
import CoursePaymentItem from "../../components/CoursePaymentItem";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();
  console.log("paymentInfo", paymentInfo);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {!!!paymentInfo.length && <Empty description="Không tìm thấy khóa học nào" style={{ margin: "0 auto" }} />}
      {!!paymentInfo.length &&
        paymentInfo.map((item, index) => <CoursePaymentItem key={item.id || newDate().getTime() + index} {...item} />)}
    </div>
  );
};

export default MyPayment;
