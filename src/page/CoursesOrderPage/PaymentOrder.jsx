import React from "react";

const PaymentOrder = () => {
  return (
    <div className="itemorder paymentorder">
      <h3 className="title --t3">Hình thức thanh toán</h3>
      <div className="boxorder">
        <div className="boxorder__pay">
          <label className="radiocontainer">
            <img src="/img/icon-payment-method-atm.svg" />
            Thành toán bằng chuyển khoản
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>
          <div className="boxorder__pay-tooltip">
            Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản ngân hàng sẽ được gửi đến email của bạn, bạn vui
            lòng chuyển khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD Circle sẽ liên hệ bạn để xác nhận
            và kích hoạt khoá học của bạn sau khi giao dịch thành công.
          </div>
        </div>
        <div className="boxorder__pay">
          <label className="radiocontainer">
            <img src="/img/icon-payment-method-mo-mo.svg" />
            Thanh toán bằng ví Momo
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>
          <div className="boxorder__pay-tooltip">
            Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản MoMo sẽ được gửi đến email của bạn, bạn vui lòng
            chuyển khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD Circle sẽ liên hệ bạn để xác nhận và
            kích hoạt khoá học của bạn sau khi giao dịch thành công.
          </div>
        </div>
        {/* Khoá học video và video mentor thì không có thanh toán tiền mặt */}
        <div className="boxorder__pay">
          <label className="radiocontainer">
            <img src="/img/icon-payment-method-cod.svg" />
            Thanh toán bằng tiền mặt
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>
          <div className="boxorder__pay-tooltip">
            Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email của bạn, bạn vui lòng đến văn phòng CFD Circle
            vào ngày khai giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ Chí Minh.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOrder;
