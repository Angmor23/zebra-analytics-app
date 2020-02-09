import { config } from '../config';

const getFormatTime = (time: number): string => {
  const min = Math.floor(time / 60);
  const sec = (time % 60).toFixed().padStart(2, '0');
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
  const metricsParam = metrics.length ? `&metrics=${metrics.join()}` : '';
  const filtersParams = filters ? `&filters=${filters}` : '';
  const response = await window.fetch(
    `${apiUrl}&id=${counter}&date1=${dateFrom}&date2=${dateTo}${metricsParam}${filtersParams}${extraParams}`,
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

  if (metric === 'ym:s:bounceRate') {
    result = `${(value / n).toFixed(1).replace('.', ',')} %`;
  }

  if (['ym:s:pageDepth', 'ym:s:goal<goal_id>conversionRate'].indexOf(metric) > -1) {
    result = (value / n).toFixed(2).replace('.', ',');
  }

  return result;
};

export const getFilters = (filter1: string | string[], urlFilter: string): string => {
  let result = [];

  const isNone = urlFilter[0] === '!';

  if (Array.isArray(filter1)) {
    result = filter1;
  } else {
    result.push(filter1);
  }

  return result
    .concat(
      urlFilter ? `(ym:pv:URL${isNone ? '!*' : '=*'}'${urlFilter.slice(Number(isNone))}')` : []
    )
    .filter(item => Boolean(item))
    .join(' AND ');
};
