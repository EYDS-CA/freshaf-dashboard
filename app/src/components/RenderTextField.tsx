import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, InputLabel } from '@material-ui/core';
import { getIn } from 'formik';

const RenderTextField = (props: any) => {
  const {
    field: { value, name, onChange, onBlur },
    form: { touched, errors, setFieldValue, submitCount },
    label,
    placeholder,
    inputVariant,
    submitOnEnter,
    onInputBlur = () => undefined,
    ...otherProps
  } = props;
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  const displayErrors = (touch || submitCount > 0) && !!error;

  const onKeyDown = (event: any) => {
    if (!submitOnEnter) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }
  };

  const handleOnBlur = (event: any) => {
    const value = event.target.value.trim();
    setFieldValue(name, value);
    onInputBlur(value);
    onBlur(event);
  };

  return (
    <>
      <Box>
        <Box marginBottom="5px">
          <InputLabel>{label}</InputLabel>
        </Box>
        <TextField
          id={'filled-helperText'}
          name={name}
          variant={inputVariant}
          fullWidth
          error={touch && !!error}
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleOnBlur}
          onKeyDown={onKeyDown}
          InputLabelProps={{
            shrink: true,
          }}
          {...otherProps}
        />
        {displayErrors && (
          <Typography variant="body2" component="p" color="error" {...otherProps}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

RenderTextField.defaultProps = {
  inputVariant: 'filled',
  submitOnEnter: false,
};

RenderTextField.propTypes = {
  field: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  submitOnEnter: PropTypes.bool,
};

export default RenderTextField;
