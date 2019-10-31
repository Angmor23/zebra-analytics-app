import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Goals from '../Goals';
import Popular from '../Popular';
import Visits from '../Visits';
import * as s from './Analytics.css';
import * as T from './Analytics.types';

const Analytics: React.FunctionComponent<T.IAnalyticsProps> = ({ data }) => {
  const { reportName, counter, dateFrom, dateTo, token } = data;

  return (
    <Container maxWidth="md">
      <Paper className={s.root}>
        <Typography component="h1" variant="h5">
          {reportName}
        </Typography>

        <section className={s.lead}>
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

        <Visits data={{ ...data }} />

        {Boolean(data.goals.length) && <Goals data={{ ...data }} />}

        <Popular data={{ counter, dateFrom, dateTo, token }} />
      </Paper>
    </Container>
  );
};

export default Analytics;
