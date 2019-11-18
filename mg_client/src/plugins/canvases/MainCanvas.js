import React, { useEffect } from "react";
import * as d3 from "d3";
import Start from "../tools/Start";
import { useBranch } from "baobab-react/hooks";
import * as access from "../access";
import { get } from "../requests";

import { move } from "./utils/canvasActions";
import * as packUtils from "./utils/packUtils";
import * as libsActions from "../../tree/actions/libs";
import * as catsActions from "../../tree/actions/cats";

import "./style.css";

function MainCanvas() {
  const { back, dispatch } = useBranch({ back: ["back"] });
  let data = {};

  const getCategoriesFromLibrary = lib => {
    get("/getCategoriesFromLibrary", { library: lib }).then(res => {
      dispatch(catsActions.setCats, res.data);
      setTimeout(() => {
        dispatch(libsActions.setLibToFocus, lib);
      });
    });
  };

  const handleClickOnCat = label => {
    dispatch(catsActions.setCatToFocus, label);
    dispatch(catsActions.setSelected, label);
  };

  const getAllLibs = (canvas, width, height) => {
    get("/getAll").then(res => {

      data = packUtils.normalizeData(res.data);
      packUtils.setCanvas(canvas, width, height);
      packUtils.createPack(data, true);
      packUtils.setSelectLib(getCategoriesFromLibrary);
      packUtils.setSelectCat(handleClickOnCat);
    });
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
    move(canvas, frame, access.color("canvases.fg"));
    getAllLibs(canvas, width, height);
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

  return <div style={{ flex: 1, cursor: "none" }}>{renderStart()}</div>;
}

export default MainCanvas;
