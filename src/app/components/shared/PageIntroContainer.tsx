import Image from 'next/image';

interface IPageIntroContainerProps {
  intro: {
    title: string;
    description: string;
    descriptionBold: string;
    image: string;
    color: 'brown' | 'green';
  };
}

const PageIntroContainer = ({ intro }: IPageIntroContainerProps) => {
  const { title, description, descriptionBold, image, color } = intro;

  const colorClass = color === 'brown' ? 'tertiary-dark' : 'primary-dark';
  const bgClass =
    color === 'brown'
      ? 'bg-tertiary-light shadow-tertiary-dark/20'
      : 'bg-primary-light shadow-primary-dark/20';

  return (
    <div className={`intro-container ${bgClass}`}>
      <div className="flex-1 h-full">
        <h2 className={`h-lg font-bold mb-6 text-${colorClass}`}>{title}</h2>
        <div className={`space-y-6 text-xl text-${colorClass}`}>
          <p className={`text-xl text-${colorClass}`}>{description}</p>
          <p className={`text-xl text-${colorClass} font-bold`}>
            {descriptionBold}
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-lg overflow-hidden w-full">
        <Image
          src={image}
          alt="terapi session"
          aria-label="terapi session mellan en psykoterapeut och en patient"
          width={1200}
          height={800}
          quality={80}
          className="object-cover rounded-sm lg:rounded-full"
          priority
        />
      </div>
    </div>
  );
};

export default PageIntroContainer;
