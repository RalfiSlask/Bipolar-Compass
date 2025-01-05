import { IEmergencyService } from '@/app/types/emergencyService';
import React from 'react';

interface IEmergencyServiceProps {
  serviceData: IEmergencyService;
}

const EmergencyService = ({ serviceData }: IEmergencyServiceProps) => {
  const { service, number, description } = serviceData;
  return (
    <div>
      <p>
        <span className="text-lg">{service}</span>:{' '}
        <span className="font-bold">{number}</span> - <span>{description}</span>
      </p>
    </div>
  );
};

export default EmergencyService;
