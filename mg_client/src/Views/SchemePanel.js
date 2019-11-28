import React, { useState, useRef } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";

import styled from "styled-components";
import Row from "../plugins/Layouts/Row";
import Column from "../plugins/Layouts/Column";
import Center from "../plugins/Layouts/Center";
import Label from "../plugins/tools/Label";
import Editor from "../plugins/editor/Editor";
import SwitchEditorBtn from "../plugins/schemePanel/SwitchEditorBtn";
import OpenPanelCanvas from "../plugins/canvases/OpenPanelCanvas";

const Srow = styled(Row)`
  flex: ${props => props.flex};
`;

const TopBar = styled(Row)`
  justify-content: space-between;
`;

const InnerColumn = styled(Column)`
  min-width: 0;
  transition: flex ${access.time('schemePanel.transition')}ms;
  box-shadow: 2px 0px 3px 0px rgb(17, 38, 90);
  overflow: hidden;
`;

function SchemePanel() {
  const { viewKey } = useBranch({ viewKey: ["viewKey"] });
  const { items } = useBranch({ items: ["items"] });
  const { mockData } = useBranch({ mockData: ["mockData"] });
  const { selectedCategory } = useBranch({ selectedCategory: ["selectedCategory"] });

  const editorWrapper = useRef();
  const [editorWidth, setEditorWidth] = useState(0);
  const [editorToRender, setEditorToRender] = useState('scheme');

  const handleSwitchEditor = (v) => {
    setEditorToRender(v);
  }

  const openPanelCanvas = () => {
    if (viewKey === "initKey") return null;

    return <OpenPanelCanvas/>
  }

  const renderEditor = () => {
    const isData = editorToRender === 'code' ? true : false;

    if (viewKey === "initKey") {
      return null;
    } else {
      setTimeout(() => {
        if(editorWrapper.current){
          setEditorWidth(editorWrapper.current.getBoundingClientRect().width);
        }
      }, access.time('schemePanel.showEditor'));
    }

    if (editorWidth === 0) return null;
    const width = editorWidth - editorWidth / 100;
    let jsonToRender = items;
    if(isData) jsonToRender = mockData;

    return <Editor isData={isData} width={width} data={jsonToRender} />;
  };

  const renderActionBar = () => {
    return (
      <TopBar background={access.color("searchBar.bg")}>
        <Center style={{minWidth: 50}} overflow={'hidden'}>

        <Label color={access.color("searchBar.fg")} >
          {selectedCategory}
        </Label>
        </Center>
        <SwitchEditorBtn  onSwitch={handleSwitchEditor} value={editorToRender} mockData={mockData}/>
      </TopBar>
    );
  };

  const getFlex = () => {
    if (viewKey !== "initKey") return access.dim("flexViews.schemePanel");
    return 0;
  };

  const getInnerFlex = () => {
    if (viewKey !== "initKey") return 0.993;
    return 0;
  };

  const flex = getFlex();
  const InnerFlex = getInnerFlex();

  const zIndex = access.dim("zIndexViews.schemePanel");

  
  return (
    <Srow
      ref={editorWrapper}
      flex={flex}
      zIndex={zIndex}
      background={access.color("canvases.bg")}
      height={"100%"}
      shadowColor={"none"}
    >
      <InnerColumn flex={InnerFlex} background={access.color("schemePanel.bg")}>
        {renderActionBar()}
        {openPanelCanvas()}
        {renderEditor()}
        
      </InnerColumn>
    </Srow>
  );
}

export default SchemePanel;
