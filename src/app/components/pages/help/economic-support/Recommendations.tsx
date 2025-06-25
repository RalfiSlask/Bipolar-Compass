import { ECONOMIC_SUPPORT_RECOMMENDATION_LIST_ITEMS } from '@/app/data/help/economic';
import RecommendationContainer from './RecommendationContainer';

const Recommendations = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {ECONOMIC_SUPPORT_RECOMMENDATION_LIST_ITEMS.map((recommendation) => (
        <RecommendationContainer
          key={recommendation.id}
          recommendation={recommendation}
        />
      ))}
    </div>
  );
};

export default Recommendations;
