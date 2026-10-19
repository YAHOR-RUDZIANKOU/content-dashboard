import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types/user";
import type { RootState } from "../index";

type initialType = {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  usersMap: Record<number, string>;
  searchStr: string;
};

const initialState: initialType = {
  items: [],
  status: "idle",
  error: null,
  usersMap: {},
  searchStr: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeSearchStr: (state, action) => {
      state.searchStr = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersThunk.pending, (state) => {
        console.log("загрузка загрузка загрузка");
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

export const { changeSearchStr } = userSlice.actions;

export default userSlice.reducer;

export const usersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const usersData = await axios<User[]>(
        "https://jsonplaceholder.typicode.com/users",
      );
      return usersData.data;
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Неизвестная ошибка";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      if (state.users.items.length > 0) {
        return false;
      }
    },
  },
);
