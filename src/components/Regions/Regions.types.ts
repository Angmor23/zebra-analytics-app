import { IAppState } from '../../containers/App/App.types';

export interface IRegionsProps {
  appState: IAppState;
}

export interface IRegionsState {
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
