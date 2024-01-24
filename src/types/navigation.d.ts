import {TRootStackParamList} from '../screens/Root.interface';

export interface TRootParamList extends TRootStackParamList {}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TRootParamList {}
  }
}
