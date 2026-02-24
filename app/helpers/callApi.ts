import axios from "axios";

const callApi = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor: برای اضافه کردن JWT یا هدرهای خاص
  axiosInstance.interceptors.request.use(
    (config) => {
      // مثال: اگر توکن ذخیره شده باشه
      const token = localStorage.getItem("shopy-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  // Response interceptor: مدیریت خطا و پاسخ
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      // مثال: مدیریت خطای 401
      if (err.response?.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        window.location.href = "/auth/login";
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default callApi;