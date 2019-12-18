import React from "react";

import * as access from "../access";
import { useBranch } from "baobab-react/hooks";

import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";
import Row from "../Layouts/Row";

const BottomBar = styled(Row)`
  justify-content: flex-end;
`;

const BackRow = styled(Row)`
  justify-content: center;
`;

function BottomBarMenu({viewKey}) {
  const { collapse, dispatch } = useBranch({ collapse: ["collapse"] });

  const useStyles = makeStyles((theme,a,b) => {
    return{
      button: {
        color: access.color("bottomBar.fg"),
        padding: 10
      },
      copy: {
        fontSize: 18,
        transform: collapse ? 'rotate(180deg)' : 'rotate(0deg)',
      }
    }
  });

  const classes = useStyles();

  const handleCollapse = () => {
    dispatch((tree)=>{
      tree.set('collapse', !collapse);
    })
  }

  const RenderCollapseButton = () => {
    return (
      <BackRow width={'50px'} onClick={handleCollapse}>
        <IconButton size="small" className={classes.button}>
          <Icon className={classes.copy}>
            {access.icon("leftPanel.collapse")}
          </Icon>
        </IconButton>
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
