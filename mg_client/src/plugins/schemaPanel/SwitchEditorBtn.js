import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useBranch } from "baobab-react/hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core";

import * as access from "plugins/access";

import { SpaceAround } from "plugins/Layouts/Spaces";


const SwitchButtonCont = styled(SpaceAround)`
margin-right: 5px;
  &:before {
    content: "";
    height: 35px;
    margin-right: 5px;
    border-left: solid 1px ${access.color("schemaPanel.divider")};
  }
`;

const useStyles = makeStyles(props => ({
  selectedBtn: {
    color: access.color("schemaPanel.selected"),
    fontSize: 11
  },
  btn: {
    color: access.color("schemaPanel.notSelected"),
    fontSize: 11,
  },
  indicator: {
    backgroundColor: access.color("schemaPanel.selected"),
  }
}));

function SwitchEditorBtn({ onSwitch, value }) {
  const { mockData } = useBranch({ mockData: ["mockData"] });


  const handleChange = (e, v) => {
    onSwitch(v);
  };

  const CodeSelected = value === "code";
  const disabled = !mockData;
  const classes = useStyles();
  const codeClass = CodeSelected ? classes.selectedBtn : classes.btn;
  const schemaClass = !CodeSelected ? classes.selectedBtn : classes.btn;

  return (
    <SwitchButtonCont width={"fit-content"}>
      <Tabs value={value} onChange={handleChange} classes={{indicator: classes.indicator}}>
        <Tab
          classes={{ root: schemaClass }}
          label={access.translate("schema")}
          value={"schema"}
        />
        <Tab
          classes={{ root: codeClass }}
          label={access.translate("Generate")}
          value={"code"}
          disabled={disabled}
        />
      </Tabs>
    </SwitchButtonCont>
  );
}

SwitchEditorBtn.defaultProps = {
  onSwitch: 1,
  value: "100%"
};

SwitchEditorBtn.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  value: PropTypes.oneOf(["code", "schema"]).isRequired
};

export default SwitchEditorBtn;
