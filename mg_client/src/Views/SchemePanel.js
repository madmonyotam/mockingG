import React, { useState, useRef } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";

import styled from "styled-components";
import Row from "../plugins/Layouts/Row";
import Column from "../plugins/Layouts/Column";
import Label from "../plugins/tools/Label";
import Editor from "../plugins/editor/Editor";

const Srow = styled(Row)`
  flex: ${props => props.flex};
`;

const TopBar = styled(Row)`
//   min-height: 46px;
//   margin-bottom: 6px;
`;

const InnerColumn = styled(Column)`
  min-width: 0;
  transition: flex 2s;
  box-shadow: -2px 0px 4px 4px rgb(17, 38, 90);
`;

function SchemePanel() {
  const { viewKey } = useBranch({ viewKey: ["viewKey"] });
  const { items } = useBranch({ items: ["items"] });
  const { selectedCategory } = useBranch({ selectedCategory: ["selectedCategory"] });

  const editorWrapper = useRef();
  const [editorWidth, setEditorWidth] = useState(0);

  const renderEditor = () => {
    if (viewKey === "initKey") {
      return null; // TODO: return canvas on open
    } else {
      setTimeout(() => {
        setEditorWidth(editorWrapper.current.getBoundingClientRect().width);
      }, 100);
    }

    if (editorWidth === 0) return null;
    const width = editorWidth - editorWidth / 100;

    return <Editor width={width} data={items} />;
  };

  const renderActionBar = () => {
    return (
      <TopBar background={access.color("searchBar.bg")}>
        <Label color={access.color("searchBar.fg")}>
          {selectedCategory}
        </Label>
      </TopBar>
    );
  };

  const getFlex = () => {
    if (viewKey !== "initKey") return access.dim("flexViews.schemePanel");
    return 0;
  };

  const getInnerFlex = () => {
    if (viewKey !== "initKey") return 0.99;
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
        {renderEditor()}
      </InnerColumn>
    </Srow>
  );
}

export default SchemePanel;
