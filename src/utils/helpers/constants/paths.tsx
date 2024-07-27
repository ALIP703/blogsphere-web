import { PageRoutes } from "./interfaces"

const PAGES:PageRoutes={
    DEFAULT:'/',
    BLOG_PAGE:'/blog/:id',
    LOGIN:'/login',
    SIGN_UP:"/register",
    CREATE_BLOG_PAGE:'/create-blog',
}
// eslint-disable-next-line react-refresh/only-export-components
export default PAGES