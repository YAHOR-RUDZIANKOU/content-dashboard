import classes from "./Users.module.css";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { useEffect, useState } from "react";
import { usersThunk } from "../../store/slices/usersSlice";
import useDebounce from "../../hooks/useDebounce";
import { changeSearchStr } from "../../store/slices/usersSlice";
import searchUser from "../../store/slices/Selectors/selectFilteredUsers";
import { Link } from "react-router-dom";

const Users = () => {
  const currentInput = useAppSelector((state) => state.users.searchStr);
  const [value, setValue] = useState(currentInput);
  const dispatch = useAppDispatch();
  const currentId = useAppSelector((state) => state.auth.user?.id);
  const debounceInput = useDebounce(value, 1000);

  useEffect(() => {
    dispatch(changeSearchStr(debounceInput));
  }, [dispatch, debounceInput]);

  useEffect(() => {
    dispatch(usersThunk());
  }, [dispatch]);

  const resultUsers = useAppSelector(searchUser);
  return (
    <div className={classes.user__wrapper}>
      <header className={classes.user__header}>
        <div className={classes.header__title}>Пользователи</div>
        <div className={classes.input__wrapper}>
          <div className={classes.input__icons}></div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Имя или email"
            className={classes.user__input}
          />
        </div>
      </header>
      <main className={classes.user__main}>
        <ul className={classes.users__container}>
          <li className={classes.table__header}>
            <div className={classes.table__row}>
              <span className={classes.user__name}>Имя</span>
              <span>Username</span>
              <span>Email</span>
              <span>Телефон</span>
              <span>Компания</span>
              <span>Город</span>
            </div>
          </li>
          {resultUsers.map((value) => {
            return (
              <li
                key={value.id}
                className={`${classes.table__items} ${currentId === value.id ? classes.table__active : ""}`}
              >
                <div className={classes.table__row}>
                  <Link
                    to={`/users/${value.id}`}
                    className={classes.user__name}
                  >
                    {value.name}
                  </Link>
                  <span>{value.username}</span>
                  <span>{value.email}</span>
                  <span>{value.phone}</span>
                  <span>{value.company.name}</span>
                  <span>{value.address.city}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Users;
