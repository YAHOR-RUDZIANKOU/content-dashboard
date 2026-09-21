import SkeletonCard from "../Skeleton/SkeletonCard/SkeletonCard";

type PostListSkeletonProps = {
  limit: number;
};
const PostListSkeleton = ({ limit }: PostListSkeletonProps) => {
  return Array.from({ length: limit }).map((_, index) => (
    <SkeletonCard key={index} style={{ height: "13.5rem" }} />
  ));
};

export default PostListSkeleton;
