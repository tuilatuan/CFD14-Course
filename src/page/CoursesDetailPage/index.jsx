import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import ContentDetailSection from "./ContentDetailSection";
import { FeaturedSection } from "./FeaturedSection";
import FaqSection from "./FaqSection";
import CoursesSection from "./CoursesSection";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import { ROLE } from "../../constants/roles";
import { formatCurrency, formatDate } from "../../utils/format";
import useDebounce from "../../hooks/useDebounce";
import useQuery from "../../hooks/useQuery";
import { questionService } from "../../services/questionService";
import HeaderTop from "./HeaderTop";

const CourseDetailPage = () => {
  //lay duong dan browser
  const param = useParams();
  const { courseSlug } = param;
  console.log("courseSlug", courseSlug);
  //ds khhoa hoc vs question
  const { data: coursesData, error: coursesError, loading: coursesLoading } = useQuery(courseService.getCourse);
  const { data: faqData, lodaing: faqloading } = useQuery(questionService.getQuestion);

  //api khoa hoc
  const { data: courseDetailData, loading: courseDetailLoading, execute } = useMutation(courseService.getCourseBySlug);
  useEffect(() => {
    if (courseSlug) execute(courseSlug || "", {});
  }, [courseSlug]);
  //modify data
  const questions = faqData?.questions || [];
  const courses = coursesData?.courses || [];
  const orderLink = `/course-order/` + courseSlug;

  const { teams, startDate, price } = courseDetailData || {};
  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLE.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };

  // const apiLoading = courseDetailLoading || faqloading || coursesLoading;
  // const pageLoading = useDebounce(apiLoading, 3000);

  return (
    <>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection questions={questions} loading={faqloading} />
        <CoursesSection courses={courses} />
      </main>
    </>
  );
};

export default CourseDetailPage;
