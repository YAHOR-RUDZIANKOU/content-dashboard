import type { Post } from "../../types/dashboard";
import PostCard from "../PostCard/PostCard";
import classes from "./PostList.module.css";
import type {User} from "../../types/user"

type PostListProps = {
  items: Post[];
  viewMode: "grid" | "list";
  currentId: number | undefined;
  allAuthors: User[];
};

const PostList = ({ items, viewMode, currentId, allAuthors }: PostListProps) => {
  return (
    <div
      className={viewMode === "grid" ? classes.posts__grid : classes.post__list}
    >
      {items.map((value) => {
        const currentAuthor=allAuthors.find((item)=>item.id===value.userId);
        const btnFlag = currentId === value.userId;
        return (
          <PostCard
            key={value.id}
            post={value}
            btnFlag={btnFlag}
            nameAuth={currentAuthor?.name ?? "Неизвестный автор"}
          />
        );
      })}
    </div>
  );
};

export default PostList;
