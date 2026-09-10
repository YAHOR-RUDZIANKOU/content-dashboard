import type { Post } from "../../types/dashboard";
import classes from "./PostCard.module.css";
import Button from "../UI/Button/Button";
import { memo } from "react";

function sliceText(str: string) {
  return str.split(/\s+/).slice(0, 22).join(" ");
}

type PostCardProps = {
  post: Post;
  btnFlag: boolean;
  nameAuth: string | undefined;
  viewMode: "grid" | "list";
};

const PostCard = memo(({ post, btnFlag, nameAuth }: PostCardProps) => {
  return (
    <div className={classes.card__wrapper}>
      <div className={classes.card__title}>{post.title}</div>
      <div className={classes.card__text}>{sliceText(post.body)}</div>
      <div className={classes.card__footer}>
        <div className={classes.auth__name}>{nameAuth}</div>
        {btnFlag && (
          <div className={classes.btn__wrapper}>
            <Button>Изменить</Button>
            <Button variant="danger">Удалить</Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default PostCard;
