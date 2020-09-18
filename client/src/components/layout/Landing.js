import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from './Alert';

const Landing = ({ auth: { user, loading } }) =>
  !loading && user ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <Alert />
      <section className='landing'>
        <div className='landing-inner'>
          <div className='container' style={{ marginBottom: '40px' }}>
            <h1 className=''>Therapy Portal</h1>
            <h5 className='lead'>Manage your clients and appointments!</h5>
          </div>

          <div className='container'>
            <div className='col s12 m6 offset-m3 center-align'>
              <a
                className='oauth-container btn z-depth-5 darken-4 white black-text'
                style={{
                  textTransform: 'none',
                  margin: '15px',
                }}
                href='/auth/google'
              >
                <div className='left'>
                  <img
                    width='20px'
                    style={{ marginTop: '7px', marginRight: '8px' }}
                    alt='Google sign-in'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png'
                  />
                </div>
                Continue with Google
              </a>
              <a
                className='waves-effect waves-light btn z-depth-5 blue darken-2 social facebook'
                style={{ margin: '15px', textTransform: 'none' }}
                href='/auth/facebook'
              >
                <i className='fa fa-facebook'></i> Continue with Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
