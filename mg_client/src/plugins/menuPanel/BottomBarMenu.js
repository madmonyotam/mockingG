import React from "react";

import * as access from "plugins/access";
import { useBranch } from "baobab-react/hooks";

import styled from "styled-components";
import Row from "plugins/Layouts/Row";
import IconButton from "plugins/icons/IconButton";

const BottomBar = styled(Row)`
  justify-content: flex-end;
`;

const BackRow = styled(Row)`
  justify-content: center;
`;

function BottomBarMenu({ viewKey }) {
  const { collapse, dispatch } = useBranch({ collapse: ["collapse"] });

  const handleCollapse = () => {
    dispatch(tree => {
      tree.set("collapse", !collapse);
    });
  };

  const RenderCollapseButton = () => {
    const iconStyle = { transform: collapse ? "rotate(180deg)" : "rotate(0deg)" }

    return (
      <BackRow width={"50px"} onClick={handleCollapse}>
        <IconButton icon={access.icon("leftPanel.collapse")} iconStyle={iconStyle} />
      </BackRow>
    );
  };

  if (viewKey === "initKey") return <div></div>;

  return (
    <BottomBar background={access.color("bottomBar.bg")}>
      <RenderCollapseButton />
    </BottomBar>
  );
}

export default BottomBarMenu;
