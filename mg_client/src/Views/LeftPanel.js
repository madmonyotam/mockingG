import React, { useEffect } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";
import * as packUtils from "../plugins/canvases/utils/packUtils";

import Column from "../plugins/Layouts/Column";

import SearchBar from "../components/SearchBar";
import ListItem from "../components/ListItem";
import AddRow from "../components/AddRow";

import * as libsActions from "../tree/actions/libs";
import * as catsActions from "../tree/actions/cats";
import { get } from "../plugins/requests";

function LeftPanel() {
  const { libs, dispatch } = useBranch({ libs: ["libs"] });
  const { cats } = useBranch({ cats: ["cats"] });
  const { focus } = useBranch({ focus: ["focus"] });

  useEffect(() => {
    get("/getAllLibraries").then(res => {
      dispatch(libsActions.setLibs, res.data);
    });
  }, []);

  const getCategoriesFromLibrary = lib => {
    get("/getCategoriesFromLibrary", { library: lib }).then(res => {
      dispatch(catsActions.setCats, res.data);
      setTimeout(() => {
        dispatch(libsActions.setLibToFocus, lib);
      });
    });
  };

  const RenderList = () => {
    let listOf = !focus.lib ? "libs" : "cats";

    const handleClickOnLib = label => {
      getCategoriesFromLibrary(label);
      packUtils.onLibrarySelected(label);
    };

    const handleClickOnCat = label => {
      dispatch(catsActions.setCatToFocus, label);
      dispatch(catsActions.setSelected, label);
      packUtils.onCategorySelected(focus.lib,label);
    };

    const handleRemoveLib = label => {
      dispatch(libsActions.removeLib, label);
      packUtils.onRemoveLibrary(label);
    };

    const handleRemoveCat = label => {
      dispatch(catsActions.removeCategory, label);
      packUtils.onRemoveCategory(focus.lib,label);
    };

    const handleEditLib = label => {};

    const handleEditCat = label => {};

    switch (listOf) {
      case "libs":
        return libs.map(label => (
          <ListItem
            key={label}
            label={label}
            handleRowClick={handleClickOnLib}
            handleRemove={handleRemoveLib}
            handleEdit={handleEditLib}
          />
        ));
      case "cats":
        return cats.map(label => (
          <ListItem
            key={label}
            parent={focus.lib}
            label={label}
            handleRowClick={handleClickOnCat}
            handleRemove={handleRemoveCat}
            handleEdit={handleEditCat}
          />
        ));
      default:
        return;
    }
  };

  const RenderAddRow = () => {
    let addTo = !focus.lib ? "libs" : "cats";

    const handleAddLib = value => {
      value = value.trim();
      dispatch(libsActions.addLib, value);
      packUtils.onAddLibrary(value);
    };

    const handleAddCat = value => {
      value = value.trim();
      dispatch(catsActions.addCategory, value);
      packUtils.onAddCategory(focus.lib,value);
    };

    switch (addTo) {
      case "libs":
        return (
          <AddRow
            label={access.translate("Add Library")}
            handleAdd={handleAddLib}
          />
        );
      case "cats":
        return (
          <AddRow
            label={access.translate("Add Category")}
            handleAdd={handleAddCat}
          />
        );
      default:
        return;
    }
  };

  const handleBack = () => {
    packUtils.onBack();
    dispatch(libsActions.setLibToFocus, null);
  };

  const getLabel = () => {
    if (focus.lib) return focus.lib;
    return access.translate("libraries");
  };

  return (
    <Column flex={0.15}>
      <SearchBar label={getLabel()} nested={focus.lib} onBack={handleBack} />
      <RenderAddRow />
      <RenderList />
    </Column>
  );
}

export default LeftPanel;
