import { combineReducers } from 'redux';
import * as types from '../types';

const area = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.NEWAREA:
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
    case types.NEWAREA:
      return [...state, area(undefined, action)];
    default:
      return state;
  }
};

const savedAreas = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.SAVETEXT:
      // const res = {};
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
    case types.TYPINGTEXT:
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
    case types.TYPINGTITLE:
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
    case types.CREATE_DOC_SUCCESS:
      return action.data;
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
});

export default codeReducer;
