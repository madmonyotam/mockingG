import React from "react";
import { useBranch } from "baobab-react/hooks";

import Mask from "../plugins/tools/Mask";
import MenuPanel from "./MenuPanel";
import SchemePanel from "./SchemePanel";
import MainCanvas from "../plugins/canvases/MainCanvas";

function Main() {

  const { viewKey } = useBranch({ viewKey: ["viewKey"] });
    
  return (
      <Mask opacity={1} style={{display:'flex'}}>
            <MenuPanel/>
            <SchemePanel/>
            <MainCanvas key={viewKey}/>
      </Mask>
  );
}

export default Main;
