import { create } from 'zustand';
import {
  type GameDataState,
  type KumohaClientMeta,
  KumohaEngine,
  type KumohaThemeUserPrefs
} from '@tanuden/kumoha';
import { type KumohaArisuData } from './hooks/use-init-kumoha';

export const KumohaArisuDataDefaults: KumohaArisuData = {
  gameData: {} as GameDataState['gameData'],
  gameState: {} as GameDataState['gameState'],
  pluginData: {} as GameDataState['pluginData']
};

export const KumohaClientDefaults: KumohaClientMeta = {
  connected: false,
  state: 'disconnected',
  connection: undefined
};

type KumohaStore = {
  engine?: KumohaEngine;
  clientMetadata: KumohaClientMeta;
  data: KumohaArisuData;
  themeUserPrefs: KumohaThemeUserPrefs;
};

type KumohaStoreFunctions = {
  _setEngine: (engine: KumohaEngine | undefined) => void;
  setClientMetadata: (clientMetadata: KumohaClientMeta) => void;
  setData: (data: KumohaArisuData) => void;
  setThemeUserPrefs: (themeUserPrefs: KumohaThemeUserPrefs) => void;
};

export const useKumohaInternalStore = create<
  KumohaStore & KumohaStoreFunctions
>((set) => ({
  engine: undefined,
  _setEngine: (engine) => set({ engine }),
  clientMetadata: KumohaClientDefaults,
  setClientMetadata: (clientMetadata) => set({ clientMetadata }),
  data: KumohaArisuDataDefaults as KumohaArisuData,
  setData: (data) => set({ data }),
  themeUserPrefs: {},
  setThemeUserPrefs: (themeUserPrefs) => set({ themeUserPrefs })
}));
