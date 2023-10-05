import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { Empty, Skeleton } from "antd";
import CourseItem from "../../components/CourseItem";

const Courses = () => {
  const { data: coursesData, loading: coursesLoading } = useQuery(courseService.getCourse);
  const courses = coursesData?.courses || [];
  console.log("coursesLoading", coursesLoading);
  const loading = useDebounce(coursesLoading, 1500);

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>

        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty description="Không thấy kháo học nào" style={{ margin: "0 auto" }} />
          )}
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="courses__list-item" style={{ height: "50vh" }}>
                  <Skeleton active />
                  <br />
                  <Skeleton active />
                </div>
              ))}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
        </div>
      </div>
    </main>
  );
};

export default Courses;
