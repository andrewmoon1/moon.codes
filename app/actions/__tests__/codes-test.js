/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import {
  polyfill
} from 'es6-promise';
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
    const code = 'psuedocode is human readable code that doesn\'t compile';
    const id = md5.hash('psuedocode');
    const data = {
      id,
      title: 'psuedocode',
      savedAreas: {
        'text-0': 'psuedocode is human readable code that doesn\'t compile',
        'mirror-1': 'console.log("hello world")'
      }
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

    const responseData = {
      code: JSON.stringify(initialState.code.savedAreas),
      date: "2017-06-28T21:39:14.306Z",
      id: "617ad118d0498756767af97edb5d18c8",
      title: initialState.code.title
    };

    describe('submitCode', () => {
      let store;
      let stub;

      describe('on success', () => {
        beforeEach(() => {
          stub = createCodeServiceStub().replace('createCode').with(() => Promise.resolve({
            status: 200
          }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_CODE request, MESSAGE_SUCCESS, and CREATE_CODE_SUCCESS actions.', (done) => {
          const expectedActions = [{
            type: types.CREATE_CODE_REQUEST,
            id: data.id,
            title: data.title,
            code: JSON.stringify(data.savedAreas)
          }, {
            type: types.MESSAGE_SUCCESS,
            message: `${data.title} has been saved successfully`
          }, {
            type: types.CREATE_CODE_SUCCESS,
          }];

          store.dispatch(actions.submitCode(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done.fail);
        });
      });

      describe('on failure', () => {
        beforeEach(() => {
          stub = createCodeServiceStub().replace('createCode').with(() => Promise.reject({
            status: 400
          }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_CODE_FAILURE action', (done) => {
          const expectedActions = [{
            type: types.CREATE_CODE_REQUEST,
            id: data.id,
            title: data.title,
            code: JSON.stringify(data.savedAreas)
          }, {
            type: types.CREATE_CODE_FAILURE,
            id: data.id,
            error: 'Something went wrong with the code submission'
          }];

          store.dispatch(actions.submitCode(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done.fail);
        });
      });
    });

    describe('updateCode', () => {
      let store;
      let stub;

      describe('on success', () => {
        beforeEach(() => {
          stub = createCodeServiceStub().replace('updateCode').with(() => Promise.resolve({
            status: 200
          }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_CODE request, MESSAGE_SUCCESS, and CREATE_CODE_SUCCESS actions.', (done) => {
          const expectedActions = [{
            type: types.CREATE_CODE_REQUEST,
            id: data.id,
            title: data.title,
            code: JSON.stringify(data.savedAreas)
          }, {
            type: types.MESSAGE_SUCCESS,
            message: `${data.title} has been updated successfully`
          }, {
            type: types.CREATE_CODE_SUCCESS,
          }];

          store.dispatch(actions.updateCode(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done.fail);
        });
      });

      describe('on failure', () => {
        beforeEach(() => {
          stub = createCodeServiceStub().replace('updateCode').with(() => Promise.reject({
            status: 400
          }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_CODE_FAILURE action', (done) => {
          const expectedActions = [{
            type: types.CREATE_CODE_REQUEST,
            id: data.id,
            title: data.title,
            code: JSON.stringify(data.savedAreas)
          }, {
            type: types.CREATE_CODE_FAILURE,
            id: data.id,
            error: 'Something went wrong with the code update'
          }];

          store.dispatch(actions.updateCode(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done.fail);
        });
      });
    });

    describe('getDocs', () => {
      let store;
      let stub;

      describe('on success', () => {
        beforeEach(() => {
          stub = createCodeServiceStub().replace('getCodes').with(() => Promise.resolve({
            status: 200,
            data: responseData,
          }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch GET_DOC_REQUEST and GET_DOC_SUCCESS actions.', (done) => {
          const expectedActions = [
          {
            type: types.GET_DOC_REQUEST
          }, {
            type: types.GET_DOC_SUCCESS,
            data: responseData,
          }];

          store.dispatch(actions.getDocs(data))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done.fail);
        });
      });

      describe('on failure', () => {
        beforeEach(() => {
          stub = createCodeServiceStub().replace('getCodes').with(() => Promise.reject({
            status: 400,
          }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch GET_DOC_REQUEST and GET_DOC_FAILURE actions.', (done) => {
          const expectedActions = [
          {
            type: types.GET_DOC_REQUEST
          }, {
            type: types.GET_DOC_FAILURE,
            error: 'Something went wrong with getting the documentation',
          }];

          store.dispatch(actions.getDocs())
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done.fail);
        });
      });
    });
  });
});
