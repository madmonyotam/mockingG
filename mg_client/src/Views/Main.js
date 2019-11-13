import React, { Suspense } from "react";

import Mask from "../plugins/tools/Mask";
import LeftPanel from "./LeftPanel";

function Main() {
    
  return (
      <Mask opacity={1} style={{display:'flex'}}>
            <LeftPanel/>
      </Mask>
  );
}

export default Main;
