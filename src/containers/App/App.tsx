import * as React from 'react';
import Analytics from '../../components/Analytics';
import OAuthForm from '../../components/OAuthForm';
import ReportForm from '../../components/ReportForm';
import Layout from '../Layout';
import * as T from './App.types';

const storage = window.localStorage;

const App: React.FunctionComponent = () => {
  const defaultState: T.IAppState = {
    lang: 'RU',
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
    counter = '53697103',
    token = 'AgAAAAAJRxVAAAXaQL0nU5LgOEaNsFnBl8nyczQ',
    dateFrom = '2019-06-13',
    dateTo = '2019-07-12',
    // reportName,
    // saved,
  } = appState;
  // saved && reportName && counter && dateFrom && dateTo
  return (
    <Layout>
      {token ? (
        true ? (
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
