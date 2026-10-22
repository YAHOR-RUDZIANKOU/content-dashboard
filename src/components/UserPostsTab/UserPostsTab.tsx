import { useAppSelector } from "../../store";
import classes from "./UserPostsTab.module.css";
import { memo } from "react";
import pluralize from "../../utils/pluralize";
import { Link } from "react-router-dom";

const UserPostsTab = () => {
  const userPostItems = useAppSelector((state) => state.post.userPostItems);
  const commentsMap = useAppSelector((state) => state.comments.commentsMap);
  return (
    <ul className={classes.posTab__items}>
      {userPostItems.map((value) => {
        return (
          <li key={value.id} className={classes.posTab__item}>
            <Link to={`/posts/${value.id}`} className={classes.title}>
              {value.title}
            </Link>
            <div className={classes.comment}>
              {pluralize(commentsMap[value.id], [
                "комментарий",
                "комментария",
                "комментариев",
              ])}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(UserPostsTab);
