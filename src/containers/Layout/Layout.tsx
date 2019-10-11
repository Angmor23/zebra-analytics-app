import * as React from 'react';
import * as s from './Layout.css';

const Layout: React.FunctionComponent = props => {
  return (
    <main className={s.root}>
      <div>{props.children}</div>
    </main>
  );
};

export default Layout;
