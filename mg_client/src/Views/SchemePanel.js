import React from "react";
import { useBranch } from "baobab-react/hooks";


import * as access from "../plugins/access";

import styled from "styled-components";
import Row from "../plugins/Layouts/Row";
import Column from "../plugins/Layouts/Column";

const Srow = styled(Row)`
    flex: ${props => props.flex};
    justify-content: flex-end;
`;

const InnerColumn = styled(Column)`
    min-width: 0;
    transition: flex 2.5s;
    box-shadow: 3px 0px 5px 5px rgb(17, 38, 90);
`
    
function SchemePanel() {

    const { viewKey } = useBranch({ viewKey: ["viewKey"] });

    const getFlex = () => {
       if(viewKey !== 'initKey') return access.dim('flexViews.schemePanel');
       return 0;
    }

    const getInnerFlex = () => {
        if(viewKey !== 'initKey') return 0.99;
        return 0;
     }

    const flex = getFlex();
    const InnerFlex = getInnerFlex();
    const zIndex = access.dim('zIndexViews.schemePanel');

  return (
    <Srow flex={flex} zIndex={zIndex} background={access.color("canvases.bg")} height={'100%'} shadowColor={'none'}>
        <InnerColumn flex={InnerFlex} background={access.color("schemePanel.bg")} >
        
        </InnerColumn> 
    </Srow>
);
}

export default SchemePanel;