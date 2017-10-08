import {createStore, applyMiddleware, combineReducers} from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import history from './history';

const middleware = applyMiddleware(thunk, logger(), routerMiddleware(history));
const store = createStore(allReducers, middleware);

export default store;