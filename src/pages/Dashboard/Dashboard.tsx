import classes from "./Dashboard.module.css";
import Button from "../../components/UI/Button/Button";
import { useAppDispatch } from "../../store/index";
import { logout } from "../../store/slices/authSlice";

const Dashboard = () => {
  const dispath = useAppDispatch();
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
    </div>
  );
};

export default Dashboard;
