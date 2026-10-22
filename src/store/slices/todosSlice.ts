import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Todo } from "../../types/dashboard";

type userTodosArg = {
  userId: string | undefined;
};

type updateTodoArg = {
  id: number;
  completed: boolean;
};

type AxiosTodosArgs = {
  authorId: number | undefined;
};

type PostError = {
  message: string;
  status?: number;
};

type initialStateType = {
  todosArr: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: PostError | null;
  statusFilter: "all" | "active" | "completed";
  newTodo: Todo[];
  modifiedTodoIds: number[];

  statusUpdate: "idle" | "loading" | "succeeded" | "failed";
  errorUpdate: PostError | null;

  userTabTodosStatus: "idle" | "loading" | "succeeded" | "failed";
  userTabTodosError: PostError | null;
  userTodoItems: Todo[];
};

const initialState: initialStateType = {
  todosArr: [],
  status: "idle",
  error: null,
  statusFilter: "all",
  newTodo: [],
  modifiedTodoIds: [],

  statusUpdate: "idle",
  errorUpdate: null,

  userTabTodosStatus: "idle",
  userTabTodosError: null,
  userTodoItems: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    toggleTodo: (state, action) => {
      const changeTodos = state.todosArr.find(
        (todos) => todos.id === action.payload,
      );
      if (changeTodos) {
        changeTodos.completed = !changeTodos.completed;
      }
      const indexId = state.modifiedTodoIds.indexOf(action.payload);
      if (indexId === -1) {
        state.modifiedTodoIds.push(action.payload);
      } else {
        state.modifiedTodoIds.splice(indexId, 1);
      }
    },
    addNewPost: (state, action) => {
      state.newTodo.unshift(action.payload);
      state.todosArr.unshift(action.payload);
    },
    resetTodosTab: (state) => {
      state.userTabTodosStatus = "idle";
      state.userTabTodosError = null;
      state.userTodoItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todosThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(todosThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const allTodos = [...state.newTodo, ...action.payload];
        const changeAllTodos = allTodos.map((todo) => {
          if (state.modifiedTodoIds.includes(todo.id)) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
        state.todosArr = changeAllTodos;
      })
      .addCase(todosThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      })

      .addCase(updateTodo.pending, (state) => {
        state.statusUpdate = "loading";
        state.errorUpdate = null;
      })
      .addCase(updateTodo.fulfilled, (state) => {
        state.statusUpdate = "succeeded";
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.errorUpdate = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      })

      .addCase(fetchUserTodosThunk.pending, (state) => {
        state.userTabTodosStatus = "loading";
        state.userTabTodosError = null;
      })
      .addCase(fetchUserTodosThunk.fulfilled, (state, action) => {
        state.userTabTodosStatus = "succeeded";
        state.userTodoItems = action.payload;
      })
      .addCase(fetchUserTodosThunk.rejected, (state, action) => {
        state.userTabTodosStatus = "failed";
        state.userTabTodosError = action.payload ?? {
          message: "Неизвестная ошибка",
        };
      });
  },
});

export const { changeStatusFilter, toggleTodo, addNewPost, resetTodosTab } =
  todoSlice.actions;

export default todoSlice.reducer;

export const todosThunk = createAsyncThunk<
  Todo[],
  AxiosTodosArgs,
  { rejectValue: PostError }
>("todos/axiosTodos", async ({ authorId }, thunkAPI) => {
  try {
    await new Promise<void>((res) => setTimeout(() => res(), 1000));

    const todosResponse = await axios(
      `https://jsonplaceholder.typicode.com/todos`,
      {
        params: {
          userId: authorId,
        },
      },
    );
    return todosResponse.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});

export const fetchUserTodosThunk = createAsyncThunk<
  Todo[],
  userTodosArg,
  { rejectValue: PostError }
>("albums/fetchUserTodos", async ({ userId }, thunkAPI) => {
  try {
    await new Promise<void>((res) => setTimeout(() => res(), 1000));
    const albumsData = await axios(
      "https://jsonplaceholder.typicode.com/todos",
      {
        params: {
          userId: userId,
        },
      },
    );
    return albumsData.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});

export const updateTodo = createAsyncThunk<
  Todo,
  updateTodoArg,
  { rejectValue: PostError }
>("updateTodo/axiosUpdateTodo", async ({ id, completed }, thunkAPI) => {
  try {
    await new Promise<void>((res) => setTimeout(() => res(), 1000));
    if (id > 150) {
      return true;
    }
    const updateTodo = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        completed: !completed,
      },
    );
    return updateTodo.data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
    return thunkAPI.rejectWithValue({
      message: errorMessage,
      status: axios.isAxiosError(e) ? e.response?.status : undefined,
    });
  }
});
