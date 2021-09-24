import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}

export const createStream = (formValues) => async (dispatch, getState) => {
        const {userId} = getState().auth;
        console.log(getState());
    const response = await streams.post('/streams', {...formValues, userId});

        const action = {
            type: CREATE_STREAM,
            payload: response.data
        }

        dispatch(action)
        history.push('/');

        //programmatic navigation to root route

}

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');

    const action = {type: FETCH_STREAMS, payload: response.data};

    dispatch(action)
}

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    const action = {type: FETCH_STREAM, payload: response.data}

    dispatch(action);
}

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    const action = {type: EDIT_STREAM, payload: response.data};

    dispatch(action);
    history.push('/');

}

export const deleteStream = (id) => async(dispatch) => {
    const response = await streams.delete(`/streams/${id}`);

    const action = {type: DELETE_STREAM, payload: id}

    dispatch(action);
    history.push('/');
}