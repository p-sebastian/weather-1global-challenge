import {it, expect, describe, afterEach, beforeEach} from '@jest/globals';
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react-native';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {defaultQueryFn} from '../../../App.config';
import {GlobalProvider} from '../../../providers/global.provider';
import nock from 'nock';
import {HomeScreen} from '../Home.screen';
import searchData from './search.json';
import forecast from '../Cities/__tests__/forecast.json';
import {useResults} from '../Results/Results.hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      // Fixes "Jest did not exit one second after the test run has completed."
      gcTime: Infinity,
    },
  },
});

const wrapper =
  (initial?: string) =>
  ({children}: any) =>
    (
      <QueryClientProvider client={client}>
        <GlobalProvider initialState={initial}>{children}</GlobalProvider>
      </QueryClientProvider>
    );

beforeEach(() => {
  nock('https://api.weatherapi.com/v1')
    .persist()
    .get(/.*search.*/)
    .query(true)
    .reply(200, searchData);

  nock('https://api.weatherapi.com/v1')
    .persist()
    .get(/.*forecast.*/)
    .query(true)
    .reply(200, forecast);
});

afterEach(() => {
  nock.cleanAll();
});

describe('Home', () => {
  it('should search for berlin and display results', async () => {
    const {result} = renderHook(() => useResults(), {wrapper: wrapper('berl')});
    expect(result.current.data.length).toBe(0);
    await waitFor(() => expect(result.current.data.length).toBeGreaterThan(0));
  });

  it('should search and add and display berlin as a city', async () => {
    render(<HomeScreen />, {wrapper: wrapper()});
    const search = screen.getByLabelText('search');
    fireEvent.changeText(search, 'test');

    const cities = await screen.findAllByRole('button', {name: 'add city'});
    expect(cities.length).toEqual(5);

    fireEvent.press(cities[0]);
    const btn = await screen.findByLabelText('remove city');
    expect(btn).toBeOnTheScreen();
    await AsyncStorage.clear();
  });

  it('should search, add and remove berlin', async () => {
    render(<HomeScreen />, {wrapper: wrapper()});
    const search = screen.getByLabelText('search');
    fireEvent.changeText(search, 'test');

    const cities = await screen.findAllByRole('button', {name: 'add city'});
    expect(cities.length).toEqual(5);

    fireEvent.press(cities[0]);
    const btn = await screen.findByLabelText('remove city');
    expect(btn).toBeOnTheScreen();

    fireEvent.press(await screen.findByLabelText('remove city'));

    expect(
      await screen.findByText('Please add a city under search'),
    ).toBeOnTheScreen();
  });
});
