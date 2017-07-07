/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import React from 'react';
import { polyfill } from 'es6-promise';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import 'babel-polyfill';
import FileSaver from 'file-saver';
import classNames from 'classnames/bind';
import { MDSelect } from '../MDSelect';
import styles from '../../css/components/markdown';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup() {
  const props = {
    getDocs: jasmine.createSpy('getDocs'),
    load: jasmine.createSpy('load'),
    docs: [
      {
        _id: '595ec1cb602d8802a18a9612',
        id: 'fe7af78ef975af6c2e4745d1d59b2709',
        title: 'Enter Title Here',
        code: '{"text-0":"Enter Description Here","mirror-1":"Enter Your Code"}',
        __v: 0,
        date: '2017-07-06T23:03:39.166Z'
      },
      {
        _id: '595ec1cb602d8802a18a9612',
        id: 'fe7af78ef975af6c2e4745d1d59b2709',
        title: 'Enter Title Here',
        code: '{"text-0":"Enter Description Here","mirror-1":"Enter Your Code"}',
        __v: 0,
        date: '2017-07-06T23:03:39.166Z'
      }
    ],
    areas: {
      'text-0': 'Enter Description Here',
      'mirror-1': 'Enter Your Code'
    },
    title: 'Enter Title Here',
    edit: jasmine.createSpy('edit'),
    router: {
      push: jasmine.createSpy('router.push'),
    }
  };

  const enzymeWrapper = mount(<MDSelect {...props} />);

  const cx = classNames.bind(styles);

  return {
    props,
    enzymeWrapper,
    cx
  };
}

describe('<MDSelect />', () => {
  it('should render self', () => {
    const { enzymeWrapper, cx } = setup();

    expect(enzymeWrapper.find('MDSelect')).toBeDefined();
    expect(enzymeWrapper.find(`.${cx('md-select')}`)).toBeDefined();
    expect(enzymeWrapper.find(`.${cx('md-save')}`)).toBeDefined();
    expect(enzymeWrapper.find(`.${cx('md-edit')}`)).toBeDefined();
  });

  describe('Select Element', () => {
    it('should call load with documentation and title', () => {
      const { enzymeWrapper, props, cx } = setup();
      const fakeSelect = document.createElement('select');

      document.getElementById = jasmine.createSpy('HTML Element')
                                  .and.returnValue(fakeSelect);
      enzymeWrapper.instance().componentDidUpdate();

      const select = enzymeWrapper.find('select');
      select.simulate('change');

      expect(props.load).toHaveBeenCalledWith(
        {
          'text-0': 'Enter Description Here',
          'mirror-1': 'Enter Your Code'
        },
        'Enter Title Here'
      );
    });
  });

  describe('Download Button', () => {
    it('should not throw and download a file', () => {
      const { enzymeWrapper, props, cx } = setup();
      const downloadBttn = enzymeWrapper.find(`.${cx('md-save')}`);

      FileSaver.saveAs = jasmine.createSpy('File Save');

      expect(() => downloadBttn.simulate('click')).not.toThrow();
      expect(FileSaver.saveAs).toHaveBeenCalled();
    });
  });

  describe('Edit Button', () => {
    it('should call edit with the title and reroute to \'/code\'', () => {
      const { enzymeWrapper, props, cx } = setup();
      const editBttn = enzymeWrapper.find(`.${cx('md-edit')}`);

      expect(() => editBttn.simulate('click')).not.toThrow();
      expect(props.edit).toHaveBeenCalledWith('Enter Title Here');
      expect(props.router.push).toHaveBeenCalledWith('/code');
    });
  });
});
