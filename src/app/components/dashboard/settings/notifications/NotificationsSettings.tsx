import useSettingsContext from '@/app/hooks/useSettingsContext';
import UserEmailNotificationCheckbox from '../UserEmailNotificationCheckbox';

const NotificationsSettings = () => {
  const { user } = useSettingsContext();

  if (!user) {
    throw new Error('Användardata saknas');
  }

  return (
    <div
      className="max-w-2xl p-6 flex flex-col items-center gap-10"
      aria-labelledby="notifications-heading"
    >
      <div className="flex flex-col gap-3 text-center">
        <h2
          id="notifications-heading"
          className="text-3xl font-semibold text-primary-dark"
        >
          Notifieringar
        </h2>
        <p className="text-sm text-gray-600">
          Hantera dina inställningar för notifieringar och påminnelser.
        </p>
      </div>

      <div className="w-full">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <UserEmailNotificationCheckbox user={user} />
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
