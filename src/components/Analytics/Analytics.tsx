import * as React from 'react';
import { config } from '../../config';
import * as T from './Analytics.types';

const Analytics: React.FunctionComponent<T.IAnalyticsProps> = props => {
  const [anState, setAnState] = React.useState({
    loaded: false,
    metricsNames: [],
    metricsValues: [],
  });

  const { counter, token, dateFrom, dateTo } = props.data;
  const { api, metrics } = config;

  const getMetrics = (): string => {
    return metrics.join(',');
  };

  const getFormatTime = (second: number): string => {
    const minunts = second / 60;
    const rounded = minunts.toFixed(2);
    const minSec = rounded.split('.');
    const formatedSec = (Number(minSec[1]) * 0.6).toFixed(0);

    return `${minSec[0]}:${formatedSec}`;
  };

  const apiURL = `${api}?id=${counter}&date1=${dateFrom}&date2=${dateTo}&metrics=${getMetrics()}`;

  React.useEffect(() => {
    window
      .fetch(apiURL, {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      })
      .then(response => {
        return response.json();
      })
      .then(apiJSON => {
        console.log(apiJSON);
        setAnState({
          loaded: true,
          metricsNames: apiJSON.query.metrics,
          metricsValues: apiJSON.data[0].metrics,
        });
      });
  }, []);

  return anState.loaded ? (
    <React.Fragment>
      <table>
        <tbody>
          {anState.metricsNames.map((metric: string, i: number) => {
            const metricsVal: number[] = anState.metricsValues[i];

            if (metric === 'ym:s:pageDepth' || metric === 'ym:s:bounceRate') {
              return (
                <tr key={metric}>
                  <td>{metric}</td>
                  <td>
                    {(
                      metricsVal.reduce((sum: number, current: number) => {
                        return sum + current;
                      }, 0) / metricsVal.length
                    ).toFixed(1)}
                  </td>
                </tr>
              );
            }

            if (metric === 'ym:s:avgVisitDurationSeconds') {
              return (
                <tr key={metric}>
                  <td>{metric}</td>
                  <td>
                    {getFormatTime(
                      metricsVal.reduce((sum: number, current: number) => sum + current, 0) /
                        metricsVal.length
                    )}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={metric}>
                <td>{metric}</td>
                <td>{metricsVal.reduce((sum: number, current: number) => sum + current, 0)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
};

export default Analytics;
