import axiosInstance from './api';

export const AUTH_SERVICES = {
  login: async (username:string, password:string) => {
    return await axiosInstance.post('user/token', { username, password })
  },
};
