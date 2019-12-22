import React from "react";
import styled from "styled-components";
import { useBranch } from "baobab-react/hooks";

import * as access from "../access";

import Row from "../Layouts/Row";
import Label from "../tools/Label";
import { SpaceAround } from "../Layouts/Spaces";
import IconButton from "../icons/IconButton"

const Srow = styled(Row)`
  justify-content: space-between;
  background: ${props => props.selected ? access.color('backgrounds.primary') : 'inherit'};
  color: ${props => props.selected ? access.color('texts.primary') : 'inherit'};
`;

function ListItem({ label, handleRowClick, handleRemove, handleEdit, parent }) {
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
    return(
      <IconButton onClick={handleRemoveClick} icon={access.icon("listItem.remove")} color={access.color("menuPanel.icon")}/>
    )
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
