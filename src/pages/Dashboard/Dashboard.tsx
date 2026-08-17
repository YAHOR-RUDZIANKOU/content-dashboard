import classes from "./Dashboard.module.css";
import Button from "../../components/UI/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { logout } from "../../store/slices/authSlice";
import { Hand } from "lucide-react";

const getFirstName = (name: string) => {
  if (!name) return "";
  return name.split(" ")[0];
};

const Dashboard = () => {
  const dispath = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className={classes.dashboard__wrapper}>
      <header>
        <div className={classes.header__container}>
          <h3 className={classes.header__title}>Дашборд</h3>
          <Button onClick={() => dispath(logout())} variant="secondary">
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
        <div className={classes.cards__wrapper}></div>
      </main>
    </div>
  );
};

export default Dashboard;
