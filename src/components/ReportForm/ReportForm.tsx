import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import * as React from 'react';
import { config } from '../../config';
import * as s from './ReportForm.css';
import * as T from './ReportForm.types';

const { saveButtonText } = config;
const today = new Date();
const todayFormated = today.toISOString().split('T')[0];

const ReportForm: React.FunctionComponent<T.IReportFormProps> = props => {
  return (
    <Container maxWidth="md">
      <Paper className={s.root}>
        <Typography component="h1" variant="h5">
          Настройки
        </Typography>

        <form>
          <TextField
            fullWidth
            id="reportName"
            label="Название отчета"
            margin="normal"
            name="reportName"
            onChange={props.onChangeFormField}
            required
            variant="outlined"
          />

          <TextField
            id="created"
            InputLabelProps={{ shrink: true }}
            label="Дата формирования"
            margin="normal"
            name="created"
            onChange={props.onChangeFormField}
            type="date"
            variant="outlined"
            defaultValue={todayFormated}
          />

          <TextField
            fullWidth
            id="contacts"
            label="Контакты менеджера"
            margin="normal"
            multiline
            name="contacts"
            onChange={props.onChangeFormField}
            rows="4"
            variant="outlined"
          />

          <div className={s.formRow}>
            <FormLabel component="legend">Язык</FormLabel>

            <RadioGroup defaultValue="RU" onChange={props.onChangeFormField}>
              <FormControlLabel name="lang" value="RU" control={<Radio />} label="RU" />
              <FormControlLabel name="lang" value="EN" control={<Radio />} label="EN" />
            </RadioGroup>
          </div>

          <TextField
            fullWidth
            id="counter"
            label="Номер счетчика"
            margin="normal"
            name="counter"
            onChange={props.onChangeFormField}
            required
            variant="outlined"
          />

          <div className={classNames(s.formRow, s.formRowFlex)}>
            <TextField
              className={s.formCell}
              id="dateFrom"
              InputLabelProps={{ shrink: true }}
              label="Начало формирования отчета"
              margin="normal"
              name="dateFrom"
              onChange={props.onChangeFormField}
              required
              type="date"
              variant="outlined"
            />

            <TextField
              className={s.formCell}
              id="dateTo"
              InputLabelProps={{ shrink: true }}
              label="Конец формирования отчета"
              margin="normal"
              name="dateTo"
              onChange={props.onChangeFormField}
              required
              type="date"
              variant="outlined"
            />

            <TextField
              className={s.formCell}
              id="opening"
              InputLabelProps={{ shrink: true }}
              label="Дата раскрытия отчета"
              margin="normal"
              name="opening"
              onChange={props.onChangeFormField}
              type="date"
              variant="outlined"
            />
          </div>

          <div className={classNames(s.formRow, s.formRowFlexEnd)}>
            <Button
              color="primary"
              onClick={props.onSubmitOptions}
              type="button"
              variant="contained"
            >
              {saveButtonText}
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default ReportForm;
