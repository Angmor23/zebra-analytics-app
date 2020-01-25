import { IAppState } from '../../containers/App/App.types';

export interface IDownloadsProps {
  appState: IAppState;
}

export interface IDownloadsState {
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
