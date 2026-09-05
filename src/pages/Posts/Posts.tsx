import classes from "./Posts.module.css";
import Button from "../../components/UI/Button/Button";
import { postThunk } from "../../store/slices/postsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { usersThunk } from "../../store/slices/usersSlice";
import AuthorSelect from "../../components/authorSelect/AuthorSelect";
import { Grid2X2, Rows3 } from "lucide-react";
import PostList from "../../components/PostList/PostList";

const Posts = () => {
  const dispatch = useAppDispatch();
  const statusUsers = useAppSelector((state) => state.users.status);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const totalCount = useAppSelector((state) => state.post.totalCount);
  const items = useAppSelector((state) => state.post.items);
  const limit = 6;
  const nameAuth = useAppSelector((state) => state.auth.user?.name);
  const allAuthors = useAppSelector((state) => state.users.items);

  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState<number | "">(userId ?? "");
  const [isMyPosts, setIsMyPosts] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState<number>(1);

  const handleMyPostsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMyPosts(e.target.checked);
    if (e.target.checked) {
      setAuthorId(userId ?? "");
    } else {
      setAuthorId("");
    }
  };

  useEffect(() => {
    if (statusUsers === "idle") {
      dispatch(usersThunk());
    }
  }, [dispatch, statusUsers]);

  useEffect(() => {
    dispatch(postThunk({ page, limit, userId: authorId || undefined }));
  }, [dispatch, page, limit, authorId]);

  return (
    <div className={classes.posts__wrapper}>
      <header className={classes.post__header}>
        <div className={classes.post__title}>
          <div className={classes.post__text}>Посты</div>
          <div className={classes.post__count}>{totalCount} всего</div>
        </div>
        <Button variant="primary" size="md">
          + Создать пост
        </Button>
      </header>
      <main className={classes.post__main}>
        <div className={classes.post__filters}>
          <div className={classes.input__search}>
            <div className={classes.input__icon}></div>
            <input
              placeholder="Поиск по заголовку и телу поста"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={classes.post__input}
            />
          </div>
          <AuthorSelect
            authorId={authorId}
            setAuthorId={setAuthorId}
            setIsMyPosts={setIsMyPosts}
          />
          <label className={classes.label__toggle}>
            <input
              type="checkbox"
              checked={isMyPosts}
              onChange={(e) => handleMyPostsToggle(e)}
              className={classes.label__input}
            />
            <div className={classes.label__slider}></div>
            <span className={classes.label__text}>Только мои</span>
          </label>
          <div className={classes.post__viewToggle}>
            <button
              onClick={() => setViewMode("grid")}
              type="button"
              className={`${classes.btn__general} ${viewMode === "grid" ? classes.grid__active : ""} `}
            >
              <Grid2X2 size={25} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              type="button"
              className={`${classes.btn__general} ${viewMode === "list" ? classes.list__active : ""} `}
            >
              <Rows3 size={25} />
            </button>
          </div>
        </div>
        <PostList
          items={items}
          viewMode={viewMode}
          currentId={userId}
          allAuthors={allAuthors}
        />
        <div className={classes.post__pagination}></div>
      </main>
    </div>
  );
};

export default Posts;
