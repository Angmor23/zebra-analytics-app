// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import * as s from './Goals.css';
import * as T from './Goals.types';

const { parts } = config;
// const state = {
//   loaded: false,
// }

const Goals: React.FunctionComponent<T.IGoalsProps> = props => {
  const thisPart = parts.goals;
  // const [visitState, setVisitState] = React.useState(state);

  return (
    <section>
      <Typography className={s.caption} component="h2" variant="h6">
        {thisPart.name}
      </Typography>
    </section>
  );
};

export default Goals;
