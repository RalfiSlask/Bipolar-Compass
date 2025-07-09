import { stripHtmlTags } from '@/app/utils/textUtils';

const BookDescription = ({ description }: { description: string }) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Beskrivning</h3>
      <p className="text-gray-600 whitespace-pre-line">
        {stripHtmlTags(description)}
      </p>
    </div>
  );
};

export default BookDescription;
