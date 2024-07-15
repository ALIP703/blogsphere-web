import * as React from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import HomePage from "@/pages/home/HomePage";
import BlogPage from "@/pages/blog/BlogPage";
import CreateBlog from "@/pages/blog/CreateBlog";
import PAGES from "@/utils/helpers/constants/paths";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={PAGES.DEFAULT} element={<HomePage />} />
        <Route path={PAGES.BLOG_PAGE} element={<BlogPage />} />
        <Route path={PAGES.CREATE_BLOG_PAGE} element={<CreateBlog />} />
      </Routes>
    </>
  );
};

export default App;
