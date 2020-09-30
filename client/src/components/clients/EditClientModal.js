import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import ClientNotes from './ClientNotes';
import ClientInfoForm from './ClientInfoForm';
import EditClientForm from './EditClientForm';
import {
  clearClient,
  editClient,
  updateClient,
  getClientNotes,
} from '../../actions/client';

const EditClientModal = ({
  clients: { client, loading, edit },
  editForm,
  editClient,
  getClientNotes,
  updateClient,
  formValues,
  history,
}) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    M.Tabs.init(document.querySelectorAll('.tabs'), {});
  }, []);

  let currentClient = null;
  if (client) {
    currentClient = client;
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>
    );
  }

  return (
    <div id='edit-client-modal' className='modal'>
      {client && (
        <Fragment>
          <div>
            <h5
              className='grey-text text-darken-1'
              style={{ marginLeft: '30px', marginBottom: '15px' }}
            >
              {client.name}
            </h5>
          </div>
          <div className='row'>
            <div className='col s12'>
              <Tabs
                value={value}
                onChange={handleTabChange}
                variant='fullWidth'
              >
                <Tab label='Personal Info'></Tab>

                <Tab label='Client Notes'></Tab>

                <Tab label='Session History'></Tab>
              </Tabs>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <ClientInfoForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className='row'>
              <div className='col s8 offset-s2'>
                {edit && (
                  <form className='col s12'>
                    <div className='row'>
                      <div className='input-field col s12'>
                        <i className='material-icons prefix'>mode_edit</i>
                        <textarea
                          id='icon_prefix2'
                          className='materialize-textarea'
                          placeholder='New Note...'
                        ></textarea>
                      </div>
                    </div>
                  </form>
                )}

                <ClientNotes id={currentClient._id} edit={edit} />
              </div>
            </div>
          </TabPanel>
        </Fragment>
      )}
    </div>
  );
};

EditClientModal.propTypes = {
  clearClient: PropTypes.func.isRequired,
  editClient: PropTypes.func.isRequired,
  clients: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired,
  getClientNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clients,
  formValues: state.form,
  // editForm: state.form,
});

export default connect(mapStateToProps, {
  clearClient,
  editClient,
  updateClient,
  getClientNotes,
})(EditClientModal);

// <button onClick={() => setedit(!edit)}>edit</button>
// <div className="row">
// <div className="col s12">
//   <ul className="tabs">
//     <li className="tab col s3"><a href="#test1">Test 1</a></li>
//     <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
//     <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
//     <li className="tab col s3"><a href="#test4">Test 4</a></li>
//   </ul>
// </div>
// <div id="test1" className="col s12">Test 1</div>
// <div id="test2" className="col s12">Test 2</div>
// <div id="test3" className="col s12">Test 3</div>
// <div id="test4" className="col s12">Test 4</div>
// </div>
