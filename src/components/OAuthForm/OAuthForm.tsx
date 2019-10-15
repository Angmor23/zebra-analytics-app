import * as React from 'react';
import * as s from './OAuthForm.css';
import * as T from './OAuthForm.types';

const oauthUrl = 'https://oauth.yandex.ru/authorize';
const clientId = 'c1b491bd74e84df4b313d39846f27907';
const respType = 'token';

const OAuthForm: React.FunctionComponent<T.IOAuthFormProps> = props => {
  return (
    <>
      <form>
        <input
          className={s.input}
          type="text"
          placeholder="Введите token"
          onChange={props.onChangeToken}
        />

        <a href={`${oauthUrl}?response_type=${respType}&client_id=${clientId}`} target="_blank">
          Получить OAuth токен
        </a>
      </form>

      <button onClick={props.onSubmitToken}>Далее</button>
    </>
  );
};

export default OAuthForm;
