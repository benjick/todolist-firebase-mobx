import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import App from './App';
import * as stores from './store';
import router from './router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

console.log('stores', stores);

ReactDOM.render(
  <Provider {...stores} router={router}><App /></Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
