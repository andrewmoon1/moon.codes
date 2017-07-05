/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import React from 'react';
import { polyfill } from 'es6-promise';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { CodeBttns } from '../CodeBttns-B';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(authenticated, edit) {
  const props = {
    newArea: jasmine.createSpy('newArea'),
    message: jasmine.createSpy('message'),
    update: jasmine.createSpy('edit'),
    submit: jasmine.createSpy('edit'),
    authenticated: authenticated || false,
    code: {
      areas: [
        'textArea',
        'codeMirror',
      ],
      savedAreas: {
        'text-0': 'Enter Description Here',
        'mirror-1': 'Enter Your Code'
      },
      title: 'Enter Title Here',
      edit: edit || ''
    },
    router: {
      push: () => {},
    }
  }

  const enzymeWrapper = mount(<CodeBttns {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('<CodeBttns-B />', () => {

  it('should render self', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('CodeBttns')).toBeDefined();
    expect(enzymeWrapper.find('#submitBttn')).toBeDefined();
  });

  describe('Submit Button', () => {
    it('should call message if not authenticated', () => {
      const { enzymeWrapper, props } = setup(false);
      const submit = enzymeWrapper.find('#submitBttn');
      const msg = 'Enter Title Here was not saved, you are not authorized';

      submit.simulate('click');

      expect(props.message).toHaveBeenCalledWith(msg);
    });

    it('should call submit if authenticated and not editing code', () => {
      const { enzymeWrapper, props } = setup(true);
      const submit = enzymeWrapper.find('#submitBttn');

      submit.simulate('click');

      expect(props.submit).toHaveBeenCalledWith(props.code);
    });

    it('should call update if authenticated and editing code', () => {
      const { enzymeWrapper, props } = setup(true, 'Enter Title Here');
      const submit = enzymeWrapper.find('#submitBttn');

      submit.simulate('click');

      expect(props.update).toHaveBeenCalledWith(props.code);
    });
  });
});
