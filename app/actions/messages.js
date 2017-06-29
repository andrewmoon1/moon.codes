/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types';

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}

export function submitMsg(message) {
  return {
    type: types.MESSAGE_SUCCESS,
    message
  };
}


export default { dismissMessage };
