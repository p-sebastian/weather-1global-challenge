import {it, expect, describe} from '@jest/globals';
import {renderHook, act} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {GlobalProvider, useGlobalContainer} from '../global.provider';

const client = new QueryClient();
const wrapper = ({children}: any) => (
  <QueryClientProvider client={client}>
    <GlobalProvider>{children}</GlobalProvider>
  </QueryClientProvider>
);

describe('Global.provider', () => {
  it('Adds and removes cities', () => {
    const {result} = renderHook(() => useGlobalContainer(), {wrapper});
    expect(result.current.state.cities).toEqual([]);
    act(() => {
      result.current.addCity('1');
      result.current.addCity('2');
    });
    expect(result.current.state.cities).toEqual(['2', '1']);
    act(() => {
      result.current.removeCity('1');
    });
    expect(result.current.state.cities).toEqual(['2']);
    act(() => {
      result.current.removeCity('2');
    });
    expect(result.current.state.cities).toEqual([]);
  });

  it('shouldnt add duplicate cities', () => {
    const {result} = renderHook(() => useGlobalContainer(), {wrapper});
    expect(result.current.state.cities).toEqual([]);
    act(() => {
      result.current.addCity('1');
      result.current.addCity('1');
      result.current.addCity('1');
    });
    expect(result.current.state.cities).toEqual(['1']);
  });
});
