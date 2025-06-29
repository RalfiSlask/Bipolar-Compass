import { IContactCard } from '@/app/types/general';
import { FaPhone } from 'react-icons/fa';
import ContactCard from './ContactCard';
import SectionTitle from './headings/SectionTitle';

interface ContactCardsContainerProps {
  contacts: IContactCard[];
  title?: string;
}

const ContactCardsContainer = ({
  contacts,
  title = 'Viktiga kontakter',
}: ContactCardsContainerProps) => {
  return (
    <div className="content-container">
      <SectionTitle icon={<FaPhone />} iconClasses="text-2xl">
        {title}
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactCardsContainer;
