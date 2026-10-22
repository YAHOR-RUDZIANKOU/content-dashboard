import { useAppSelector } from "../../store";
import classes from "./UserPostsTab.module.css";
import { memo } from "react";
import pluralize from "../../utils/pluralize";
import { Link } from "react-router-dom";
import SkeletonCard from "../Skeleton/SkeletonCard/SkeletonCard";
import ErrorState from "../../components/ErrorState/ErrorState";
import { useNavigate } from "react-router-dom";

type UserPostsTabProps = {
  repeatFetch: () => void;
};

const UserPostsTab = ({ repeatFetch }: UserPostsTabProps) => {
  const navigate = useNavigate();
  const userPostItems = useAppSelector((state) => state.post.userPostItems);
  const commentsMap = useAppSelector((state) => state.comments.commentsMap);
  const statusPostTab = useAppSelector(
    (state) => state.post.userTabPostsStatus,
  );
  const errors = useAppSelector((state) => state.post.userTabPostsError);
  if (statusPostTab === "failed") {
    return (
      <div className={classes.errorTab__wrapper}>
        <div className={classes.errorTab__inner}>
          <ErrorState
            title="Не смогли загрузить посты"
            flag={true}
            icon="!"
            subtitle={`Сервер ответил ${errors?.status}. Ничего страшного - попробуем еще раз`}
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
      {statusPostTab === "loading" ? (
        <SkeletonCard />
      ) : (
        <>
          {userPostItems.map((value) => {
            return (
              <li key={value.id} className={classes.posTab__item}>
                <Link to={`/posts/${value.id}`} className={classes.title}>
                  {value.title}
                </Link>
                <div className={classes.comment}>
                  {pluralize(commentsMap[value.id], [
                    "комментарий",
                    "комментария",
                    "комментариев",
                  ])}
                </div>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};

export default memo(UserPostsTab);
