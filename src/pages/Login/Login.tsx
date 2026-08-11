import classes from "./Login.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useState } from "react";
import { loginThunk } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { motion, AnimatePresence } from "framer-motion";
import { clearError } from "../../store/slices/authSlice";

const Login = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [description, setDescription] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = emailRegex.test(description);
    if (!description.trim()) {
      setEmailError("Поле Email обязательно для заполнения");
      return;
    }
    if (!isValidEmail) {
      setEmailError("Похоже, это не email - проверьте адрес");
      return;
    }
    setEmailError(null);
    dispatch(loginThunk({ description }));
  };

  const handleInputFocus = () => {
    setEmailError(null);
    dispatch(clearError());
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.modal__wrapper}>
        <h1>С возвращением</h1>
        <div className={classes.modal__subtitle}>
          Введите email - найдём вас в списке пользователей.
        </div>
        <div className={classes.static__wrapper}>
          <div className={classes.static__text}>Email</div>
          <Input value={"Sincere@april.biz"} disabled />
          <div className={classes.static__subtext}>
            Например: Sincere@april.biz
          </div>
        </div>
        <form onSubmit={handleSubmit} className={classes.modal} noValidate>
          <label className={classes.static__wrapper}>
            <div className={classes.static__text}>Email</div>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="email"
              placeholder="Введите свою почту ..."
              required
              onFocus={handleInputFocus}
            />
            {emailError && (
              <div className={classes.email__error}>{emailError}</div>
            )}
          </label>
          <Button
            disabled={status === "loading"}
            type="submit"
            variant="primary"
            size="lg"
            isLoading={status === "loading"}
          >
            <span>Войти</span>
          </Button>
        </form>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className={classes.error__wrapper}>
                <div className={classes.error__icon}></div>
                <div className={classes.error__text}>{error}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
