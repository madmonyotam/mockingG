import React from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";

import Mask from "../plugins/tools/Mask";
import MenuPanel from "./MenuPanel";
import SchemePanel from "./SchemePanel";
import MainCanvas from "../plugins/canvases/MainCanvas";
import Menu from "../plugins/menuModal/Menu";

function Main() {
  const { viewKey } = useBranch({ viewKey: ["viewKey"] });

  return (
    <Mask opacity={1} mask={access.color("backgrounds.secondary")} style={{ display: "flex" }}>
      <MenuPanel viewKey={viewKey} />
      <SchemePanel />
      <MainCanvas key={viewKey} />
      <Menu/> 
    </Mask>
  );
}

export default Main;
