import classes from "./headerPost.module.css";
import { useAppSelector } from "../../store/index";
import { Link } from "react-router-dom";

type HeaderPostsProps = {
  totalCount: number;
};
const HeaderPosts = ({ totalCount }: HeaderPostsProps) => {
  const deleteIdPostCount = useAppSelector(
    (state) => state.post.deletedPostIds.length,
  );

  return (
    <header className={classes.post__header}>
      <div className={classes.post__title}>
        <div className={classes.post__text}>Посты</div>
        <div
          className={classes.post__count}
        >{`${totalCount - deleteIdPostCount} всего`}</div>
      </div>
      <Link className={classes.btn__change} to={'/posts/new'} >
        + Создать пост
      </Link>
    </header>
  );
};

export default HeaderPosts;
