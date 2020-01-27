import * as access from "plugins/access";
import * as d3 from "d3";

export const paintFrame = (canvas, width, height) => {
  const frame = canvas
    .append("rect")
    .attr("id","mainFrame")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", access.color("canvases.bg"));

  return frame;
};

export const fillFrame = (color) => { 
  d3.select("#mainFrame")
  .transition()
  .duration(1000)
  .attr("fill", color);

}

export const openAddPanel = () => {
  d3.select("#addPanel")
    .transition()
    .duration(access.time("addItemPanel.open"))
    .attr("width", 100);
};

export const closeAddPanel = () => {
  d3.select("#addPanel")
    .transition()
    .duration(access.time("addItemPanel.close"))
    .attr("width", 0);
};

export const paintAddPanel = (canvas, height) => {
  const addPanel =  canvas
    .append("rect")
    .attr("id", "addPanel")
    .attr("width", 0)
    .attr("height", height)
    .attr("fill", "url(#svgGradient)");

    return addPanel;
};

export const createGradient = defs => {
  var gradient = defs
    .append("linearGradient")
    .attr("id", "svgGradient")
    .attr("x1", "100%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "0%");

  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%")
    .attr("stop-color", access.color("canvases.bg"))
    .attr("stop-opacity", 0.5);

  gradient
    .append("stop")
    .attr("class", "end")
    .attr("offset", "100%")
    .attr("stop-color", '#55708d')
    .attr("stop-opacity", 1);
};
