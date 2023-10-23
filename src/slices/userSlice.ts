import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  username: "";
  email: "";
}

// Define the initial state using that type
const initialState: UserState = {
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state = { ...payload };
      return state;
    },
    removeUser: (state) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
