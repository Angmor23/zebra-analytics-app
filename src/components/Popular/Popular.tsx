import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import { aSum, fetchAPI, getFilters } from '../../utils';
import * as commonStyles from '../../utils/styles.css';
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

  const strings404 = ['404', 'page not found', 'cтраница не найдена'];

  React.useEffect(() => {
    setTimeout(() => {
      let index = 0;
      const indexOfLast = subParts.length - 1;

      const getTable = () => {
        const subPart = subParts[index];
        const isLast = index === indexOfLast;
        const filters = getFilters(subPart.filters, urlFilter);

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
            const apiData: T.IDataItem[] = apiJSON.data
              .filter((dataItem: T.IDataItem) => {
                const pageName = dataItem.dimensions[0].name.toLowerCase();
                return !strings404.some(str => pageName.includes(str));
              })
              .slice(0, popularPageRows);

            state.dataArray.push(apiData);

            setState(prevState => {
              if (isLast) {
                return {
                  dataArray: state.dataArray,
                  error: null,
                  loaded: true,
                };
              }

              index += 1;
              getTable();
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

      getTable();
    }, timeout);
  }, []);

  return (
    <React.Fragment>
      {state.loaded ? (
        !state.error ? (
          <section className={commonStyles.Show}>
            <Typography className={s.Caption} component="h2" variant="h6">
              {thisPart.name}
            </Typography>

            {thisPart.subParts.map((subPart, n: number) => {
              const bodyDataArray = state.dataArray[n] || [];

              return bodyDataArray.length ? (
                <Table key={`${thisPart.name}_${subPart.name}`}>
                  <TableHead className={s.TableHead}>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Страница ({subPart.name})</TableCell>
                      <TableCell>Просмотров</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* Выводим строки популярных страниц */
                    bodyDataArray.map((dataItem, i: number) => {
                      return (
                        <TableRow key={`goals-row-${i}`}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{dataItem.dimensions[0].name}</TableCell>
                          <TableCell className={s.TableCell}>{aSum(dataItem.metrics)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div key={`goals-error-${n}`} className={s.Error}>
                  Произошла ошибка при ответе API
                </div>
              );
            })}
          </section>
        ) : (
          <div className={s.Error}>{state.error}</div>
        )
      ) : (
        <div className={s.Loader}>
          <div className={s.LoaderTetx}>Загрзка таблицы {thisPart.name}</div>
          <LinearProgress />
        </div>
      )}
    </React.Fragment>
  );
};

export default Popular;
