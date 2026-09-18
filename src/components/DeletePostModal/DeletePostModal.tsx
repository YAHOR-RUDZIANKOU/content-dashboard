import classes from "./DeletePostModal.module.css";
import type { Post } from "../../types/dashboard";
import Button from "../UI/Button/Button";
import { useEffect } from "react";
import { postDelete } from "../../store/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { updateErrorDelete } from "../../store/slices/postsSlice";

type selectedPostProps = {
  selectedPost: Post;
  setSelectedPost: (value: null | Post) => void;
  setAllCountDelete: React.Dispatch<React.SetStateAction<number>>;
};

const DeletePostModal = ({
  selectedPost,
  setSelectedPost,
  setAllCountDelete,
}: selectedPostProps) => {
  const textModal = selectedPost.title.split(" ").slice(0, 3).join(" ");
  const dispatch = useAppDispatch();
  const errorDeletePost = useAppSelector((state) => state.post.errorDelete);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const deletePost = async () => {
    try {
      await dispatch(postDelete({ selectedPost })).unwrap();
      setSelectedPost(null);
      setAllCountDelete((prev) => prev + 1);
    } catch {
      console.error();
    }
  };

  const handleClose = () => {
    setSelectedPost(null);
    dispatch(updateErrorDelete());
  };

  return (
    <div className={classes.modal__wrapper} onClick={() => handleClose()}>
      <div
        className={classes.modal__inner}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modal__title}>Удалить пост?</div>
        <div
          className={classes.modal__text}
        >{`«${textModal}» исчезнет из списка сразу. Если сервер ответит ошибкой, мы вернём пост на место`}</div>
        {errorDeletePost && (
          <div className={classes.error__wrapper}>
            <div className={classes.delete__title}>Пост не удалён...</div>
            <div className={classes.delete__errors}>{errorDeletePost}</div>
          </div>
        )}
        <div className={classes.modal__btns}>
          <Button onClick={() => handleClose()}>Отмена</Button>
          <Button
            onClick={() => deletePost()}
            variant="danger"
            disabled={errorDeletePost !== null}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
