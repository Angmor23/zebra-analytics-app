import { IAppState } from '../../containers/App/App.types';

export interface IVisitsProps {
  appState: IAppState;
}

export interface IVisitsState {
  totals: number[][];
  loaded: boolean;
  error: string | null;
}
