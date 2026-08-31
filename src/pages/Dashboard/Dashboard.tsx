import classes from "./Dashboard.module.css";
import Button from "../../components/UI/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { logout } from "../../store/slices/authSlice";
import { Hand } from "lucide-react";
import { useEffect } from "react";
import { dashboardThunk } from "../../store/slices/dashboardSlice";
import RecentPost from "../../components/RecentPost/RecentPost";
import KpiCardsList from "../../components/KpiCardsList/KpiCardsList";
import RecentTodosList from "../../components/RecentTodosList/RecentTodosList";
import KpiCardsSkeleton from "../../components/KpiCardsList/KpiCardsSkeleton";
import SkeletonCard from "../../components/Skeleton/SkeletonCard/SkeletonCard";

const getFirstName = (name: string) => {
  if (!name) return "";
  return name.split(" ")[0];
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { status } = useAppSelector((state) => state.dashboard);
  const { error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardThunk());
  }, [dispatch]);

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
        {status === "failed" ? (
          <div className={classes.error}>{error}</div>
        ) : (
          <>
            <div className={classes.cards__wrapper}>
              {status === "succeeded" && <KpiCardsList />}
              {status === "loading" && <KpiCardsSkeleton />}
            </div>
            <div className={classes.dashboard__activity}>
              {status === "succeeded" && (
                <>
                  <RecentPost />
                  <RecentTodosList />
                </>
              )}
              {status === "loading" && (
                <>
                  <SkeletonCard style={{ height: "23.75rem" }} />
                  <SkeletonCard style={{ height: "23.75rem" }} />
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
