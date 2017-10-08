const initialState = {
    authenticated: false,
    authenticating: false,
    message: null,
    error: null,
    JWT: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "AUTHENTICATE_USER_START": {
            return Object.assign({}, initialState, {
                authenticating: true
            });
        }
        case "AUTHENTICATE_USER_DONE": {
            return Object.assign({}, initialState, {
                authenticating: false,
                authenticated: true,
                message: action.payload.message,
                JWT: action.payload.data.token
            });
        }
        case "AUTHENTICATE_USER_ERROR": {
            return Object.assign({}, initialState, {
                authenticating: false,
                error: action.payload
            });
        }
    }
    return state;
}