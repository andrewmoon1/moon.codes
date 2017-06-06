import { combineReducers } from 'redux';
import * as types from '../types';

const nav = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_NAV:
      return state === '' ?
              state = 'open' :
              state = '';
    default:
      return state;
  }
};

const codeReducer = combineReducers({
  nav
});

export default codeReducer;
