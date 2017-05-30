import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/code';

const cx = classNames.bind(styles);


class CodeBttns extends React.Component {
  constructor(props) {
    super(props);
    this.newEl = this.newEl.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    const { submit, authenticated } = this.props;

    if (authenticated) {
      submit(event.target);
    }

    this.props.router.push('/markdown');
  }

  newEl(event) {
    const { newArea } = this.props;
    let type = '';
    event.target.id === 'mirrorBttn' ?
      type = 'codeMirror' :
      type = 'textArea';

    newArea(type);
  }

  render() {
    return (
      <div className={cx('code-buttons')}>
        <button
          type="button"
          id="areaBttn"
          className={cx('code-button')}
          onClick={this.newEl}>
          <span className={cx('hide-small')}>
            Insert
          </span>
            TextArea
        </button>
        <input
          type="submit"
          id="submitBttn"
          className={cx('code-button')}
          value="Submit"
          onClick={this.submit} />
        <button
          type="button"
          id="mirrorBttn"
          className={cx('code-button')}
          onClick={this.newEl}>
          <span className={cx('hide-small')}>
            Insert
          </span>
            Code Mirror
        </button>
      </div>
    );
  }
}

CodeBttns.propTypes = {
  newArea: PropTypes.func.isRequired,
};

export default CodeBttns;
