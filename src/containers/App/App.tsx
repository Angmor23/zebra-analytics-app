import * as React from 'react';
import Analytics from '../../components/Analytics';
import OAuthForm from '../../components/OAuthForm';
import ReportForm from '../../components/ReportForm';
import Layout from '../Layout';
import * as T from './App.types';

const storage = window.localStorage;

const App: React.FunctionComponent = () => {
  const defaultState: T.IAppState = {
    goals: [],
    lang: 'RU',
    saved: false,
    token: storage.getItem('token') || '',
  };

  const [state, setState] = React.useState({ ...defaultState });

  const onChangeForm = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    state.token = value;
  };

  const onSubmitToken = () => {
    setState({ ...state });
    storage.setItem('token', state.token);
  };

  const onChangeField = (
    event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    const field: {
      [key: string]: string;
    } = {};

    field[name] = value;

    setState({
      ...state,
      ...field,
      saved: false,
    });
  };

  const onSubmitOptions = () => {
    setState({
      ...state,
      saved: true,
    });
  };

  const addGoal = () => {
    setState({
      ...state,
      goals: [
        ...state.goals,
        {
          id: null,
          name: null,
        },
      ],
    });
  };

  const delGoal = (event: React.MouseEvent, i: number) => {
    event.nativeEvent.preventDefault();
    const tmpState = { ...state };
    delete tmpState.goals[i];
    tmpState.goals = tmpState.goals.filter(goal => Boolean(goal));
    setState({ ...tmpState });
  };

  const onChangeGoal = (
    event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const tempState = { ...state };
    const { value, id, name } = event.currentTarget;
    const index = id && Number(id.split('_')[0]);
    const key = name && name.split('_')[0];

    if (typeof index === 'number' && key) {
      tempState.goals[index][key] = value;
    }

    setState({ ...tempState });
  };

  const {
    counter, // = '53697103',
    token, // = 'AgAAAAAJRxVAAAXaQL0nU5LgOEaNsFnBl8nyczQ',
    dateFrom, // = '2019-06-13',
    dateTo, // = '2019-07-12',
    reportName, // = 'Отчет об эффективности русскоязычной версии годового отчета ПАО «Газпром нефть» за 2018 год',
    saved,
    goals,
  } = state;

  return (
    <Layout>
      {token ? (
        saved && reportName && counter && dateFrom && dateTo ? (
          <Analytics data={{ counter, dateFrom, dateTo, token, reportName, goals }} />
        ) : (
          <ReportForm
            onChangeFormField={onChangeField}
            onSubmitOptions={onSubmitOptions}
            addGoal={addGoal}
            delGoal={delGoal}
            goals={state.goals}
            onChangeGoal={onChangeGoal}
          />
        )
      ) : (
        <OAuthForm onChangeToken={onChangeForm} onSubmitToken={onSubmitToken} />
      )}
    </Layout>
  );
};

export default App;
