import React, { useState, useRef } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";

import styled from "styled-components";
import Row from "../plugins/Layouts/Row";
import Column from "../plugins/Layouts/Column";
import Label from "../plugins/tools/Label";
import Editor from "../plugins/editor/Editor";
import SwitchEditorBtn from "../plugins/schemePanel/SwitchEditorBtn";
import OpenPanelCanvas from "../plugins/canvases/OpenPanelCanvas";

const InnerRow = styled(Row)`
  min-height: 0px;
  transition: height ${access.time('addItemPanel.transition')}ms;
  box-shadow: 0px 2px 3px 0px rgb(17, 38, 90);
`;

function AddItemPanel(params) {
    const { viewKey } = useBranch({ viewKey: ["viewKey"] });

    const openPanelCanvas = () => {
        if (viewKey !== "showAddItem") return null;
    
        return <OpenPanelCanvas/>
      }

    
    const getFlex= () => {
        if (viewKey === "showAddItem") return access.dim("flexViews.addItemPanel");
        return 0;
      };
    
      const getInnerHeight = () => {
        if (viewKey === "showAddItem") return '99%';
        return '0%';
      };

    const flex = getFlex();
    const innerHeight = getInnerHeight();
    const zIndex = access.dim("zIndexViews.addItemPanel");

    return (
        <Column
          zIndex={zIndex}
          background={access.color("canvases.bg")}
          flex={flex} >

          <InnerRow height={innerHeight} background={access.color("schemePanel.bg")}>
             {/* {renderActionBar()} */}
            {openPanelCanvas()} 
            
          </InnerRow> 
        </Column>
      );
}

export default AddItemPanel;