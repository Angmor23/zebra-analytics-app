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

const Popular: React.FunctionComponent<T.IPopularProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, urlFilter } = appState;
  const thisPart = parts.popular;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.IPopularState>({
    dataArray: [],
    error: null,
    loaded: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      subParts.forEach((subPart, i) => {
        let filters = '';
        if (subPart.filters && urlFilter) {
          filters = `${subPart.filters} AND EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (!subPart.filters && urlFilter) {
          filters = `EXISTS(ym:pv:URL=@'${urlFilter}')`;
        } else if (subPart.filters && !urlFilter) {
          filters = subPart.filters;
        }

        fetchAPI(
          'https://api-metrika.yandex.net/stat/v1/data?accuracy=full&group=year',
          counter,
          dateFrom,
          dateTo,
          `&dimensions=${subPart.dimensions.join()}`,
          filters,
          subPart.metrics,
          token
        )
          .then(apiJSON => {
            const isLast = i === subParts.length - 1;
            const apiData: T.IDataItem[] = apiJSON.data.slice(0, popularPageRows);

            state.dataArray.push(apiData);

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
            {thisPart.subParts.map((subPart, n: number) => {
              const bodyDataArray = state.dataArray[n] || [];
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
                    bodyDataArray.length ? (
                      bodyDataArray.map((dataItem, i: number) => {
                        return (
                          <TableRow key={`goals-row-${i}`}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{dataItem.dimensions[0].name}</TableCell>
                            <TableCell>{aSum(dataItem.metrics)}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <div key={`goals-error-${n}`}>Произошла ошибка при ответе API</div>
                    )}
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

export default Popular;
