import classes from "./PostDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import {
  postIdThunk,
  clearPostDetail,
} from "../../store/slices/getPostByIdSlice";
import DetailsPosts from "../detailsPost/DetailsPost";
import DeletePostModal from "../DeletePostModal/DeletePostModal";
import { useNavigate } from "react-router-dom";
import { commentsIdThunk } from "../../store/slices/getPostByIdSlice";
import DetailsComments from "../DetailsComments/DetailsComments";

const PostDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const statusPost = useAppSelector((state) => state.postId.statusPost);

  const serverPost = useAppSelector((state) => state.postId.detailsPost);
  const staticPost = useAppSelector((state) =>
    state.post.items.find((post) => post.id === Number(id)),
  );

  const detailsPost = serverPost ?? staticPost ?? null;
  const currentId = useAppSelector((state) => state.auth.user?.id);
  const [deletePost, setDeletePost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(postIdThunk({ id }));

    return () => {
      dispatch(clearPostDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (statusPost === "succeeded") {
      dispatch(commentsIdThunk({ id }));
    }
  }, [dispatch, id, statusPost]);

  return (
    <div className={classes.post__wrapper}>
      <header>
        <div className={classes.header__title}>
          <span className={classes.header__active}>Посты</span> / Пост #
          {id}{" "}
        </div>
      </header>
      <main className={classes.post__main}>
        <div className={classes.context__wrapper}>
          <DetailsPosts
            post={detailsPost}
            btnFlag={currentId === detailsPost?.userId}
            setDeletePost={setDeletePost}
          />
          <DetailsComments />
        </div>
        <div className={classes.auth__wrapper}></div>
      </main>

      {deletePost && (
        <DeletePostModal
          selectedPost={detailsPost}
          setDeletePost={setDeletePost}
          onSuccessDelete={() => navigate("/posts")}
        />
      )}
    </div>
  );
};

export default PostDetailsPage;
