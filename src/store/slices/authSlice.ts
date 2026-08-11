import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import axios from "axios";

type checkEmail = {
  description: string;
};

type initialType = {
  isAuth: boolean;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: initialType = {
  isAuth: false,
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.status = "succeeded";
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ description }: checkEmail, thunkAPI) => {
    try {
      await new Promise<void>((res) => setTimeout(() => res(), 1500));
      const data = (
        await axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
      ).data;
      const foundUser = data.find((value) => value.email === description);
      return foundUser ? foundUser : thunkAPI.rejectWithValue("Неверный Email");
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Неизвестная ошибка";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
