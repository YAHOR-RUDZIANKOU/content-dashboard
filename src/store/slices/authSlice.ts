import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import axios from "axios";

const savedUser = localStorage.getItem("user");

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
  isAuth: localStorage.getItem("user") ? true : false,
  user: savedUser ? JSON.parse(savedUser) : null,
  status: localStorage.getItem("user") ? "succeeded" : "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user");
    },
  },
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
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
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
      return foundUser
        ? foundUser
        : thunkAPI.rejectWithValue(
            " Пользователь не найден. Попробуйте другой email из списка.",
          );
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Неизвестная ошибка";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
