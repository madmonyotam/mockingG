import React, { useState, Fragment } from "react";

import { Icon, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as access from "../plugins/access";

import Row from "../plugins/Layouts/Row";
import Label from "../plugins/tools/Label";

import * as libsActions from "../tree/actions/libs";
import * as catsActions from "../tree/actions/cats";

const useStyles = makeStyles(theme => ({
  btn: {
    color: access.color("texts.placeholder"),
    paddingLeft: 15,
    fontSize: 20
  }
}));

function AddRow({ label, handleAdd }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const openAdd = () => {
    setOpen(true);
  };

  const renderPlaceholder = () => {
    if (open) return null;

    return (
      <Fragment>
        <Icon className={classes.btn}>{access.icon("leftPanel.add")}</Icon>
        <Label color={access.color("texts.placeholder")}>{label}</Label>
      </Fragment>
    );
  };

  const renderInput = () => {
    // if (!open) return null;

    const handleChange = e => {
      console.log(e.target.value);
      setValue(e.target.value);
    };

    const inputLabelProps={
        color: 'secondary'
    }

    return (
      <TextField
        InputLabelProps={inputLabelProps}
        fullWidth={true}
        value={value}
        onChange={handleChange}
        label={label}
        variant={'filled'}
      />
    );
  };

  return (
    <Row style={{ cursor: "pointer" }} onClick={openAdd}>
      {/* {renderPlaceholder()} */}
      {renderInput()}
    </Row>
  );
}

export default AddRow;
