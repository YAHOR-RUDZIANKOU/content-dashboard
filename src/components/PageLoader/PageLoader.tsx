import classes from "./PageLoader.module.css";
import { RingLoader } from "react-spinners";
const PageLoader = () => {
  return (
    <div className={classes.spinner__wrapper}>
      <RingLoader color="#36d7b7" size={80} />
    </div>
  );
};

export default PageLoader;
