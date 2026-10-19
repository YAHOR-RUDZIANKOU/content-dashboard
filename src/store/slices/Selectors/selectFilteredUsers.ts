import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

const users = (state: RootState) => state.users.items;
const searchInput = (state: RootState) => state.users.searchStr;

const searchUser = createSelector(
  [users, searchInput],
  (usersRez, searchInputRez) => {
    const query = searchInputRez.toLowerCase().trim();
    if (searchInputRez === "") {
      return usersRez;
    }
    return usersRez.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  },
);

export default searchUser;
