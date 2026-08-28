import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

const todos = (state: RootState) => state.dashboard.todos;
const currentIdUser = (state: RootState) => state.auth.user?.id;

export const selectRecentTodos = createSelector(
  [todos, currentIdUser],
  (todosUser, currentIdUser) => {
    const currentTodosUser = todosUser
      .filter((value) => value.userId === currentIdUser && !value.completed)
      .slice(0, 5);
    return currentTodosUser;
  },
);

export default selectRecentTodos;
