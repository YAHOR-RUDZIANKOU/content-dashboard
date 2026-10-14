import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types/user";

type initialType = {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  usersMap: Record<number, string>;
};

const initialState: initialType = {
  items: [],
  status: "idle",
  error: null,
  usersMap: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(usersThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        const userCurrent: Record<number, string> = {};
        action.payload.forEach((user) => {
          userCurrent[user.id] = user.name;
        });
        state.usersMap = userCurrent;
      })

      .addCase(usersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export default userSlice.reducer;

export const usersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const usersData = await axios<User[]>(
      "https://jsonplaceholder.typicode.com/users",
    );
    return usersData.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
