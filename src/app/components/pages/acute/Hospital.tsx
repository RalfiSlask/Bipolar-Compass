import googleMapsIcon from '@/app/assets/icons/google-maps.svg';
import Image from 'next/image';
import { MdLocalHospital } from 'react-icons/md';

interface IHospitalProps {
  hospitalLink: string;
  error: string;
  findNearestHospital: () => void;
}

const Hospital = ({
  hospitalLink,
  error,
  findNearestHospital,
}: IHospitalProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <MdLocalHospital className="text-primary-medium text-2xl" />
        <h3 className="h-sm text-primary-dark">Närliggande sjukhus</h3>
      </div>
      <div className="flex flex-col gap-2 bg-primary-light rounded-lg p-4 shadow-md">
        {hospitalLink ? (
          <p className="text-primary-dark mb-2">Hitta sjukhus via kartan: </p>
        ) : (
          <p className="text-lg">
            Klicka på knappen nedan för att hitta sjukhus nära dig:
          </p>
        )}

        {!hospitalLink && !error && (
          <button
            className="primary-button mt-2 w-[250px] hover:bg-primary-medium transition-colors"
            onClick={findNearestHospital}
          >
            Hitta närmaste sjukhus
          </button>
        )}
        {hospitalLink && (
          <p className="text-lg">
            <a
              href={hospitalLink}
              className="flex gap-2 items-center hover:text-primary-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={googleMapsIcon}
                alt="google maps ikon"
                width={24}
                height={24}
              />
              Öppna i Google Maps
            </a>
          </p>
        )}
      </div>

      {error && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default Hospital;
