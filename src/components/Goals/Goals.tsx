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

const Goals: React.FunctionComponent<T.IGoalsProps> = ({ data }) => {
  const { counter, dateFrom, dateTo, token, goals } = data;
  const thisPart = parts.goals;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.IGoalsState>({
    dataArray: [],
    loaded: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      let index = 0;
      const indexOfLast = goals.length - 1;
      const { metrics, filters } = subParts[0];
      const getData = (g: T.IGoal) => {
        fetchAPI(counter, dateFrom, dateTo, `&goal_id=${g.id}`, filters, metrics, token)
          .then(apiJSON => {
            const isLast = index === indexOfLast;
            const apiData: T.IApiDataItem[] = apiJSON.data;

            state.dataArray.push(apiData[0]);

            setState(prevState => {
              if (isLast) {
                return {
                  dataArray: [...state.dataArray],
                  loaded: true,
                };
              }

              index += 1;
              getData(goals[index]);

              return prevState;
            });
          })
          .catch(error => {
            window.console.error(error);
          });
      };

      getData(goals[0]);
    }, timeout);
  }, []);

  return (
    <React.Fragment>
      {state.loaded && (
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
      )}
    </React.Fragment>
  );
};

export default Goals;
