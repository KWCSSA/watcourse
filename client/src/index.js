import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import './css/index.css';

import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// if (process.env.NODE_ENV === 'production') {
// 	serviceWorker.register();
// } else {
// 	serviceWorker.unregister();
// }
serviceWorker.unregister();
