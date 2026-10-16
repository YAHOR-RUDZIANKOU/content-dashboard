import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { useEffect, useState } from "react";
import {
  totalCountPhotoThunk,
  currentAlbumThunk,
  photoThunk,
} from "../../store/slices/albumPhotosSelectors";
import classes from "./AlbumPhotos.module.css";
import { usersThunk } from "../../store/slices/usersSlice";
import PostsPagination from "../../components/PostsPagination/PostsPagination";
import ModalPhoto from "../../components/ModalPhoto/ModalPhoto";
import ErrorState from "../../components/ErrorState/ErrorState";
import SkeletonCard from "../../components/Skeleton/SkeletonCard/SkeletonCard";

const AlbumPhotos = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const limit = 20;
  const [page, setPage] = useState<number>(1);
  const totalCount = useAppSelector((state) => state.albumPhotos.totalCount);
  const photosItems = useAppSelector(
    (state) => state.albumPhotos.currentPhotos,
  );
  const [imagError, setImagError] = useState<boolean>(false);
  const usersMap = useAppSelector((state) => state.users.usersMap);
  const countPhoto = useAppSelector((state) => state.albums.allPhoto);
  const currentObj = useAppSelector((state) => state.albumPhotos.currentAlbum);
  const [modalPhotos, setModalPhotos] = useState<boolean>(false);
  const [idPhoto, setIdPhoto] = useState<number | null>(null);
  const statusPhoto = useAppSelector((state) => state.albumPhotos.statusPhotos);
  const errorPhoto = useAppSelector((state) => state.albumPhotos.errorPhotos);

  const currentIndexPhoto = photosItems.findIndex(
    (photo) => photo.id === idPhoto,
  );
  const currentCountPhoto = (page - 1) * limit + (currentIndexPhoto + 1);

  useEffect(() => {
    dispatch(photoThunk({ id, limit, page }));
  }, [dispatch, id, limit, page]);

  useEffect(() => {
    dispatch(currentAlbumThunk({ id }));
    dispatch(totalCountPhotoThunk({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(usersThunk());
  }, [dispatch]);

  const handleCard = (id: number) => {
    setModalPhotos(true);
    setIdPhoto(id);
  };

  if (statusPhoto === "failed") {
    return (
      <ErrorState
        title="Не смогли загрузить фотографии"
        flag={true}
        icon="!"
        subtitle={`Сервер ответил ${errorPhoto?.message}. Ничего страшного - попробуем еще раз`}
        btnText="Вернуться назад"
        onBack={() => navigate(-1)}
        onRetry={() => dispatch(photoThunk({ id, limit, page }))}
      />
    );
  }

  return (
    <div className={classes.albums__wrapper}>
      <header className={classes.albums__header}>
        <div className={classes.albums__text}>
          <span className={classes.active__text}>Альбомы </span> /{" "}
          {currentObj?.title}
        </div>
      </header>
      <main className={classes.albums__main}>
        <div className={classes.title__wrapper}>
          <div className={classes.albums__title}>{currentObj?.title}</div>
          <div className={classes.albums__subtitle}>
            {usersMap[currentObj?.userId ?? 0]} •{" "}
            {countPhoto[currentObj?.id ?? 0]} фото
          </div>
        </div>

        <div className={classes.cards__wrapper}>
          {statusPhoto === "loading" ? (
            <>
              {Array.from({ length: photosItems.length }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </>
          ) : (
            <>
              {photosItems.map((card, index) => {
                return (
                  <div
                    onClick={() => handleCard(card.id)}
                    key={card.id}
                    className={classes.card__container}
                  >
                    {imagError ? (
                      <div className={classes.card__preview}>
                        <div
                          className={classes.card__subtitle}
                        >{`photo ${index + 1}`}</div>
                      </div>
                    ) : (
                      <div className={classes.img__container}>
                        <img
                          src={card.thumbnailUrl}
                          onError={() => setImagError(true)}
                          className={classes.cardImage}
                          alt={card.title}
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        <PostsPagination
          items={photosItems}
          page={page}
          totalCount={totalCount}
          limit={limit}
          setPage={setPage}
        />
      </main>
      {modalPhotos && (
        <ModalPhoto
          setModalPhotos={setModalPhotos}
          idPhoto={idPhoto}
          setIdPhoto={setIdPhoto}
          currentCountPhoto={currentCountPhoto}
        />
      )}
    </div>
  );
};

export default AlbumPhotos;
