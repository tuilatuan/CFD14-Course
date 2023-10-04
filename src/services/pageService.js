import axiosInstance from "../utils/axiosInstance";

export const pageService = {
  getPages() {
    return axiosInstance.get("/pages");
  },
  getPagesDetail(slug = "") {
    return axiosInstance.get(`/pages${slug}`);
  },
};
