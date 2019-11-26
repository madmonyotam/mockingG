import React, { useState } from "react";
import Start from "../tools/Start";
import { useBranch } from "baobab-react/hooks";
import * as access from "../access";
import { get } from "../requests";

import { move } from "./utils/canvasActions";

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
          .duration(3000)          
          .attr("fill", "transparent");

    
        return frame;
      };
 

  const onCanvasReady = (canvas, width, height) => {
    const frame = createFrame(canvas, width, height);
    move(canvas, frame, access.color("canvases.fg"));
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
    <div style={{ width: '30vw' ,flex: 1, cursor: "none", overflow: 'hidden' }}>
      {renderStart()}
    </div>
  );
}

export default OpenPanelCanvas;
