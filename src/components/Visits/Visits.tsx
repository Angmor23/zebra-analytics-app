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
import * as commonStyles from '../../utils/styles.css';
import * as s from './Visits.css';
import * as T from './Visits.types';

const { parts } = config;

const Visits: React.FunctionComponent<T.IVisitsProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, urlFilter } = appState;
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
      const getTable = (mtrc: string[], f: string) => {
        let filters = '';
        if (f && urlFilter) {
          filters = `${f} AND EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (!f && urlFilter) {
          filters = `EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (f && !urlFilter) {
          filters = f;
        }

        fetchAPI('', counter, dateFrom, dateTo, '', filters, mtrc, token)
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
              getTable(subParts[index].metrics, subParts[index].filters);

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

      getTable(subParts[index].metrics, subParts[index].filters);
    }, timeout);
  }, []);

  return state.loaded ? (
    !state.error ? (
      <section className={commonStyles.Show}>
        <Typography className={s.Caption} component="h2" variant="h6">
          {thisPart.name}
        </Typography>

        {thisPart.subParts.map((subPart, i: number) => {
          const thisDataArray = state.dataArray[i];
          const thisMetrics = thisDataArray.metrics;

          return (
            <Table className={s.Table} key={subPart.name}>
              <TableHead className={s.TableHead}>
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
                      <TableCell className={s.TableCell}>
                        {getValueByMetric(length, total, metric)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          );
        })}
      </section>
    ) : (
      <div className={s.Error}>{state.error}</div>
    )
  ) : (
    <div className={s.Loader}>
      <div className={s.LoaderText}>Загрзка таблицы {thisPart.name}</div>
      <LinearProgress />
    </div>
  );
};

export default Visits;
