import { useAppSelector } from "../../store";
import classes from "./UserAlbumsTab.module.css";
import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { resetAlbumsTab } from "../../store/slices/albumSlice";

const UserAlbumsTab = () => {
  const dispatch = useAppDispatch();
  const userAlbumsItems = useAppSelector(
    (state) => state.albums.userAlbumItems,
  );
  const allPhoto = useAppSelector((state) => state.albums.allPhoto);

  useEffect(() => {
    return () => {
      dispatch(resetAlbumsTab());
    };
  }, [dispatch]);

  return (
    <ul className={classes.posTab__items}>
      {userAlbumsItems.map((value) => {
        return (
          <li key={value.id} className={classes.posTab__item}>
            <div className={classes.title}>{value.title}</div>
            <div
              className={classes.countPhoto}
            >{`${allPhoto[value.id]} фото`}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default UserAlbumsTab;
