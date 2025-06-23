import { ColorType } from '@/app/types/colorTypes';
import { IAuthorityService } from '@/app/types/help/authorities';

interface IAuthorityServicesProps {
  services: IAuthorityService[];
  type: ColorType;
}

const AuthorityServices = ({ services, type }: IAuthorityServicesProps) => {
  if (services.length === 0) return null;

  return (
    <div>
      <h4 className={`font-semibold text-${type}-dark mb-3`}>
        Vad kan de hjälpa dig med:
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-${type}-light/40 rounded-lg p-3 border border-${type}-light/50`}
          >
            <h5 className={`font-medium text-${type}-dark text-sm mb-1`}>
              {service.title}
            </h5>
            <p className={`text-${type}-dark text-xs leading-relaxed`}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorityServices;
