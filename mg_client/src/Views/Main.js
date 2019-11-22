import React from "react";
import { useBranch } from "baobab-react/hooks";

import Mask from "../plugins/tools/Mask";
import LeftPanel from "./LeftPanel";
import SchemePanel from "./SchemePanel";
import MainCanvas from "../plugins/canvases/MainCanvas";

function Main() {

  const { viewKey } = useBranch({ viewKey: ["viewKey"] });
    
  return (
      <Mask opacity={1} style={{display:'flex'}}>
            <LeftPanel/>
            <SchemePanel/>
            <MainCanvas key={viewKey}/>
      </Mask>
  );
}

export default Main;
