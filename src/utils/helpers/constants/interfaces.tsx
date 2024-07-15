export interface PageRoutes {
    DEFAULT: string
    BLOG_PAGE:string
    CREATE_BLOG_PAGE:string
    
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