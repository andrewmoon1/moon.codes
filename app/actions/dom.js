/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';

export function toggleNav() {
  console.log('calling')
  return {
    type: types.TOGGLE_NAV
  };
}
