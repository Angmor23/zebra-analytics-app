import { IAppState } from '../../containers/App/App.types';

export interface ITrafficSourceProps {
  appState: IAppState;
}

export interface ITrafficSourceState {
  values: number[];
  dataNames: string[];
  error: string | null;
  loaded: boolean;
}
