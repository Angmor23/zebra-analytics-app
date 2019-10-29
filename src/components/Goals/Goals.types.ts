import { IGoal } from '../../containers/App/App.types';
export { IGoal } from '../../containers/App/App.types';
import { IApiDataItem } from '../../types';
export { IApiDataItem } from '../../types';

export interface IGoalsProps {
  data: {
    counter: string;
    dateFrom: string;
    dateTo: string;
    goals: IGoal[];
    reportName: string;
    token: string;
  };
}

export interface IGoalsState {
  loaded: boolean;
  error: string | null;
  dataArray: IApiDataItem[];
}
