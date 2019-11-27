import React from "react";
import Start from "../tools/Start";
import { useBranch } from "baobab-react/hooks";
import * as access from "../access";
import { get } from "../requests";

import { move } from "./utils/canvasActions";
import * as libsActions from "../../tree/actions/libs";
import * as catsActions from "../../tree/actions/cats";
import * as itemsActions from "../../tree/actions/items";
import LibraryPack from "../canvases/pack/LibraryPack"; 
import TypesPack from "../canvases/pack/TypesPack"; 
import { setLibraryPack } from "../canvases/utils/packUtils";

import "./style.css";

function MainCanvas() {
  const { viewKey, dispatch } = useBranch({ viewKey: ["viewKey"] });

  const getFlex = () => {
    if (viewKey === "showAddItem") return 1 - access.dim("flexViews.addItemPanel");
    return 1;
  };

  const getCategoriesFromLibrary = lib => {
    get("/getCategoriesFromLibrary", { library: lib }).then(res => {
      dispatch(catsActions.setCats, res.data);
      setTimeout(() => {
        dispatch(libsActions.setLibToFocus, lib);
      });
    });
  };

  const getItemsFromCategory = cat => {
    dispatch(catsActions.getItemsFromCategory, cat);
    dispatch(catsActions.setKey, { newKey: "showScheme", schemeName: cat });
  };

  const handleClickOnItem = label => {
    dispatch(itemsActions.setItemToFocus, label);
    dispatch(itemsActions.setSelected, label);
    dispatch(itemsActions.setKey, { newKey: "showAddItem", itemName: label });
  };

  const getAllLibs = (canvas, width, height) => {
    get("/getAll").then(res => {
      const data = res.data;
      const libraryPack = new LibraryPack({canvas, width, height})
      libraryPack.initWithData(data);
      libraryPack.setLevelClick(1,getCategoriesFromLibrary);
      libraryPack.setLevelClick(2,getItemsFromCategory);
      libraryPack.setLevelClick(3,handleClickOnItem);

      setLibraryPack(libraryPack);
    });
  };

  const getAllType = (canvas, width, height) => {
    get("/getTypesArrangeByGroups").then(res => {
      const data = res.data;
      const typesPack = new TypesPack({canvas, width, height, showMainCircle:false})
      typesPack.initWithData(data);
    })
  }

  const createFrame = (canvas, width, height) => {
    const frame = canvas
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", access.color("canvases.bg"));

    return frame;
  };

  const onCanvasReady = (canvas, width, height) => {
    const frame = createFrame(canvas, width, height);

    if(viewKey === 'showAddItem'){
      frame.transition()
      .duration(2000)
      .attr("fill", access.color("canvases.fg"));

      move(canvas, frame, access.color("canvases.bg"));
      getAllType(canvas, width, height);
    } else {
      move(canvas, frame, access.color("canvases.fg"));
      getAllLibs(canvas, width, height);
    }
  };

  const renderStart = () => {
    const margin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    return <Start canvasReady={onCanvasReady} margin={margin} />;
  };

  const zIndex = access.dim("zIndexViews.schemePanel");

  return (
    <div style={{ flex: getFlex(), cursor: "none", zIndex: zIndex, width: '100%' }}>
      {renderStart()}
    </div>
  );
}

export default MainCanvas;
