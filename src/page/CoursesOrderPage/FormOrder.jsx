import React from "react";

const FormOrder = () => {
  return (
    <div className="itemorder formorder">
      <h3 className="title --t3">Thông tin cá nhân</h3>
      <div className="boxorder">
        <form action="#" className="form">
          <div className="form-container">
            <div className="form-group">
              <label className="label">
                Họ và tên <span>*</span>
              </label>
              <input defaultValue="Nghĩa Trần" type="text" className="form__input" />
            </div>
            <div className="form-group">
              <label className="label">
                Email <span>*</span>
              </label>
              <input defaultValue="nghiatran@2018@gmail.com" disabled type="email" className="form__input" />
            </div>
          </div>
          <div className="form-container">
            <div className="form-group">
              <label className="label">
                Số điện thoại <span>*</span>
              </label>
              <input defaultValue={`0928338373`} type="text" className="form__input" />
            </div>
            <div className="form-group">
              <label className="label">
                Hình thức học <span>*</span>
              </label>
              <div className="select select-change">
                <div className="head form__input">Học Offline</div>
                <div className="sub" style={{ display: "none" }}>
                  <a href="#" data-value="offline">
                    Học Offline
                  </a>
                  <a href="#" data-value="online">
                    Học Online
                  </a>
                </div>
                <input type="text" name="type" hidden defaultValue="offline" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormOrder;
