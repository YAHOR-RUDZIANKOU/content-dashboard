import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

const allTodos = (state: RootState) => state.todos.todosArr;
const currentFilter = (state: RootState) => state.todos.statusFilter;

export const todoSelectors = createSelector([allTodos,currentFilter], (allTodosRes,currentFilterRes ) => {
    if(currentFilterRes==='all'){
        return allTodosRes;
    }else if(currentFilterRes==='active'){
        return allTodosRes.filter((todo)=>!todo.completed)
    }else{
        return allTodosRes.filter((todo)=>todo.completed)
    }
});

export default todoSelectors;
