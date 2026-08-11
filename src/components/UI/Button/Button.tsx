import classes from "./Button.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../Loader/Loader";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "danger-filled";
  size?: "md" | "lg";
  isLoading?: boolean;
};

const Button = ({
  isLoading=false,
  children,
  className,
  variant = "secondary",
  size = "md",
  ...rest
}: ButtonProps) => {
  const combinedClasses = `${classes.btn} ${classes[variant]} ${classes[size]} ${className || ""}`;
  return (
    <button className={combinedClasses} {...rest}>
      <AnimatePresence>
        {isLoading  && (
          <motion.div
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: 18, opacity: 1, marginRight: 8 }}
            exit={{ width: 0, opacity: 0, marginRight: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </button>
  );
};

export default Button;
