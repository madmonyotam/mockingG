
import * as access from "../../access";


export const paintFrame = (canvas, width, height) => {
    const frame = canvas
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", access.color("canvases.bg"));

    return frame;
};