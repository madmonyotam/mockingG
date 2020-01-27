import React, { useState, useEffect } from "react";
import { TextField, ClickAwayListener } from "@material-ui/core";
import { useBranch } from "baobab-react/hooks";

import * as access from "plugins/access";

import Row from "plugins/Layouts/Row";
import Center from "plugins/Layouts/Center";
import Label from "plugins/tools/Label";
import IconButton from "plugins/icons/IconButton";

let open = false;

function AddRow({ label, handleAdd }) {
  const [value, setValue] = useState("");
  const { focusItem } = useBranch({ focusItem: ["focus", "item"] });

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
      <Row
        width={"50px"}
        style={{ padding: "0 5px", justifyContent: "center" }}
      >
        <IconButton
          icon={access.icon("leftPanel.add")}
          color={access.color("texts.secondary")}
          onClick={add}
        />
      </Row>
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

  if (focusItem) {
    return (
      <Row>
        <Center>
          <Label>{focusItem}</Label>
        </Center>
      </Row>
    );
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setValue("");
      }}
    >
      <Row style={{ cursor: "pointer" }} onKeyUp={handleOnKeyPrass}>
        {renderInput()}
        {renderAddBtn()}
      </Row>
    </ClickAwayListener>
  );
}

export default AddRow;
