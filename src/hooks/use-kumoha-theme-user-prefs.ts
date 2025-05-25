import { useKumohaInternalStore } from '../store';

export const useKumohaThemeUserPrefs = () => {
  const { themeUserPrefs } = useKumohaInternalStore();
  return themeUserPrefs;
};
