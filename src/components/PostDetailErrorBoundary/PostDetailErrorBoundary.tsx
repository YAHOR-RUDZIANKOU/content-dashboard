import { useAppDispatch, useAppSelector } from "../../store/index";
import ErrorState from "../../components/ErrorState/ErrorState";
import { useNavigate } from "react-router-dom";
import { postIdThunk } from "../../store/slices/getPostByIdSlice";

type PostDetailErrorBoundaryProps = {
  children: React.ReactNode;
  id: string;
};

const PostDetailErrorBoundary = ({
  children,
  id,
}: PostDetailErrorBoundaryProps) => {
  const errorPost = useAppSelector((state) => state.postId.errorPost);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  if (errorPost?.status === 404) {
    return (
      <ErrorState
        title="Пост не найден"
        subtitle={
          "Возможно, его удалили. Вернитесь к списку - там точно есть что почитать"
        }
        btnText="К списку постов"
        onBack={() => navigate("/posts")}
        flag={false}
        icon="404"
      />
    );
  }

  if (errorPost?.message) {
    return (
      <ErrorState
        title="Не смогли загрузить посты"
        subtitle={`Сервер ответил ${errorPost.status}. Ничего страшного - попробуем еще раз`}
        btnText="На дашборд"
        onBack={() => navigate("/posts")}
        onRetry={() => dispatch(postIdThunk({ id }))}
        flag={true}
        icon="!"
      />
    );
  }
  return children;
};

export default PostDetailErrorBoundary;
