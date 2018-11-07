import React from 'react';
import { renderToString } from 'react-dom/server';
import Loadable from 'react-loadable';

import App from '../App';

const render = (ctx) => {
  let modules = [];

  const html = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App/>
    </Loadable.Capture>
  );

  return {
    html,
    modules,
  }
}

export default render;
