import React from "react";

import * as access from "../access";

import styled from "styled-components";
import Row from "../Layouts/Row";

import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const BottomBar = styled(Row)``;

const useStyles = makeStyles(theme => ({
  btn: {
    marginLeft: 10,
    marginTop: 2,
    color: access.color("bottomBar.fg")
  }
}));

function BottomBarScheme(params) {
  const classes = useStyles();

  return (
    <BottomBar background={access.color("bottomBar.bg")}>
      <IconButton className={classes.btn} size="small">
        <Icon>{access.icon("searchBar.back")}</Icon>
      </IconButton>
    </BottomBar>
  );
}

export default BottomBarScheme;
