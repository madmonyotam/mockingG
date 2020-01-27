import React, { useState } from "react";
import styled from "styled-components";
import { useBranch } from "baobab-react/hooks";

import { TextField, ClickAwayListener } from "@material-ui/core";

import * as access from "plugins/access";

import Row from "plugins/Layouts/Row";
import Label from "plugins/tools/Label";
import { SpaceAround } from "plugins/Layouts/Spaces";
import IconButton from "plugins/icons/IconButton";

const Srow = styled(Row)`
  justify-content: space-between;
  background: ${props =>
    props.selected ? access.color("backgrounds.primary") : "inherit"};
  color: ${props =>
    props.selected ? access.color("texts.primary") : "inherit"};
`;

function ListItem({ label, handleRowClick, handleRemove, handleEdit, parent }) {
  const { selected } = useBranch({ selected: ["selected"] });
  const [mode, setMode] = useState("button");
  const [value, setValue] = useState(label);

  const handleRemoveClick = e => {
    e.stopPropagation();
    handleRemove(label);
  };

  const changeMadeToEdit = e => {
    e.stopPropagation();
    setMode("edit");
  };

  const changeMadeToButton = () => {
    setMode("button");
  };

  const edit = () => {
    handleEdit(label,value);
    changeMadeToButton();
  };

  const close = () => {
    setValue(label);
    changeMadeToButton();
  }

  const handleOnKeyPrass = e => {
    switch (e.key) {
      case "Escape":
        close();
        break;
      case "Enter":
        edit();
        break;
      default:
        break;
    }
  };

  const renderRemove = () => {
    return (
      <IconButton
        onClick={handleRemoveClick}
        icon={access.icon("listItem.remove")}
        color={access.color("menuPanel.icon")}
      />
    );
  };

  const rendeEdit = () => {
    if(!handleEdit) return null;

    return (
      <IconButton
        onClick={changeMadeToEdit}
        icon={access.icon("listItem.edit")}
        color={access.color("menuPanel.icon")}
      />
    );
  };

  const renderButtons = () => {
    const width = handleEdit ? "85px" : "50px";

    return (
      <SpaceAround width={width}>
        {rendeEdit()}
        {renderRemove()}
      </SpaceAround>
    );
  };

  const renderAddBtn = () => {
    if (!value) return null;

    return (
      <Row
        width={"50px"}
        style={{ padding: "0 5px", justifyContent: "center" }}
      >
        <IconButton
          icon={access.icon("listItem.check")}
          color={access.color("texts.secondary")}
          onClick={edit}
        />
      </Row>
    );
  };

  if (mode === "edit") {
    const handleInputChange = e => {
      setValue(e.target.value.trimStart());
    };

    return (
      <ClickAwayListener onClickAway={close}>
        <Row key={label} onKeyUp={handleOnKeyPrass}>
          <TextField
            autoFocus={true}
            fullWidth={true}
            value={value}
            onChange={handleInputChange}
            label={"edit"}
            variant={"filled"}
          />
          {renderAddBtn()}
        </Row>
      </ClickAwayListener>
    );
  }

  const isSelected = selected === `${parent}:${label}`;
  return (
    <Srow
      key={label}
      menuItem={true}
      selected={isSelected}
      onClick={() => {
        handleRowClick(label);
      }}
    >
      <Label>{label}</Label>
      {renderButtons()}
    </Srow>
  );
}

export default ListItem;
