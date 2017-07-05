import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/code';
// import { submitMsg } from '../actions/messages';


const cx = classNames.bind(styles);


export class CodeBttns extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    const { submitMsg, code, update, submit, authenticated, message } = this.props;
    event.preventDefault();

    if (authenticated) {
      if (code.edit) {
        update(code)
      } else {
        submit(code);
      }
    } else {
      message(`${code.title} was not saved, you are not authorized`);
    }

    this.props.router.push('/');
  }

  render() {
    return (
      <div className={cx('code-buttons')}>
        <input
          type="submit"
          id="submitBttn"
          className={cx('code-button')}
          value="Submit"
          onClick={this.submit} />
      </div>
    );
  }
}

CodeBttns.propTypes = {
  newArea: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  code: PropTypes.objectOf(PropTypes.shape({
    areas: PropTypes.arrayOf(PropTypes.string),
    savedAreas: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.string,
    documentation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    edit: PropTypes.string,
  })).isRequired,
};

function mapStateToProps(state) {
  return {
    code: state.code
  };
}

export default connect(mapStateToProps, {})(CodeBttns);
