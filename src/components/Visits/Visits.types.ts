import { IApiDataItem, IApiQuery } from '../../types';
export { IApiDataItem, IApiQuery } from '../../types';

export interface IVisitsProps {
  data: {
    counter: string;
    dateFrom: string;
    dateTo: string;
    reportName: string;
    token: string;
  };
}

export interface IVisitsState {
  dataArray: IApiDataItem[];
  loaded: boolean;
  queryArray: IApiQuery[];
}
