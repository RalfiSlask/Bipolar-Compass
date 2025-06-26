import { FaHandHoldingHeart } from 'react-icons/fa';

interface IEncouragmentContainerProps {
  text: string;
}

const EncouragmentContainer = ({ text }: IEncouragmentContainerProps) => {
  return (
    <div className="flex flex-col bg-primary-light rounded-lg p-4 sm:p-8 shadow-md shadow-primary-dark/20 responsive-margin-bottom">
      <div className="bg-primary-light">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <FaHandHoldingHeart className="text-5xl text-primary-dark" />
          <p className="font-semibold text-primary-dark">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default EncouragmentContainer;
