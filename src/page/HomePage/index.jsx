import axios from "axios";
import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { questionService } from "../../services/questionService";
import HeroSection from "./HeroSection";
import CourseCommingSection from "./CourseCommingSection";
import CoursesSection from "./CoursesSection";
import TeacherSection from "./TeacherSection";
import FeaturedSection from "./FeaturedSection";
import TestimontialSection from "./TestimontialSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import CallRegisterSection from "./CallRegisterSection";
import { teamService } from "../../services/teamService";
import { galleryService } from "../../services/galleryService";
const HomePage = () => {
  const { data: coursesData, error: coursesError, loading: coursesLoading } = useQuery(courseService.getCourse);
  const courses = coursesData?.courses || [];
  const commingCourse =
    courses?.filter((course) => {
      return course.startDate && new Date(course.startDate) > new Date();
    }) || [];

  //teams
  const { data: teamsData, error: teamserror, loading: teamsLoading } = useQuery(teamService.getTeams);
  const teams = teamsData?.teams;
  //faq
  const { data: faqData, lodaing: faqloading } = useQuery(questionService.getQuestion);
  const questions = faqData?.questions || [];
  //galery
  const { data: galleriesData, loading: galleriesLoading } = useQuery(galleryService.getGallery);
  const galleries = galleriesData?.galleries?.[0]?.images || [];
  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseCommingSection courses={commingCourse} loading={coursesLoading} />
      <CoursesSection courses={commingCourse} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />
      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimontialSection />
      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={faqloading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
