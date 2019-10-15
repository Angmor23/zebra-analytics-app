import * as React from 'react';
import Analytics from '../../components/Analytics';
import OAuthForm from '../../components/OAuthForm';
import ReportForm from '../../components/ReportForm';
import Layout from '../Layout';
import * as T from './App.types';

const storage = window.localStorage;

const App: React.FunctionComponent = () => {
  const defaultState: T.IAppState = {
    saved: false,
    token: storage.getItem('token') || '',
  };

  const [appState, setAppState] = React.useState({ ...defaultState });

  const onChangeForm = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    appState.token = value;
  };

  const onSubmitToken = () => {
    setAppState({ ...appState });
    storage.setItem('token', appState.token);
  };

  const onChangeField = (
    event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    const field: {
      [key: string]: string;
    } = {};

    field[name] = value;

    setAppState({
      ...appState,
      ...field,
    });
  };

  const onSubmitOptions = () => {
    setAppState({
      ...appState,
      saved: true,
    });
  };

  const {
    counter,
    dateFrom,
    dateTo,
    // lang,
    // reportName,
    saved,
    token,
  } = appState;

  return (
    <Layout>
      <h1>Генератор отчетов</h1>
      {token ? (
        saved && counter && dateFrom && dateTo ? (
          <Analytics data={{ counter, dateFrom, dateTo, token }} />
        ) : (
          <ReportForm onChangeFormField={onChangeField} onSubmitOptions={onSubmitOptions} />
        )
      ) : (
        <OAuthForm onChangeToken={onChangeForm} onSubmitToken={onSubmitToken} />
      )}
    </Layout>
  );
};

export default App;
