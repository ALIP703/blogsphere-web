export interface PageRoutes {
    DEFAULT: string
    BLOG_PAGE:string
    CREATE_BLOG_PAGE:string
    LOGIN:string
    SIGN_UP:string
}
export interface Blog {
    id: string | number;
    title: string;
    subtitle: string | null;
    content: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    author: number;
    tags: number[];
  }
  
  export type Blogs = Blog[];

  export interface HomeCardComponentInterface {
    results: Blogs;
    count: number;
    next: string;
    previous: string;
  }

  
export interface RegistrationUserData {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}



// Define MultiSelect type
export interface OptionType {
  id: number;
  value: string;
  label: string;
}
export type UserData = {
  title: string;
  subtitle: string;
  content: string; // contains HTML as a string
  tags: number[]; // array of numbers
  thumbnail: File | null;
  // type: string; // new property
};
