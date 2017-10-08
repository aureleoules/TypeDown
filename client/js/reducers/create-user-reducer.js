const initialState = {
    registered: false,
    registering: false,
    message: null,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "REGISTER_USER_START": {
            return Object.assign({}, state, {
                registering: true
            });
        }
        case "REGISTER_USER_DONE": {
            return Object.assign({}, state, {
                registering: false,
                registered: true,
                message: action.payload.message
            });
        }
        case "REGISTER_USER_ERROR": {
            return Object.assign({}, state, {
                registering: false,
                error: action.payload
            });
        }
    }
    return state;
}