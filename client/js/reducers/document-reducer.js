const initialState = {
    saved: false,
    saving: false,
    message: null,
    error: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "SAVE_DOCUMENT_START": {
            return Object.assign({}, state, {
                saving: true
            });
        }
        case "SAVE_DOCUMENT_DONE": {
            return Object.assign({}, state, {
                saving: false,
                saved: true,
                message: action.payload.message
            });
        }
        case "SAVE_DOCUMENT_ERROR": {
            return Object.assign({}, state, {
                saving: false,
                error: action.payload
            });
        }
    }
    return state;
}