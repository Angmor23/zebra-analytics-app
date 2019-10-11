import * as React from 'react';
import Layout from '../Layout';

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <a
          href="https://oauth.yandex.ru/authorize?response_type=token&client_id=c1b491bd74e84df4b313d39846f27907"
          target="_blank"
        >
          Получить OAuth токен
        </a>
      </Layout>
    );
  }
}

export default App;
