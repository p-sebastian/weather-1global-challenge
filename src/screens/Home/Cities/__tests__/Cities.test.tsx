import {it, expect, describe} from '@jest/globals';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {render, screen, waitFor} from '@testing-library/react-native';
import {GlobalProvider} from '../../../../providers/global.provider';
import nock from 'nock';
import {Cities} from '../Cities';
import forecast from './forecast.json';
import {defaultQueryFn} from '../../../../App.config';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      // Fixes "Jest did not exit one second after the test run has completed."
      gcTime: Infinity,
    },
  },
});

const wrapper = ({children}: any) => (
  <QueryClientProvider client={client}>
    <GlobalProvider>{children}</GlobalProvider>
  </QueryClientProvider>
);

describe('Cities', () => {
  it('should display no cities', async () => {
    render(<Cities cities={[]} />, {wrapper});
  });

  it('should display Berlin as a city', async () => {
    nock('https://api.weatherapi.com/v1')
      .get(/.*forecast.*/)
      .query(true)
      .reply(200, forecast);
    render(<Cities cities={['1']} />, {wrapper});

    expect(screen.getByAccessibilityHint('loading')).toBeOnTheScreen();

    await waitFor(async () => {
      const elm = await screen.findByText('Berlin, Germany');
      return expect(elm).toBeOnTheScreen();
    });
  });
});
