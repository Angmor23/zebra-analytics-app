import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import * as s from './Visits.css';
import * as T from './Visits.types';

const { api, parts } = config;

const state: T.IVisitsState = {
  dataArray: [],
  loaded: false,
  queryArray: [],
};

const Visits: React.FunctionComponent<T.IVisitsProps> = props => {
  const { counter, dateFrom, dateTo, token } = props.data;
  const thisPart = parts.visits;
  const { subParts } = thisPart;
  const glossary: { [key: string]: string } = config.glossary;

  const getFormatTime = (sec: number): string => {
    const min = sec / 60;
    const rounded = min.toFixed(2);
    const mmss = rounded.split('.');
    const formated = (Number(mmss[1]) * 0.6).toFixed(0);

    return `${mmss[0]}:${formated}`;
  };

  const getValueByMetric = (n: number, value: number, metric: string): string => {
    let result = String(value);

    if (metric === 'ym:s:avgVisitDurationSeconds') {
      result = getFormatTime(value / n);
    }

    if (['ym:s:pageDepth', 'ym:s:bounceRate'].indexOf(metric) > -1) {
      result = (value / n).toFixed(2).replace('.', ',');
    }

    return result;
  };

  const getApiURL = (mtrs: string[], fltrs: string) => {
    return `${api}?id=${counter}&date1=${dateFrom}&date2=${dateTo}&metrics=${mtrs.join()}&filters=${fltrs}`;
  };

  const [visitState, setVisitState] = React.useState(state);

  React.useEffect(() => {
    let index = 0;
    const indexOfLast = subParts.length - 1;
    const getData = (mtrs: string[], fltrs: string) => {
      window
        .fetch(getApiURL(mtrs, fltrs), {
          headers: {
            Authorization: `OAuth ${token}`,
          },
        })
        .then(response => {
          return response.json();
        })
        .then(apiJSON => {
          const isLast = index === indexOfLast;
          const data: T.IApiDataItem[] = apiJSON.data;
          const query: T.IApiQuery = apiJSON.query;

          visitState.dataArray.push(data[0]);
          visitState.queryArray.push(query);

          if (isLast) {
            setVisitState({
              dataArray: [...visitState.dataArray],
              loaded: true,
              queryArray: [...visitState.queryArray],
            });
          } else {
            index += 1;

            getData(subParts[index].metrics, subParts[index].filters);
          }
        })
        .catch(error => {
          window.console.error(error);
        });
    };

    getData(subParts[index].metrics, subParts[index].filters);
  }, []);

  return (
    <section>
      {visitState.loaded ? (
        <React.Fragment>
          <Typography className={s.caption} component="h2" variant="h6">
            {thisPart.name}
          </Typography>

          {thisPart.subParts.map((subPart, i: number) => {
            const thisDataArray = visitState.dataArray[i];
            const thisMetrics = thisDataArray.metrics;

            return (
              <Table className={s.table} key={subPart.name}>
                <TableHead>
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
                    const total = thisMetrics[k].reduce((sum, cur) => {
                      return sum + cur;
                    }, 0);

                    return (
                      <TableRow key={metric + i}>
                        <TableCell>{glossary[metric]}</TableCell>
                        <TableCell>{getValueByMetric(length, total, metric)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            );
          })}
        </React.Fragment>
      ) : (
        <div>Loading</div>
      )}
    </section>
  );
};

export default Visits;
