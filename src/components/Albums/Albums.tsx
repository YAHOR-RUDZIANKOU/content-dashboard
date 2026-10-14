import classes from "./Albums.module.css";
import { useState, useEffect } from "react";
import AuthorSelect from "../../components/authorSelect/AuthorSelect";
import { usersThunk } from "../../store/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import AlbumsCards from "../AlbumsCards/AlbumsCards";
import {
  albumsThunk,
  fetchAlbumsCountThunk,
  fetchAllPhotoThunk,
} from "../../store/slices/albumSlice";
import PostsPagination from "../../components/PostsPagination/PostsPagination";
import useDebounce from "../../hooks/useDebounce";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorState from "../ErrorState/ErrorState";
import { useNavigate } from "react-router-dom";

const Albums = () => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector((state) => state.albums.totalCount);
  const limit = 8;
  const [page, setPage] = useState<number>(1);
  const albumsRes = useAppSelector((state) => state.albums.albums);
  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState<number | "">("");
  const debouncedSearch = useDebounce(search, 500);
  const usersMap = useAppSelector((state) => state.users.usersMap);
  const allPhoto = useAppSelector((state) => state.albums.allPhoto);
  const status = useAppSelector((state) => state.albums.status);
  const error = useAppSelector((state) => state.albums.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(usersThunk());
    dispatch(fetchAllPhotoThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAlbumsCountThunk({
        authorId: authorId || undefined,
        debouncedSearch,
      }),
    );
  }, [dispatch, authorId, debouncedSearch]);

  useEffect(() => {
    const promise = dispatch(
      albumsThunk({
        page,
        limit,
        authorId: authorId || undefined,
        debouncedSearch,
      }),
    );

    return () => {
      promise.abort();
    };
  }, [dispatch, page, limit, authorId, debouncedSearch]);

  return (
    <>
      {status === "failed" ? (
        <ErrorState
          title="Не смогли загрузить альбомы"
          flag={true}
          icon="!"
          subtitle={`Сервер ответил ${error?.message}. Ничего страшного - попробуем еще раз`}
          btnText="Назад"
          onBack={() => navigate(-1)}
          onRetry={() =>
            dispatch(
              albumsThunk({
                page,
                limit,
                authorId: authorId || undefined,
                debouncedSearch,
              }),
            )
          }
        />
      ) : (
        <div className={classes.albums__wrapper}>
          <header className={classes.albums__header}>
            <div className={classes.header__title}>Альбомы</div>
            <div className={classes.search__wrapper}>
              <input
                placeholder="Поиск по названию"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={classes.post__input}
              />
              <AuthorSelect
                authorId={authorId}
                setAuthorId={setAuthorId}
                title="Все владельцы"
                setPage={setPage}
              />
            </div>
          </header>
          <main className={classes.albums__main}>
            {albumsRes.length > 0 || search.length === 0 ? (
              <>
                <AlbumsCards
                  items={albumsRes}
                  usersMap={usersMap}
                  allPhoto={allPhoto}
                  limit={limit}
                />
                <PostsPagination
                  totalCount={totalCount}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                  items={albumsRes}
                />
              </>
            ) : (
              <EmptyState
                search={search}
                setSearch={setSearch}
                setAuthorId={setAuthorId}
              />
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default Albums;
