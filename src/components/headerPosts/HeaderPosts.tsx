import classes from "./headerPost.module.css";
import Button from "../UI/Button/Button";
type HeaderPostsProps = {
  totalCount: number;
  allCountDelete: number;
};
const HeaderPosts = ({ totalCount, allCountDelete }: HeaderPostsProps) => {
  return (
    <header className={classes.post__header}>
      <div className={classes.post__title}>
        <div className={classes.post__text}>Посты</div>
        <div className={classes.post__count}>
          {totalCount - allCountDelete} всего
        </div>
      </div>
      <Button variant="primary" size="md">
        + Создать пост
      </Button>
    </header>
  );
};

export default HeaderPosts;
