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
import * as s from './SearchPhrases.css';
import * as T from './SearchPhrases.types';

const { parts, searchPhrasesRows } = config;

const SearchPhrases: React.FunctionComponent<T.ISearchPhrasesProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, urlFilter } = appState;
  const thisPart = parts.searchPhrases;
  const { subParts, timeout } = thisPart;
  const [state, setState] = React.useState<T.ISearchPhrasesState>({
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
          `&preset=${subPart.preset}`,
          filters,
          [],
          token
        )
          .then(apiJSON => {
            const apiData: T.IDataItem[] = apiJSON.data.slice(0, searchPhrasesRows);

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
                      <TableCell>Запрос ({subPart.name})</TableCell>
                      <TableCell className={s.TableCell}>Количество запросов</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {partDataArray.length ? (
                      partDataArray.map((dataItem, i: number) => {
                        return (
                          <TableRow key={`search-phrases-row-${i}`}>
                            <TableCell>
                              <a
                                className={s.Link}
                                href={dataItem.dimensions[0].url}
                                target="_blank"
                                rel="noopener"
                              >
                                {dataItem.dimensions[0].name}
                              </a>
                            </TableCell>
                            <TableCell>{dataItem.metrics[0]}</TableCell>
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

export default SearchPhrases;
