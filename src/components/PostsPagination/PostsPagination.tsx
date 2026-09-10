import classes from "./PostsPagination.module.css";
import Button from "../UI/Button/Button";
import { memo } from 'react';

type PostsPaginationProps = {
  totalCount: number;
  limit: number;
  setPage: (page: number) => void;
  page: number;
};
const PostsPagination = ({
  totalCount,
  limit,
  setPage,
  page,
}: PostsPaginationProps) => {
  const countBtn = Math.ceil(totalCount / limit);
  const allPages = Array.from({ length: countBtn }, (_, i) => i + 1);
  const visiblePages = allPages.filter(
    (value) => value + 1 >= page && value - 1 <= page,
  );
  const startText = (page - 1) * limit + 1;
  const endText = Math.min(page * limit, totalCount);
  return (
    <div className={classes.pagination__wrapper}>
      <div className={classes.pagination__text}>
        Показано {startText}-{endText} из {totalCount}
      </div>
      <div className={classes.pagination__btn}>
        <Button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`${classes.arrow__back} ${classes.pagination__btn}`}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`${classes.arrow__back} ${classes.pagination__btn}`}
        >
          {"<"}
        </Button>
        {visiblePages.map((value) => (
          <Button
            variant={page === value ? "primary" : "secondary"}
            onClick={() => setPage(value)}
            className={classes.pagination__btn}
            key={value}
          >
            {value}
          </Button>
        ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === visiblePages[visiblePages.length - 1]}
          className={`${classes.arrow__next} ${classes.pagination__btn}`}
        >
          {">"}
        </Button>
        <Button
          onClick={() => setPage(allPages[allPages.length - 1])}
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
