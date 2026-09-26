import classes from "./DetailsComments.module.css";
import { useAppSelector, useAppDispatch } from "../../store";
import CommentSection from "../CommentSection/CommentSection";
import Button from "../UI/Button/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addComment } from "../../store/slices/getPostByIdSlice";

const DetailsComments = () => {
  const { id } = useParams();
  const comments = useAppSelector((state) => state.postId.comments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const dispatch = useAppDispatch();
  const [textAreaFlag, setTextAreaFlag] = useState<boolean>(false);
  const [error, setError] = useState<{
    name?: string;
    email?: string;
  }>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasLetters = /[a-zA-Zа-яёА-ЯЁ]/;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentErrObj: {
      name?: string;
      email?: string;
    } = {};

    if (!hasLetters.test(name.trim())) {
      currentErrObj.name = "Пожалуйста, введите корректное имя";
    }
    if (!emailRegex.test(email.trim())) {
      currentErrObj.email = "Введите корректный Email";
    }

    setError(currentErrObj);

    if (Object.keys(currentErrObj).length > 0) {
      return;
    }

    const newComments = {
      postId: Number(id),
      id: Date.now(),
      name: name,
      email: email,
      body: commentText,
    };
    dispatch(addComment(newComments));
    setName("");
    setEmail("");
    setCommentText("");
  };

  const changeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = e.target.value;
    setCommentText(currentText);
    if (currentText.trim().length < 20 && currentText.trim().length !== 0) {
      setTextAreaFlag(true);
    } else {
      setTextAreaFlag(false);
    }
  };

  return (
    <div className={classes.comments__wrapper}>
      <div className={classes.comments__inner}>
        <div
          className={classes.comments__header}
        >{`Комментарии • ${comments?.length}`}</div>
        <CommentSection comments={comments} />
      </div>
      <div className={classes.add__comment}>
        <div className={classes.comments__title}>Оставить комментарий</div>
        <form onSubmit={handleSubmit} className={classes.comments__form}>
          <div className={classes.input__wrappers}>
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes.general}
                placeholder="Ваше имя"
                onFocus={() =>
                  setError((prev) => ({ ...prev, name: undefined }))
                }
              />
              {error.name && (
                <div className={classes.error__input}>{error.name}</div>
              )}
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.general}
                placeholder="Email"
                onFocus={() =>
                  setError((prev) => ({ ...prev, email: undefined }))
                }
              />
              {error.email && (
                <div className={classes.error__input}>{error.email}</div>
              )}
            </div>
          </div>

          <textarea
            value={commentText}
            onChange={(e) => changeTextArea(e)}
            className={`${classes.general} ${textAreaFlag ? classes.textarea__error : ""}`}
            placeholder="Что думаете об этом посте?"
          />
          {textAreaFlag && (
            <div
              className={classes.error__input}
            >{`Нужно минимум 20 символов - сейчас ${commentText.trim().length}`}</div>
          )}

          <div className={classes.btn__wrapper}>
            <Button variant="primary" type="submit" disabled={textAreaFlag}>
              Отправить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsComments;
