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
import * as s from './Regions.css';
import * as T from './Regions.types';

const regionsName: {
  [key: string]: string;
} = {
  Armenia: 'Армения',
  Austria: 'Австрия',
  Azerbaijan: 'Азербайджан',
  Belarus: 'Беларусь',
  Belgium: 'Бельгия',
  Bulgaria: 'Болгария',
  Canada: 'Канада',
  China: 'Китай',
  Cyprus: 'Кипр',
  'Czech Republic': 'Чехия',
  Estonia: 'Эстония',
  Finland: 'Финляндия',
  France: 'Франция',
  Georgia: 'Грузия',
  Germany: 'Германия',
  Greece: 'Греция',
  Hungary: 'Венгрия',
  India: 'Индия',
  Iraq: 'Ирак',
  Ireland: 'Ирландия',
  Israel: 'Израиль',
  Italy: 'Италия',
  Japan: 'Япония',
  Kazakhstan: 'Казахстан',
  Kyrgyzstan: 'Кыргызстан',
  Latvia: 'Латвия',
  Lithuania: 'Литва',
  Moldova: 'Молдова',
  Mongolia: 'Монголия',
  Netherlands: 'Нидерланды',
  Norway: 'Норвегия',
  Poland: 'Польша',
  Romania: 'Румыния',
  Russia: 'Россия',
  Serbia: 'Сербия',
  Singapore: 'Сингапур',
  'South Korea': 'Южная Корея',
  Spain: 'Испания',
  Sweden: 'Швеция',
  Switzerland: 'Швейцария',
  Tajikistan: 'Таджикистан',
  Thailand: 'Таиланд',
  Turkey: 'Индейка',
  Turkmenistan: 'Туркменистан',
  Ukraine: 'Украина',
  'United Arab Emirates': 'Объединенные Арабские Эмираты',
  'United Kingdom': 'Соединенное Королевство',
  'United States': 'Соединенные Штаты',
  Uzbekistan: 'Узбекистан',
  Vietnam: 'Вьетнам',
};

const { parts, regionsRows } = config;

const Regions: React.FunctionComponent<T.IRegionsProps> = ({ appState }) => {
  const { counter, dateFrom, dateTo, token, urlFilter, lang } = appState;
  const thisPart = parts.regions;
  const { subParts, timeout = 0 } = thisPart;
  const [state, setState] = React.useState<T.IRegionsState>({
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
            const { data } = apiJSON;
            const apiData: T.IDataItem[] = data.slice(0, regionsRows);

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
                      <TableCell>Страны ({subPart.name})</TableCell>
                      <TableCell className={s.TableCell}>Посетители</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {partDataArray.length ? (
                      partDataArray.map((dataItem, i: number) => {
                        const vName = dataItem.dimensions[0].name;
                        return (
                          <TableRow key={`search-phrases-row-${i}`}>
                            <TableCell>{lang === 'RU' ? regionsName[vName] : vName}</TableCell>
                            <TableCell>{String(dataItem.metrics[0]).replace('.', ',')}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow key={`search-phrases-row-empty-${n}`}>
                        <TableCell>(Нет данных)</TableCell>
                        <TableCell>(Нет данных)</TableCell>
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

export default Regions;
