import { IGoal } from '../../containers/App/App.types';

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
