import { useAppSelector } from "../../store/index";
import selectDashboard from "../../store/slices/Selectors/dashboardSelectors";
import DashboardCard from "../DashboardCard/DashboardCard";

type AllowedCardIds = "posts" | "todos" | "albums" | "users";

type staticCardsItems = {
  id: AllowedCardIds;
  nameCard: string;
};

const staticCards: staticCardsItems[] = [
  {
    id: "posts",
    nameCard: "ПОСТЫ",
  },
  {
    id: "todos",
    nameCard: "Задачи",
  },
  {
    id: "albums",
    nameCard: "Альбомы",
  },
  {
    id: "users",
    nameCard: "Пользователи",
  },
];

const KpiCardsList = () => {
  const stats = useAppSelector(selectDashboard);

  return staticCards.map((value) => (
    <DashboardCard
      key={value.id}
      nameCard={value.nameCard}
      title={stats[value.id].title}
      subtitle={stats[value.id].subtitle}
    />
  ));
};

export default KpiCardsList;
