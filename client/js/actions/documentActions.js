import client from '../services/client';

export const saveDocument = (content, title, tags, cb) => {
    return dispatch => {
        dispatch({
            type: "SAVE_DOCUMENT_START"
        });
        client.put("/documents",
        {
            content,
            title,
            tags
        }).then(response => {
            dispatch({type: "SAVE_DOCUMENT_DONE", payload: response.data});
            cb();
        }).catch(err => {
            dispatch({type: "SAVE_DOCUMENT_ERROR", payload: err});
            cb(err);
        });
    }
}

export const getDocument = (_id) => {
    return dispatch => {
        dispatch({
            type: "GET_DOCUMENT_START"
        });
        client.get(`/documents/${_id}`).then(response => {
            dispatch({type: "GET_DOCUMENT_DONE", payload: response.data});
        }).catch(err => {
            dispatch({type: "GET_DOCUMENT_ERROR", payload: err});
        });
    }
}