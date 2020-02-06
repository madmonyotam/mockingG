import React, { useState } from "react";
import { useBranch } from "baobab-react/hooks";

import * as access from "plugins/access";

import Start from "plugins/tools/Start";
import { dropCircles } from "plugins/canvases/utils/canvasActions";
import "plugins/canvases/style.css";

function OpenPanelCanvas() {
    const { viewKey } = useBranch({ viewKey: ["viewKey"] });
    const [close, setclose] = useState(false);

    if(close) return null;

    if(viewKey !== "initKey"){
        setTimeout(() => {
            setclose(true);
        }, access.time('schemaPanel.removeCanvas'));
    }

    const createFrame = (canvas, width, height) => {
        const frame = canvas
          .append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", access.color("canvases.fg"))


        frame.transition()
          .duration(access.time('schemaPanel.removeCanvas'))          
          .attr("fill", "transparent");

    
        return frame;
      };
 

  const onCanvasReady = (canvas, width, height) => {
    const frame = createFrame(canvas, width, height);
    dropCircles(canvas, height, frame, access.color("canvases.fg"));    
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
    <div style={{ height:'100vh', width: '100vw', overflow: 'hidden'}}>
      {renderStart()}
    </div>
  );
}

export default OpenPanelCanvas;
