import { IAppState } from '../../containers/App/App.types';
import { IApiDataItem } from '../../types';
export { IApiDataItem } from '../../types';

export interface IVisitsProps {
  appState: IAppState;
}

export interface IVisitsState {
  dataArray: IApiDataItem[];
  loaded: boolean;
  error: string | null;
}
