import axios from "axios";

const callApi = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // مثال اضافه کردن JWT
      // const token = localStorage.getItem("token");
      // if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (err) => Promise.reject(err),
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      // مثال مدیریت خطای 401
      // if (err.response?.status === 401) window.location.href = "/login";
      return Promise.reject(err);
    }
  );
  return axiosInstance;
};

export default callApi;
