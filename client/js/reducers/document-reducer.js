const initialState = {
    saved: false,
    saving: false,
    message: null,
    error: null,
    receiving: false,
    received: false,
    data: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "SAVE_DOCUMENT_START": {
            return Object.assign({}, initialState, {
                saving: true
            });
        }
        case "SAVE_DOCUMENT_DONE": {
            return Object.assign({}, initialState, {
                saving: false,
                saved: true,
                data: action.payload,
                message: action.payload.message
            });
        }
        case "SAVE_DOCUMENT_ERROR": {
            return Object.assign({}, initialState, {
                saving: false,
                error: action.payload
            });
        }

        case "GET_DOCUMENT_START": {
            return Object.assign({}, initialState, {
                receiving: true
            });
        }
        case "GET_DOCUMENT_DONE": {
            return Object.assign({}, initialState, {
                receiving: false,
                received: true,
                data: action.payload.document
            });
        }
        case "GET_DOCUMENT_ERROR": {
            return Object.assign({}, initialState, {
                receiving: false,
                error: action.payload
            });
        }

    }
    return state;
}