export interface IAppState {
  contacts: string;
  counter: string;
  created: string;
  dateFrom: string;
  dateTo: string;
  goals: IGoal[];
  lang: 'RU' | 'EN';
  opening: string;
  reportName: string;
  saved: boolean;
  token: string;
  urlFilter: string;
}

export interface IGoal {
  [key: string]: string | null;
  id: string | null;
  name: string | null;
}
