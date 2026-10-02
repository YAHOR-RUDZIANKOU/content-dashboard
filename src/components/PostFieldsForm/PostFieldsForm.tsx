import classes from "./PostFieldsForm.module.css";
import Button from "../UI/Button/Button";
import SkeletonCard from "../Skeleton/SkeletonCard/SkeletonCard";
import pluralize from "../../utils/pluralize";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createNewPostThunk,
  editPostThunk,
} from "../../store/slices/postsSlice";

type errorSubmit = {
  message: string;
  status: number;
};

type PostFieldsFormProps = {
  inputTitle: string;
  body: string;
  id: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  setInputTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsSuccessShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostFieldsForm = ({
  inputTitle,
  body,
  id,
  setBody,
  setInputTitle,
  setIsSuccessShown,
}: PostFieldsFormProps) => {
  const statusCreatePost = useAppSelector(
    (state) => state.post.statusCreatePost,
  );
  const statusEditPost = useAppSelector((state) => state.post.statusEditPost);
  const currentUser = useAppSelector((state) => state.auth.user);
  const isTitleInvalid = inputTitle.length < 5 && inputTitle.length !== 0;
  const statusPost = useAppSelector((state) => state.postId.statusPost);
  const [textAreaFlag, setTextAreaFlag] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentId = useAppSelector((state) => state.auth.user?.id);
  const [errorSubmit, setErrorSubmit] = useState<errorSubmit | null>(null);
  const isSubmitDisabled =
    textAreaFlag ||
    inputTitle.length < 5 ||
    body.length === 0 ||
    statusEditPost === "loading" ||
    statusCreatePost === "loading" ||
    statusEditPost === "succeeded" ||
    statusCreatePost === "succeeded";

  const changeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = e.target.value;
    setBody(currentText);
    if (currentText.trim().length < 20 && currentText.trim().length !== 0) {
      setTextAreaFlag(true);
    } else {
      setTextAreaFlag(false);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    setErrorSubmit(null);
    try {
      e.preventDefault();
      const post = {
        title: inputTitle,
        body: body,
        userId: Number(currentId),
      };
      if (id) {
        const result = await dispatch(
          editPostThunk({
            ...post,
            id: Number(id),
          }),
        ).unwrap();
        setIsSuccessShown(true);
        setTimeout(() => {
          navigate(`/posts/${result.id}`);
        }, 1000);
      } else {
        const result = await dispatch(createNewPostThunk(post)).unwrap();
        setIsSuccessShown(true);
        setTimeout(() => {
          navigate(`/posts/${result.id}`);
        }, 1000);
      }
    } catch (err: unknown) {
      setErrorSubmit(err as errorSubmit);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={classes.formPostCard__container}>
      <div className={classes.formPostCard__firstBlock}>
        <div className={classes.firstBlock__title}>
          <div className={classes.firstBlock__text}>Заголовок</div>
          <div>
            {pluralize(inputTitle.length, ["символ", "символа", "символов"])}
          </div>
        </div>
        {statusPost === "loading" ? (
          <SkeletonCard style={{ height: "2rem" }} />
        ) : (
          <input
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            className={classes.firstBlock__general}
            placeholder="Введите заголовок"
          />
        )}
        <div
          className={`${classes.firstBlock__subtitle} ${isTitleInvalid ? classes.error__title : ""} `}
        >
          Минимум 5 символов
        </div>
      </div>
      <div className={classes.formPostCard__secondBlock}>
        <div>Текст</div>
        {statusPost === "loading" ? (
          <SkeletonCard style={{ height: "4rem" }} />
        ) : (
          <textarea
            value={body}
            onChange={(e) => changeTextArea(e)}
            className={classes.firstBlock__general}
            placeholder="Введите текст"
          />
        )}
        {textAreaFlag && (
          <div
            className={classes.error__input}
          >{`Нужно минимум 20 символов - сейчас ${body.trim().length}`}</div>
        )}
      </div>
      <div className={classes.formPostCard__thirdBlock}>
        <div>Автор</div>
        <div
          className={classes.formPostCard__auth}
        >{`${currentUser?.name} (userId: ${currentUser?.id})`}</div>
      </div>
      <div className={classes.btns__wrapper}>
        <div className={classes.formPostCard__btns}>
          <Button type="button" onClick={() => navigate(-1)}>
            Отмена
          </Button>
          {id ? (
            <Button
              className={classes.btn__wrapper}
              type="submit"
              variant="primary"
              disabled={isSubmitDisabled}
            >
              {statusEditPost === "loading" && (
                <div className={classes.spinner__btn}></div>
              )}
              Редактировать
            </Button>
          ) : (
            <Button
              className={classes.btn__wrapper}
              type="submit"
              variant="primary"
              disabled={isSubmitDisabled}
            >
              {statusCreatePost === "loading" && (
                <div className={classes.spinner__btn}></div>
              )}
              Сохранить
            </Button>
          )}
        </div>
      </div>
      {errorSubmit && (
        <div className={classes.errorSubmit__container}>
          <div
            className={classes.errorSubmit__inner}
          >{`Ошибка со статусом ${errorSubmit.status}. Попробуйте еще раз`}</div>
        </div>
      )}
    </form>
  );
};

export default PostFieldsForm;
