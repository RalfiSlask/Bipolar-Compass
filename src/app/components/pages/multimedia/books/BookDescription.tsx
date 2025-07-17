import { stripHtmlTags } from '@/app/utils/textUtils';

const BookDescription = ({ description }: { description: string }) => {
  return (
    <div className="border-t border-primary-dark/30 pt-4">
      <h3 className="font-semibold mb-2 text-primary-dark">Beskrivning</h3>
      <p className="whitespace-pre-line">{stripHtmlTags(description)}</p>
    </div>
  );
};

export default BookDescription;
