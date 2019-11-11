import React, { useEffect, useState } from "react";
import { useBranch } from "baobab-react/hooks";

import Column from "../plugins/Layouts/Column";
import Row from "../plugins/Layouts/Row";
import Label from "../plugins/styled/Label";

import * as libsActions from "../tree/actions/libs";
import { get } from "../plugins/requests";

function LeftPanel() {
  const { libs, dispatch } = useBranch({ libs: ["libs"] });
  const [navContext, setNavContext] = useState("libs");

  useEffect(() => {
    get("/getAllLibraries").then(res => {
      dispatch(libsActions.setLibs, res.data);
    });
  }, []);

  const NavBar = () => {
    return <Row>nav Bar</Row>;
  };

  const getCategoriesFromLibrary = (lib)=>{
      get("/getCategoriesFromLibrary",{library:lib}).then(res => {
        console.log(res.data)
      });
  }

  const RenderList = () => {
    return libs.map(lib => (
      <Row key={lib} menuItem={true} onClick={()=>{ getCategoriesFromLibrary(lib) }}>
        <Label>{lib}</Label>
      </Row>
    ));
  };

  return (
    <Column flex={0.15}>
      <NavBar />
      <RenderList />
    </Column>
  );
}

export default LeftPanel;
