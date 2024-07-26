import axiosInstance from './api'

export const BLOG_SERVICES = {
    getBlogs: async () => {
      return await axiosInstance.get('?limit=6')
    },
    uploadBlogFile: async (data:FormData) => {
      return await axiosInstance.post('media/upload',data)
    },
    createBlog:async(data:FormData)=>{
      return await axiosInstance.post('create-blog',data)
    }
  }