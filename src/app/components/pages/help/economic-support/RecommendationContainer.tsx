import { IRecommendationContainer } from '@/app/types/help/economic';

interface IRecommendationContainerProps {
  recommendation: IRecommendationContainer;
}

const RecommendationContainer = ({
  recommendation,
}: IRecommendationContainerProps) => {
  const { title, description, listItems, type } = recommendation;
  return (
    <div
      className={`bg-${type}-light border-l-4 border-${type}-dark text-${type}-dark p-4`}
    >
      <h4 className="font-semibold mb-2 text-xl">{title}</h4>
      <div className="font-semibold mb-2">
        {description}
        <span className="sr-only">{title}</span>
      </div>
      <ul className="text-sm flex flex-col gap-1 list-disc list-inside">
        {listItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationContainer;
