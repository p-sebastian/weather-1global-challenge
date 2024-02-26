import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useRef, useState} from 'react';
import {createContainer} from 'unstated-next';

const KEY = 'SAVED_CITIES';

const rehydrate = async (): Promise<string[]> => {
  try {
    const data: string[] | null = JSON.parse(
      (await AsyncStorage.getItem(KEY)) ?? '[]',
    );
    return data ?? [];
  } catch (e) {
    console.log('error getting storage data');
    return [];
  }
};

type TState = {
  cities: string[];
};
const useContainer = (initial?: string) => {
  const didHydrate = useRef(false);
  const [search, setSearch] = useState(initial ?? '');
  const [state, setState] = useState<TState>({cities: []});
  const {cities} = state;

  const addCity = useCallback((id: string) => {
    setState(x => ({
      ...x,
      cities: [id, ...x.cities].filter((v, i, a) => a.indexOf(v) === i),
    }));
  }, []);

  const removeCity = useCallback(
    (id: string) =>
      setState(x => ({...x, cities: x.cities.filter(y => y !== id)})),
    [],
  );

  useEffect(() => {
    if (!didHydrate.current) {
      return;
    }
    AsyncStorage.setItem(KEY, JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    (async () => {
      const cities = await rehydrate();
      if (cities.length) {
        setState(x => ({...x, cities}));
      }
      didHydrate.current = true;
    })();
  }, []);

  return {state, addCity, removeCity, search, setSearch};
};

const Container = createContainer(useContainer);

export const useGlobalContainer = Container.useContainer;
export const GlobalProvider = Container.Provider;
