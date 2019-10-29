import { config } from '../config';

const getFormatTime = (time: number): string => {
  const min = Math.floor(time / 60);
  const sec = String(Math.floor(time % 60)).padStart(2, '0');
  return `${min}:${sec}`;
};

export const aSum = (a: number[]): number => {
  return a.reduce((sum, current) => {
    return sum + current;
  }, 0);
};

export const fetchAPI = async (
  api: string,
  counter: string,
  dateFrom: string,
  dateTo: string,
  extraParams: string,
  filters: string,
  metrics: string[],
  token: string
) => {
  // По-умолчанию берем url из конфига, но в редких кейсах (популярные страницы) нужно передать иной url
  const apiUrl = api || config.api;
  const response = await window.fetch(
    `${apiUrl}&id=${counter}&date1=${dateFrom}&date2=${dateTo}&metrics=${metrics.join()}&filters=${filters}${extraParams}`,
    {
      headers: {
        Authorization: `OAuth ${token}`,
      },
    }
  );
  return response.json();
};

export const getValueByMetric = (n: number, value: number, metric: string): string => {
  let result = String(value);

  if (metric === 'ym:s:avgVisitDurationSeconds') {
    result = getFormatTime(value / n);
  }

  if (
    ['ym:s:pageDepth', 'ym:s:bounceRate', 'ym:s:goal<goal_id>conversionRate'].indexOf(metric) > -1
  ) {
    result = (value / n).toFixed(2).replace('.', ',');
  }

  return result;
};
