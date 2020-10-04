import React, { useEffect, useState } from 'react';
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

let MedChipGenerator = ({ edit, medication, change }) => {
  const classes = useStyles();
  const [med, setMed] = useState('');

  const handleDelete = (m) => {
    let newChips = medication.filter((e) => e !== m);
    change('medication', newChips);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let addChips = medication;
    addChips.push(med);
    change('medication', addChips);
    setMed('');
  };

  return medication ? (
    <form onSubmit={(e) => handleAdd(e)}>
      <Paper elevation={0} component='ul' className={classes.root}>
        {edit ? (
          <div className='input-field col s12'>
            <input
              id='medication'
              type='text'
              placeholder={`Add Medication...`}
              onChange={(e) => setMed(e.target.value)}
              value={med}
            />
          </div>
        ) : (
          <p className='grey-text text-darken-1 col s12'>Medication:</p>
        )}
        {medication.map((m) => {
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
    <div>nNo medication to show</div>
  );
};

MedChipGenerator.propTypes = {
  medication: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

MedChipGenerator = reduxForm({
  destroyOnUnmount: false,
  form: 'editClientForm',
})(MedChipGenerator);

const selector = formValueSelector('editClientForm');

const mapStateToProps = (state) => ({
  medication: selector(state, 'medication'),
});
const mapDispatchToProps = {
  change,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedChipGenerator);
