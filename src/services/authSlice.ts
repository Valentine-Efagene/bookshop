import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../helpers/LocalStorage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    saveToken(state, action) {
      state.accessToken = action.payload;
      LocalStorage.setAccessToken(action.payload);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logOut(state) {
      state.accessToken = null;
      LocalStorage.clear();
    },
  },
});

export const { saveToken, logOut } = authSlice.actions;
export default authSlice.reducer;
