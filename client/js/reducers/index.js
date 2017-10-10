import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import createUserReducer from './create-user-reducer';
import authenticateUserReducer from './authenticate-user-reducer';
import sessionReducer from './sessionReducer';
import documentReducer from './document-reducer';
import userReducer from './user-reducer';

const allReducers = combineReducers({
    router: routerReducer,
    registration: createUserReducer,
    authentication: authenticateUserReducer,
    session: sessionReducer,
    document: documentReducer,
    user: userReducer
});

export default allReducers;