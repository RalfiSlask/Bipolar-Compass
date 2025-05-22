import { ORGANIZATIONS } from '@/app/data/organizations';
import Organization from './Organization';

const Organizations = () => {
  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
      {ORGANIZATIONS.map((organization) => (
        <Organization key={organization.id} organization={organization} />
      ))}
    </nav>
  );
};

export default Organizations;
