import * as React from 'react';
import * as T from './Analytics.types';

const Analytics: React.FunctionComponent<T.IAnalyticsProps> = props => {
  const api = 'https://api-metrika.yandex.net';
  const { counter, token, dateFrom, dateTo } = props.data;

  window
    .fetch(
      `${api}/stat/v1/data/bytime?id=${counter}&date1=${dateFrom}&date2=${dateTo}&metrics=ym:s:users`,
      {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      }
    )
    .then(r => r.json())
    .then(metrikaApiJSON => metrikaApiJSON);

  return <>Analytics {token}</>;
};

export default Analytics;
