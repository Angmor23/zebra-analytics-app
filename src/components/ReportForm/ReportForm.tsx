import * as React from 'react';
import * as s from './ReportForm.css';
import * as T from './ReportForm.types';

const ReportForm: React.FunctionComponent<T.IReportFormProps> = props => {
  return (
    <>
      <h2>Настройки</h2>
      <form>
        <fieldset>
          <legend>Название</legend>
          <input
            className={s.input}
            type="text"
            placeholder="Введтие название отчета"
            name="reportName"
            onChange={props.onChangeFormField}
          />
        </fieldset>

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

      <button onClick={props.onSubmitOptions}>Далее</button>
    </>
  );
};

export default ReportForm;
