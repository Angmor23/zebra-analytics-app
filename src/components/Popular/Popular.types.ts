import { IAppState } from '../../containers/App/App.types';

export interface IPopularProps {
  appState: IAppState;
}

export interface IPopularState {
  dataArray: IDataItem[][];
  error: string | null;
  loaded: boolean;
}

export interface IDataItem {
  dimensions: IDimension[];
  metrics: number[];
}

interface IDimension {
  name: string;
}
