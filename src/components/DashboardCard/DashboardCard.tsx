import classes from "../../pages/Dashboard/Dashboard.module.css";

type DashboardCardProps = {
  nameCard: string;
  title: number;
  subtitle: string;
};

const DashboardCard = ({ nameCard, title, subtitle }: DashboardCardProps) => {
  return (
    <div className={classes.card__item}>
      <div className={classes.card__title}>{nameCard}</div>
      <div className={classes.card__count}>{title}</div>
      <div className={classes.card__subtitle}>{subtitle}</div>
    </div>
  );
};

export default DashboardCard;
