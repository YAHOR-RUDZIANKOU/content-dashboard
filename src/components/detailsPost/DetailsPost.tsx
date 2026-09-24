import classes from "./detailsPost.module.css";
import type { Post } from "../../types/dashboard";
import Button from "../UI/Button/Button";

type DetailsPosts = {
  post: Post | null;
  btnFlag: boolean;
  setDeletePost: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailsPosts = ({ post, btnFlag, setDeletePost }: DetailsPosts) => {
  return (
    <div className={classes.card__wrapper}>
      <div className={classes.cards__title}>{post?.title}</div>
      <div className={classes.cards__body}>{post?.body}</div>
      {btnFlag && (
        <div className={classes.btn__wrapper}>
          <Button>Редактировать</Button>
          <Button onClick={() => setDeletePost(true)} variant="danger">
            Удалить
          </Button>
        </div>
      )}
    </div>
  );
};

export default DetailsPosts;
