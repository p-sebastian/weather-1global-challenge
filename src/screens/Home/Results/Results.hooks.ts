import {useQuery} from '@tanstack/react-query';
import {TLocation} from '../../../types/TLocation';
import {useGlobalContainer} from '../../../providers/global.provider';

export const useResults = () => {
  const {search} = useGlobalContainer();

  const {
    error,
    isLoading,
    data = [],
  } = useQuery<TLocation[]>({
    queryKey: ['/search.json', {q: search}],
    enabled: Boolean(search),
  });

  return {error, isLoading, data};
};

export const useResultItem = (item: TLocation) => {
  const {addCity, setSearch, state} = useGlobalContainer();

  const onPress = () => {
    addCity(String(item.id));
    setSearch('');
  };

  const disabled = state.cities.findIndex(x => x === String(item.id)) > -1;

  return {onPress, disabled};
};
