import { useKumohaInternalStore } from '../store';
import type { KumohaROMDataset } from '@tanuden/kumoha';

export const useKumohaROM = (): KumohaROMDataset => {
  const { romData } = useKumohaInternalStore();
  return romData;
};
