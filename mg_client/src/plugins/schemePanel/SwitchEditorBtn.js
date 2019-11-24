import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SpaceAround } from "../Layouts/Spaces";

import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as access from "../access";

const SwitchButtonCont = styled(SpaceAround)`
  &:before {
    content: '';
    height: 35px;
    margin-right: 5px;
    border-left: solid 1px ${access.color("schemePanel.divider")};
  }
`;

const useStyles = makeStyles(theme => ({
  selectedBtn: {
    color: access.color("schemePanel.selected"),
    padding: 5,
    fontSize: 25
  },
  btn: {
    color: access.color("schemePanel.icons"),
    padding: 5,
    fontSize: 25
  }
}));

function SwitchEditorBtn({ onSwitch, value }) {
  const selectScheme = () => {
    onSwitch("scheme");
  };

  const selectCode = () => {
    onSwitch("code");
  };

  const CodeSelected = value === "code";
  const classes = useStyles();
  const codeClass = CodeSelected ? classes.selectedBtn : classes.btn;
  const schemeClass = !CodeSelected ? classes.selectedBtn : classes.btn;

  return (
    <SwitchButtonCont width={"70px"} style={{ marginRight: 10 }}>
      <IconButton size="small" onClick={selectScheme}>
        <Icon className={schemeClass}>{access.icon("schemePanel.scheme")}</Icon>
      </IconButton>
      <IconButton size="small" onClick={selectCode}>
        <Icon className={codeClass}>{access.icon("schemePanel.code")}</Icon>
      </IconButton>
    </SwitchButtonCont>
  );
}

SwitchEditorBtn.defaultProps = {
  onSwitch: 1,
  value: "100%"
};

SwitchEditorBtn.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  value: PropTypes.oneOf(["code", "scheme"]).isRequired
};

export default SwitchEditorBtn;
