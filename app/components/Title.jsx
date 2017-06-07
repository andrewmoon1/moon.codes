import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/code';

const cx = classNames.bind(styles);

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
  }


  onChange(event) {
    const { onEntryChange } = this.props;
    onEntryChange(event.target.value);
  }

  saveTitle(event) {
    const { typingTitle } = this.props;
    typingTitle(event.target.value);
  }

  render() {
    const { title } = this.props;

    return (
      <div className={cx('code-title-container')}>
        <input
          className={cx('code-title')}
          value={title}
          placeholder="Enter Title Here"
          onChange={this.onChange} />
      </div>
    );
  }
}

Title.propTypes = {
  onEntryChange: PropTypes.func.isRequired
};
