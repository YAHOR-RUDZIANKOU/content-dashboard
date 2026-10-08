import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import dashboardReducer from "./slices/dashboardSlice";
import postReducer from "./slices/postsSlice";
import usersReducer from "./slices/usersSlice";
import getPostIdReducer from "./slices/getPostByIdSlice";
import todosReducer from "./slices/todosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    post: postReducer,
    users: usersReducer,
    postId: getPostIdReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
