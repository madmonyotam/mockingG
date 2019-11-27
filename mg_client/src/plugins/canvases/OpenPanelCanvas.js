import React, { useState } from "react";
import Start from "../tools/Start";
import { useBranch } from "baobab-react/hooks";
import * as access from "../access";
import { get } from "../requests";

import { move, dropCircles } from "./utils/canvasActions";

import "./style.css";

function OpenPanelCanvas() {
    const { viewKey } = useBranch({ viewKey: ["viewKey"] });
    const [close, setclose] = useState(false);

    if(close) return null;

    if(viewKey !== "initKey"){
        setTimeout(() => {
            setclose(true);
        }, access.time('schemePanel.removeCanvas'));
    }

    const createFrame = (canvas, width, height) => {
        const frame = canvas
          .append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", access.color("canvases.fg"))


        frame.transition()
          .duration(access.time('schemePanel.removeCanvas'))          
          .attr("fill", "transparent");

    
        return frame;
      };
 

  const onCanvasReady = (canvas, width, height) => {
    const frame = createFrame(canvas, width, height);
    dropCircles(canvas, height, frame, access.color("canvases.bg"));    
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

  return (
    <div style={{ height:'100vh', width: '100vw', cursor: "none", overflow: 'hidden'}}>
      {renderStart()}
    </div>
  );
}

export default OpenPanelCanvas;
