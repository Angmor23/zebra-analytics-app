export interface IPopularProps {
  data: {
    counter: string;
    dateFrom: string;
    dateTo: string;
    token: string;
  };
}

export interface IPopularState {
  dataArray: IDataItem[][];
  error: string | null;
  loaded: boolean;
}

export interface IDataItem {
  dimensions: IDimension[];
  metrics: number[];
}

interface IDimension {
  name: string;
}
