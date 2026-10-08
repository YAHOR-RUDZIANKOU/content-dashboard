import classes from "./authorSelect.module.css";
import { useAppSelector } from "../../store/index";
import { usersSelectors } from "../../store/slices/Selectors/usersSelectors";
import { ChevronDown } from "lucide-react";
import { memo } from "react";

type AuthorSelectProps = {
  authorId: string | number;
  setAuthorId: (value: number | "") => void;
  title: string;
  setIsMyPosts?: (value: boolean) => void;
  setPage?: (value: number) => void;
};

const AuthorSelect = ({
  authorId,
  setAuthorId,
  title,
  setIsMyPosts,
  setPage,
}: AuthorSelectProps) => {
  const selectItems = useAppSelector(usersSelectors);
  const currentId = useAppSelector((state) => state.auth.user?.id);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const parsedValue = selectedValue === "" ? "" : Number(selectedValue);
    setAuthorId(parsedValue);
    if (setIsMyPosts && setPage) {
      setPage(1);
      if (parsedValue !== currentId) {
        setIsMyPosts(false);
      } else {
        setIsMyPosts(true);
      }
    }
  };

  return (
    <div className={classes.select__wrapper}>
      <select
        className={classes.select__items}
        value={authorId}
        onChange={(e) => handleAuthorChange(e)}
      >
        <option value="">{title}</option>
        {selectItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <ChevronDown className={classes.arrows} />
    </div>
  );
};

export default memo(AuthorSelect);
