import React from "react";
import MainLayout from "./layout/MainLayout";
import HomePage from "./page/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./page/AboutPage";
import ContactPage from "./page/ContactPage";
import Courses from "./page/CouresPage";
import PaymentPage from "./page/PayMentPage";
import PrivacyPage from "./page/PrivacyPage";
import StudentProfilePage from "./page/StudentProfilePage";
import MyCourse from "./page/StudentProfilePage/MyCourse";
import MyPayment from "./page/StudentProfilePage/MyPayment";
import MyInfo from "./page/StudentProfilePage/MyInfo";
import Page404 from "./page/404Page";
import CourseOrderPage from "./page/CoursesOrderPage";
import CourseDetailPage from "./page/CoursesDetailPage";
import BlogPage from "./page/BlogPage";
import BlogDetailPage from "./page/BlogDetailPage";
import PATHS from "./constants/path";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
          <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />
          {/* Course Page */}

          <Route path={PATHS.COURSE.INDEX} element={<Courses />} />
          <Route path={PATHS.COURSE.DETAIL} element={<CourseDetailPage />} />

          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.PAYMENT} element={<PaymentPage />} />
          <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />

          <Route element={<PrivateRoute element={PATHS.HOME} />}>
            <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
            <Route path={PATHS.PROFILE.INDEX} element={<StudentProfilePage />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//useQuuery trang home
// useManitation trang contact
//20/9
