import { config } from '../config';

const getFormatTime = (sec: number): string => {
  return `${Math.floor(sec / 60)}:${Math.floor(sec % 60)}`;
};

export const aSum = (a: number[]): number => {
  return a.reduce((sum, current) => {
    return sum + current;
  }, 0);
};

export const fetchAPI = async (
  counter: string,
  dateFrom: string,
  dateTo: string,
  extraParams: string,
  filters: string,
  metrics: string[],
  token: string
) => {
  const response = await window.fetch(
    `${
      config.api
    }&id=${counter}&date1=${dateFrom}&date2=${dateTo}&metrics=${metrics.join()}&filters=${filters}${extraParams}`,
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
