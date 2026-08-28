import classes from "./SkeletonCard.module.css";

type SkeletonCardProps = {
  style?: React.CSSProperties;
};
const SkeletonCard = ({ style }: SkeletonCardProps) => {
  return <div className={classes.skeleton__wrapper} style={style}></div>;
};

export default SkeletonCard;
