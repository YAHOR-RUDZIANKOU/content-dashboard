import classes from "./PostsPagination.module.css";
import Button from "../UI/Button/Button";
import { memo } from "react";
import type { Post } from "../../types/dashboard";
import { useAppSelector } from "../../store";

type PostsPaginationProps = {
  totalCount: number;
  limit: number;
  setPage: (page: number) => void;
  page: number;
  items: Post[];
};
const PostsPagination = ({
  totalCount,
  limit,
  setPage,
  page,
  items,
}: PostsPaginationProps) => {
  const countBtn = Math.ceil(totalCount / limit);
  const deletedPostIds = useAppSelector((state) => state.post.deletedPostIds);
  const allPages = Array.from({ length: countBtn }, (_, i) => i + 1);
  const visiblePages = allPages.filter(
    (value) => value + 1 >= page && value - 1 <= page,
  );
  const deleteIdPostCount = useAppSelector(
    (state) => state.post.deletedPostIds.length,
  );

  const deletedBefore = deletedPostIds.length;
  const startIndex = (page - 1) * limit - (page > 1 ? deletedBefore : 0);
  const startText = items.length === 0 ? 0 : startIndex + 1;
  const endText = items.length === 0 ? 0 : startIndex + items.length;

  const changePage = (targetPage: number) => {
    setPage(targetPage);
  };
  return (
    <div className={classes.pagination__wrapper}>
      <div className={classes.pagination__text}>
        {`Показано ${startText}-${endText} из ${totalCount - deleteIdPostCount}`}
      </div>
      <div className={classes.pagination__btn}>
        <Button
          onClick={() => changePage(1)}
          disabled={page === 1}
          className={`${classes.arrow__back} ${classes.pagination__btn}`}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
          className={`${classes.arrow__back} ${classes.pagination__btn}`}
        >
          {"<"}
        </Button>
        {visiblePages.map((value) => (
          <Button
            variant={page === value ? "primary" : "secondary"}
            onClick={() => changePage(value)}
            className={classes.pagination__btn}
            key={value}
          >
            {value}
          </Button>
        ))}
        <Button
          onClick={() => changePage(page + 1)}
          disabled={page === visiblePages[visiblePages.length - 1]}
          className={`${classes.arrow__next} ${classes.pagination__btn}`}
        >
          {">"}
        </Button>
        <Button
          onClick={() => changePage(allPages[allPages.length - 1])}
          disabled={page === allPages[allPages.length - 1]}
          className={`${classes.arrow__back} ${classes.pagination__btn}`}
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
};

export default memo(PostsPagination);
