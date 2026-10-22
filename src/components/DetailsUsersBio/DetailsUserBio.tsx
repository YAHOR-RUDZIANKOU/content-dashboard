import classes from "./DetailsUsersBio.module.css";
import UserPostsTab from "../../components/UserPostsTab/UserPostsTab";
import UserAlbumsTab from "../../components/UserAlbumsTab/UserAlbumsTab";
import UserTodosTab from "../../components/UserTodosTab/UserTodosTab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currentUsersThunk } from "../../store/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchUserPostsThunk } from "../../store/slices/postsSlice";
import { fetchUserAlbumsThunk } from "../../store/slices/albumSlice";
import { fetchUserTodosThunk } from "../../store/slices/todosSlice";
import { commentThunk } from "../../store/slices/commentsSlice";
import { fetchAllPhotoThunk } from "../../store/slices/albumSlice";
import ErrorState from "../../components/ErrorState/ErrorState";
import HeaderDetailsUser from "../../components/HeaderDetailsUser/HeaderDetailsUser";
import { useNavigate } from "react-router-dom";

const DetailsUserBio = () => {
  const navigate = useNavigate();
  const allPhoto = useAppSelector((state) => state.albums.allPhoto);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [currenTab, setCurrenTab] = useState<"posts" | "albums" | "todos">(
    "posts",
  );
  const currentUserStatus = useAppSelector(
    (state) => state.users.currentUserStatus,
  );
  const userAlbumsItems = useAppSelector(
    (state) => state.albums.userAlbumItems,
  );
  const userTodosItems = useAppSelector((state) => state.todos.userTodoItems);

  const handlePostsTabClick = () => {
    setCurrenTab("posts");
  };

  const handleAlbumsTabClick = () => {
    setCurrenTab("albums");
    if (!userAlbumsItems.length) {
      dispatch(fetchUserAlbumsThunk({ userId: id }));
    }
  };

  const handleTodosTabClick = () => {
    setCurrenTab("todos");
    if (!userTodosItems.length) {
      dispatch(fetchUserTodosThunk({ userId: id }));
    }
  };

  useEffect(() => {
    dispatch(commentThunk());
    if (Object.keys(allPhoto).length === 0) {
      dispatch(fetchAllPhotoThunk());
    }
  }, [dispatch, allPhoto]);

  useEffect(() => {
    dispatch(currentUsersThunk({ id }));
    dispatch(fetchUserPostsThunk({ userId: id }));
  }, [dispatch, id]);

  return (
    <main className={classes.main__wrapper}>
      {currentUserStatus === "failed" ? (
        <div className={classes.errorTab__wrapper}>
          <div className={classes.errorTab__inner}>
            <ErrorState
              title="Не удалось загрузить данные пользователя"
              flag={true}
              icon="!"
              subtitle={`Ничего страшного - попробуем еще раз`}
              btnText="Назад"
              onBack={() => navigate(-1)}
              onRetry={() => dispatch(currentUsersThunk({ id }))}
            />
          </div>
        </div>
      ) : (
        <HeaderDetailsUser />
      )}

      <div className={classes.main__body}>
        <div className={classes.main__title}>
          <button
            onClick={() => handlePostsTabClick()}
            className={currenTab === "posts" ? classes.btn__active : ""}
          >
            Посты
          </button>
          <button
            onClick={() => handleAlbumsTabClick()}
            className={currenTab === "albums" ? classes.btn__active : ""}
          >
            Альбомы
          </button>
          <button
            onClick={() => handleTodosTabClick()}
            className={currenTab === "todos" ? classes.btn__active : ""}
          >
            Задачи
          </button>
        </div>
        <div className={classes.tabs__container}>
          {currenTab === "posts" && (
            <UserPostsTab
              repeatFetch={() => dispatch(fetchUserPostsThunk({ userId: id }))}
            />
          )}
          {currenTab === "albums" && (
            <UserAlbumsTab
              repeatFetch={() => dispatch(fetchUserAlbumsThunk({ userId: id }))}
            />
          )}
          {currenTab === "todos" && (
            <UserTodosTab
              repeatFetch={() => dispatch(fetchUserTodosThunk({ userId: id }))}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default DetailsUserBio;
