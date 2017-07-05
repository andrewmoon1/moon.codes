/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { codeService } from '../services';
import { submitMsg } from './messages';

function removeCodeSuccess() {
  return {
    type: types.REMOVE_CODE_SUCCESS
  };
}

function removeCodeRequest(id) {
  return {
    type: types.REMOVE_CODE_REQUEST,
    id,
  };
}

function removeCodeFailure(data) {
  return {
    type: types.CREATE_CODE_FAILURE,
    id: data.id,
    error: data.error
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

function createCodeRequest(data) {
  return {
    type: types.CREATE_CODE_REQUEST,
    id: data.id,
    title: data.title,
    code: data.code
  };
}

function getDocSuccess(data) {
  return {
    type: types.GET_DOC_SUCCESS,
    data
  };
}

function getDocFailure(data) {
  return {
    type: types.GET_DOC_FAILURE,
    error: data.error
  };
}

function createDocRequest() {
  return {
    type: types.GET_DOC_REQUEST,
  };
}

export function submitCode(code) {
  return (dispatch) => {
    const id = md5.hash(code.title);
    const data = {
      id,
      title: code.title,
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

export function updateCode(code) {
  return (dispatch) => {
    const id = md5.hash(code.edit);
    const titleId = md5.hash(code.title);

    if (id !== titleId) {
      dispatch(removeCode(id, code.edit));
      return dispatch(submitCode(code));
    } else {
      const data = {
        id,
        title: code.title,
        code: JSON.stringify(code.savedAreas),
      };

      // First dispatch an optimistic update
      dispatch(createCodeRequest(data));
      return codeService().updateCode({ id, data })
        .then((res) => {
          if (res.status === 200) {
            dispatch(submitMsg(`${data.title} has been updated successfully`));
            dispatch(edit(''));
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
    }
  };
}

export function removeCode(id, title) {
  return (dispatch) => {
    dispatch(removeCodeRequest(id));
    return codeService().deleteCode({ id })
      .then((res) => {
        if (res.status === 200) {
          dispatch(submitMsg(`${title} has been removed successfully`));
          return dispatch(removeCodeSuccess());
        }
      })
      .catch(() => {
        return dispatch(
          removeCodeFailure({
            id,
            error: 'Something went wrong with the code removal'
          })
        );
      });
  };
}

export function getDocs() {
  return (dispatch) => {
    // First dispatch an optimistic update
    dispatch(createDocRequest());
    return codeService().getCodes()
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getDocSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(
          getDocFailure({
            error: 'Something went wrong with getting the documentation',
          })
        );
      });
  };
}

export function saveText(text, target) {
  return {
    type: types.SAVE_TEXT,
    newSection: {
      text,
      id: target
    }
  };
}

export function typingTitle(text) {
  return {
    type: types.TYPING_TITLE,
    title: text,
  };
}

export function newArea(text) {
  return {
    type: types.NEW_AREA,
    newSection: text
  };
}

export function resetAreas(toSet) {
  return {
    type: types.RESET_AREAS,
    set: toSet || ['textArea', 'codeMirror']
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
