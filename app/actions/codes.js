/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { codeService } from '../services';

export function submitMsg(message) {
  return {
    type: types.MESSAGE_SUCCESS,
    message
  };
}

function createCodeSuccess() {
  return {
    type: types.CREATE_CODE_SUCCESS
  };
}

function createCodeFailure(data) {
  return {
    type: types.CREATE_CODE_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createDocSuccess(data) {
  return {
    type: types.CREATE_DOC_SUCCESS,
    data
  };
}

function createDocFailure(data) {
  return {
    type: types.CREATE_DOC_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createDocRequest(data) {
  return {
    type: types.CREATE_DOC_REQUEST,
    id: data.id,
    title: data.title,
    code: data.code
  };
}

function createCodeRequest(data) {
  return {
    type: types.CREATE_CODE_REQUEST,
    id: data.id,
    title: data.title,
    code: data.code
  };
}

export function saveText(text, target) {
  return {
    type: types.SAVETEXT,
    newSection: {
      text,
      id: target
    }
  };
}

export function typingTitle(text) {
  return {
    type: types.TYPINGTITLE,
    title: text,
  };
}

export function newArea(text) {
  return {
    type: types.NEWAREA,
    newSection: text
  };
}

export function resetAreas(toSet) {
  return {
    type: types.RESETAREAS,
    set: toSet || ['textArea', 'codeMirror']
  };
}

export function submitCode() {
  return (dispatch, getState) => {
    const { code } = getState();
    const id = md5.hash(code.title);

    const data = {
      id,
      title: JSON.stringify(code.title),
      code: JSON.stringify(code.savedAreas),
    };

    // First dispatch an optimistic update
    dispatch(createCodeRequest(data));
    return codeService().createCode({ id, data })
      .then((res) => {
        if (res.status === 200) {
          dispatch(submitMsg(`${data.title} has been saved successfully`));
          return dispatch(createCodeSuccess());
        }
      })
      .catch(() => {
        return dispatch(
          createCodeFailure({
            id,
            error: 'Something went wrong with the code submission'
          })
        );
      });
  };
}

export function updateCode() {
  return (dispatch, getState) => {
    const { code } = getState();
    const id = md5.hash(code.title);

    const data = {
      id,
      title: JSON.stringify(code.title),
      code: JSON.stringify(code.savedAreas),
    };

    // First dispatch an optimistic update
    dispatch(createCodeRequest(data));
    return codeService().updateCode({ id, data })
      .then((res) => {
        if (res.status === 200) {
          dispatch(submitMsg(`${data.title} has been updated successfully`));
          return dispatch(createCodeSuccess());
        }
      })
      .catch(() => {
        return dispatch(
          createCodeFailure({
            id,
            error: 'Something went wrong with the code update'
          })
        );
      });
  };
}

export function getDocs() {
  return (dispatch, getState) => {
    const { code } = getState();
    const id = md5.hash(code.title);

    const data = {
      id,
      code: JSON.stringify(code.savedAreas),
    };
    // First dispatch an optimistic update
    dispatch(createDocRequest(data));
    return codeService().getCodes()
      .then((res) => {
        if (res.status === 200) {
          return dispatch(createDocSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(
          createDocFailure({
            error: 'Something went wrong with the code submission'
          })
        );
      });
  };
}

export function load(data, title) {
  return {
    type: types.LOAD_DOCUMENTATION,
    data,
    title,
  };
}

export function edit(title) {
  return {
    type: types.EDIT_DOCUMENTATION,
    title,
  };
}
