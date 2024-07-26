// Make a request for a user with a given ID
import axiosInstance from './api'

export const PUBLIC_DATA_SERVICES = {
    getTags: async () => {
      return await axiosInstance.get('tags')
    },
  }