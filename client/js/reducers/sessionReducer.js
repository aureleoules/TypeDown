const initialState = {
    isAuth: !!localStorage.jwtToken,
    user: sessionReducer.user
}

export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case "LOGIN_SUCCESS": {
            return {...state, 
                isAuth: !!localStorage.jwtToken,
                user: sessionReducer.user 
            }
        }
        case "LOGOUT": {
            return {...state, 
                isAuth: !!localStorage.jwtToken,
                user: null 
            }
        }
    }
    return state;
}