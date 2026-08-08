import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.logo__wrapper}>
      <div className={classes.logo__box}></div>
      <div className={classes.logo__title}>Content Hub</div>
    </div>
  );
};

export default Logo;
