import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './store';

import './styles/index.scss';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
	<React.StrictMode>
    	<Provider store={store}>
      		<App />
    	</Provider>
  	</React.StrictMode>
);