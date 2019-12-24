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
import * as s from './TrafficSource.css';
import * as T from './TrafficSource.types';

const { parts } = config;

const TrafficSource: React.FunctionComponent<T.ITrafficSourceProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, urlFilter } = appState;
  const thisPart = parts.trafficSource;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.ITrafficSourceState>({
    dataArray: [],
    error: null,
    loaded: false,
  });

  const rows: T.IRow[] = [
    {
      dimensions: '',
      filters: '',
      name: 'Все пользователи',
    },
    {
      dimensions: '',
      filters: `ym:s:trafficSource=='referral'`,
      name: 'Переходы по ссылкам на сайтах',
    },
    {
      dimensions: '',
      filters: `ym:s:trafficSource=='direct'`,
      name: 'Прямые заходы',
    },
    {
      dimensions: '',
      filters: `ym:s:trafficSource=='internal'`,
      name: 'Внутренние переходы',
    },
    {
      dimensions: 'ym:s:searchEngine',
      filters: `ym:s:trafficSource=='organic'`,
      name: 'Переходы из поисковых систем',
    },
    {
      dimensions: 'ym:s:lastsignSocialNetwork',
      filters: '',
      name: 'Переходы из социальных сетей',
    },
    {
      dimensions: 'ym:s:lastsignMessenger',
      filters: '',
      name: 'Переходы из мессенджеров',
    },
  ];

  const tempDataArray: T.IDataArrayItem[] = [];

  React.useEffect(() => {
    setTimeout(() => {
      let tableIndex = 0;
      const subPartsLength = subParts.length;
      const rowsLength = rows.length;

      const getTable = (subPart: T.ISubPart) => {
        let rowIndex = 0;
        let onePercent = 0;
        tempDataArray[tableIndex] = { dataRows: [] };

        const getRow = (curRow: T.IRow) => {
          setTimeout(() => {
            const isLasiTable = tableIndex === subPartsLength - 1;
            const isLastRow = rowIndex === rowsLength - 1;
            const filters = [subPart.filters, curRow.filters]
              .concat(urlFilter ? `EXISTS(ym:pv:URL=@'${urlFilter}')` : [])
              .filter(item => Boolean(item))
              .join(' AND ');

            fetchAPI(
              'https://api-metrika.yandex.net/stat/v1/data?accuracy=full&group=year',
              counter,
              dateFrom,
              dateTo,
              `&dimensions=${curRow.dimensions}`,
              filters,
              subPart.metrics,
              token
            )
              .then(apiJSON => {
                const value = aSum(apiJSON.totals);
                if (!rowIndex) onePercent = value / 100;
                const valuePercens = rowIndex
                  ? (value / onePercent).toFixed(2).replace('.', ',')
                  : '100';

                tempDataArray[tableIndex].dataRows.push([curRow.name, valuePercens]);

                if (isLastRow) {
                  tableIndex += 1;
                  if (!isLasiTable) {
                    getTable(subParts[tableIndex]);
                  } else {
                    setState({
                      dataArray: [...tempDataArray],
                      error: null,
                      loaded: true,
                    });
                  }
                } else {
                  rowIndex += 1;
                  getRow(rows[rowIndex]);
                }
              })
              .catch(error => {
                window.console.error(error);
                setState({
                  ...state,
                  error: `Ошибка при загрузке таблицы "${thisPart.name}"`,
                  loaded: true,
                });
              });
          }, 100);
        };

        getRow(rows[rowIndex]);
      };

      getTable(subParts[tableIndex]);
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
                <Table key={`${thisPart.name}_${subPart.name}`}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Источник ({subPart.name})</TableCell>
                      <TableCell>Пользователи, (%)</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {state.dataArray[n].dataRows.map((row, rowIndex) => {
                      return (
                        Boolean(rowIndex) && (
                          <TableRow key={`table${n}_row-${rowIndex}`}>
                            <TableCell>{row[0]}</TableCell>
                            <TableCell>{row[1]}</TableCell>
                          </TableRow>
                        )
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

export default TrafficSource;
