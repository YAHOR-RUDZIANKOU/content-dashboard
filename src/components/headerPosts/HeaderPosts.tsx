import classes from "./headerPost.module.css";
import Button from "../UI/Button/Button";
import { useAppSelector } from "../../store/index";
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
      <Button variant="primary" size="md">
        + Создать пост
      </Button>
    </header>
  );
};

export default HeaderPosts;
