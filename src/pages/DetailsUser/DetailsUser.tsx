import classes from "./DetailsUser.module.css";
import DetailsUserBio from "../../components/DetailsUsersBio/DetailsUserBio";
import { useAppSelector, useAppDispatch } from "../../store";
import { useEffect } from "react";
import { resetAlbumsTab } from "../../store/slices/albumSlice";
import { resetTodosTab } from "../../store/slices/todosSlice";

const DetailsUser = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  useEffect(() => {
    return () => {
      dispatch(resetAlbumsTab());
      dispatch(resetTodosTab());
    };
  }, [dispatch]);

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
