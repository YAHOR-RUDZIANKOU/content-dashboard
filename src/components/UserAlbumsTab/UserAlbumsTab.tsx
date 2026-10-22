import { useAppSelector } from "../../store";
import classes from "./UserAlbumsTab.module.css";
import SkeletonCard from "../Skeleton/SkeletonCard/SkeletonCard";
import ErrorState from "../ErrorState/ErrorState";
import { useNavigate } from "react-router-dom";

type UserAlbumsTabProps = {
  repeatFetch: () => void;
};

const UserAlbumsTab = ({ repeatFetch }: UserAlbumsTabProps) => {
  const navigate = useNavigate();
  const userAlbumsItems = useAppSelector(
    (state) => state.albums.userAlbumItems,
  );
  const statusAlbumsItems = useAppSelector(
    (state) => state.albums.userTabAlbumStatus,
  );
  const error = useAppSelector((state) => state.albums.userTabAlbumsError);
  const allPhoto = useAppSelector((state) => state.albums.allPhoto);

  if (statusAlbumsItems === "failed") {
    return (
      <div className={classes.errorTab__wrapper}>
        <div className={classes.errorTab__inner}>
          <ErrorState
            title="Не смогли загрузить альбомы"
            flag={true}
            icon="!"
            subtitle={`Сервер ответил ${error?.status}. Ничего страшного - попробуем еще раз`}
            btnText="Назад"
            onBack={() => navigate(-1)}
            onRetry={() => repeatFetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <ul className={classes.posTab__items}>
      {statusAlbumsItems === "loading" ? (
        <SkeletonCard />
      ) : (
        <>
          {" "}
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
        </>
      )}
    </ul>
  );
};

export default UserAlbumsTab;
