import classes from "./Dashboard.module.css";
import Button from "../../components/UI/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { logout } from "../../store/slices/authSlice";
import { Hand } from "lucide-react";
import { useEffect } from "react";
import { dashboardThunk } from "../../store/slices/dashboardSlice";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import selectDashboard from "../../store/slices/Selectors/dashboardSelectors";

const getFirstName = (name: string) => {
  if (!name) return "";
  return name.split(" ")[0];
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(dashboardThunk());
  }, [dispatch]);

  const stats = useAppSelector(selectDashboard);

  const staticCards = [
    {
      id: "posts",
      nameCard: "ПОСТЫ",
      title: stats.postsTitle,
      subtitle: stats.subtitlePost,
    },
    {
      id: "todos",
      nameCard: "Задачи",
      title: stats.todosTitle,
      subtitle: stats.subtitleTodos,
    },
    {
      id: "albums",
      nameCard: "Альбомы",
      title: stats.albumsTitle,
      subtitle: stats.subtitleAlbums,
    },
    {
      id: "users",
      nameCard: "Пользователи",
      title: stats.usersTitle,
      subtitle: stats.subtitleUsers,
    },
  ];

  return (
    <div className={classes.dashboard__wrapper}>
      <header>
        <div className={classes.header__container}>
          <h3 className={classes.header__title}>Дашборд</h3>
          <Button onClick={() => dispatch(logout())} variant="secondary">
            Выйти
          </Button>
        </div>
      </header>
      <main className={classes.dashboard__main}>
        <div className={classes.dashboard__title}>
          <div>Привет, {getFirstName(user?.name ?? "")}</div>
          <Hand size={28} />
        </div>
        <div className={classes.dashboard__subtitle}>
          Вот что происходит в вашем контенте сегодня.
        </div>
        <div className={classes.cards__wrapper}>
          {staticCards.map((value) => (
            <DashboardCard
              key={value.id}
              nameCard={value.nameCard}
              title={value.title}
              subtitle={value.subtitle}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
