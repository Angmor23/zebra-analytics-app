import { Container, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import Downloads from '../Downloads';
import Goals from '../Goals';
import Popular from '../Popular';
import Regions from '../Regions';
import SearchPhrases from '../SearchPhrases';
import Technology from '../Technology';
import TrafficSource from '../TrafficSource';
import Visits from '../Visits';
import * as s from './Analytics.css';
import * as T from './Analytics.types';

const Analytics: React.FunctionComponent<T.IAnalyticsProps> = ({ appState }) => {
  const analyticsCont = React.useRef<HTMLElement>(null);
  const { reportName, dateFrom, dateTo } = appState;

  React.useEffect(() => {
    const { current } = analyticsCont;
    if (current) current.scrollIntoView();
  });

  return (
    <Container maxWidth="lg" component="section">
      <Paper className={s.root}>
        <Typography component="h1" variant="h5">
          {reportName}
        </Typography>

        <section className={s.lead} ref={analyticsCont}>
          <Typography component="h2" variant="h6">
            Введение
          </Typography>

          <ul>
            <li>
              <Typography variant="subtitle1" gutterBottom>
                Отчет: {reportName}
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1" gutterBottom>
                Данные отчета
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1" gutterBottom>
                    основаны на обобщенных результатах систем анализа пользовательской активности
                    Яндекс Метрика.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    представлены за: с {dateFrom} по {dateTo}.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" gutterBottom>
                    представлены в формате «как есть» без обработки, если не указано иное.
                  </Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="subtitle1" gutterBottom>
                Автор: АйТи-бюро «Зебра».
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle1" gutterBottom>
                Тип отчета: базовый.
              </Typography>
            </li>
          </ul>
        </section>

        <Visits appState={{ ...appState }} />

        {Boolean(appState.goals.length) && <Goals appState={{ ...appState }} />}

        <Popular appState={{ ...appState }} />

        <TrafficSource appState={{ ...appState }} />

        <SearchPhrases appState={{ ...appState }} />

        <Technology appState={{ ...appState }} />

        <Regions appState={{ ...appState }} />

        <Downloads appState={{ ...appState }} />
      </Paper>
    </Container>
  );
};

export default Analytics;
