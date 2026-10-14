import classes from "./EmptyState.module.css";
import Button from "../UI/Button/Button";
import { useAppSelector } from "../../store/index";

type EmptyStateProps = {
  search: string;
  setSearch: (value: string) => void;
  setAuthorId: (value: number | "") => void;
  setIsMyPosts?: (value: boolean) => void;
};

const EmptyState = ({
  search,
  setSearch,
  setAuthorId,
  setIsMyPosts,
}: EmptyStateProps) => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const clearFilters = () => {
    setSearch("");
    if (setIsMyPosts) {
      setIsMyPosts(true);
      setAuthorId(userId ?? "");
    } else {
      setAuthorId("");
    }
  };
  return (
    <div className={classes.empty__wrapper}>
      <div className={classes.empty__inner}>
        <div className={classes.empty__icon}></div>
        <div className={classes.empty__title}>Ничего не найдено</div>
        <div
          className={classes.empty__subtitle}
        >{`По запросу ${search}  постов нет. Попробуйте снять часть фильтров`}</div>
        <Button onClick={() => clearFilters()} className={classes.empty__btn}>
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
