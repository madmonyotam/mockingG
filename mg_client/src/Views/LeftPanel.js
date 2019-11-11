import React, { useEffect, useState } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";

import Column from "../plugins/Layouts/Column";
import Row from "../plugins/Layouts/Row";
import Label from "../plugins/styled/Label";

import SearchBar from "../components/SearchBar";

import * as libsActions from "../tree/actions/libs";
import * as catsActions from "../tree/actions/cats";
import { get } from "../plugins/requests";

function LeftPanel() {
  const { libs, dispatch } = useBranch({ libs: ["libs"] });
  const { cats } = useBranch({ cats: ["cats"] });
  const { focus } = useBranch({ focus: ["focus"] });

  const [nested, setNested] = useState(false);

  useEffect(() => {
    get("/getAllLibraries").then(res => {
      dispatch(libsActions.setLibs, res.data);
    });
  }, []);

  const getCategoriesFromLibrary = lib => {
    get("/getCategoriesFromLibrary", { library: lib }).then(res => {
      dispatch(catsActions.setCats, res.data);
      dispatch(libsActions.setLibToFocus, lib);
      
      setNested(true);
    });
  };

  const handleOnRowClick = (label)=>{
    if(!focus.lib){
      getCategoriesFromLibrary(label);
      return;
    }

    dispatch(catsActions.setCatToFocus, label);
  }

  const RenderList = () => {
    let listOf = !focus.lib ? libs : cats;

    return listOf.map(label => (
      <Row
        key={label}
        menuItem={true}
        onClick={() => { handleOnRowClick(label) }}
      >
        <Label>{label}</Label>
      </Row>
    ));
  };

  const handleBack = () => {
    dispatch(libsActions.setLibToFocus, null);
    setNested(false);
  }

  const getLabel = () => {
    if(focus.lib) return focus.lib;
    return access.translate('libraries');
  }

  return (
    <Column flex={0.15}>
      <SearchBar label={getLabel()} nested={nested} onBack={handleBack} />
      <RenderList />
    </Column>
  );
}

export default LeftPanel;
