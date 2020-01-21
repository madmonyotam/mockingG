import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";


function MyChip({onDelete,value}) {

  const handleDelete = ()=>{
    onDelete(value);
  }

  return (
    <Chip style={{margin: 5}} label={value.label} onDelete={handleDelete} variant="outlined" />
  );
}

MyChip.defaultProps = {
    onDelete: ()=>{},
    value: {}
};

MyChip.propTypes = {
    onDelete: PropTypes.func,
    value: PropTypes.object,
};

export default MyChip;
