import {QueryClient, QueryFunction, QueryKey} from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1';

export const defaultQueryFn: QueryFunction<unknown, QueryKey, never> = async ({
  queryKey,
}) => {
  const [path, args] = queryKey;
  const params = {
    ...(typeof args === 'object' ? args : null),
    key: '95b6d8b613b74b64a9a120647242401',
  };
  const response = await axios.get(`${BASE_URL}${path}`, {
    params,
  });

  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(response.data);
  }

  return response.data;
};

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
