import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { config } from '../../config';
import * as s from './ReportForm.css';
import * as T from './ReportForm.types';

const { saveButtonText } = config;

const ReportForm: React.FunctionComponent<T.IReportFormProps> = props => {
  return (
    <Container maxWidth="md">
      <div className={s.root}>
        <Typography component="h1" variant="h5">
          Настройки
        </Typography>

        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="reportName"
            label="Название отчета"
            name="reportName"
            onChange={props.onChangeFormField}
          />

          <fieldset>
            <legend>Дата формирования</legend>
            <input
              className={s.input}
              type="date"
              name="created"
              onChange={props.onChangeFormField}
            />
          </fieldset>

          <fieldset>
            <legend>Контакты менеджера</legend>
            <textarea className={s.input} name="contacts" onChange={props.onChangeFormField} />
          </fieldset>

          <fieldset>
            <legend>Язык</legend>
            <div className={s.input}>
              <input type="radio" name="lang" value="ru" onChange={props.onChangeFormField} /> RU
              <input type="radio" name="lang" value="en" onChange={props.onChangeFormField} /> EN
            </div>
          </fieldset>

          <fieldset>
            <legend>Номер счетчика</legend>
            <input
              className={s.input}
              type="text"
              placeholder="Введтие номер счетчика"
              name="counter"
              onChange={props.onChangeFormField}
            />
          </fieldset>

          <fieldset>
            <legend>Период формирования отчета</legend>
            <div className={s.input}>
              <input type="date" name="dateFrom" onChange={props.onChangeFormField} />
              -
              <input type="date" name="dateTo" onChange={props.onChangeFormField} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Дата раскрытия отчета</legend>
            <div className={s.input}>
              <input type="date" name="opening" onChange={props.onChangeFormField} />
            </div>
          </fieldset>
        </form>

        <button onClick={props.onSubmitOptions}>{saveButtonText}</button>
      </div>
    </Container>
  );
};

export default ReportForm;
