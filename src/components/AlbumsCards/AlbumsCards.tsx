import classes from "./AlbumsCards.module.css";
import type { Album } from "../../types/dashboard";
import { memo } from "react";
import { useAppSelector } from "../../store";
import SkeletonCard from "../Skeleton/SkeletonCard/SkeletonCard";
import { Link } from "react-router-dom";

type AlbumsCards = {
  items: Album[];
  usersMap: Record<number, string>;
  allPhoto: Record<number, number>;
  limit: number;
};

const AlbumsCards = ({ items, usersMap, allPhoto, limit }: AlbumsCards) => {
  const status = useAppSelector((state) => state.albums.status);
  if (status === "loading") {
    return (
      <div className={classes.cards__wrapper}>
        {Array.from({ length: limit }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className={classes.cards__wrapper}>
      {items.map((card) => {
        return (
          <Link key={card.id} className={classes.card__inner} to={`/albums/${card.id}`}>
            <div className={classes.card__preview}></div>
            <div className={classes.card__title}>{card.title}</div>
            <div
              className={classes.card__subtitle}
            >{`${usersMap[card.userId]} • ${allPhoto[card.id]} фото`}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default memo(AlbumsCards);
