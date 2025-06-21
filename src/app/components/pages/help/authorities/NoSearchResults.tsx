import { ColorType } from '@/app/types/colorTypes';

interface INoSearchResultsProps {
  type: ColorType;
}

const NoSearchResults = ({ type }: INoSearchResultsProps) => {
  return (
    <div className={`text-center py-12 text-${type}-dark/60`}>
      <p className="text-lg mb-2">Inga myndigheter hittades</p>
      <p className="text-sm">
        Prova att ändra din sökning eller ta bort filter
      </p>
    </div>
  );
};

export default NoSearchResults;
