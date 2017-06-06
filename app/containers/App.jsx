import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import Navigation from '../containers/Navigation';
import Message from '../containers/Message';
import styles from '../css/main';
import { toggleNav } from '../actions/dom';
import { dismissMessage } from '../actions/messages';


const cx = classNames.bind(styles);


/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    const { toggleNav, dom, message, dismissMessage } = this.props;

    if (dom.nav === 'open' && e.target.id !== 'hamburger') {
      toggleNav();
    }

    if (message.message && message.message.length > 0) {
      dismissMessage();
    }
 }

  render() {
    const { children, dom } = this.props;
    return (
      <div
        onClick={this.toggle}
        className={cx('app')}>
        <Navigation />
        <Message />
        {children}
      </div>
    );
  }
};

App.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    dom: state.dom,
    message: state.message
  };
}

export default connect(mapStateToProps, { toggleNav, dismissMessage })(App);
