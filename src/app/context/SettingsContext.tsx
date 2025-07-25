import axios from 'axios';
import { createContext, useCallback, useState } from 'react';
import { IHealthcareProvider } from '../types/healthcareProvider';
import { IRelative } from '../types/relative';
import { IUser } from '../types/user';

interface IFormValues {
  email: string;
  age: number;
  gender: string;
}

interface ISettingsContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  fetchUserData: (email: string) => Promise<void>;
  saveProfileSettings: (
    values: IFormValues,
    originalEmail: string
  ) => Promise<void>;
  deleteAccount: (userId: string) => Promise<void>;
  saveRelativesSettings: (
    relatives: IRelative[],
    email: string
  ) => Promise<void>;
  saveNotificationSettings: (
    emailNotification: boolean,
    relatives: IRelative[]
  ) => Promise<void>;
  saveHealthcareProvidersSettings: (
    healthcareProviders: IHealthcareProvider[],
    email: string
  ) => Promise<void>;
  savePasswordSettings: (
    currentPassword: string,
    newPassword: string,
    email: string
  ) => Promise<void>;
  saveProfileAvatar: (avatarUrl: string) => Promise<void>;
  deleteProfileAvatar: () => Promise<void>;
}

export const SettingsContext = createContext<ISettingsContext | undefined>(
  undefined
);

interface IApiResponse {
  message: string;
  user: IUser;
}

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post<{ user: IUser }>('/api/settings/', {
        email,
      });
      if (response && response.data) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error('could not fetch user data: ', err);
      setUser(null);
      throw new Error('Could not fetch user data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProfileSettings = async (
    values: IFormValues,
    originalEmail: string
  ): Promise<void> => {
    try {
      const response = await axios.put<IApiResponse>(
        '/api/settings/save/profile',
        {
          values,
          originalEmail,
        }
      );

      setUser(response.data.user);
    } catch (err) {
      console.error('could not save settings: ', err);
      throw new Error('Could not save settings');
    }
  };

  const saveProfileAvatar = async (avatarUrl: string): Promise<void> => {
    try {
      await axios.put('/api/settings/save/profile/avatar', {
        email: user?.email,
        avatarUrl,
      });

      if (user) {
        setUser({
          ...user,
          profile: {
            ...user.profile,
            avatarUrl,
          },
        });
      }
    } catch (err) {
      console.error('could not save avatar: ', err);
      throw new Error('Could not save avatar');
    }
  };

  const saveNotificationSettings = async (
    emailNotification: boolean,
    relatives: IRelative[]
  ): Promise<void> => {
    try {
      const response = await axios.post('/api/settings/save/notifications', {
        emailNotification,
        email: user?.email,
        relativeNotifications: relatives,
      });

      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error('could not save notification settings: ', err);
      throw new Error('Could not save notifications');
    }
  };

  const deleteAccount = async (userId: string): Promise<void> => {
    try {
      await axios.delete('/api/settings/delete', {
        data: { userId },
      });
      setUser(null);
    } catch (err) {
      console.error('could not delete account: ', err);
      throw new Error('Could not delete account');
    }
  };

  const saveRelativesSettings = async (
    relatives: IRelative[],
    email: string
  ): Promise<void> => {
    try {
      await axios.put('/api/settings/save/relatives', {
        relatives,
        email,
      });
      if (user) {
        setUser({
          ...user,
          settings: {
            ...user.settings,
            relatives,
          },
        });
      }
    } catch (err) {
      console.error('could not save settings: ', err);
      throw new Error('Could not save relatives settings');
    }
  };

  const saveHealthcareProvidersSettings = async (
    healthcareProviders: IHealthcareProvider[],
    email: string
  ): Promise<void> => {
    try {
      await axios.put('/api/settings/save/healthcare_providers', {
        healthcareProviders,
        email,
      });
      if (user) {
        setUser({
          ...user,
          settings: {
            ...user.settings,
            healthcare_providers: healthcareProviders,
          },
        });
      }
    } catch (err) {
      console.error('could not save healthcare providers settings: ', err);
      throw new Error('Could not save healthcare providers settings');
    }
  };

  const savePasswordSettings = async (
    currentPassword: string,
    newPassword: string,
    email: string
  ): Promise<void> => {
    try {
      await axios.put('/api/settings/save/security/password', {
        currentPassword,
        newPassword,
        email,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            'Ett fel uppstod vid uppdatering av lösenord'
        );
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const deleteProfileAvatar = async (): Promise<void> => {
    try {
      await axios.delete('/api/settings/delete/avatar', {
        data: { email: user?.email },
      });

      if (user) {
        setUser({
          ...user,
          profile: {
            ...user.profile,
            avatarUrl: '',
          },
        });
      }
    } catch (err) {
      console.error('could not delete avatar: ', err);
      throw new Error('Could not delete avatar');
    }
  };

  const settingsData: ISettingsContext = {
    user,
    setUser,
    isLoading,
    fetchUserData,
    saveProfileSettings,
    deleteAccount,
    saveRelativesSettings,
    saveHealthcareProvidersSettings,
    savePasswordSettings,
    saveNotificationSettings,
    saveProfileAvatar,
    deleteProfileAvatar,
  };

  return (
    <SettingsContext.Provider value={settingsData}>
      {children}
    </SettingsContext.Provider>
  );
};
