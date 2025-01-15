import { settingsTabs } from '@/app/data/settingsTabs';

interface IDashboardSettingsNavigationProps {
  changeActiveTab: (tab: string) => void;
  activeTab: string;
}

const DashboardSettingsNavigation = ({
  changeActiveTab,
  activeTab,
}: IDashboardSettingsNavigationProps) => {
  return (
    <nav
      className="border-b border-black"
      aria-label="Inställningar navigation"
    >
      <ul className="flex gap-8 list-none p-0 m-0">
        {settingsTabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => changeActiveTab(tab.id)}
              className={`py-4 px-2 text-lg border-b-2 transition-colors focus:outline-none focus:ring-2
                ${
                  activeTab === tab.id
                    ? 'active border-black'
                    : 'border-transparent'
                }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardSettingsNavigation;
