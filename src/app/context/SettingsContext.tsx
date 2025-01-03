import axios from 'axios';
import { createContext, useState } from 'react';
import { IUser } from '../types/user';

interface IFormValues {
  email: string;
  age: number;
  gender: string;
}

interface ISettingsContext {
  saveProfileSettings: (
    values: IFormValues,
    originalEmail: string
  ) => Promise<IUser>;
}

export const SettingsContext = createContext<ISettingsContext | undefined>(
  undefined
);

export const SettingsProvider = ({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: IUser;
}) => {
  const [user, setUser] = useState<IUser>(userData);

  const saveProfileSettings = async (
    values: IFormValues,
    originalEmail: string
  ): Promise<IUser> => {
    try {
      const response = await axios.put('/api/settings/save/profile', {
        values,
        originalEmail,
      });

      const updatedUser = response.data;
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('could not save settings: ', err);
      throw new Error('Kunde inte spara inställningarna');
    }
  };

  const settingsData = {
    saveProfileSettings: saveProfileSettings,
  };

  return (
    <SettingsContext.Provider value={settingsData}>
      {children}
    </SettingsContext.Provider>
  );
};
