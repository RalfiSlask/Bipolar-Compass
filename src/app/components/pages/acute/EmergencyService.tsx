import { IEmergencyService } from '@/app/types/emergencyService';
import { formatPhoneForTel } from '@/app/utils/generalUtils';

interface IEmergencyServiceProps {
  serviceData: IEmergencyService;
}

const EmergencyService = ({ serviceData }: IEmergencyServiceProps) => {
  const { service, number, description } = serviceData;
  const telLink = `tel:${formatPhoneForTel(number)}`;

  return (
    <li className="bg-white p-4 rounded-lg shadow-sm border border-primary-border">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold text-primary-dark">
          {service}
        </span>
        <a
          href={telLink}
          className="flex items-center gap-2 font-bold text-xl text-primary-medium hover:text-primary-dark transition-colors cursor-pointer underline decoration-2 underline-offset-2"
          aria-label={`Ring ${service} på ${number}`}
        >
          {number}
        </a>
        <span className="text-dark">{description}</span>
      </div>
    </li>
  );
};

export default EmergencyService;
