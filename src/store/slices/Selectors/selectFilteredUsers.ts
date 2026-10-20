import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../../index";

const users = (state: RootState) => state.users.items;
const searchInput = (state: RootState) => state.users.searchStr;
const currentSort = (state: RootState) => state.users.currentSort;

const searchUser = createSelector(
  [users, searchInput, currentSort],
  (usersRez, searchInputRez, currentSort) => {
    const query = searchInputRez.toLowerCase().trim();
    const filterResult = usersRez.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
    return currentSort === "asc"
      ? filterResult.sort((a, b) => a.name.localeCompare(b.name))
      : filterResult.sort((a, b) => b.name.localeCompare(a.name));
  },
);

export default searchUser;
