import React, { useEffect, useState } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";

import Column from "../plugins/Layouts/Column";

import SearchBar from "../components/SearchBar";
import ListItem from "../components/ListItem";

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
      setNested(true);
      setTimeout(() => { dispatch(libsActions.setLibToFocus, lib); });

    });
  };

  const handleClickOnLib = label => {
    getCategoriesFromLibrary(label);
  };

  const handleClickOnCat = label => {
    dispatch(catsActions.setCatToFocus, label);
  };

  const RenderList = () => {
    let listOf = !focus.lib ? "libs" : "cats";

    switch (listOf) {
      case "libs":
        return libs.map(label => (
          <ListItem
            key={label}
            label={label}
            handleOnRowClick={handleClickOnLib}
          />
        ));
      case "cats":
        return cats.map(label => (
          <ListItem
            key={label}
            label={label}
            handleOnRowClick={handleClickOnCat}
          />
        ));
    }
  };

  const handleBack = () => {
    dispatch(libsActions.setLibToFocus, null);
    setNested(false);
  };

  const getLabel = () => {
    if (focus.lib) return focus.lib;
    return access.translate("libraries");
  };

  return (
    <Column flex={0.15}>
      <SearchBar label={getLabel()} nested={nested} onBack={handleBack} />
      <RenderList />
    </Column>
  );
}

export default LeftPanel;
