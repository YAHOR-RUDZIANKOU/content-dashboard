import classes from "./DeletePostModal.module.css";
import type { Post } from "../../types/dashboard";
import Button from "../UI/Button/Button";
import { useEffect } from "react";
import { postDelete } from "../../store/slices/postsSlice";
import { useAppDispatch } from "../../store/index";

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

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const deletePost = () => {
    dispatch(postDelete({ selectedPost }));
    setSelectedPost(null);
    setAllCountDelete((prev) => prev + 1);
  };

  return (
    <div className={classes.modal__wrapper}>
      <div className={classes.modal__inner}>
        <div className={classes.modal__title}>Удалить пост?</div>
        <div
          className={classes.modal__text}
        >{`«${textModal}» исчезнет из списка сразу. Если сервер ответит ошибкой, мы вернём пост на место`}</div>
        <div className={classes.modal__btns}>
          <Button onClick={() => setSelectedPost(null)}>Отмена</Button>
          <Button onClick={() => deletePost()} variant="danger">
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
