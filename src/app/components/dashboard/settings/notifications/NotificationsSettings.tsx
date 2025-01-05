import useSettingsContext from '@/app/hooks/useSettingsContext';
import UserEmailNotificationCheckbox from '../UserEmailNotificationCheckbox';

const NotificationsSettings = () => {
  const { user } = useSettingsContext();

  if (!user) {
    throw new Error('Användardata saknas');
  }

  return (
    <div>
      <UserEmailNotificationCheckbox user={user} />
    </div>
  );
};

export default NotificationsSettings;
