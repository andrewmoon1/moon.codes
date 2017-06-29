import { combineReducers } from 'redux';
import * as types from '../types';

const area = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.NEW_AREA:
      return action.newSection;
    default:
      return state;
  }
};

const areas = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.NEW_AREA:
      return [...state, area(undefined, action)];
    case types.RESET_AREAS:
      return action.set;
    default:
      return state;
  }
};

const savedAreas = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.SAVE_TEXT:
      state[action.newSection.id] = action.newSection.text;
      return {...state};
    case types.LOAD_DOCUMENTATION:
      return action.data;
    default:
      return state;
  }
};

const newArea = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING_TEXT:
      return action.newSection;
      case types.TYPINGCODE:
      return action.newSection;
    default:
      return state;
  }
};

const title = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING_TITLE:
      return action.title;
      case types.LOAD_DOCUMENTATION:
        return action.title;
    default:
      return state;
  }
};

const documentation = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_DOC_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const edit = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.EDIT_DOCUMENTATION:
      return action.title;
    default:
      return state;
  }
};

const codeReducer = combineReducers({
  newArea,
  areas,
  savedAreas,
  title,
  documentation,
  edit
});

export default codeReducer;
