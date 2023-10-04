import axiosInstance from "../utils/axiosInstance";

export const galleryService = {
  getGalleryByQuery(query = "") {
    return axiosInstance.get(`/galleries/${query}`);
  },
  getGallery() {
    return axiosInstance.get(`/galleries`);
  },
};
