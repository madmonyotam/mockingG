import * as access from "../../access";
import * as d3 from "d3";

export const paintFrame = (canvas, width, height) => {
  const frame = canvas
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", access.color("canvases.bg"));

  return frame;
};

export const openAddPanel = () => {
  d3.select("#addPanel")
    .transition()
    .duration(access.time("addItemPanel.open"))
    .attr("width", 100);

  d3.select("#addLabel")
    .attr("font-size", "0")
    .transition()
    .duration(access.time("addItemPanel.openText"))
    .attr("font-size", 16);
};

export const closeAddPanel = () => {
  d3.select("#addPanel")
    .transition()
    .duration(access.time("addItemPanel.close"))
    .attr("width", 0);

  d3.select("#addLabel")
    .transition()
    .duration(access.time("addItemPanel.closeText"))
    .attr("font-size", 0);
};

export const paintAddPanel = (canvas, height) => {
  const addPanel =  canvas
    .append("rect")
    .attr("id", "addPanel")
    .attr("width", 0)
    .attr("height", height)
    .attr("fill", "url(#svgGradient)");

  canvas
    .append("text")
    .attr("id", "addLabel")
    .text("Add")
    .attr("x", 50)
    .attr("y", 30)
    .attr("class", "light-text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0");

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
    .attr("stop-color", access.color("canvases.fg"))
    .attr("stop-opacity", 1);
};
