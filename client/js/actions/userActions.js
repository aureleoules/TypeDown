import client from '../services/client';
import {setToken, setUser, removeToken} from '../services/auth';
import history from '../history';
    
export const registerUser = (username, email, password) => {
    return dispatch => {
        dispatch({
            type: "REGISTER_USER_START"
        });
        client.post("/users",
        {
            username,
            email,
            password
        }).then(response => {
            dispatch({type: "REGISTER_USER_DONE", payload: response.data});
        }).catch(err => {
            dispatch({type: "REGISTER_USER_ERROR", payload: err});
        });
    }
}

export const authenticateUser = (username, password) => {
    return dispatch => {
        dispatch({
            type: "AUTHENTICATE_USER_START"
        });
        client.post("/user/authenticate", {
            username,
            password
        }).then(response => {
            const token = response.data.data.token;
            setToken(token);
            history.push('/');
            window.location.reload(); //HACK to refresh the JWT of the axios client.
            dispatch({type: "AUTHENTICATE_USER_DONE", payload: response.data});
            dispatch({type: "LOGIN_SUCCESS"});
        }).catch(err => {
            dispatch({type: "AUTHENTICATE_USER_ERROR", payload: err});
        });
    }
}

export const getUser = (username) => {
    return dispatch => {
        dispatch({
            type: "GET_USER_START"
        });
        client.get(`/user/${username}`).then(response => {
            dispatch({type: "GET_USER_DONE", payload: response.data});
        }).catch(err => {
            dispatch({type: "GET_USER_ERROR", payload: err});
        });;
    }
}

export const logoutUser = () => {
    return dispatch => {
        removeToken();
        history.push('/');
        window.location.reload(); //HACK to refresh the JWT of the axios client.
        dispatch({type: "LOGOUT"});
    }
}
