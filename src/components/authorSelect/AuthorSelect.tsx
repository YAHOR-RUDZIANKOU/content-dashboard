import classes from "./authorSelect.module.css";
import { useAppSelector } from "../../store/index";
import { usersSelectors } from "../../store/slices/Selectors/usersSelectors";
import { ChevronDown } from "lucide-react";

type AuthorSelectProps = {
  authorId: string | number;
  setAuthorId: (value: number | "") => void;
  setIsMyPosts: (value: boolean) => void;
};

const AuthorSelect = ({
  authorId,
  setAuthorId,
  setIsMyPosts,
}: AuthorSelectProps) => {
  const selectItems = useAppSelector(usersSelectors);
  const currentId = useAppSelector((state) => state.auth.user?.id);
  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const parsedValue = selectedValue === "" ? "" : Number(selectedValue);
    setAuthorId(parsedValue);
    if (parsedValue !== currentId) {
      setIsMyPosts(false);
    } else {
      setIsMyPosts(true);
    }
  };
  return (
    <div className={classes.select__wrapper}>
      <select
        className={classes.select__items}
        value={authorId}
        onChange={(e) => handleAuthorChange(e)}
      >
        <option value="">Все авторы</option>
        {selectItems.map((item) => (
          <option key={item.id} value={item.id}>{`Автор: ${item.name}`}</option>
        ))}
      </select>
      <ChevronDown className={classes.arrows} />
    </div>
  );
};

export default AuthorSelect;
