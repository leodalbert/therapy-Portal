import React from 'react';
import { DatePicker } from '@material-ui/pickers';

export default ({
  meta: { submitting, error, touched },
  input: { onBlur, value, ...inputProps },
  edit,
  defaultDate,
  ...others
}) => {
  const onChange = (date) => {
    Date.parse(date)
      ? inputProps.onChange(date.toISOString())
      : inputProps.onChange(null);
  };
  return (
    <DatePicker
      InputProps={{
        disableUnderline: true,
      }}
      {...inputProps}
      {...others}
      disableFuture
      format='MM/DD/yyyy'
      value={value ? new Date(value) : null}
      disabled={!edit}
      onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
      error={error && touched}
      onChange={onChange}
    />
  );
};
