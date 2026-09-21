import classes from "./Posts.module.css";
import { postThunk } from "../../store/slices/postsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { usersThunk } from "../../store/slices/usersSlice";
import PostList from "../../components/PostList/PostList";
import PostsPagination from "../../components/PostsPagination/PostsPagination";
import useDebounce from "../../hooks/useDebounce";
import PostFiltersPanel from "../../components/PostFiltersPanel/PostFiltersPanel";
import HeaderPosts from "../../components/headerPosts/HeaderPosts";
import type { Post } from "../../types/dashboard";
import DeletePostModal from "../../components/DeletePostModal/DeletePostModal";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorState from "../../components/ErrorState/ErrorState";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const dispatch = useAppDispatch();
  const statusUsers = useAppSelector((state) => state.users.status);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const totalCount = useAppSelector((state) => state.post.totalCount);
  const items = useAppSelector((state) => state.post.items);
  const limit = 6;
  const error = useAppSelector((state) => state.post.error);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState<number | "">(userId ?? "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [allCountDelete, setAllCountDelete] = useState<number>(0);
  const [isMyPosts, setIsMyPosts] = useState(true);

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
    <>
      {error ? (
        <ErrorState
          title="Не смогли загрузить посты"
          subtitle={`Сервер ответил ${error.status}. Ничего страшного - попробуем еще раз`}
          btnText="На дашборд"
          onBack={() => navigate("/")}
          onRetry={() =>
            dispatch(
              postThunk({
                page,
                limit,
                userId: authorId || undefined,
                debouncedSearch,
              }),
            )
          }
        />
      ) : (
        <div className={classes.posts__wrapper}>
          <HeaderPosts
            totalCount={totalCount}
            allCountDelete={allCountDelete}
          />
          <main className={classes.post__main}>
            <PostFiltersPanel
              search={search}
              setSearch={setSearch}
              authorId={authorId}
              setAuthorId={setAuthorId}
              setPage={setPage}
              setViewMode={setViewMode}
              viewMode={viewMode}
              isMyPosts={isMyPosts}
              setIsMyPosts={setIsMyPosts}
            />
            {items.length > 0 || search.length === 0 ? (
              <>
                <PostList
                  items={items}
                  viewMode={viewMode}
                  currentId={userId}
                  setSelectedPost={setSelectedPost}
                  limit={limit}
                />

                <PostsPagination
                  items={items}
                  page={page}
                  totalCount={totalCount}
                  limit={limit}
                  setPage={setPage}
                  allCountDelete={allCountDelete}
                  setAllCountDelete={setAllCountDelete}
                />
              </>
            ) : (
              <EmptyState
                search={search}
                setSearch={setSearch}
                setAuthorId={setAuthorId}
                setIsMyPosts={setIsMyPosts}
              />
            )}
          </main>
          {selectedPost && (
            <DeletePostModal
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
              setAllCountDelete={setAllCountDelete}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Posts;
