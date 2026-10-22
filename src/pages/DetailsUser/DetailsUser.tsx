import classes from "./DetailsUser.module.css";
import DetailsUserBio from "../../components/DetailsUsersBio/DetailsUserBio";
import { useAppSelector } from "../../store";

const DetailsUser = () => {
  const currentUser = useAppSelector((state) => state.users.currentUser);

  return (
    <div className={classes.user__wrapper}>
      <header className={classes.header__wrapper}>
        <span className={classes.header__active}>Пользователи</span> /{" "}
        {currentUser?.name}
      </header>
      <DetailsUserBio />
    </div>
  );
};

export default DetailsUser;
