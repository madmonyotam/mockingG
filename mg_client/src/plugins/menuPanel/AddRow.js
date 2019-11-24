import React, { useState, useEffect } from "react";

import { Icon, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as access from "../access";

import Row from "../Layouts/Row";
import Absolute from "../Layouts/Absolute";

let open = false;

const useStyles = makeStyles(theme => ({
  btn: {
    color: access.color("texts.secondary"),
    padding: 5,
    fontSize: 20
  }
}));

function AddRow({ label, handleAdd }) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  useEffect(() => {
    open = false;
  }, []);

  const handleOnKeyPrass = e => {
    if (!value) return;
    switch (e.key) {
      case "Escape":
        setValue("");
        break;
      case "Enter":
        add();
        break;
      default:
        break;
    }
  };

  const add = () => {
    handleAdd(value);
    setValue("");
  };

  const renderAddBtn = () => {
    if (!value) return null;

    return (
      <Absolute left={null}>
        <Row>
          <IconButton size="small" onClick={add}>
            <Icon className={classes.btn}>{access.icon("leftPanel.add")}</Icon>
          </IconButton>
        </Row>
      </Absolute>
    );
  };

  const renderInput = () => {
    const handleChange = e => {
      if (!open) open = true;
      setValue(e.target.value.trimStart());
    };

    return (
      <TextField
        autoFocus={open}
        fullWidth={true}
        value={value}
        onChange={handleChange}
        label={label}
        variant={"filled"}
      />
    );
  };

  return (
    <Row style={{ cursor: "pointer" }} onKeyUp={handleOnKeyPrass}>
      {renderInput()}
      {renderAddBtn()}
    </Row>
  );
}

export default AddRow;
