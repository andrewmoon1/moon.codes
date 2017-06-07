import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/code';
import { submitMsg } from '../actions/codes';


const cx = classNames.bind(styles);


class CodeBttns extends React.Component {
  constructor(props) {
    super(props);
    this.newEl = this.newEl.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    const { submitMsg, code, update, submit, authenticated } = this.props;
    event.preventDefault();

    if (authenticated) {
      if (code.edit) {
        update(event.target)
      } else {
        submit(event.target);
      }
    } else {
      submitMsg(`${code.title} was not saved, you are not authorized`);
    }

    this.props.router.push('/');
  }

  newEl(event) {
    const { newArea } = this.props;
    let type = '';
    event.target.id === 'mirrorBttn' || event.target.parentElement === 'mirrorBttn' ?
      type = 'codeMirror' :
      type = 'textArea';

    newArea(type);
  }

  render() {
    const mirrorText = ' Code Mirror';
    const areaText = ' Text Area';
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
          {areaText}
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
          {mirrorText}
        </button>
      </div>
    );
  }
}

CodeBttns.propTypes = {
  newArea: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    code: state.code
  };
}

export default connect(mapStateToProps, { submitMsg })(CodeBttns);
