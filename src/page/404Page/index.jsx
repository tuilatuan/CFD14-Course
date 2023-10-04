import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <main className="mainwrapper notfoundpage">
      <section>
        <div className="container">
          <h2 className="title --t1">404</h2>
          <p>Không tìm thấy trang</p>
          <Link to="/" className="btn btn--primary">
            Trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Page404;
