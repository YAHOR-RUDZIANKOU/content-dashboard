import classes from "./Todo.module.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTodo, updateTodo } from "../../store/slices/todosSlice";
import todoSelectors from "../../store/slices/Selectors/todoSelectors";
import { toast } from "react-hot-toast";

type handleToggleTypes = {
  id: number;
  completed: boolean;
};

type TodoElementProps = {
  errorFlag: boolean;
};

const TodoElement = ({ errorFlag }: TodoElementProps) => {
  const dispatch = useAppDispatch();
  const allAuths = useAppSelector((state) => state.users.items);
  const resultTodos = useAppSelector(todoSelectors);

  const handleToggle = async ({ id, completed }: handleToggleTypes) => {
    dispatch(toggleTodo(id));
    try {
      await dispatch(updateTodo({ id, completed })).unwrap();
    } catch (err) {
      dispatch(toggleTodo(id));
      console.log(err);
      toast.error(`Не удалось обновить задачу. Попробуйте пожалуйста еще раз!`);
    }
  };
  return (
    <ul
      style={{
        maxHeight: errorFlag ? "calc(100vh - 275px)" : "calc(100vh - 245px)",
      }}
      className={classes.todoList__wrapper}
    >
      {resultTodos.map((liElement) => {
        const nameAuth = allAuths.find((user) => user.id === liElement.userId);
        return (
          <li key={liElement.id} className={classes.liElement__container}>
            <div className={classes.liElement__wrapper}>
              <input
                onChange={() =>
                  handleToggle({
                    id: liElement.id,
                    completed: liElement.completed,
                  })
                }
                type="checkbox"
                checked={liElement.completed}
              />
              <div className={liElement.completed ? classes.completedTask : ""}>
                {liElement.title}
              </div>
            </div>
            <div className={classes.liElement__auth}>{nameAuth?.name}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoElement;
