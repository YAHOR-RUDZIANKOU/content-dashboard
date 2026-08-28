import classes from "./RecentTodosList.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/index";
import selectRecentTodos from "../../store/slices/Selectors/selectRecentTodos";

const RecentTodosList = () => {
  const recentTodos = useAppSelector(selectRecentTodos);
  return (
    <div className={classes.todos__wrapper}>
      <div className={classes.todos__header}>
        <div className={classes.todos__text}>Мои незакрытые задачи</div>
        <Link className={classes.todos__btn} to="/todos">
          {" "}
          Все ⟶
        </Link>
      </div>
      <ul className={classes.todos__items}>
        {recentTodos.map((value) => {
          return (
            <li key={value.id} className={classes.todos__item}>
              <input className={classes.checkbox__size} type="checkbox" disabled />
              <span className={classes.todos__title}>{value.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTodosList;
