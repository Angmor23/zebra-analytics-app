export interface IAppState {
  goals: IGoal[];
  contacts?: string;
  counter?: string;
  created?: string;
  dateFrom?: string;
  dateTo?: string;
  lang: 'RU' | 'EN';
  opening?: string;
  reportName?: string;
  token: string;
  saved: boolean;
}

export interface IGoal {
  [key: string]: string | null;
  id: string | null;
  name: string | null;
}
