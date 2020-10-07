import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTextFilter, setShowArchived } from '../../actions/client';
import M from 'materialize-css';

const Header = ({
  setTextFilter,
  setShowArchived,
  clients: { showSearchbar, filterText },
  auth: { user, loading },
}) => {
  useEffect(() => {
    let dropdowns = document.querySelectorAll('.dropdown-trigger');
    let options = {
      inDuration: 300,
      outDuration: 225,
      hover: true,
      belowOrigin: true,
      coverTrigger: false,
    };
    M.Dropdown.init(dropdowns, options);
  });

  const onTextChange = (e) => {
    setTextFilter(e.target.value);
  };

  return loading ? (
    <Fragment>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper teal lighten-3'></div>
          <div className='progress'>
            <div className='indeterminate'></div>
          </div>
        </nav>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <ul id='dropdown1' className='dropdown-content'>
        <li>
          <span onClick={() => setShowArchived(false)}>Current</span>
        </li>
        <li>
          <span onClick={() => setShowArchived(true)}>Archived</span>
        </li>
        <li className='divider'></li>
      </ul>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper teal lighten-3'>
            <Link
              to='/dashboard'
              className='brand-logo'
              style={{ marginLeft: '10px' }}
            >
              {!loading && user.name}
            </Link>

            <Link to='#' data-target='mobile-demo' className='sidenav-trigger'>
              <i className='fas fa-bars'></i>
            </Link>

            <ul id='nav-mobile' className='right hide-on-med-and-down'>
              {showSearchbar ? (
                <li>
                  <div className='dropdown-trigger' data-target='dropdown1'>
                    <i className='fas fa-users left'></i>
                    Clients
                    <i className='material-icons right'>arrow_drop_down</i>
                  </div>
                </li>
              ) : (
                <li>
                  <Link to='/clients'>
                    <i className='fas fa-users left'></i>Clients
                  </Link>
                </li>
              )}
              <li>
                <Link to='/calendar'>
                  <i className='far fa-calendar-alt left'></i>Calendar
                </Link>
              </li>
              <li>
                <a href='/api/logout'>
                  <i className='fas fa-sign-out-alt left'></i>Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {showSearchbar && (
          <div className='container hide-on-med-and-down'>
            <div className='input-field input-searchbar'>
              <i className='white-text material-icons'>search</i>
              <input
                className='white-text'
                type='text'
                id='search-input'
                placeholder='Search Clients...'
                value={filterText}
                onChange={(e) => onTextChange(e)}
              />
            </div>
          </div>
        )}
        <ul className='sidenav' id='mobile-demo'>
          <li>
            <Link to='/calendar'>Calendar</Link>
          </li>
          <li>
            <Link to='/clients'>Clients</Link>
          </li>
          <li>
            <Link to='/api/logout'>Logout</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  clients: state.clients,
});

export default connect(mapStateToProps, { setTextFilter, setShowArchived })(
  Header
);
