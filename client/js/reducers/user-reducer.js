const initialState = {
    fetching: false,
    fetched: false,
    data: null,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "GET_USER_START": {
            return Object.assign({}, state, {
                fetching: true
            });
        }
        case "GET_USER_DONE": {
            return Object.assign({}, state, {
                fetching: false,
                fetched: true,
                data: action.payload
            });
        }
        case "GET_USER_ERROR": {
            return Object.assign({}, state, {
                fetching: false,
                error: action.payload
            });
        }
    }
    return state;
}