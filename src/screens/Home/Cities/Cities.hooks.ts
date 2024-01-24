import {useQuery, useQueryClient} from '@tanstack/react-query';
import {TForecast} from '../../../types/TForecast';
import {useCallback} from 'react';
import {useGlobalContainer} from '../../../providers/global.provider';

export const useCity = (id: string) => {
  const {removeCity} = useGlobalContainer();
  const {isError, isPending, data} = useQuery<TForecast>({
    queryKey: ['/forecast.json', {q: `id:${id}`, days: 5}],
  });

  const onRemove = useCallback(() => {
    removeCity(id);
  }, [id, removeCity]);

  return {
    isError,
    isPending,
    data,
    onRemove,
  };
};

export const usePullToRefresh = () => {
  const client = useQueryClient();
  return useCallback(() => client.invalidateQueries(), [client]);
};
