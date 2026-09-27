import classes from "./AuthInfo.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/index";
import { memo } from "react";

const AuthInfo = () => {
  const getInitials = (name: string) => {
    if (name.length === 0) {
      return;
    }
    return name
      .split(" ")
      .map((value) => value[0])
      .join("")
      .toUpperCase();
  };
  const currentUser = useAppSelector((state) => state.auth.user);
  return (
    <div className={classes.auth__wrapper}>
      <div className={classes.auth__title}>АВТОР</div>
      <div className={classes.auth__logo}>
        <div className={classes.auth__icon}>
          {getInitials(currentUser?.name ?? "")}
        </div>
        <div className={classes.auth__info}>
          <div className={classes.auth__name}>{currentUser?.name}</div>
          <div
            className={classes.auth__username}
          >{`@${currentUser?.username}`}</div>
        </div>
      </div>
      <div className={classes.person__data}>
        <div>{currentUser?.email}</div>
        <div>{currentUser?.phone}</div>
        <div>{currentUser?.company.name}</div>
      </div>
      <Link className={classes.btn__change} to={`/users/${currentUser?.id}`}>
        Профиль пользователя ⟶
      </Link>
    </div>
  );
};

export default memo(AuthInfo);
