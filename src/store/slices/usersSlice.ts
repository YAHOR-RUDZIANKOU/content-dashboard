import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types/user";
import type { RootState } from "../index";

type FetchUserArgs = {
  id: string | undefined;
};

type initialType = {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  usersMap: Record<number, string>;
  searchStr: string;
  currentSort: "asc" | "desc";

  currentUserStatus: "idle" | "loading" | "succeeded" | "failed";
  currentUserError: string | null;
  currentUser: User | null;
};

const initialState: initialType = {
  items: [],
  status: "idle",
  error: null,
  usersMap: {},
  searchStr: "",
  currentSort: "asc",

  currentUserStatus: "idle",
  currentUserError: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeSearchStr: (state, action) => {
      state.searchStr = action.payload;
    },
    toggleCurrentSort: (state) => {
      state.currentSort = state.currentSort === "asc" ? "desc" : "asc";
    },
  },
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
      })

      .addCase(currentUsersThunk.pending, (state) => {
        state.currentUserStatus = "loading";
        state.currentUserError = null;
      })
      .addCase(currentUsersThunk.fulfilled, (state, action) => {
        state.currentUserStatus = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(currentUsersThunk.rejected, (state, action) => {
        state.currentUserStatus = "failed";
        state.currentUserError = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { changeSearchStr, toggleCurrentSort } = userSlice.actions;

export default userSlice.reducer;

export const usersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      await new Promise<void>((res) => setTimeout(() => res(), 1000));
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

export const currentUsersThunk = createAsyncThunk<
  User,
  FetchUserArgs,
  { rejectValue: string }
>("currentUsers/fetchUsers", async ({ id }, thunkAPI) => {
  try {
    await new Promise<void>((res) => setTimeout(() => res(), 1000));
    const usersData = await axios(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return usersData.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
