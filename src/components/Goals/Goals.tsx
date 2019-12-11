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
import * as s from './Goals.css';
import * as T from './Goals.types';

const { parts } = config;
const glossary: { [key: string]: string } = config.glossary;

const Goals: React.FunctionComponent<T.IGoalsProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, goals, urlFilter } = appState;
  const thisPart = parts.goals;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.IGoalsState>({
    dataArray: [],
    error: null,
    loaded: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      const subPart = subParts[0];
      const { metrics } = subPart;

      goals.forEach((goal, i) => {
        let filters = '';
        if (subPart.filters && urlFilter) {
          filters = `${subPart.filters} AND EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (!subPart.filters && urlFilter) {
          filters = `EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (subPart.filters && !urlFilter) {
          filters = subPart.filters;
        }

        fetchAPI('', counter, dateFrom, dateTo, `&goal_id=${goal.id}`, filters, metrics, token)
          .then(apiJSON => {
            const isLast = i === goals.length - 1;
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
      });
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

            {thisPart.subParts.map(subPart => {
              return (
                <Table key={subPart.name}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Цель</TableCell>
                      {/* Выводим названия столбцов по словарю метрик: */
                      subPart.metrics.map(metric => {
                        return <TableCell key={metric}>{glossary[metric]}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* Выводим строку цели, сначала название цели, а затем знацения метрик */
                    goals.map((goal, i: number) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{goal.name}</TableCell>

                          {/* Заполняем ячейки суммой значений (длина массива зависит от группировки по времени) */
                          state.dataArray[i].metrics.map((metric, k: number) => {
                            return (
                              <TableCell key={k}>
                                {getValueByMetric(metric.length, aSum(metric), subPart.metrics[k])}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
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

export default Goals;
