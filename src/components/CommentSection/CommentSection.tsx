import classes from "./CommentSection.module.css";
import type { Comments } from "../../types/dashboard";
import { memo } from "react";

type CommentSectionProps = {
  comments: Comments[] | null;
};

const CommentSection = ({ comments }: CommentSectionProps) => {
  return (
    <>
      {comments?.slice(-2).map((comment) => (
        <div key={comment.id} className={classes.comment__wrapper}>
          <div className={classes.comments__header}>
            <div className={classes.comment__icon}>
              {comment.email[0].toLocaleUpperCase()}
            </div>
            <div className={classes.comment__email}>{comment.email}</div>
            <div className={classes.comment__name}>{comment.name}</div>
          </div>
          <div className={classes.comment__body}>{comment.body}</div>
        </div>
      ))}
    </>
  );
};

export default memo(CommentSection);
