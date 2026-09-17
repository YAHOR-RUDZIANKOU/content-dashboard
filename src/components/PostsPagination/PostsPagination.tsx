import classes from "./PostsPagination.module.css";
import Button from "../UI/Button/Button";
import { memo } from "react";
import type { Post } from "../../types/dashboard";

type PostsPaginationProps = {
  totalCount: number;
  limit: number;
  setPage: (page: number) => void;
  page: number;
  items: Post[];
  allCountDelete: number;
  setAllCountDelete: (value: number) => void;
};
const PostsPagination = ({
  totalCount,
  limit,
  setPage,
  page,
  items,
  allCountDelete,
  setAllCountDelete,
}: PostsPaginationProps) => {
  const countBtn = Math.ceil(totalCount / limit);
  const allPages = Array.from({ length: countBtn }, (_, i) => i + 1);
  const visiblePages = allPages.filter(
    (value) => value + 1 >= page && value - 1 <= page,
  );

  const startIndex = (page - 1) * limit;
  const startText = items.length === 0 ? 0 : startIndex + 1;
  const endText = startIndex + items.length;
  const changePage = (targetPage: number) => {
    setPage(targetPage);
    setAllCountDelete(0);
  };
  return (
    <div className={classes.pagination__wrapper}>
      <div className={classes.pagination__text}>
        Показано {startText}-{endText} из {totalCount - allCountDelete}
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
