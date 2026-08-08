type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
import classes from "./Input.module.css"

const Input = ({className, ...rest }: InputProps) => {
  return (
    <input className={`${classes.myInput} ${className || ""}`} {...rest}/>
  );
};

export default Input;