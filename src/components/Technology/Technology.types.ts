import { IAppState } from '../../containers/App/App.types';

export interface ITechnologyProps {
  appState: IAppState;
}

export interface ITechnologyState {
  dataArray: IDataItem[][];
  error: string | null;
  loaded: boolean;
}

export interface IDataItem {
  dimensions: IDimensions[];
  metrics: number[];
}

interface IDimensions {
  name: string;
}
