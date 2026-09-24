import type { Post } from "../../types/dashboard";
import PostCard from "../PostCard/PostCard";
import classes from "./PostList.module.css";
import { memo } from "react";
import { useAppSelector, useAppDispatch } from "../../store/index";
import PostListSkeleton from "./PostListSkeleton";
import Button from "../UI/Button/Button";
import { updateDeletedPostIds, postThunk } from "../../store/slices/postsSlice";

type PostListProps = {
  items: Post[];
  viewMode: "grid" | "list";
  currentId: number | undefined;
  setSelectedPost: (value: Post) => void;
  limit: number;
  setPage: (value: number) => void;
};

const PostList = ({
  items,
  viewMode,
  currentId,
  setSelectedPost,
  limit,
  setPage,
}: PostListProps) => {
  const allAuthors = useAppSelector((state) => state.users.items);
  const status = useAppSelector((state) => state.post.status);
  const dispatch = useAppDispatch();

  const backPosts = () => {
    dispatch(updateDeletedPostIds());
    setPage(1);
    dispatch(
      postThunk({
        page: 1,
        limit: 6,
        userId: currentId || undefined,
        debouncedSearch: "",
      }),
    );
  };
  return (
    <>
      {items.length === 0 && status !== "loading" && (
        <div className={classes.empty__wrapper}>
          <div className={classes.empty__inner}>
            <div className={classes.empty__list}>
              {" "}
              На данной странице больше нет постов
            </div>
            <Button className={classes.btn__change} onClick={() => backPosts()}>
              Показать обратно все посты
            </Button>
          </div>
        </div>
      )}
      <div
        className={
          viewMode === "grid" ? classes.posts__grid : classes.post__list
        }
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
    </>
  );
};

export default memo(PostList);
