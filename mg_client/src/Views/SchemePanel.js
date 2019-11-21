import React, { useState } from "react";
import { useBranch } from "baobab-react/hooks";


import * as access from "../plugins/access";
import * as packUtils from "../plugins/canvases/utils/packUtils";

import styled from "styled-components";
import Row from "../plugins/Layouts/Row";
import Column from "../plugins/Layouts/Column";

import { get } from "../plugins/requests";

const Srow = styled(Row)`
    flex: ${props => props.flex};
`;

const InnerColumn = styled(Column)`
    min-width: 0;
    transition: flex 0.5s;
`
    
function SchemePanel() {

    const { selected } = useBranch({ selected: ["selected"] });

    const getFlex = () => {
       if(selected) return access.dim('flexViews.schemePanel');
       return 0;
    }

    const getInnerFlex = () => {
        if(selected) return 0.99;
        return 0;
     }

    const flex = getFlex();
    const InnerFlex = getInnerFlex();
    const zIndex = access.dim('zIndexViews.schemePanel');

  return (
    <Srow flex={flex} zIndex={zIndex} background={access.color("canvases.bg")} height={'100%'} shadowColor={'none'}>
        <InnerColumn flex={InnerFlex}>
        
        </InnerColumn> 
    </Srow>
);
}

export default SchemePanel;