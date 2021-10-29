import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Checkbox } from '@material-ui/core';

const RenderCheckboxField = (props: any) => {
  const {
    field: { value, name, onChange },
    onValueChange = () => undefined,
    text,
    checkedValue,
    defaultChecked,
    textStyle,
    ...otherProps
  } = props;

  const handleOnChange = (event: Event, newInputValue: any) => {
    onChange(event);
    onValueChange(event, newInputValue);
  };

  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        value={checkedValue}
        checked={defaultChecked || (checkedValue ? value === checkedValue : value)}
        onChange={handleOnChange}
        name={name}
        color="primary"
        {...otherProps}
      />
      <Typography variant={'body1'} style={textStyle}>
        {text}
      </Typography>
    </Box>
  );
};

RenderCheckboxField.defaultProps = {
  checkedValue: true,
};

RenderCheckboxField.propTypes = {
  field: PropTypes.any.isRequired,
  onValueChange: PropTypes.any,
  text: PropTypes.string.isRequired,
  checkedValue: PropTypes.any,
  defaultChecked: PropTypes.bool,
  textStyle: PropTypes.any,
};

export default RenderCheckboxField;
