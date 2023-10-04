import React, { useEffect } from "react";
import Button from "../../components/Button";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import { useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import { ROLE } from "../../constants/roles";
import { formatCurrency } from "../../utils/format";
import { useAuthContext } from "../../context/AuthContext";

const CourseOrderPage = () => {
  const { courseSlug } = useParams();
  const { profile } = useAuthContext();
  const { firstName: profileName, email: profileEmail, phone: profilePhone } = profile || {};
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
  console.log("courseDetailData", courseDetailData);

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder />
          <PaymentOrder />

          {/* addclass --processing khi bấm đăng ký */}
          <Button>
            <span>Đăng ký khoá học</span>
            <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
