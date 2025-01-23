import useSettingsContext from '@/app/hooks/useSettingsContext';
import { IUser } from '@/app/types/user';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface IUserEmailNotificationCheckboxProps {
  user: IUser;
}

const UserEmailNotificationCheckbox = ({
  user,
}: IUserEmailNotificationCheckboxProps) => {
  const { saveNotificationSettings, user: currentUser } = useSettingsContext();
  const [notifications, setNotifications] = useState(
    currentUser?.settings.notifications_enabled ?? false
  );
  const [relativeNotifications, setRelativeNotifications] = useState(
    user.settings.relatives.map((relative) => relative.email_enabled ?? false)
  );

  const handleMainToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(e.target.checked);
  };

  const handleRelativeToggle =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newRelativeNotifications = [...relativeNotifications];
      newRelativeNotifications[index] = e.target.checked;
      setRelativeNotifications(newRelativeNotifications);
    };

  const handleSave = async () => {
    try {
      const updatedRelatives = user.settings.relatives.map(
        (relative, index) => ({
          ...relative,
          email_enabled: relativeNotifications[index],
        })
      );

      await saveNotificationSettings(notifications, updatedRelatives);
      toast.success('Notifikationer sparade');
      console.log('saved notification settings');
    } catch (error) {
      toast.error('Kunde inte spara notifikationer');
      console.error('Failed to save notification settings:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 p-4 rounded-lg border border-gray-200 max-w-[800px]">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="email-notification" className="font-medium">
              Email notifikationer
            </label>
            <p className="text-sm text-gray-600">
              Bipolärkompassen kan skicka dig email när det är dags att ta dina
              mediciner
            </p>
          </div>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              id="email-notification"
              className="primary-checkbox"
              checked={notifications}
              onChange={handleMainToggle}
              aria-label="Aktivera email notifikationer"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 rounded-lg border border-gray-200 mt-4 max-w-[800px]">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium">Anhöriga</h2>
          <p className="text-sm text-gray-600">
            Här kan du välja om du vill skicka notifikationer till dina
            närstående
          </p>
        </div>

        {user.settings.relatives.length > 0 ? (
          <div className="space-y-3">
            {user.settings.relatives.map((relative, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{relative.email}</span>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    id={`relative-notification-${index}`}
                    className="primary-checkbox"
                    checked={relativeNotifications[index]}
                    onChange={handleRelativeToggle(index)}
                    aria-label={`Aktivera notifikationer för ${relative.email}`}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Du har inte lagt till några e-postadresser för närstående än. Gå
            till sidan för närstående för att lägga till kontakter.
          </p>
        )}
      </div>
      <button className="primary-button mt-6" onClick={handleSave}>
        Spara dina ändringar
      </button>
    </div>
  );
};

export default UserEmailNotificationCheckbox;
