import classes from "./ErrorState.module.css";
import Button from "../UI/Button/Button";

type ErrorStateProps = {
  title: string;
  subtitle: string;
  btnText: string;
  onBack: () => void;
  onRetry?: () => void;
  flag: boolean;
  icon:string;
};

const ErrorState = ({
  title,
  subtitle,
  btnText,
  onBack,
  onRetry,
  flag,
  icon
}: ErrorStateProps) => {
  return (
    <div className={classes.error__wrapper}>
      <div className={classes.error__inner}>
        <div className={classes.error__icons}>{icon}</div>
        <div className={classes.error__title}>{title}</div>
        <div className={classes.error__subtitle}>{subtitle}</div>
        {flag ? (
          <div className={classes.btns__wrapper}>
            <Button onClick={onRetry} variant="primary">
              Повторить
            </Button>
            <Button onClick={onBack}>{btnText}</Button>
          </div>
        ) : (
          <div className={classes.btn__wrapper}>
            <Button onClick={onBack} variant="primary">{btnText}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
