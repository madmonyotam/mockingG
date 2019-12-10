import React, { useState } from "react";
import { useBranch } from "baobab-react/hooks";

import { generate } from "../../tree/actions/items";
import * as access from "../access";

import styled from "styled-components";
import Row from "../Layouts/Row";
import BarButtons from "./BarButtons";

import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const BottomBar = styled(Row)`
  justify-content: flex-end;
  border-right: 1px solid ${access.color("schemePanel.border")};
`;

const AmountInput = styled("input")`
  width: 60px;
  margin-left: 25px;
  padding: 0px 5px;
  text-align: center;
  outline-color: ${access.color("bottomBar.outline")}
  font-weight: 600;
`;

const useStyles = makeStyles(theme => ({
  play: {
    color: access.color("bottomBar.fg"),
    marginRight: 10,
    marginLeft: 10,
    padding: 6
  }
}));

function BottomBarGen(params) {
  const classes = useStyles();
  const { mockData, dispatch } = useBranch({ mockData: ["mockData"] });
  const { items } = useBranch({ items: ["items"] });
  const { focus } = useBranch({ focus: ["focus"] });
  const [amount, setAmount] = useState(1);
  const fileName = `${focus.lib}_${focus.cat}`;

  const gen = () => {
    dispatch(generate, { items, amount });
  };

  const PlayButton = () => {
    return (
      <IconButton className={classes.play} size="small" onClick={gen}>
        <Icon>{access.icon("schemePanel.play")}</Icon>
      </IconButton>
    );
  };

  const RenderAmountInput = () => {
    const handleSetAmount = e => {
      let value = e.target.value;

      value = value < 1 ? 1 : value;
      value = value > 10000 ? 10000 : value;

      setAmount(value);
    };

    return (
      <AmountInput
        type={"number"}
        value={amount}
        onChange={handleSetAmount}
        autoFocus={true}
      />
    );
  };

  return (
    <BottomBar background={access.color("bottomBar.bg")}>
      <BarButtons content={mockData} filename={fileName} />
      <RenderAmountInput />
      <PlayButton />
    </BottomBar>
  );
}

export default BottomBarGen;
