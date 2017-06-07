import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/textarea';

const cx = classNames.bind(styles);

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.saveCode = this.saveCode.bind(this);
  }

  saveCode(event) {
    const { save, count } = this.props;
    save(event.target.value, count);
  }

  render() {
    const { content } = this.props;
    return (
      <div className={cx('text-area-container')}>
        <textarea
          className={cx('textarea')}
          value={content}
          placeholder="Enter Description Here"
          onChange={this.saveCode}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  save: PropTypes.func.isRequired,
  count: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
