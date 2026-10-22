import classes from "./DetailsUser.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { currentUsersThunk } from "../../store/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { showIconsLogo } from "../../utils/pluralize";
import { fetchUserPostsThunk } from "../../store/slices/postsSlice";
import { fetchUserAlbumsThunk } from "../../store/slices/albumSlice";
import { fetchUserTodosThunk } from "../../store/slices/todosSlice";
import UserPostsTab from "../../components/UserPostsTab/UserPostsTab";
import { commentThunk } from "../../store/slices/commentsSlice";
import UserAlbumsTab from "../../components/UserAlbumsTab/UserAlbumsTab";
import { fetchAllPhotoThunk } from "../../store/slices/albumSlice";
import UserTodosTab from "../../components/UserTodosTab/UserTodosTab";

const DetailsUser = () => {
  const allPhoto = useAppSelector((state) => state.albums.allPhoto);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const [currenTab, setCurrenTab] = useState<"posts" | "albums" | "todos">(
    "posts",
  );
  const userAlbumsItems = useAppSelector(
    (state) => state.albums.userAlbumItems,
  );
  const userTodosItems = useAppSelector((state) => state.todos.userTodoItems);

  const footerContacts = [
    { id: "email", title: "Email", subtitle: currentUser?.email },
    { id: "phone", title: "Телефон", subtitle: currentUser?.phone },
    { id: "website", title: "Сайт", subtitle: currentUser?.website },
    {
      id: "address",
      title: "Адрес",
      subtitle: currentUser?.address
        ? `${currentUser.address.street}, ${currentUser.address.city}`
        : "",
    },
  ];

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
    <div className={classes.user__wrapper}>
      <header className={classes.header__wrapper}>
        <span className={classes.header__active}>Пользователи</span> /{" "}
        {currentUser?.name}
      </header>
      <main className={classes.main__wrapper}>
        <div className={classes.main__header}>
          <div className={classes.main__logo}>
            {showIconsLogo(currentUser?.name)}
          </div>
          <div className={classes.main__info}>
            <div className={classes.info__body}>
              <span className={classes.info__name}>{currentUser?.name}</span>
              <span className={classes.info__username}>
                {`@${currentUser?.username}  • ${currentUser?.company.name}`}
              </span>
              <span className={classes.info__catchPhrase}>
                {currentUser?.company.catchPhrase}
              </span>
            </div>
            <div className={classes.info__footer}>
              {footerContacts.map((value) => {
                return (
                  <div key={value.id} className={classes.footer__item}>
                    <div className={classes.footer__title}>{value.title}</div>
                    {value.title === "Сайт" ? (
                      <a
                        href={`https://${currentUser?.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.footer__link}
                      >
                        {currentUser?.website}
                      </a>
                    ) : (
                      <div className={classes.footer__subtitle}>
                        {value.subtitle}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.main__map}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${currentUser?.address.geo.lat},${currentUser?.address.geo.lng}`}
              className={classes.map__link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Открыть на карте ↗
            </a>
          </div>
        </div>
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
            {currenTab === "posts" && <UserPostsTab />}
            {currenTab === "albums" && <UserAlbumsTab />}
            {currenTab === "todos" && <UserTodosTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailsUser;
