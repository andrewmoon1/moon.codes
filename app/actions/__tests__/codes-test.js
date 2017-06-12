/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import expect from 'expect';
import * as actions from '../../actions/codes';
import * as types from '../../types';
import createCodeServiceStub from '../../tests/helpers/createCodeServiceStub';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Code Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const index = 0;
    const code = 'psuedocode is human readable code that does\'t compile';
    const id = md5.hash(code);
    const data = {
      id,
      title: 'psuedocode',
      code
    };

    const initialState = {
      code: {
        areas: [
          'textArea',
          'codeMirror',
        ],
        savedAreas: {
          'text-0': 'Enter Description Here',
          'mirror-1': 'Enter Your Code'
        },
        title: 'Enter Title Here'
      }
    };
    describe('submitCode', () => {
      let store;
      let stub;

      describe('on success', () => {
        beforeEach(() => {
          stub = createCodeServiceStub().replace('createCode').with(() => Promise.resolve({ status: 200 }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_CODE request and success actions', done => {
          const expectedActions = [
            {
              type: types.CREATE_CODE_REQUEST,
              id: data.id,
              title: data.title,
              code: data.code
            }, {
              type: types.CREATE_CODE_SUCCESS,
              data
            }
          ];

          store.dispatch(actions.submitCode(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
