import { IAppState } from '../../containers/App/App.types';

export interface ITrafficSourceProps {
  appState: IAppState;
}

export interface ITrafficSourceState {
  dataArray: IDataArrayItem[];
  error: string | null;
  loaded: boolean;
}

export interface IDataArrayItem {
  dataRows: string[][];
}

export interface IRow {
  dimensions: string;
  filters: string;
  name: string;
}

export interface ISubPart {
  filters: string;
  metrics: string[];
  name: string;
}
