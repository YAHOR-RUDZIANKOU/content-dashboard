import { useAppSelector } from "../../store";
import SkeletonCard from "../Skeleton/SkeletonCard/SkeletonCard";
import classes from "./UserTodosTab.module.css";
import ErrorState from "../ErrorState/ErrorState";
import { useNavigate } from "react-router-dom";

type UserTodosTabProps = {
  repeatFetch: () => void;
};

const UserTodosTab = ({ repeatFetch }: UserTodosTabProps) => {
  const navigate = useNavigate();
  const userTodosItems = useAppSelector((state) => state.todos.userTodoItems);
  const statusTodosItem = useAppSelector(
    (state) => state.todos.userTabTodosStatus,
  );
  const error = useAppSelector((state) => state.todos.userTabTodosError);

  if (statusTodosItem === "failed") {
    return (
      <div className={classes.errorTab__wrapper}>
        <div className={classes.errorTab__inner}>
          <ErrorState
            title="Не смогли загрузить задачи"
            flag={true}
            icon="!"
            subtitle={`Сервер ответил ${error?.status}. Ничего страшного - попробуем еще раз`}
            btnText="Назад"
            onBack={() => navigate(-1)}
            onRetry={() => repeatFetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <ul className={classes.posTab__items}>
      {statusTodosItem === "loading" ? (
        <SkeletonCard />
      ) : (
        <>
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
        </>
      )}
    </ul>
  );
};

export default UserTodosTab;
