import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme.js';

import App from './App';

import 'typeface-roboto'
import './index.css';

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
);
