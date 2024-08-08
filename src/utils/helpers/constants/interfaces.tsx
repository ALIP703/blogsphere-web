export interface PageRoutes {
  DEFAULT: string;
  BLOG_PAGE: string;
  CREATE_BLOG_PAGE: string;
  LOGIN: string;
  SIGN_UP: string;
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
export interface Comment {
  id: string | number;
  message: string;
  post: number;
  author: {
    id: number;
    username: string;
    profile: {
      image: string;
      bio: string;
    };
  };
  parent: number | null;
  created_at: string;
  updated_at: string;
  liked: boolean;
  likesCount: number;
  commentCount: number;
}

export type Blogs = Blog[];

export type Comments = Comment[];

export interface HomeCardComponentInterface {
  results: Blogs;
  count: number;
  next: string;
  previous: string;
}

export interface CommentsType {
  results: Comments;
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
  content: string; // contains HTML as a string
  tags: number[]; // array of numbers
  thumbnail: File | null;
  // type: string; // new property
};

export interface BlogContentBlock {
  id: string;
  type: "heading" | "paragraph" | "image";
  props: {
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: string;
    level?: number;
    name?: string;
    url?: string;
    caption?: string;
    showPreview?: boolean;
    previewWidth?: number;
  };
  content: Array<{ type: string; text: string; styles?: unknown }>;
  children: Array<unknown>;
}
export interface BlogType {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  thumbnail: string;
  created_at: string;
  author: {
    id: number;
    username: string;
  };
  tags: [
    {
      id: number;
      value: string;
      label: string;
    }
  ];
  liked: boolean;
  saved: boolean;
  likesCount: number;
  commentCount: number;
}
