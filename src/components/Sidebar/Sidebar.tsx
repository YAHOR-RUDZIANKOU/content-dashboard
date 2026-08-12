import classes from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/index";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((value) => value[0])
    .join("")
    .toUpperCase();
};

const Sidebar = () => {
  const menuItems = [
    { id: 1, title: "Дашборд", path: "/" },
    { id: 2, title: "Посты", path: "/posts" },
    { id: 3, title: "Задачи", path: "/todos" },
    { id: 4, title: "Альбомы", path: "/albums" },
    { id: 5, title: "Пользователи", path: "/users" },
  ];

  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className={classes.sidebar__wrapper}>
      <Logo />
      <nav className={classes.nav__wrapper}>
        <ul>
          {menuItems.map((item) => {
            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.item} ${classes.item__active}`
                      : classes.item
                  }
                >
                  <div className={classes.item__logo}></div>
                  <div className={classes.item__text}>{item.title}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={classes.auth__inform}>
        <div className={classes.auth__logo}>
          {getInitials(user?.name ?? "")}
        </div>
        <div className={classes.auth__text}>
          <div className={classes.auth__title}>{user?.name}</div>
          <div className={classes.auth__subtitle}>{user?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
