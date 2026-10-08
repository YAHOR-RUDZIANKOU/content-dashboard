import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

const allTodos = (state: RootState) => state.todos.todosArr;

export const selectProgress = createSelector([allTodos], (allTodosRes) => {
  const completedTodo = allTodosRes.filter((todo) => todo.completed);
  return {
    allLength: allTodosRes.length,
    completedLength: completedTodo.length,
  };
});

export default selectProgress;
