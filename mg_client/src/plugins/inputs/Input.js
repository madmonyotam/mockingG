import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

function Input({ onFocus, onBlur, onChange, label, initValue }) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleOnChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <TextField
      label={label}
      variant={"filled"}
      onChange={handleOnChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      fullWidth
    />
  );
}

Input.defaultProps = {
  initValue: "",
  onFocus: ()=>{},
  onBlur: ()=>{},
  onChange: ()=>{}, 
  label: 'label'
};

Input.propTypes = {
  initValue: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func, 
  label: PropTypes.string
};

export default Input;
