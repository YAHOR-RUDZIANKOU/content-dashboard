import classes from "./PostDetailsPage.module.css";
import { useParams } from "react-router-dom";

const PostDetailsPage = () => {
  const { id } = useParams();
  return (
    <div className={classes.post__wrapper}>
      <header>
        <div className={classes.header__title}>
          <span className={classes.header__active}>Посты</span> / Пост #
          {id}{" "}
        </div>
      </header>
      <main className={classes.post__main}>
        
      </main>
    </div>
  );
};

export default PostDetailsPage;
