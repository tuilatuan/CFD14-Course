import PATHS from "../../constants/path";
import React from "react";
import { Link } from "react-router-dom";
import { ROLE } from "../../constants/roles";
import { formatCurrency, formatDate } from "../../utils/format";
import Button from "../Button";
import { COURSE_ITEM_TYPE } from "../../constants/general";

const CourseItem = ({ type = COURSE_ITEM_TYPE.normal, image, slug, name, teams, startDate, tags, price }) => {
  const pathDetail = PATHS.COURSE.INDEX + `/${slug}`;
  const orderpath = "/course-order" + `/${slug}`;
  const teacherInfo = teams?.find((team) => team.tags.includes(ROLE.teacher));
  // console.log("teacherInfo", teacherInfo);

  if (type === COURSE_ITEM_TYPE.normal) {
    return (
      <div className="courses__list-item">
        <div className="img">
          <Link to={pathDetail}>
            <img src={image} alt="Khóa học CFD" className="course__thumbnail" />
            <span className="course__img-badge badge">Offline | Online</span>
          </Link>
        </div>
        <div className="content">
          <p className="label">Front-End</p>
          <h3 className="title --t3">
            <Link to={pathDetail}>{name || ""}</Link>
          </h3>
          <div className="content__info">
            {teacherInfo?.id && (
              <div className="user">
                <div className="user__img">
                  <img src={teacherInfo.image || ""} alt="Avatar teacher" />
                </div>
                <p className="user__name">{teacherInfo.name || ""}</p>
              </div>
            )}

            <div className="price">
              <strong>{formatCurrency(price)}đ</strong>
            </div>
          </div>
          <div className="content__action">
            <a href="course-order.html" className="btn btn--primary">
              Đăng ký ngay
            </a>
            <a href="course-detail.html" className="btn btn--default">
              <img src="/img/icon-paper.svg" alt="icon paper" />
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="coursecoming__item">
      <div className="coursecoming__item-img">
        <Link to={pathDetail}>
          <img src={image || ""} alt="Khóa học sắp ra mắt CFD" />
        </Link>
      </div>
      <div className="coursecoming__item-content">
        <p className="category label">Front-end</p>
        <h2 className="title --t2">
          <Link to={pathDetail}>{name || ""}</Link>
        </h2>
        {teacherInfo?.id && (
          <div className="user">
            <div className="user__img">
              <img src={teacherInfo.image || ""} alt="Avatar teacher" />
            </div>
            <p className="user__name">{teacherInfo.name || ""}</p>
          </div>
        )}
        <div className="info">
          {startDate && (
            <div className="labeltext">
              <span className="label --blue">Ngày khai giảng</span>
              <p className="title --t2">{formatDate(startDate)}</p>
            </div>
          )}
          {tags && (
            <div className="labeltext">
              <span className="label --blue">Hình thức học</span>
              <p className="title --t2">{tags.join(" | ")}</p>
            </div>
          )}
        </div>
        <div className="btnwrap">
          <Button link={orderpath}>Đăng Ký Học</Button>
          <Button link={pathDetail} variant="border">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
