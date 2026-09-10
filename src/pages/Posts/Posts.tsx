import classes from "./Posts.module.css";
import Button from "../../components/UI/Button/Button";
import { postThunk } from "../../store/slices/postsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { usersThunk } from "../../store/slices/usersSlice";
import PostList from "../../components/PostList/PostList";
import PostsPagination from "../../components/PostsPagination/PostsPagination";
import useDebounce from "../../hooks/useDebounce";
import PostFiltersPanel from "../../components/PostFiltersPanel/PostFiltersPanel";
import HeaderPosts from "../../components/headerPosts/HeaderPosts";

const Posts = () => {
  const dispatch = useAppDispatch();
  const statusUsers = useAppSelector((state) => state.users.status);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const totalCount = useAppSelector((state) => state.post.totalCount);
  const items = useAppSelector((state) => state.post.items);
  const limit = 6;

  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState<number | "">(userId ?? "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState<number>(1);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (statusUsers === "idle") {
      dispatch(usersThunk());
    }
  }, [dispatch, statusUsers]);

  useEffect(() => {
    if (search !== debouncedSearch) return;
    dispatch(
      postThunk({
        page,
        limit,
        userId: authorId || undefined,
        debouncedSearch,
      }),
    );
  }, [dispatch, page, limit, authorId, debouncedSearch, search]);

  return (
    <div className={classes.posts__wrapper}>
      <HeaderPosts totalCount={totalCount} />
      <main className={classes.post__main}>
        <PostFiltersPanel
          search={search}
          setSearch={setSearch}
          authorId={authorId}
          setAuthorId={setAuthorId}
          setPage={setPage}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
        <PostList items={items} viewMode={viewMode} currentId={userId} />
        <PostsPagination
          page={page}
          totalCount={totalCount}
          limit={limit}
          setPage={setPage}
        />
      </main>
    </div>
  );
};

export default Posts;
