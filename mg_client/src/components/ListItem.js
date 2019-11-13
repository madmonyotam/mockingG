import React from "react";
import styled from "styled-components";
import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as access from "../plugins/access";

import Row from "../plugins/Layouts/Row";
import Label from "../plugins/tools/Label";
import { SpaceAround } from "../plugins/Layouts/Spaces";

const Srow = styled(Row)`
  justify-content: space-between;
`;

const useStyles = makeStyles(theme => ({
  btn: {
    color: access.color("texts.primary"),
    padding: 5,
    fontSize: 20,
  }
}));

function ListItem({ label, handleRowClick, handleRemove, handleEdit }) {
  const classes = useStyles();

  const handleRemoveClick = (e)=>{
    e.stopPropagation();
    handleRemove(label);
  }

  const handleEditClick = (e)=>{
    e.stopPropagation();
    handleEdit(label);
  }

  const renderRemove = () => {
    return (
      <IconButton size="small" onClick={handleRemoveClick}>
        <Icon className={classes.btn}>{access.icon("listItem.remove")}</Icon>
      </IconButton>
    );
  };

  const rendeEdit = () => {
    return (
      <IconButton size="small" onClick={handleEditClick}>
        <Icon className={classes.btn}>{access.icon("listItem.edit")}</Icon>
      </IconButton>
    );
  };

  const renderButtons = () => {
    return (
      <SpaceAround width={"80px"}>
        {rendeEdit()}
        {renderRemove()}
      </SpaceAround>
    );
  };

  return (
    <Srow
      key={label}
      menuItem={true}
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
