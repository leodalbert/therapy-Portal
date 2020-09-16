import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ auth: { user, loading } }) => {
  return (
    <Fragment>
      <nav>
        <div className='nav-wrapper teal lighten-3'>
          <Link to='/' className='brand-logo' style={{ marginLeft: '10px' }}>
            {!loading && user.name}
          </Link>
          <Link to='#' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='fas fa-bars'></i>
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <Link to='/calendar'>
                <i className='far fa-calendar-alt left'></i>Calendar
              </Link>
            </li>
            <li>
              <Link to='/logout'>
                <i className='fas fa-sign-out-alt left'></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/calendar'>Calendar</Link>
        </li>
        <li>
          <Link to='/clients'>Clients</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
