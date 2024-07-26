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
import { SnackbarProvider, closeSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Import the close icon

const App: React.FC = () => {
  return (
    <>
      <SnackbarProvider
        maxSnack={3} // Limit the number of snackbars displayed at once
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        action={(key) => (
          <button
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              marginRight: ".5rem",
            }}
            onClick={() => closeSnackbar(key)}
            aria-label="close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      >
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
      </SnackbarProvider>
    </>
  );
};

export default App;
