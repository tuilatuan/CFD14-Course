const COURSE_PATH = "/courses";
const BLOG_PATH = "/blog";
const PROFILE_PATH = "/profile";

const PATHS = {
  HOME: "/",
  COURSE: {
    INDEX: COURSE_PATH,
    DETAIL: COURSE_PATH + "/:courseSlug",
    ORDER: "/course-order/:courseSlug",
  },
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:blogId",
  },

  PROFILE: {
    INDEX: PROFILE_PATH,
    MY_COURSE: PROFILE_PATH + "/my-course",
    MY_PAYMENT: PROFILE_PATH + "/my-payment",
  },
  ABOUT: "/about",
  CONTACT: "/contact",
  PAYMENT: "/payment",
  PRIVACY: "/privacy",
};
export default PATHS;
