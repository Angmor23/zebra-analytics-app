import { IAppState } from '../../containers/App/App.types';

export interface ISearchPhrasesProps {
  appState: IAppState;
}

export interface ISearchPhrasesState {
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
  favicon: string;
  url: string;
}
