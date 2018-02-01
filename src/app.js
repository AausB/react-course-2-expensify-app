import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import moment from 'moment';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import './firebase/firebase';

const store = configureStore();

// console.log('Test: devtools console');

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

console.log('NODE_ENV:', process.env.NODE_ENV);

// show to screen until expenses are loaded from database
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});

