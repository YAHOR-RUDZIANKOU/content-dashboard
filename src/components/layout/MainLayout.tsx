import classes from "./layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.navBar}>
        <Sidebar />
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
