import classes from "./Todos.module.css";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import AuthorSelect from "../../components/authorSelect/AuthorSelect";
import { usersThunk } from "../../store/slices/usersSlice";
import { todosThunk } from "../../store/slices/todosSlice";
import Button from "../../components/UI/Button/Button";
import { changeStatusFilter, addNewPost } from "../../store/slices/todosSlice";
import selectProgress from "../../store/slices/Selectors/selectTodosProgress";
import TodoElement from "../../components/TodoElement/TodoElement";
import SkeletonCard from "../../components/Skeleton/SkeletonCard/SkeletonCard";
import ErrorState from "../../components/ErrorState/ErrorState";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const status = useAppSelector((state) => state.todos.status);
  const error = useAppSelector((state) => state.todos.error);
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const dispatch = useAppDispatch();
  const [authorId, setAuthorId] = useState<number | "">("");
  const statusFilter = useAppSelector((state) => state.todos.statusFilter);
  const [newTodos, setNewTodos] = useState("");
  const [errorFlag, setErrorFlag] = useState<boolean>(false);
  const { allLength, completedLength } = useAppSelector(selectProgress);
  const navigate = useNavigate();
  const percentage = allLength > 0 ? (completedLength / allLength) * 100 : 0;

  useEffect(() => {
    dispatch(usersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(todosThunk({ authorId: authorId || undefined }));
  }, [dispatch, authorId]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewTodos("");
    dispatch(
      addNewPost({
        userId: currentUserId,
        id: Date.now(),
        title: newTodos,
        completed: false,
      }),
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setNewTodos(currentValue);
    if (currentValue.trim().length < 5 && currentValue.trim().length !== 0) {
      setErrorFlag(true);
    } else {
      setErrorFlag(false);
    }
  };

  return (
    <>
      {status === "failed" ? (
        <ErrorState
          title="Не смогли загрузить задачи"
          flag={true}
          icon="!"
          subtitle={`Сервер ответил ${error?.message}. Ничего страшного - попробуем еще раз`}
          btnText="На дашборд"
          onBack={() => navigate("/")}
          onRetry={() =>
            dispatch(todosThunk({ authorId: authorId || undefined }))
          }
        />
      ) : (
        <div className={classes.todos__container}>
          <header className={classes.todos__header}>Задачи</header>
          <main className={classes.todos__main}>
            <div className={classes.todos__wrapper}>
              <div className={classes.filterTab__wrapper}>
                <div className={classes.filterTab__text}>
                  <button
                    className={`${statusFilter === "all" ? classes.active__btn : ""}`}
                    onClick={() => dispatch(changeStatusFilter("all"))}
                  >
                    Все
                  </button>
                  <button
                    className={`${statusFilter === "active" ? classes.active__btn : ""}`}
                    onClick={() => dispatch(changeStatusFilter("active"))}
                  >
                    Активные
                  </button>
                  <button
                    className={`${statusFilter === "completed" ? classes.active__btn : ""}`}
                    onClick={() => dispatch(changeStatusFilter("completed"))}
                  >
                    Выполненные
                  </button>
                </div>
                <AuthorSelect
                  authorId={authorId}
                  setAuthorId={setAuthorId}
                  title="Все пользователи"
                />
              </div>
              <div className={classes.todos__add}>
                <form onSubmit={handleSubmit} className={classes.todos__form}>
                  <input
                    value={newTodos}
                    onChange={(e) => handleInput(e)}
                    placeholder="Что нужно сделать?"
                    className={`${classes.todos__input} ${errorFlag ? classes.input__err : ""}`}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={errorFlag || newTodos.length === 0}
                  >
                    Добавить
                  </Button>
                </form>
                {errorFlag && (
                  <div
                    className={classes.text__error}
                  >{`Нужно минимум 5 символов - сейчас ${newTodos.trim().length}`}</div>
                )}
              </div>
              {status === "loading" ? (
                <SkeletonCard />
              ) : (
                <TodoElement errorFlag={errorFlag} />
              )}
            </div>
            <div className={classes.todos__progress}>
              <div className={classes.todos__title}>ПРОГРЕСС</div>
              <div
                className={classes.todos__count}
              >{`Выполнено ${completedLength} из ${allLength} `}</div>
              <div className={classes.progressBar__track}>
                <div
                  className={classes.progressBar__fill}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div
                className={classes.todos__subtitle}
              >{`Осталось ${allLength - completedLength} задач`}</div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Todos;
