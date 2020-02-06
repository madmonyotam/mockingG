import React, { useState } from "react";
import { useBranch } from "baobab-react/hooks";

import { generate } from "tree/actions/items";
import * as access from "plugins/access";

import styled from "styled-components";
import IconButton from "plugins/icons/IconButton";
import Row from "plugins/Layouts/Row";
import BarButtons from "plugins/schemaPanel/BarButtons";

const BottomBar = styled(Row)`
  justify-content: flex-end;
  border-right: 1px solid ${access.color("schemaPanel.border")};
`;

const AmountInput = styled("input")`
  width: 60px;
  margin-left: 25px;
  padding: 0px 5px;
  text-align: center;
  outline-color: ${access.color("bottomBar.outline")}
  font-weight: 600;
`;

function BottomBarGen(params) {
  const { mockData, dispatch } = useBranch({ mockData: ["mockData"] });
  const { items } = useBranch({ items: ["items"] });
  const { focus } = useBranch({ focus: ["focus"] });
  const [amount, setAmount] = useState(1);
  const fileName = `${focus.lib}_${focus.cat}`;

  const gen = () => {
    dispatch(generate, { items, amount });
  };

  const PlayButton = () => {
    const btnStyle = { marginRight: 10, marginLeft: 10 };

    return (
      <IconButton
        icon={access.icon("schemaPanel.play")}
        color={access.color("bottomBar.fg")}
        onClick={gen}
        btnStyle={btnStyle}
      />
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
