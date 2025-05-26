import { useLayoutEffect, useMemo, useState } from 'react';
import {
  type GameDataState,
  Kumoha,
  type KumohaClientMeta,
  type KumohaEngineOptions,
  type KumohaListener
} from '@tanuden/kumoha';
import { updatedDiff } from 'deep-object-diff';
import { useKumohaInternalStore } from '../store';

export interface KumohaArisuData {
  gameData: GameDataState['gameData'];
  gameState: GameDataState['gameState'];
  pluginData: GameDataState['pluginData'];
}

export type InitializeKumohaOptions = KumohaEngineOptions & {
  themeName?: string;
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
      themeName: options?.themeName,
      socketOptions: {
        autoConnect: options?.testData ? false : true,
        forceNew: true
      }
    });
    _setEngine(kumohaEngine);

    return kumohaEngine;
  }, [engine, uri, options?.themeName, options?.testData, _setEngine]);

  useLayoutEffect(() => {
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

    return () => {
      gameDataListener?.off();
    };
  }, [kumoha, options?.testData, setData]);

  useLayoutEffect(() => {
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
    return () => {
      clientMetaListener?.off();
    };
  }, [clientMetadata, kumoha, setClientMetadata]);

  const [themeUserPrefsFetched, setThemeUserPrefsFetched] =
    useState<boolean>(false);

  useLayoutEffect(() => {
    let userPrefsListener: KumohaListener | undefined;
    if (clientMetadata.state === 'ok') {
      userPrefsListener = kumoha.userPrefsListener((themeUserPrefs) => {
        setThemeUserPrefs(themeUserPrefs || {});
      });

      // Initial user prefs fetch
      if (!themeUserPrefsFetched) {
        kumoha.getUserPrefs().then((prefs) => {
          setThemeUserPrefs(prefs || {});
        });
        setThemeUserPrefsFetched(true);
      }
    }

    return () => {
      userPrefsListener?.off();
    };
  }, [clientMetadata.state, themeUserPrefsFetched, kumoha, setThemeUserPrefs]);

  return kumoha;
};
