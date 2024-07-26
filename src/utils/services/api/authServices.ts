import axiosInstance from './api';
import { RegistrationUserData } from '@/utils/helpers/constants/interfaces';

export const AUTH_SERVICES = {
  login: async (username:string, password:string) => {
    return await axiosInstance.post('user/token', { username, password })
  },
  registration: async (userData:RegistrationUserData) => {
    return await axiosInstance.post('user/sign-up', userData)
  },
};
