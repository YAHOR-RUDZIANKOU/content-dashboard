import classes from "./PostDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { postIdThunk } from "../../store/slices/getPostByIdSlice";

const PostDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.postId.statusPost);

  useEffect(() => {
    if (status === "idle") {
      dispatch(postIdThunk({ id }));
    }
  }, [dispatch, id, status]);

  return (
    <div className={classes.post__wrapper}>
      <header>
        <div className={classes.header__title}>
          <span className={classes.header__active}>Посты</span> / Пост #
          {id}{" "}
        </div>
      </header>
      <main className={classes.post__main}></main>
    </div>
  );
};

export default PostDetailsPage;
