import { FaHandHoldingHeart } from 'react-icons/fa';

interface IEncouragmentContainerProps {
  text: string;
}

const EncouragmentContainer = ({ text }: IEncouragmentContainerProps) => {
  return (
    <div className="flex flex-col bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary-light/60">
      <div className="bg-primary-light rounded-md p-4">
        <div className="flex items-center gap-6">
          <FaHandHoldingHeart className="text-5xl text-primary-dark" />
          <p className="font-semibold text-primary-dark">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default EncouragmentContainer;
