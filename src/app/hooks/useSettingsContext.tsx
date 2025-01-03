import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      'useSettingsContext måste användas inom en SettingsProvider'
    );
  }

  return context;
};

export default useSettingsContext;
