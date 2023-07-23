import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../helpers/LocalStorage";
import { IUser } from "../types";

interface IState {
  profile?: IUser | null;
  accessToken?: string | null;
}

const initialState: IState = {
  profile: undefined,
  accessToken: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken(state, action) {
      state.accessToken = action.payload;
      LocalStorage.setAccessToken(action.payload);
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logOut() {
      LocalStorage.clear();
      return initialState;
    },
  },
});

export const { saveToken, logOut, setProfile } = authSlice.actions;
export default authSlice.reducer;
