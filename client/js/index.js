import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import store from './store';
import App from './components/App';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css/animate.min.css';

import '../scss/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
