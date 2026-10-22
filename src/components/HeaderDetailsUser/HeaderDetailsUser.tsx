import classes from "./HeaderDetailsUsers.module.css";
import { showIconsLogo } from "../../utils/pluralize";
import { useAppSelector } from "../../store";
import SkeletonCard from "../Skeleton/SkeletonCard/SkeletonCard";

const HeaderDetailsUser = () => {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const currentUserStatus = useAppSelector(
    (state) => state.users.currentUserStatus,
  );
  const footerContacts = [
    { id: "email", title: "Email", subtitle: currentUser?.email },
    { id: "phone", title: "Телефон", subtitle: currentUser?.phone },
    { id: "website", title: "Сайт", subtitle: currentUser?.website },
    {
      id: "address",
      title: "Адрес",
      subtitle: currentUser?.address
        ? `${currentUser.address.street}, ${currentUser.address.city}`
        : "",
    },
  ];
  return (
    <div className={classes.main__header}>
      {currentUserStatus === "loading" ? (
        <SkeletonCard style={{ height: "10rem" }} />
      ) : (
        <div className={classes.main__content}>
          <div className={classes.main__logo}>
            {showIconsLogo(currentUser?.name)}
          </div>
          <div className={classes.main__info}>
            <div className={classes.info__body}>
              <span className={classes.info__name}>{currentUser?.name}</span>
              <span className={classes.info__username}>
                {`@${currentUser?.username}  • ${currentUser?.company.name}`}
              </span>
              <span className={classes.info__catchPhrase}>
                {currentUser?.company.catchPhrase}
              </span>
            </div>
            <div className={classes.info__footer}>
              {footerContacts.map((value) => {
                return (
                  <div key={value.id} className={classes.footer__item}>
                    <div className={classes.footer__title}>{value.title}</div>
                    {value.title === "Сайт" ? (
                      <a
                        href={`https://${currentUser?.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.footer__link}
                      >
                        {currentUser?.website}
                      </a>
                    ) : (
                      <div className={classes.footer__subtitle}>
                        {value.subtitle}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classes.main__map}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${currentUser?.address.geo.lat},${currentUser?.address.geo.lng}`}
              className={classes.map__link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Открыть на карте ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderDetailsUser;
