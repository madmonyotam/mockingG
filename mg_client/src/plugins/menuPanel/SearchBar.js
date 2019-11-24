import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import * as access from "../access";

import Row from "../Layouts/Row";
import Label from "../tools/Label";

const useStyles = makeStyles(theme => ({
  btn: {
    marginLeft: 10,
    marginTop: 2,
    color: access.color("searchBar.fg")
  }
}));

function SearchBar({ label, nested, onBack }) {
  const classes = useStyles();
  
  const renderBack = ()=>{
    if(!nested) return;
    
    return(
      <IconButton className={classes.btn} size="small" onClick={onBack}>
        <Icon>{access.icon("searchBar.back")}</Icon>
      </IconButton>
    )
  }

  return (
    <Row background={access.color("searchBar.bg")}>
      { renderBack() }
      <Label color={access.color("searchBar.fg")}>{label}</Label>
    </Row>
  );
}

export default SearchBar;
