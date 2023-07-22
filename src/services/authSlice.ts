import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    saveToken(state, action) {
      state.accessToken = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logOut(state, _) {
      state.accessToken = null;
    },
  },
});

export const { saveToken, logOut } = authSlice.actions;
export default authSlice.reducer;
