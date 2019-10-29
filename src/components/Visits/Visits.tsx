import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import { aSum, fetchAPI, getValueByMetric } from '../../utils';
import * as s from './Visits.css';
import * as T from './Visits.types';

const { parts } = config;

const Visits: React.FunctionComponent<T.IVisitsProps> = ({ data }) => {
  const { counter, dateFrom, dateTo, token } = data;
  const thisPart = parts.visits;
  const { subParts, timeout = 0 } = thisPart;
  const glossary: { [key: string]: string } = config.glossary;
  const [state, setState] = React.useState<T.IVisitsState>({
    dataArray: [],
    error: null,
    loaded: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      let index = 0;
      const indexOfLast = subParts.length - 1;
      const getData = (m: string[], f: string) => {
        fetchAPI('', counter, dateFrom, dateTo, '', f, m, token)
          .then(apiJSON => {
            const isLast = index === indexOfLast;
            const apiData: T.IApiDataItem[] = apiJSON.data;

            state.dataArray.push(apiData[0]);

            setState(prevState => {
              if (isLast) {
                return {
                  dataArray: [...state.dataArray],
                  error: null,
                  loaded: true,
                };
              }

              index += 1;
              getData(subParts[index].metrics, subParts[index].filters);

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

      getData(subParts[index].metrics, subParts[index].filters);
    }, timeout);
  }, []);

  return (
    <section>
      {state.loaded ? (
        !state.error ? (
          <React.Fragment>
            <Typography className={s.caption} component="h2" variant="h6">
              {thisPart.name}
            </Typography>

            {thisPart.subParts.map((subPart, i: number) => {
              const thisDataArray = state.dataArray[i];
              const thisMetrics = thisDataArray.metrics;

              return (
                <Table className={s.table} key={subPart.name}>
                  <TableHead>
                    <TableRow>
                      <TableCell>{subPart.name}</TableCell>
                      <TableCell>Показатели</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {subPart.metrics.map((metric, k: number) => {
                      // Number of elements in current row
                      const length = thisMetrics[k].length;

                      // Sum of all elements in current row
                      const total = aSum(thisMetrics[k]);

                      return (
                        <TableRow key={metric + i}>
                          <TableCell>{glossary[metric]}</TableCell>
                          <TableCell>{getValueByMetric(length, total, metric)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              );
            })}
          </React.Fragment>
        ) : (
          <div className={s.error}>{state.error}</div>
        )
      ) : (
        <div className={s.loader}>
          Загрзка таблицы {thisPart.name}
          <LinearProgress />
        </div>
      )}
    </section>
  );
};

export default Visits;
