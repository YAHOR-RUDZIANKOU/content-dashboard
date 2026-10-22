import classes from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className={classes.noFount__wrapper}>
      <div className={classes.noFound__inner}>
        <div className={classes.noFound__icon}></div>
        <div className={classes.noFound__title}>Такой страницы нет</div>
        <div className={classes.noFound__subtitle}>
          Возможно, ссылка устарела или в адресе опечатка. Давайте вернемся к
          контенту.
        </div>
        <Link className={classes.primary} to={"/"}>
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
