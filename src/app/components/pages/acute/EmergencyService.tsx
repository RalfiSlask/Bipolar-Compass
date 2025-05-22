import { IEmergencyService } from '@/app/types/emergencyService';

interface IEmergencyServiceProps {
  serviceData: IEmergencyService;
}

const EmergencyService = ({ serviceData }: IEmergencyServiceProps) => {
  const { service, number, description } = serviceData;
  return (
    <li className="bg-white p-4 rounded-lg shadow-sm border border-primary-border hover:shadow-md transition-shadow cursor-pointer">
      <p className="flex flex-col gap-1">
        <span className="text-lg font-semibold text-primary-dark">
          {service}
        </span>
        <span className="font-bold text-xl text-primary-medium">{number}</span>
        <span className="text-gray-700">{description}</span>
      </p>
    </li>
  );
};

export default EmergencyService;
