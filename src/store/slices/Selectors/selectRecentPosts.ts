import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../index";

const posts = (state: RootState) => state.dashboard.post;
const currentIdUser = (state: RootState) => state.auth.user?.id;
const comments = (state: RootState) => state.dashboard.comments;

export const selectRecentPosts = createSelector(
  [posts, currentIdUser, comments],
  (usersPost, currentIdUser, userComments) => {
    const currentUserPosts = usersPost
      .filter((value) => value.userId === currentIdUser)
      .slice(0, 5);
    const countIdPosts: Record<number, number> = {};
    currentUserPosts.forEach((value) => {
      countIdPosts[value.id] = 0;
    });

    userComments.forEach((value) => {
      if (countIdPosts[value.postId] !== undefined) {
        countIdPosts[value.postId]++;
      }
    });

    const resultUserPost = currentUserPosts.map((value) => {
      return { ...value, countComments: countIdPosts[value.id] };
    });
    return resultUserPost;
  },
);

export default selectRecentPosts;
