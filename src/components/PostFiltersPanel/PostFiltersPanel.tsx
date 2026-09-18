import { Grid2X2, Rows3 } from "lucide-react";
import classes from "./PostFiltersPanel.module.css";
import AuthorSelect from "../../components/authorSelect/AuthorSelect";
import { useState } from "react";
import { useAppSelector } from "../../store/index";

type PostFiltersPanelProps = {
  search: string;
  setSearch: (value: string) => void;
  authorId: number | "";
  setAuthorId: (value: number | "") => void;
  setPage: (value: number) => void;
  setViewMode: (value: "grid" | "list") => void;
  viewMode: "grid" | "list";
  isMyPosts: boolean;
  setIsMyPosts: (value: boolean) => void;
};

const PostFiltersPanel = ({
  search,
  setSearch,
  authorId,
  setAuthorId,
  setPage,
  setViewMode,
  viewMode,
  isMyPosts,
  setIsMyPosts,
}: PostFiltersPanelProps) => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const handleMyPostsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMyPosts(e.target.checked);
    if (e.target.checked) {
      setAuthorId(userId ?? "");
    } else {
      setAuthorId("");
    }
  };
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  return (
    <div className={classes.post__filters}>
      <div className={classes.input__search}>
        <div className={classes.input__icon}></div>
        <input
          placeholder="Поиск по заголовку и телу поста"
          value={search}
          onChange={(e) => changeInput(e)}
          className={classes.post__input}
        />
      </div>
      <AuthorSelect
        authorId={authorId}
        setAuthorId={setAuthorId}
        setIsMyPosts={setIsMyPosts}
        setPage={setPage}
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
  );
};

export default PostFiltersPanel;
