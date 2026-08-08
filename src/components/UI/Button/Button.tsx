import classes from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "danger-filled";
  size?: "md" | "lg";
};

const Button = ({
  children,
  className,
  variant = "secondary",
  size = "md",
  ...rest
}:ButtonProps) => {
  const combinedClasses = `${classes.btn} ${classes[variant]} ${classes[size]} ${className || ""}`;
  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
