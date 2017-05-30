import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';
import brand from '../images/brand.png';


const cx = classNames.bind(styles);


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleMenu(event) {
    const nav = document.getElementById('navigation');
    !nav.style.width || nav.style.width === '0px' ?
      nav.style.width = '250px' :
      nav.style.width = '0px';
  }

  handleClick(event) {
    const id = event.target.id;
    if (id === 'brand') {
      document.querySelector('#home').click();
    } else if (id !== 'home' && id !== 'brand' && id !== 'navigation' && id !== 'hamburger') {
      this.toggleMenu();
    }
  }

  render() {
    const { user, logOut } = this.props;

    return (
      <div className={cx('navigation-container')} onClick={this.handleClick} >
        <img
          className={cx('brand')}
          src={brand}
          alt="moon cattle brand"
          id="brand" />
        <button
          onClick={this.toggleMenu}
          className={cx('hamburger')}
          id="hamburger" >&#9776;</button>
        <nav className={cx('navigation')} id="navigation" role="navigation">
          <Link
            to="/"
            className={cx('item', 'logo')}
            activeClassName={cx('active')}
            id="home">Moon Codes</Link>
          { user.authenticated ? (
            <Link
              onClick={logOut}
              className={cx('item')} to="/">Logout</Link>
          ) : (
            <Link className={cx('item')} to="/login">Log in</Link>
          )}
          <Link className={cx('item')} to="/dashboard">Dashboard</Link>
          <Link className={cx('item')} to="/markdown">Documentation</Link>
          <Link className={cx('item')} to="/about">About</Link>
        </nav>
      </div>
    );
  }
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
