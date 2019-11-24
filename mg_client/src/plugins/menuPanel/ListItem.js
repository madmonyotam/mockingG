import React from "react";
import styled from "styled-components";
import { useBranch } from "baobab-react/hooks";

import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as access from "../access";

import Row from "../Layouts/Row";
import Label from "../tools/Label";
import { SpaceAround } from "../Layouts/Spaces";

const Srow = styled(Row)`
  justify-content: space-between;
  background: ${props => props.selected ? access.color('backgrounds.primary') : 'inherit'};
  color: ${props => props.selected ? access.color('texts.primary') : 'inherit'};
`;

const useStyles = makeStyles(theme => ({
  btn: {
    color: access.color("texts.primary"),
    padding: 5,
    fontSize: 20,
  }
}));

function ListItem({ label, handleRowClick, handleRemove, handleEdit, parent }) {
  const classes = useStyles();
  const { selected } = useBranch({ selected: ["selected"] });

  const handleRemoveClick = (e)=>{
    e.stopPropagation();
    handleRemove(label);
  }

  // const handleEditClick = (e)=>{
  //   e.stopPropagation();
  //   handleEdit(label);
  // }

  const renderRemove = () => {
    return (
      <IconButton size="small" onClick={handleRemoveClick}>
        <Icon className={classes.btn}>{access.icon("listItem.remove")}</Icon>
      </IconButton>
    );
  };

  const rendeEdit = () => {
    return null
    //TODO: edit + SpaceAround width={"80px"}
    // return (
    //   <IconButton style={{cursor:'not-allowed'}} size="small" onClick={handleEditClick}>
    //     <Icon className={classes.btn}>{access.icon("listItem.edit")}</Icon>
    //   </IconButton>
    // );
  };

  const renderButtons = () => {
    return (
      <SpaceAround width={"50px"}>
        {rendeEdit()}
        {renderRemove()}
      </SpaceAround>
    );
  };

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
