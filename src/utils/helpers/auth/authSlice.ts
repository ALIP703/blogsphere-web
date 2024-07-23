import STORAGE_SERVICES from "@/utils/services/api/storageServices";
import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

export interface userDataProps {
  username: string ;
  access: string ;
  refresh: string ;
  email: string ;
  userId: string ;
  image:string;
}


const user: userDataProps = STORAGE_SERVICES.getUser();

const authSlice = createSlice({
  name: "auth",
  initialState: { user },
  reducers: {
    setCredentials: (state, action) => {
      const { username, access, email, refresh, userId,image } = action.payload;
      state.user.username = username;
      state.user.access = access;
      state.user.email = email;
      state.user.refresh = refresh;
      state.user.userId = userId;
      state.user.image = image;
      STORAGE_SERVICES.setUser({ access, email, refresh, userId, username,image });
    },
    logOut: (state) => {
      state.user.username = "";
      state.user.access = "";
      state.user.email = "";
      state.user.refresh = "";
      state.user.userId = "";
      state.user.image = "";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = (state: { auth: userDataProps }) =>
//   state.auth.username;

// export const selectCurrentToken = (state: { auth: userDataProps }) =>
//   state.auth.access;

// export const selectCurrentRefreshToken = (state: { auth: userDataProps }) =>
//   state.auth.refresh;

// export const selectCurrentEmail = (state: { auth: userDataProps }) =>
//   state.auth.email;
