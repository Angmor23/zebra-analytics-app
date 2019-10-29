import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import { aSum, fetchAPI } from '../../utils';
import * as s from './Popular.css';
import * as T from './Popular.types';

const { parts, popularPageRows } = config;

const Popular: React.FunctionComponent<T.IPopularProps> = ({ data }) => {
  const { counter, dateFrom, dateTo, token } = data;
  const thisPart = parts.popular;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.IPopularState>({
    dataArray: [],
    loaded: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      let index = 0;
      const indexOfLast = subParts.length - 1;
      const getData = (metrics: string[], dimensions: string[]) => {
        fetchAPI(
          'https://api-metrika.yandex.net/stat/v1/data?accuracy=full&group=year',
          counter,
          dateFrom,
          dateTo,
          `&dimensions=${dimensions.join()}`,
          '',
          metrics,
          token
        )
          .then(apiJSON => {
            const isLast = index === indexOfLast;
            const apiData: T.IDataItem[] = apiJSON.data.slice(0, popularPageRows);

            state.dataArray.push(apiData);

            setState(prevState => {
              if (isLast) {
                return {
                  dataArray: [...state.dataArray],
                  loaded: true,
                };
              }

              index += 1;
              getData(subParts[index].metrics, subParts[index].dimensions);

              return prevState;
            });
          })
          .catch(error => {
            window.console.error(error);
          });
      };

      getData(subParts[index].metrics, subParts[index].dimensions);
    }, timeout);
  }, []);

  return (
    <React.Fragment>
      {state.loaded ? (
        <section>
          <Typography className={s.caption} component="h2" variant="h6">
            {thisPart.name}
          </Typography>
          {thisPart.subParts.map((subPart, n: number) => {
            return (
              <Table key={`${thisPart.name}_${subPart.name}`}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Страница</TableCell>
                    <TableCell>
                      <div className={s.bold}>{subPart.name}</div>
                      Просмотров
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* Выводим строки популярных страниц */
                  state.dataArray[n].map((dataItem, i: number) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{dataItem.dimensions[0].name}</TableCell>
                        <TableCell>{aSum(dataItem.metrics)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            );
          })}
        </section>
      ) : (
        <LinearProgress />
      )}
    </React.Fragment>
  );
};

export default Popular;
