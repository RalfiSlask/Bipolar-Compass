import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

interface MainPageImageGridProps {
  item: {
    title: string;
    href: string;
    description: string;
    image: string;
  };
}

const MainPageImageGrid = ({ item }: MainPageImageGridProps) => {
  const { title, href, description, image } = item;

  return (
    <li className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer">
      <Link key={href} href={href}>
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={image}
            alt={title}
            fill
            className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
        </div>

        <div className="p-8 relative bg-white">
          <h3 className="text-2xl font-bold text-primary-dark group-hover:text-secondary-dark transition-colors duration-200">
            {title}
          </h3>
          <p className="mt-4 text-lg text-gray-700 line-clamp-3">
            {description}
          </p>
          <div className="mt-6 inline-flex items-center text-primary-dark group-hover:text-secondary-dark transition-colors duration-200">
            <span className="font-medium">Läs mer</span>
            <HiArrowLongRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MainPageImageGrid;
