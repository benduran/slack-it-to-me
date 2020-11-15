import React from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles';

import { Popover } from './components';
import { theme } from './theme';

const d = document.createElement('div');
const dynamicId = `__slack-it-to-me_${Date.now()}`;
d.setAttribute('id', dynamicId);

document.body.appendChild(d);

render(
  <ThemeProvider theme={theme}>
    <Popover />
  </ThemeProvider>,
  d,
);
