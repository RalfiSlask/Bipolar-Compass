import { ColorType } from '@/app/types/colorTypes';

interface IListItem {
  id: number;
  label: string;
}

interface IListHeading {
  title: string;
  type: ColorType;
  listItems: IListItem[];
}

interface IListWithHeadingProps {
  listInfo: IListHeading;
}

const ListWithHeading = ({ listInfo }: IListWithHeadingProps) => {
  const { title, type, listItems } = listInfo;

  // HACK: problem with generating the dot correctly by using type variable inline
  // dont want to use safelist in tailwind, causes to large css files
  const colorClass =
    type === 'primary' ? 'bg-primary-dark' : 'bg-tertiary-dark';

  return (
    <div className={`bg-${type}-light rounded-lg p-4 sm:p-6 shadow-md`}>
      <h3 className={`text-lg font-bold text-${type}-dark mb-4`}>{title}</h3>
      <ul className={`flex flex-col gap-2 text-${type}-dark`}>
        {listItems.map((item) => {
          return (
            <li key={item.id} className="flex items-start gap-2 ">
              <span
                className={`w-2 h-2 ${colorClass} rounded-full mt-2 flex-shrink-0`}
              ></span>
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListWithHeading;
