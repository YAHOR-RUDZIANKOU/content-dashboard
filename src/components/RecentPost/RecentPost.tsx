import classes from "./recentPost.module.css";
import selectRecentPosts from "../../store/slices/Selectors/selectRecentPosts";
import { useAppSelector } from "../../store/index";
import { Link } from "react-router-dom";
import pluralize from "../../utils/pluralize";

const RecentPost = () => {
  const recentPosts = useAppSelector(selectRecentPosts);
  return (
    <div className={classes.posts__wrapper}>
      <div className={classes.posts__header}>
        <div className={classes.posts__text}>Мои последние посты</div>
        <Link className={classes.post__btn} to="/posts">
          {" "}
          Все посты ⟶
        </Link>
      </div>
      {recentPosts.map((value) => {
        return (
          <div key={value.id} className={classes.post__item}>
            <div className={classes.post__title}>{value.title}</div>
            <div
              className={classes.post__subtitle}
            >{`Пост #${value.id} • ${pluralize(value.countComments, ["комментарий", "комментария", "комментариев"])}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentPost;
