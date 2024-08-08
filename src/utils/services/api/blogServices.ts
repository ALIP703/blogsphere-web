import axiosInstance from './api'

export const BLOG_SERVICES = {
    getBlogs: async () => {
      return await axiosInstance.get('?limit=6')
    },
    getBlogComments: async (id:string) => {
      return await axiosInstance.get(`blog/${id}/comments`)
    },
    getReplyComments: async (id:string) => {
      return await axiosInstance.get(`comment/${id}/reply`)
    },
    getABlog: async (id:string) => {
      return await axiosInstance.get(`blog/${id}`)
    },
    likeABlog: async (id:string) => {
      return await axiosInstance.get(`blog/${id}/like`)
    },
    likeAComment: async (id:string) => {
      return await axiosInstance.get(`comment/${id}/like`)
    },
    saveABlog: async (id:string) => {
      return await axiosInstance.get(`blog/${id}/save`)
    },
    uploadBlogFile: async (data:FormData) => {
      return await axiosInstance.post('media/upload',data)
    },
    createBlog:async(data:FormData)=>{
      return await axiosInstance.post('create-blog',data)
    },
    createComment:async(id:string,data:FormData)=>{
      return await axiosInstance.post(`blog/${id}/create-comment`,data)
    }
  }