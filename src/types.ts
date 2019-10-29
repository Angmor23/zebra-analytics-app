export interface IApiDataItem {
  dimensions: IDimensions[];
  metrics: number[][];
}

interface IDimensions {
  name: string;
}
