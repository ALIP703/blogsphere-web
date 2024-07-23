import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import BlogPage from "@/pages/blog/BlogPage";
import CreateBlog from "@/pages/blog/CreateBlog";
import PAGES from "@/utils/helpers/constants/paths";
import LoginPage from "@/pages/login/LoginPage";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import SignUp from "@/pages/signup/SignUp";
import PrivetRoute from "@/utils/helpers/routes/PrivetRoute";
import store from "@/utils/helpers/auth/store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <NavbarComponent title="blogsphere" />
        <Routes>
          <Route path={PAGES.DEFAULT} element={<HomePage />} />
          <Route path={PAGES.LOGIN} element={<LoginPage />} />
          <Route path={PAGES.SIGN_UP} element={<SignUp />} />
          <Route path={PAGES.BLOG_PAGE} element={<BlogPage />} />
          <Route
            path={PAGES.CREATE_BLOG_PAGE}
            element={
              <PrivetRoute>
                <CreateBlog />
              </PrivetRoute>
            }
          />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
