import * as React from 'react';
import * as s from './Layout.css';

const Layout: React.FunctionComponent = props => {
  return <main className={s.root}>{props.children}</main>;
};

export default Layout;
