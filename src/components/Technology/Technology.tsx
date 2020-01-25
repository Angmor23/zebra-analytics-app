import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import { fetchAPI } from '../../utils';
import * as commonStyles from '../../utils/styles.css';
import * as s from './Technology.css';
import * as T from './Technology.types';

const technologyNames: {
  [key: string]: string;
} = {
  PC: 'ПК',
  Smartphones: 'Смартфоны',
  TV: 'ТВ',
  Tablets: 'Планшеты',
  'Yandex Browser': 'Яндекс.Браузер',
};

const { parts, technologyRows } = config;

const Technology: React.FunctionComponent<T.ITechnologyProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, urlFilter, lang } = appState;
  const thisPart = parts.technology;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.ITechnologyState>({
    dataArray: [],
    error: null,
    loaded: false,
  });

  React.useEffect(() => {
    setTimeout(() => {
      let index = 0;
      const indexOfLast = subParts.length - 1;

      const getTable = () => {
        const subPart = subParts[index];
        const { metrics } = subPart;
        const isLast = index === indexOfLast;
        const filters = [subPart.filters]
          .concat(urlFilter ? `EXISTS(ym:pv:URL=@'${urlFilter}')` : [])
          .filter(item => Boolean(item))
          .join(' AND ');

        fetchAPI(
          'https://api-metrika.yandex.net/stat/v1/data?accuracy=full&group=year',
          counter,
          dateFrom,
          dateTo,
          `&dimensions=${subPart.dimensions}`,
          filters,
          metrics,
          token
        )
          .then(apiJSON => {
            const { data, totals } = apiJSON;
            const apiData: T.IDataItem[] = data.slice(0, technologyRows).map((row: T.IDataItem) => {
              const value = (row.metrics[0] / (totals / 100)).toFixed(2);
              return {
                ...row,
                metrics: [Number(value)],
              };
            });

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
              const partDataArray = state.dataArray[n] || [];

              return (
                <Table key={`${thisPart.name}_${subPart.name}`}>
                  <TableHead className={s.TableHead}>
                    <TableRow>
                      <TableCell>{subPart.name}</TableCell>
                      <TableCell className={s.TableCell}>Доля, (%)</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {partDataArray.length ? (
                      partDataArray.map((dataItem, i: number) => {
                        const vName = dataItem.dimensions[0].name;
                        return (
                          <TableRow key={`search-phrases-row-${i}`}>
                            <TableCell>
                              {lang === 'RU' ? technologyNames[vName] || vName : vName}
                            </TableCell>
                            <TableCell>{String(dataItem.metrics[0]).replace('.', ',')}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow key={`search-phrases-row-empty-${n}`}>
                        <TableCell>Нет данных</TableCell>
                        <TableCell />
                      </TableRow>
                    )}
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
      )}
    </React.Fragment>
  );
};

export default Technology;
