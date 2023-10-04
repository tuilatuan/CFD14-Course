import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  getPaymentHistories() {
    return axiosInstance.get("/order/me");
  },
  getCourseHistories() {
    return axiosInstance.get("/order/courses/me");
  },
  getCourse(payload = "") {
    return axiosInstance.get("/order", payload);
  },
};
