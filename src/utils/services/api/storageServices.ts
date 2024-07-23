import { userDataProps } from "@/utils/helpers/auth/authSlice";

const STORAGE_SERVICES = {
  getAuthToken: async () => {
    return localStorage.getItem("token");
  },
  setUser: (user: {
    access: string;
    refresh: string;
    username: string;
    email: string;
    userId: string;
    image: string;
  }) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: () => {
    const localUser: string | null = localStorage.getItem("user");
    let user: userDataProps = {
      access: "",
      refresh: "",
      username: "",
      email: "",
      userId: "",
      image: "",
    };
    if (localUser !== null) {
      user = JSON.parse(localUser);
    }
    return user;
  },
};

export default STORAGE_SERVICES;
