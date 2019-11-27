import React, { useEffect } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "../plugins/access";

import Column from "../plugins/Layouts/Column";

import SearchBar from "../plugins/menuPanel/SearchBar";
import ListItem from "../plugins/menuPanel/ListItem";
import AddRow from "../plugins/menuPanel/AddRow";

import * as libsActions from "../tree/actions/libs";
import * as catsActions from "../tree/actions/cats";
import * as itemsActions from "../tree/actions/items";

import { getLibraryPack } from "../plugins/canvases/utils/packUtils";
import { get } from "../plugins/requests";

function LeftPanel() {
  const { libs, dispatch } = useBranch({ libs: ["libs"] });
  const { cats } = useBranch({ cats: ["cats"] });
  const { items } = useBranch({ items: ["items"] });
  const { focus } = useBranch({ focus: ["focus"] });
  const libraryPack = getLibraryPack();

  useEffect(() => {
    get("/getAllLibraries").then(res => {
      dispatch(libsActions.setLibs, res.data);
    });
  }, []);

  const RenderList = () => {
    let listOf = !focus.lib ? "libs" : "cats";
    if (focus.lib) {
      listOf = !focus.cat ? "cats" : "items";
    }

    const handleClickOnLib = label => {
      dispatch(libsActions.getCategoriesFromLibrary, label);
      libraryPack.onLibrarySelected(label);
    };

    const handleClickOnCat = label => {
      dispatch(catsActions.getItemsFromCategory, label);
      libraryPack.onCategorySelected(focus.lib, label);
      dispatch(catsActions.setKey, { newKey: "showScheme", schemeName: label });
    };

    const handleClickOnItem = label => {
      dispatch(itemsActions.setSelected, label);
      dispatch(itemsActions.setKey, { newKey: "showAddItem", itemName: label });
    };

    const handleRemoveLib = label => {
      dispatch(libsActions.removeLib, label);
      libraryPack.onRemoveLibrary(label);
    };

    const handleRemoveCat = label => {
      dispatch(catsActions.removeCategory, label);
      libraryPack.onRemoveCategory(focus.lib, label);
    };

    const handleRemoveItem = label => {
      dispatch(itemsActions.removeItem, label);
      libraryPack.onRemoveItem(focus.lib, focus.cat, label);
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
      case "items":
        return Object.keys(items).map(label => (
          <ListItem
            key={label}
            parent={focus.cat}
            label={label}
            handleRowClick={handleClickOnItem}
            handleRemove={handleRemoveItem}
          />
        ));
      default:
        return null;
    }
  };

  const RenderAddRow = () => {
    let addTo = !focus.lib ? "libs" : "cats";
    if (focus.lib) {
      addTo = !focus.cat ? "cats" : "items";
    }

    const handleAddLib = value => {
      value = value.trim();
      dispatch(libsActions.addLib, value);
      libraryPack.onAddLibrary(value);
    };

    const handleAddCat = value => {
      value = value.trim();
      dispatch(catsActions.addCategory, value);
      libraryPack.onAddCategory(focus.lib, value);
    };

    //TODO: add item
    const handleAddItem = value => {
      value = value.trim();
      dispatch(itemsActions.setKey, { newKey: "showAddItem", itemName: value });
      // dispatch(catsActions.addCategory, value);
      // LibraryPack.onAddCategory(focus.lib, value);
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
      case "items":
        return (
          <AddRow
            label={access.translate("Add Field")}
            handleAdd={handleAddItem}
          />
        );
      default:
        return;
    }
  };

  const handleBack = () => {
    const { lib, cat } = focus;
    if (cat) {
      dispatch(catsActions.setCatToFocus, null);
      libraryPack.onBack(lib);
    } else if (lib) {
      dispatch(libsActions.setLibToFocus, null);
      libraryPack.onBack();
    }
  };

  const getLabel = () => {
    const { lib, cat } = focus;
    if (lib && cat) return `${lib} - ${cat}`;
    if (lib) return lib;
    return access.translate("Project Name");
  };

  const zIndex = access.dim("zIndexViews.leftPanel");
  const flex = access.dim("flexViews.leftPanel");

  return (
    <Column flex={flex} zIndex={zIndex}>
      <SearchBar label={getLabel()} nested={focus.lib} onBack={handleBack} />
      <RenderAddRow />
      <Column flex={1}>
        <RenderList />
      </Column>
    </Column>
  );
}

export default LeftPanel;
