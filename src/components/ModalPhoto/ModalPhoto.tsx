import { useAppSelector } from "../../store";
import classes from "./ModalPhoto.module.css";
import { useEffect, useState } from "react";

type modalPhotoProps = {
  setModalPhotos: (value: boolean) => void;
  idPhoto: number | null;
  setIdPhoto: (value: number) => void;
  currentCountPhoto: number;
};
const ModalPhoto = ({
  setModalPhotos,
  idPhoto,
  setIdPhoto,
  currentCountPhoto,
}: modalPhotoProps) => {
  const [imagError, setImagError] = useState<boolean>(false);
  const allPhotos = useAppSelector((state) => state.albumPhotos.currentPhotos);
  const currentPhoto = allPhotos.find((card) => card.id === idPhoto);
  const nextDisabled =
    idPhoto !== null && idPhoto >= allPhotos[allPhotos.length - 1].id;
  const prevDisabled = idPhoto !== null && idPhoto <= allPhotos[0].id;
  const totalCount = useAppSelector((state) => state.albumPhotos.totalCount);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const prevPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (idPhoto === null) return;
    if (idPhoto - 1 >= allPhotos[0].id) {
      setIdPhoto(idPhoto - 1);
    }
  };

  const nextPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (idPhoto === null) return;
    if (idPhoto + 1 <= allPhotos[allPhotos.length - 1].id) {
      setIdPhoto(idPhoto + 1);
    }
  };

  return (
    <div
      onClick={() => setModalPhotos(false)}
      className={classes.modal__wrapper}
    >
      <div className={classes.modal__inner}>
        <button
          disabled={prevDisabled}
          onClick={(e) => prevPhoto(e)}
          className={`${classes.cardBtn} ${classes.btnLeft}`}
        ></button>
        <div
          onClick={(e) => e.stopPropagation()}
          className={classes.modal__context}
        >
          {imagError ? (
            <div className={classes.card__info}>
              <div className={classes.card__preview}>
                <div className={classes.card__text}>full photo 600x600</div>
              </div>
            </div>
          ) : (
            <img
              src={currentPhoto?.url}
              alt={currentPhoto?.title}
              onError={() => setImagError(true)}
              className={classes.cardImage}
            />
          )}
          <div className={classes.card__footer}>
            <div className={classes.footer__text}> {currentPhoto?.title}</div>
            <div className={classes.footer__count}>
              {currentCountPhoto} / {totalCount}
            </div>
          </div>
        </div>

        <button
          disabled={nextDisabled}
          onClick={(e) => nextPhoto(e)}
          className={`${classes.cardBtn} ${classes.btnRight}`}
        ></button>
      </div>
    </div>
  );
};

export default ModalPhoto;
