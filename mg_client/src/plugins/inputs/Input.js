import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

function Input({ onFocus, onBlur, onChange, label, initValue, type, ...rest }) {
  const [value, setValue] = useState(initValue);
  const inputType = type === 'array' ? 'string' : type;

  const getArrayValues = (values) => {
    return values.split(',');
  }

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleOnChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);

    if(type === 'array'){
      const value = getArrayValues(e.target.value);
      onChange(value);
    }
  };

  return (
    <TextField
      label={label}
      variant={"filled"}
      onChange={handleOnChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      type={inputType}
      fullWidth
      {...rest}
    />
  );
}

Input.defaultProps = {
  initValue: "",
  onFocus: ()=>{},
  onBlur: ()=>{},
  onChange: ()=>{}, 
  label: 'label',
  type: 'string'
};

Input.propTypes = {
  initValue: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func, 
  label: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
