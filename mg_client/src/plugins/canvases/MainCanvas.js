import React, { useState } from "react";
import styled from "styled-components";

import Start from "../tools/Start";
import { useBranch } from "baobab-react/hooks";
import * as access from "../access";
import { get } from "../requests";

import { move } from "./utils/canvasActions";
import { setTypes } from "../../tree/actions/types";
import * as libsActions from "../../tree/actions/libs";
import * as catsActions from "../../tree/actions/cats";
import * as itemsActions from "../../tree/actions/items";
import LibraryPack from "../canvases/pack/LibraryPack";
import TypesPack from "../canvases/pack/TypesPack";
import {
  setLibraryPack,
  getLibraryPack,
  getTypesPack,
  setTypesPack
} from "../canvases/utils/packUtils";

import {
  paintFrame,
  fillFrame,
} from "./paint/Frames";
import Tag from "../canvases/paint/Tag";

import Absolute from "../Layouts/Absolute";

import "./style.css";

const Logo = styled.img`
    width:60px; 
    height:60px; 
    margin:15px;
    border-radius: 50%;
    transform: rotate(${props=> props.rotate*180}deg);
    transition: all 250ms; 
    box-shadow: 0px 0px 11px 4px #a1b1cf3b;
`;

function MainCanvas() {
  const { viewKey, dispatch } = useBranch({ viewKey: ["viewKey"] });
  const [rotate, setRotate] = useState(0);

  const getFlex = () => {
    const schemePanelSize = access.dim("flexViews.schemePanel");
    const leftPanelSize = access.dim("flexViews.leftPanel");
    const size = leftPanelSize + schemePanelSize;
    if (viewKey !== "initKey") return 1 - size;
    return 1 - leftPanelSize;
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
  };

  const handleAddFromPack = type => {
    dispatch(itemsActions.onAddFromPack, type);
  };

  const handleDragState = value => {
    dispatch(itemsActions.changeDragState, value);
  };

  const getAllLibs = (canvas, width, height) => {
    get("/getAll").then(res => {
      const {data, projectName } = res.data;

      const libraryPack = new LibraryPack({ canvas, width, height });
      libraryPack.initWithData(data,projectName);
      libraryPack.setLevelClick(1, getCategoriesFromLibrary);
      libraryPack.setLevelClick(2, getItemsFromCategory);
      libraryPack.setLevelClick(3, handleClickOnItem);

      setLibraryPack(libraryPack);
    });
  };

  const getAllType = (canvas, width, height) => {
    get("/getTypesArrangeByGroups").then(res => {
      const data = res.data;
      dispatch(setTypes, res.data);
      const typesPack = new TypesPack({
        canvas,
        width,
        height,
        showMainCircle: false
      });
      typesPack.setAddToScheme(handleAddFromPack);
      typesPack.setDragState(handleDragState);
      typesPack.initWithData(data);
      typesPack.scaleDown();
      setTypesPack(typesPack);
    });
  };

  const createDefs = canvas => {
    // var defs = canvas.append("defs");
    // createGradient(defs);
  };

  const paintTabs = (canvas, width, height) => {
    // const openMenu = () => {
    //   dispatch((tree)=>{
    //     tree.set('openMenu',true);
    //   })
    // }


    const onSelect = id => {
      projectTag.setSelected(id === "project");
      typesTag && typesTag.setSelected(id === "types");

      switch (id) {
        case "types":
          getLibraryPack().scaleDown();
          getTypesPack().scaleUp();
          fillFrame(access.color("types.bg"));
          break;

        case "project":
          getLibraryPack().scaleUp();
          getTypesPack().scaleDown();
          fillFrame(access.color("canvases.bg"));
          break;

        default:
          break;
      }
    };

    const initKey = viewKey === "initKey";

    const projectTag = new Tag({
      selected: true,
      onSelect,
      canvas,
      width,
      height,
      id: "project",
      index: 0,
      color: access.color("tags.bg")
    });

    let typesTag;

    if (!initKey) {
      typesTag = new Tag({
        selected: false,
        onSelect,
        canvas,
        width,
        height,
        id: "types",
        index: 1,
        color: access.color("tags.bg")
      });
    }

    // const menuTag = new Tag({
    //   selected: false,
    //   onSelect: openMenu,
    //   canvas,
    //   width,
    //   height,
    //   id: "menu",
    //   index: initKey ? 1 : 2,
    //   color: access.color("tags.bg")
    // });
  };

  const onCanvasReady = (canvas, width, height) => {
    createDefs(canvas);

    const frame = paintFrame(canvas, width, height);
    move(canvas, frame, access.color("canvases.fg"));

    paintTabs(canvas, width, height);
    getAllLibs(canvas, width, height);
    getAllType(canvas, width, height);
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

  const zIndex = access.dim("zIndexViews.schemePanel"); // check

  return (
    <div style={{ flex: getFlex(), zIndex: zIndex, width: "100%", userSelect: "none" }}>
      {renderStart()}
      <Absolute left={'unset'} top={'unset'}> 
        <Logo alt={'logo'} src={process.env.PUBLIC_URL + "/gen_icon.png"} onClick={()=>{ setRotate(rotate+1) }} rotate={rotate}/>
      </Absolute>
    </div>
  );
}

export default MainCanvas;
