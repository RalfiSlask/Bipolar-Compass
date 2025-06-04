import { IBipolarType } from '@/app/data/bipolarDiagnoses';
import Image from 'next/image';

interface IBipolarTypeProps {
  bipolarType: IBipolarType;
}

const BipolarType = ({ bipolarType }: IBipolarTypeProps) => {
  const { title, subtitle, description, icon, list, imageUrl } = bipolarType;
  return (
    <div className="content-container bg-white rounded-md shadow-md flex flex-col gap-6 py-8 px-4 md:px-10">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="flex-1">
          <h3 className="h-xs text-primary-dark mb-4">{title}</h3>
          <p className="mb-0 text-primary-dark">{description}</p>
        </div>
        {imageUrl && (
          <div className="flex-shrink-0 flex justify-center items-center w-full max-w-xs lg:max-w-xs rounded-lg overflow-hidden mx-auto lg:mx-0 max-h-40">
            <Image
              src={imageUrl}
              alt={title}
              aria-label={title}
              width={160}
              height={160}
              quality={80}
              className="object-cover rounded-full h-auto w-auto max-h-40"
            />
          </div>
        )}
      </div>
      <div className="bg-primary-light/50 rounded-md p-4 w-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            {icon}
            <h4 className="font-semibold text-primary-dark">{subtitle}</h4>
          </div>
        </div>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BipolarType;
