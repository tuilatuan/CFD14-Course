import React from "react";
import { PAYMENT_METHOD_LABELS } from "../../constants/general";
import { formatCurrency, formatDate } from "../../utils/format";

const CoursePaymentItem = ({ name, paymentMethod, createdAt, course }) => {
  const paymentMethodName = PAYMENT_METHOD_LABELS[paymentMethod];
  const datePayment = formatDate(createdAt);
  const pricePayment = formatCurrency(course?.price);
  return (
    <div className="itemhistory">
      <div className="name">{name}</div>
      <div className="payment">{paymentMethodName}</div>
      <div className="date">{datePayment}</div>
      <div className="money">{pricePayment} VNĐ</div>
    </div>
  );
};

export default CoursePaymentItem;
