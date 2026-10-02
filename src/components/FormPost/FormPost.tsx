import classes from "./FormPost.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  postIdThunk,
  clearPostDetail,
} from "../../store/slices/getPostByIdSlice";
import ErrorState from "../../components/ErrorState/ErrorState";
import PostFieldsForm from "../../components/PostFieldsForm/PostFieldsForm";
import {resetFormStatuses} from "../../store/slices/postsSlice";

const FormPost = () => {
  const { id } = useParams();
  const postChange = useAppSelector((state) => state.postId.detailsPost);
  const editPosts = useAppSelector((state) =>
    state.post.editPost.find((post) => post.id === Number(id)),
  );
  const resultPost = editPosts ? editPosts : postChange;

  const statusPost = useAppSelector((state) => state.postId.statusPost);
  const title = id ? "Редактирование" : "Новый пост";
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useAppDispatch();
  const [isSuccessShown, setIsSuccessShown] = useState<boolean>(false);

  const errorPost = useAppSelector((state) => state.postId.errorPost);

  useEffect(() => {
    dispatch(postIdThunk({ id }));
    return () => {
      dispatch(clearPostDetail());
      dispatch(resetFormStatuses());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (resultPost) {
      setTimeout(() => {
        setInputTitle(resultPost.title);
        setBody(resultPost.body.replaceAll("\n", " "));
      }, 0);
    }
  }, [resultPost]);

  return (
    <>
      {statusPost === "failed" && id ? (
        <ErrorState
          title="Не смогли загрузить детальный пост"
          flag={true}
          icon="!"
          subtitle={`Сервер ответил ${errorPost?.message}. Ничего страшного - попробуем еще раз`}
          btnText="Назад"
          onBack={() => navigate(-1)}
          onRetry={() => {
            dispatch(postIdThunk({ id }));
          }}
        />
      ) : (
        <div className={classes.post__wrapper}>
          <header>
            <div className={classes.header__wrapper}>
              <span className={classes.active__title}> Посты</span> / {title}
            </div>
          </header>
          <div className={classes.postForm__wrapper}>
            <div className={classes.postForm__inner}>
              <div className={classes.postForm__title}>
                <div className={classes.postForm__text}>{title}</div>
                <div className={classes.postForm__flag}>
                  <div
                    className={`${classes.postForm_new} ${id ? "" : classes.general}`}
                  >
                    Создание
                  </div>
                  <div
                    className={`${classes.postForm_new} ${id ? classes.general : ""}`}
                  >
                    Редактирование
                  </div>
                </div>
              </div>
              <PostFieldsForm
                inputTitle={inputTitle}
                body={body}
                id={id ?? ""}
                setBody={setBody}
                setInputTitle={setInputTitle}
                setIsSuccessShown={setIsSuccessShown}
              />
              {isSuccessShown && (
                <div className={classes.successPost__container}>
                  <div className={classes.successPost__wrapper}>
                    <div className={classes.successPost__icons}></div>
                    <div className={classes.successPost__text}>
                      Пост сохранен и добавлен в список
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormPost;
