import LinearProgress from '@material-ui/core/LinearProgress';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import { aSum, fetchAPI } from '../../utils';
import * as s from './TrafficSource.css';
import * as T from './TrafficSource.types';

const { parts } = config;

const TrafficSource: React.FunctionComponent<T.ITrafficSourceProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, urlFilter } = appState;
  const thisPart = parts.trafficSource;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.ITrafficSourceState>({
    dataNames: [],
    error: null,
    loaded: false,
    values: [],
  });

  React.useEffect(() => {
    setTimeout(() => {
      let index = 0;
      let onePercent = 0;
      const indexOfLast = subParts.length - 1;

      const getData = () => {
        const subPart = subParts[index];
        const curMetrics: string[] = subPart.metrics;
        const curFilters: string = subPart.filters;

        let filters = '';

        if (curFilters && urlFilter) {
          filters = `${curFilters} AND EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (!curFilters && urlFilter) {
          filters = `EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (curFilters && !urlFilter) {
          filters = curFilters;
        }

        fetchAPI('', counter, dateFrom, dateTo, '', filters, curMetrics, token)
          .then(apiJSON => {
            const isLast = index === indexOfLast;
            const value = aSum(apiJSON.totals[0]);
            if (!index) onePercent = value / 100;
            const valuePercens = index ? value / onePercent : 100;

            setState(prevState => {
              state.dataNames.push(subPart.dataName);
              state.values.push(valuePercens);

              if (isLast) {
                return {
                  ...state,
                  error: null,
                  loaded: true,
                };
              }

              index += 1;
              getData();

              return prevState;
            });
          })
          .catch(error => {
            window.console.error(error);
            setState({
              ...state,
              error: `Ошибка при загрузке таблицы "${thisPart.name}"`,
              loaded: true,
            });
          });
      };

      getData();
    }, timeout);
  }, []);

  return (
    <React.Fragment>
      {state.loaded ? (
        !state.error ? (
          <section>
            <Typography className={s.caption} component="h2" variant="h6">
              {thisPart.name}
            </Typography>
            {thisPart.subParts.map((subPart, n: number) => {
              return (
                <div key={n}>
                  <span>{subPart.name}</span>:<span>{state.values[n]}</span>
                </div>
              );
            })}
          </section>
        ) : (
          <div className={s.error}>{state.error}</div>
        )
      ) : (
        <div className={s.loader}>
          Загрзка таблицы {thisPart.name}
          <LinearProgress />
        </div>
      )}
    </React.Fragment>
  );
};

export default TrafficSource;
