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

        <Visits data={{ ...data }} />

        {Boolean(data.goals.length) && <Goals data={{ ...data }} />}

        <Popular data={{ counter, dateFrom, dateTo, token }} />
      </Paper>
    </Container>
  );
};

export default Analytics;
