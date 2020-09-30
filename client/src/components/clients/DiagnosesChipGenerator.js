import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { reduxForm, formValueSelector, change } from 'redux-form';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.75),
  },
}));

let DiagnosesChipGenerator = ({ edit, diagnoses, change }) => {
  const classes = useStyles();
  const [med, setMed] = useState('');

  const handleDelete = (m) => {
    let newChips = diagnoses.filter((e) => e !== m);
    change('diagnoses', newChips);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let addChips = diagnoses;
    addChips.push(med);
    change('diagnoses', addChips);
    setMed('');
  };

  return diagnoses ? (
    <form onSubmit={(e) => handleAdd(e)}>
      <Paper elevation={0} component='ul' className={classes.root}>
        {edit ? (
          <div className='input-field col s12'>
            <input
              id='diagnoses'
              type='text'
              placeholder={`Add Diagnoses..`}
              onChange={(e) => setMed(e.target.value)}
              value={med}
            />
          </div>
        ) : (
          <p className='grey-text text-darken-1 col s12'>Diagnoses:</p>
        )}
        {diagnoses.map((m) => {
          return (
            <li key={m}>
              <Chip
                label={m}
                onDelete={edit ? () => handleDelete(m) : undefined}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
    </form>
  ) : (
    <div>No diagnoses to show</div>
  );
};

DiagnosesChipGenerator.propTypes = {
  diagnoses: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

DiagnosesChipGenerator = reduxForm({
  destroyOnUnmount: false,
  form: 'editClientForm',
})(DiagnosesChipGenerator);

const selector = formValueSelector('editClientForm');

const mapStateToProps = (state) => ({
  diagnoses: selector(state, 'diagnoses'),
});
const mapDispatchToProps = {
  change,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiagnosesChipGenerator);
