import React from "react";

import * as access from "plugins/access";
import { useBranch } from "baobab-react/hooks";

import styled from "styled-components";
import Row from "plugins/Layouts/Row";
import BarButtons from "plugins/schemaPanel/BarButtons";

const BottomBar = styled(Row)`
  border-right: 1px solid ${access.color("schemaPanel.border")}
`;

function BottomBarSchema(params) {
  const { items } = useBranch({ items: ["items"] });
  const { focus } = useBranch({ focus: ["focus"] });
  const fileName = `${focus.lib}_${focus.cat}_schema`;

  return (
    <BottomBar background={access.color("bottomBar.bg")}>
      <BarButtons content={items} filename={fileName} />
    </BottomBar>
  );
}

export default BottomBarSchema;
