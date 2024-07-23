import axios from "axios";
import store from "@/utils/helpers/auth/store"; // Import the store
import { logOut } from "@/utils/helpers/auth/authSlice"; // Import the logOut action
import { useNavigate } from "react-router-dom"; // Import useNavigate
import STORAGE_SERVICES from "./storageServices";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Replace with your API base URL
});

// Add a request interceptor to attach the session ID from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const user = STORAGE_SERVICES.getUser();
    if (user?.access) {
      config.headers.Authorization = `Bearer ${user.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to check if token is being refreshed
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to add subscribers
const subscribeTokenRefresh = (cb: (token: string) => void): void => {
  refreshSubscribers.push(cb);
};
// Function to notify all subscribers
const onRefreshed = (accessToken: string): void => {
  refreshSubscribers.map((cb) => cb(accessToken));
  refreshSubscribers = [];
};

// Add a response interceptor to handle forbidden responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // If refresh is already in progress, add the request to the subscribers list
        return new Promise((resolve) => {
          subscribeTokenRefresh((accessToken) => {
            originalRequest.headers["Authorization"] = "Bearer " + accessToken;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const user = STORAGE_SERVICES.getUser();

      return axiosInstance
        .post("user/token/refresh", { refresh: user.refresh })
        .then((res) => {
          if (res.status === 200) {
            const { access, refresh } = res.data;
            const updatedUser = {
              ...user,
              access,
              refresh,
            };
            STORAGE_SERVICES.setUser(updatedUser);
            axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + access;
            originalRequest.headers["Authorization"] =
              "Bearer " + access;

            // Notify all the subscribers with the new access token
            onRefreshed(access);
            refreshSubscribers = [];

            return axiosInstance(originalRequest);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    if (error.response && error.response.status === 403) {
      // Dispatch logOut action and navigate to login
      store.dispatch(logOut());
      const navigate = useNavigate();
      navigate("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
