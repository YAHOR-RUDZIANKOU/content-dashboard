import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

const users = (state: RootState) => state.users.items;

export const usersSelectors = createSelector([users], (usersRes) => {
  return usersRes.map((value) => {
    return {
      id: value.id,
      name: value.name,
    };
  });
});

export default usersSelectors;
