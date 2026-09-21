import type { Post } from "../../types/dashboard";
import PostCard from "../PostCard/PostCard";
import classes from "./PostList.module.css";
import { memo } from "react";
import { useAppSelector } from "../../store/index";
import PostListSkeleton from "./PostListSkeleton";

type PostListProps = {
  items: Post[];
  viewMode: "grid" | "list";
  currentId: number | undefined;
  setSelectedPost: (value: Post) => void;
  limit: number;
};

const PostList = ({
  items,
  viewMode,
  currentId,
  setSelectedPost,
  limit,
}: PostListProps) => {
  const allAuthors = useAppSelector((state) => state.users.items);
  const status = useAppSelector((state) => state.post.status);
  return (
    <div
      className={viewMode === "grid" ? classes.posts__grid : classes.post__list}
    >
      {status === "succeeded" && (
        <>
          {items.map((value) => {
            const currentAuthor = allAuthors.find(
              (item) => item.id === value.userId,
            );
            const btnFlag = currentId === value.userId;
            return (
              <PostCard
                viewMode={viewMode}
                key={value.id}
                post={value}
                btnFlag={btnFlag}
                nameAuth={currentAuthor?.name ?? "Неизвестный автор"}
                setSelectedPost={setSelectedPost}
              />
            );
          })}
        </>
      )}
      {status === "loading" && <PostListSkeleton limit={limit} />}
    </div>
  );
};

export default memo(PostList);
