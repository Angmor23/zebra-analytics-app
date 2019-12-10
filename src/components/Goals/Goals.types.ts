import { IAppState } from '../../containers/App/App.types';
export { IGoal } from '../../containers/App/App.types';
import { IApiDataItem } from '../../types';
export { IApiDataItem } from '../../types';

export interface IGoalsProps {
  appState: IAppState;
}

export interface IGoalsState {
  loaded: boolean;
  error: string | null;
  dataArray: IApiDataItem[];
}
