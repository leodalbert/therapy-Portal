import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ auth: { user, loading } }) => {
  return (
    <nav>
      <div className='nav-wrapper'>
        <Link
          to={!loading && user ? '/dashboard' : '/'}
          className='left brand-logo'
        >
          Therapist name
        </Link>
        <ul className='right'>
          {!loading &&
            (user ? (
              <li>
                <a href='/api/logout'>Logout</a>
              </li>
            ) : (
              <li>
                <a href='/auth/google'>Login with Google</a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
