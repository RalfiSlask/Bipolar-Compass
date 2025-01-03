import axios from 'axios';
import { createContext, useState } from 'react';
import { IRelative } from '../types/relative';
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
  deleteAccount: (email: string) => Promise<void>;
  saveRelativesSettings: (
    relatives: IRelative[],
    email: string
  ) => Promise<void>;
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

  const deleteAccount = async (email: string): Promise<void> => {
    try {
      await axios.delete('/api/settings/delete', {
        data: { email },
      });
    } catch (err) {
      console.error('could not delete account: ', err);
      throw new Error('Kunde inte ta bort kontot');
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
    } catch (err) {
      console.error('could not save settings: ', err);
      throw new Error('Kunde inte spara anhöriginställningarna');
    }
  };

  const settingsData = {
    saveProfileSettings,
    deleteAccount,
    saveRelativesSettings,
  };

  return (
    <SettingsContext.Provider value={settingsData}>
      {children}
    </SettingsContext.Provider>
  );
};
