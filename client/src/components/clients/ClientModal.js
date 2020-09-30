import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, Tabs, Tab, Box } from '@material-ui/core';

import ClientInfoForm from './ClientInfoForm';
import Buttton from './Button';
import { updateClient } from '../../actions/client';

const ClientModal = ({
  client,
  isOpen,
  handleClose,
  updateClient,
  history,
  edit,
}) => {
  // Tab page
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    dialogCustomizedWidth: {
      'max-width': '80%',
    },
  }));

  const classes = useStyles();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>
    );
  }
  return (
    client && (
      <Fragment>
        <Dialog
          fullWidth
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='max-width-dialog-title'
          classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        >
          <DialogContent style={{ padding: '0px 0px 0px 0px' }}>
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
              <ClientInfoForm
                edit={edit}
                onSubmit={(values) => updateClient(values, history)}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className='row'>
                <div className='col s8 offset-s2'>
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
                </div>
              </div>
            </TabPanel>
            <Buttton />
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  client: state.clients.client,
  loading: state.clients.loading,
  edit: state.clients.edit,
});

export default connect(mapStateToProps, { updateClient })(
  withRouter(ClientModal)
);
