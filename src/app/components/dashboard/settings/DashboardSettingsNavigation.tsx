import { SETTINGS_TABS } from '@/app/data/dashboard/settingsTabs';

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
      className="border-b border-primary-dark flex justify-center items-center "
      aria-label="Inställningar navigation"
    >
      <ul className="flex gap-8 list-none p-0 m-0">
        {SETTINGS_TABS.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => changeActiveTab(tab.id)}
              className={`py-4 px-2 text-lg border-b-2  transition-colors focus:outline-none
                ${
                  activeTab === tab.id
                    ? 'active border-primary-dark text-primary-dark'
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
