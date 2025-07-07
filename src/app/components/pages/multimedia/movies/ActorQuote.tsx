import { IActor } from '@/app/types/api/movies';
import Image from 'next/image';

interface IActorQuoteProps {
  actorInfo: IActor;
}

const ActorQuote = ({ actorInfo }: IActorQuoteProps) => {
  const { imageSrc, actor, quote, description } = actorInfo;

  return (
    <div className="flex flex-col md:items-center bg-primary-light rounded-lg overflow-hidden">
      <div className="flex-1">
        <Image
          src={imageSrc}
          alt={actor}
          width={1500}
          height={846}
          quality={80}
          className="object-cover w-full aspect-[1920/1080]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 flex-1">
        <p className="text-lg italic ">{quote}</p>
        <p className="text-sm text-gray-600">- {description}</p>
      </div>
    </div>
  );
};

export default ActorQuote;
