import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import createUserReducer from './create-user-reducer';
import authenticateUserReducer from './authenticate-user-reducer';
import sessionReducer from './sessionReducer';
import documentReducer from './document-reducer';

const allReducers = combineReducers({
    router: routerReducer,
    registration: createUserReducer,
    authentication: authenticateUserReducer,
    session: sessionReducer,
    document: documentReducer
});

export default allReducers;