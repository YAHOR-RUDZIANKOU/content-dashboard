import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

type initialType = {
  isAuth: boolean;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: initialType = {
  isAuth: false,
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
