interface IGuideListProps {
  guideList: string[];
}

const GuideList = ({ guideList }: IGuideListProps) => {
  return (
    <ul className="flex flex-col gap-2 text-sm text-primary-dark">
      {guideList.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-primary-accent">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default GuideList;
