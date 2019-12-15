import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Goals from '../Goals';
import Popular from '../Popular';
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
    <Container maxWidth="md">
      <Paper className={s.root}>
        <Typography component="h1" variant="h5">
          {reportName}
        </Typography>

        <section className={s.lead} ref={analyticsCont}>
          <Typography component="h2" variant="h6">
            Введение
          </Typography>

          <Typography component="p" variant="body1">
            • Отчет: {reportName}
            <br />
            • Данные отчета
            <br />
            — основаны на обобщенных результатах систем анализа пользовательской активности Яндекс
            Метрика.
            <br />— представлены за: с {dateFrom} по {dateTo}.<br />
            — представлены в формате «как есть» без обработки, если не указано иное.
            <br />
            • Автор: АйТи-бюро «Зебра».
            <br />• Тип отчета: базовый.
          </Typography>
        </section>

        <Visits appState={{ ...appState }} />

        {Boolean(appState.goals.length) && <Goals appState={{ ...appState }} />}

        <Popular appState={{ ...appState }} />

        <TrafficSource appState={{ ...appState }} />
      </Paper>
    </Container>
  );
};

export default Analytics;
