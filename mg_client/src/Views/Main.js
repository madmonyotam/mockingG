import React, { Suspense } from "react";

import Mask from "../plugins/tools/Mask";
import LeftPanel from "./LeftPanel";
import MainCanvas from "../plugins/canvases/MainCanvas";

function Main() {
    
  return (
      <Mask opacity={1} style={{display:'flex'}}>
            <LeftPanel/>
            <MainCanvas/>
      </Mask>
  );
}

export default Main;
