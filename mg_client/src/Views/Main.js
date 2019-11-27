import React from "react";
import { useBranch } from "baobab-react/hooks";

import Mask from "../plugins/tools/Mask";
import MenuPanel from "./MenuPanel";
import SchemePanel from "./SchemePanel";
import AddItemPanel from "./AddItemPanel";
import MainCanvas from "../plugins/canvases/MainCanvas";
import Column from "../plugins/Layouts/Column";

import * as access from "../plugins/access";

function Main() {

  const { viewKey } = useBranch({ viewKey: ["viewKey"] });

  const getFlex = () => {
    const schemePanelSize = access.dim("flexViews.schemePanel");
    const leftPanelSize = access.dim("flexViews.leftPanel");
    const size = leftPanelSize + schemePanelSize;

    if (viewKey !== "initKey") return 1 - size;
    return 1 - leftPanelSize;
  };
    
  return (
      <Mask opacity={1} style={{display:'flex'}}>
            <MenuPanel/>
            <SchemePanel/>
            <Column flex={getFlex()}>
              <AddItemPanel/>
              <MainCanvas key={viewKey}/>
            </Column>
      </Mask>
  );
}

export default Main;
