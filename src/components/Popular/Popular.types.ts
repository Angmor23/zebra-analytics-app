export interface IPopularProps {
  data: {
    counter: string;
    dateFrom: string;
    dateTo: string;
    token: string;
  };
}

export interface IPopularState {
  loaded: boolean;
  dataArray: IDataItem[][];
}

export interface IDataItem {
  dimensions: IDimension[];
  metrics: number[];
}

interface IDimension {
  name: string;
}
