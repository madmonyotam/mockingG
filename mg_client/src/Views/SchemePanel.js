import React, { useState, useRef } from "react";
import { useBranch } from "baobab-react/hooks";

import styled from "styled-components";

import * as access from "plugins/access";

import Row from "plugins/Layouts/Row";
import Column from "plugins/Layouts/Column";
import Center from "plugins/Layouts/Center";
import Label from "plugins/tools/Label";
import Editor from "plugins/editor/Editor";
import SwitchEditorBtn from "plugins/schemePanel/SwitchEditorBtn";
import BottomBarGen from "plugins/schemePanel/BottomBarGen";
import BottomBarScheme from "plugins/schemePanel/BottomBarScheme";
import DragMask from "plugins/schemePanel/DragMask";
import OpenPanelCanvas from "plugins/canvases/OpenPanelCanvas";

const Placeholder = styled('div')`
  flex:1
`

const Srow = styled(Row)`
  flex: ${props => props.flex};
  transition: flex ${access.time("schemePanel.collapse")}ms;
`;

const TopBar = styled(Row)`
  justify-content: space-between;
  border-right: 1px solid ${access.color("schemePanel.border")}
`;

const InnerColumn = styled(Column)`
  min-width: 0;
  transition: flex ${access.time("schemePanel.transition")}ms;
  border-right: 1px solid ${access.color("schemePanel.border")}
  overflow: hidden;
  box-shadow: unset;
`;

function SchemePanel() {

  const { viewKey } = useBranch({ viewKey: ["viewKey"] });
  const { dragState } = useBranch({ dragState: ["drag"] });
  const { collapse } = useBranch({ collapse: ["collapse"] });
  const { selectedCategory } = useBranch({
    selectedCategory: ["selectedCategory"]
  });

  const editorWrapper = useRef();
  const [editorWidth, setEditorWidth] = useState(0);
  const [editorToRender, setEditorToRender] = useState("scheme");

  const handleSwitchEditor = v => {
    setEditorToRender(v);
  };

  const openPanelCanvas = () => {
    if (viewKey === "initKey") return null;

    return <OpenPanelCanvas />;
  };

  const dragCanvas = () => {
    if (!dragState) return null;

    return <DragMask text={dragState} />;
  };

  const renderEditor = () => {
    const isData = editorToRender === "code" ? true : false;

    if (viewKey === "initKey") {
      return null;
    } else if(collapse || editorWidth !== 0){
      setTimeout(() => {
        if (editorWrapper.current) {
          setEditorWidth(editorWrapper.current.getBoundingClientRect().width);
        }
      }, 600);
    } else {
      setTimeout(() => {
        if (editorWrapper.current) {
          setEditorWidth(editorWrapper.current.getBoundingClientRect().width);
        }
      }, access.time("schemePanel.showEditor"));
    }

    if (editorWidth === 0) return <Placeholder/>;
    const width = editorWidth;

    return <Editor isData={isData} width={width} />;
  };

  const RenderActionBar = () => {
    return (
      <TopBar background={access.color("searchBar.bg")}>
        <Center style={{ minWidth: 50 }} overflow={"hidden"}>
          <Label color={access.color("searchBar.fg")}>{selectedCategory}</Label>
        </Center>
        <SwitchEditorBtn
          onSwitch={handleSwitchEditor}
          value={editorToRender}
        />
      </TopBar>
    );
  };

  const RenderBottomBar = () => {
    if (editorToRender === "scheme") {
      return <BottomBarScheme />;
    }

    return <BottomBarGen />;
  };

  const getFlex = () => {
    if (viewKey !== "initKey"){

      if(collapse){
        return access.dim("flexCollapse.schemePanel");
      }

      return access.dim("flexViews.schemePanel");
    } 
    return 0;
  };

  const getInnerFlex = () => {
    if (viewKey !== "initKey") return 1;
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
        <RenderActionBar />
        {openPanelCanvas()}
        {renderEditor()}
        {dragCanvas()}
        <RenderBottomBar />
      </InnerColumn>
    </Srow>
  );
}

export default SchemePanel;
