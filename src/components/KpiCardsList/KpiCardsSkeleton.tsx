import SkeletonCard from "../../components/Skeleton/SkeletonCard/SkeletonCard";
const KpiCardsSkeleton = () => {
  return Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} style={{ height: '115px' }} />);
};

export default KpiCardsSkeleton;
