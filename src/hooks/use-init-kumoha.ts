import { useEffect, useMemo } from 'react';
import {
  type GameDataState,
  Kumoha,
  type KumohaClientMeta,
  type KumohaEngineOptions
} from '@tanuden/kumoha';
import { updatedDiff } from 'deep-object-diff';
import { useKumohaInternalStore } from '../store';

export interface KumohaArisuData {
  gameData: GameDataState['gameData'];
  gameState: GameDataState['gameState'];
  pluginData: GameDataState['pluginData'];
}

export type InitializeKumohaOptions = KumohaEngineOptions & {
  testData?: KumohaArisuData;
};

export const useInitializeKumoha = (
  uri: string,
  options?: InitializeKumohaOptions
) => {
  // const [alreadyInit, setAlreadyInit] = useState(true); // Intentional default to true. Don't attempt to trigger anything until we confirm that there is an engine.
  const {
    engine,
    _setEngine,
    clientMetadata,
    setClientMetadata,
    setData,
    setThemeUserPrefs
  } = useKumohaInternalStore();

  const kumoha = useMemo(() => {
    if (engine) return engine;
    // Enforce single instance of KumohaEngine
    const kumohaEngine = Kumoha(uri, {
      socketOptions: {
        autoConnect: options?.testData ? false : true,
        forceNew: true
      }
    });
    _setEngine(kumohaEngine);

    return kumohaEngine;
  }, [options, uri, _setEngine]);

  useEffect(() => {
    if (options?.testData) {
      console.info(
        `Kumoha is in test mode. No connection will be made. クモハエンジンはテストモードです。サーバーに接続は行われません。`
      );
      setData(options.testData);

      return;
    }

    const gameDataListener = kumoha.arisuListener((gameData) => {
      setData(options?.testData || gameData);
    });

    const userPrefsListener = kumoha.userPrefsListener((themeUserPrefs) => {
      setThemeUserPrefs(themeUserPrefs || {});
    });

    const clientMetaListener = kumoha.clientMetaListener(
      (incomingClientMetadata) => {
        const diff = updatedDiff(
          clientMetadata || {},
          incomingClientMetadata
        ) as KumohaClientMeta;

        if (Object.keys(diff).length > 0) {
          setClientMetadata({
            ...clientMetadata,
            ...diff
          });
        }
      }
    );
    // }

    return () => {
      gameDataListener?.off();
      userPrefsListener?.off();
      clientMetaListener?.off();
    };
  }, [options, kumoha]);

  return kumoha;
};
