import * as React from 'react';
import Layout from '../Layout';

const oauthUrl = 'https://oauth.yandex.ru/authorize';
const clientId = 'c1b491bd74e84df4b313d39846f27907';
const respType = 'token';

const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <input type="text" placeholder="Введите token" />
      <button>Далее</button>
      <a href={`${oauthUrl}?response_type=${respType}&client_id=${clientId}`} target="_blank">
        Получить OAuth токен
      </a>
    </Layout>
  );
};

export default App;
