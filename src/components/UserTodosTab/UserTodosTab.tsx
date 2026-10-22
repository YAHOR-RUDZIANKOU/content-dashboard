import { useAppDispatch, useAppSelector } from "../../store";
import classes from "./UserTodosTab.module.css";
import { useEffect } from "react";
import { resetTodosTab } from "../../store/slices/todosSlice";

const UserTodosTab = () => {
  const dispatch = useAppDispatch();
  const userTodosItems = useAppSelector((state) => state.todos.userTodoItems);
  useEffect(() => {
    return () => {
      dispatch(resetTodosTab());
    };
  }, [dispatch]);
  return (
    <ul className={classes.posTab__items}>
      {userTodosItems.map((value) => {
        return (
          <li key={value.id} className={classes.posTab__item}>
            <div className={classes.liElement__wrapper}>
              <input
                type="checkbox"
                checked={value.completed}
                onChange={() => {}}
              />
              <div className={classes.liElement__title}>{value.title}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default UserTodosTab;
