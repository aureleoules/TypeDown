import client from '../services/client';

export const saveDocument = (content) => {
    return dispatch => {
        dispatch({
            type: "SAVE_DOCUMENT_START"
        });
        client.put("/documents",
        {
            content
        }).then(response => {
            dispatch({type: "SAVE_DOCUMENT_DONE", payload: response.data});
        }).catch(err => {
            dispatch({type: "SAVE_DOCUMENT_ERROR", payload: err});
        });
    }
}