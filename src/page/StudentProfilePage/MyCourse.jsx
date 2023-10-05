import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Empty } from "antd";
import CourseItem from "../../components/CourseItem";
import { COURSE_ITEM_TYPE } from "../../constants/general";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();
  console.log("courseInfo", courseInfo);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {!!!courseInfo.length && <Empty description="Không tìm thấy khóa học nào" style={{ margin: "0 auto" }} />}
        {!!courseInfo.length &&
          courseInfo.map((item, index) => (
            <CourseItem key={item.id || newDate().getTime() + index} type={COURSE_ITEM_TYPE.normal} {...item?.course} />
          ))}
      </div>
    </div>
  );
};

export default MyCourse;
