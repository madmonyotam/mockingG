import * as d3 from "d3";
import { isEmpty, find } from "lodash";
import * as access from "../../access";

import { move } from "./canvasActions";
import { string } from "prop-types";

const padding = 20;

let canvas, width, height;
let getCategories;
let selectCategory;
let packDomain = 0;
let maxDepth = 2;
let minDepth = 1;
let myDepth = 0;
let mainData = null;
let colorScaleRange = [
  access.color("canvases.packBgStart"),
  access.color("canvases.packBgEnd")
];

const init = () => {
  packDomain = 0;
  maxDepth = 2;
  minDepth = 1;
  myDepth = 0;
};

const addGlowFilter = () => {
  //Container for the gradients
  var defs = canvas.append("defs");

  //Filter for the outside glow
  var filter = defs.append("filter").attr("id", "glow");
  filter
    .append("feGaussianBlur")
    .attr("stdDeviation", "3.5")
    .attr("result", "coloredBlur");

  var feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");
};

const outOfScope = d => {
  return d.depth < minDepth || d.depth > maxDepth;
};

const childrenScope = d => {
  return isEmpty(d.data.children) || d.depth === maxDepth;
};

const createNodes = (group, nodes) => {
  const node = paintNodes(group, nodes);
  const circle = paintCircle(node);
  const text = paintText(node);
  move(canvas, circle, access.color("canvases.bg"));
  move(canvas, text, access.color("canvases.fg"));
  animateIn(circle, text);
  handleNodeClick(node);
};

const handleNodeClick = node => {
  node.on("mouseup", n => {
    if (n.depth === 3) n = n.parent;
    if (n.depth === 2) n = n.parent;

    if (!isEmpty(n.data.children)) {
      removeNodes();
      setTimeout(() => {
        if (myDepth === 0) {
          getCategories(n.data.name);
          myDepth++;
        } else if (myDepth === 1) {
          selectCategory(n.data.name);
          myDepth++;
        }

        createPack(n.data);
      }, 1000);
    }
  });
};

const animateIn = (circle, text) => {
  circle
    .transition()
    .duration(2000)
    .attr("r", d => (outOfScope(d) ? 0 : d.r));

  text
    .transition()
    .duration(2000)
    .attr("font-size", d => getFontSize(d));
};

const removeNodes = () => {
  const node = canvas.selectAll(".node");
  const circle = canvas.selectAll("circle");
  const text = canvas.selectAll("text");

  circle
    .transition()
    .duration(1000)
    .attr("r", 20)
    .transition()
    .duration(2000)
    .attr("r", 4);

  text
    .transition()
    .duration(1000)
    .attr("font-size", 0);

  node
    .transition()
    .duration(1000)
    .attr("transform", d => `translate(${d.x},${height - 20})`)
    .transition()
    .duration(2000)
    .attr("transform", d => `translate(${width},${height - 2})`)
    .remove();
};

const paintNodes = (group, nodes) => {
  const node = group
    .selectAll(".node")
    .data(nodes, d => d)
    .enter()
    .append("g")
    .attr("class", `node`)
    .attr("transform", d => `translate(${d.x},${d.y})`);

  return node;
};

const paintCircle = node => {
  var colorScale = d3
    .scaleLinear()
    .domain([0, packDomain])
    .range(colorScaleRange);

  const circle = node
    .append("circle")
    .attr("fill", d => (outOfScope(d) ? "none" : colorScale(d.data.value)))
    .attr("fill-opacity", 0.5)
    .attr("r", 0);

  return circle;
};

const paintText = node => {
  const text = node
    .append("text")
    .attr("class", d => (childrenScope(d) ? "light-text" : "text"))
    .attr("y", d => (childrenScope(d) ? 0 : -(d.r + 5)))
    .attr("text-anchor", "middle")
    .attr("font-size", "0")

    .text(d => (outOfScope(d) ? "" : adaptText(d)));

  return text;
};

const getFontSize = d => {
  let size = Math.floor(d.r / 3);

  size = size < 8 ? 8 : size;
  size = size > 14 ? 14 : size;
  return size;
};

const adaptText = d => {
  let text = d.data.name;
  let radius = d.r;
  let cutIn = 16;

  if (childrenScope(d)) {
    cutIn = radius < 50 ? 14 : cutIn;
    cutIn = radius < 40 ? 12 : cutIn;
    cutIn = radius < 35 ? 9 : cutIn;
    cutIn = radius < 30 ? 7 : cutIn;
    cutIn = radius < 20 ? 3 : cutIn;

    if (text.length <= cutIn) return text;
    return text.substring(0, cutIn) + "...";
  }

  return text;
};

export const onLibrarySelected = lib => {
  removeNodes();
  myDepth++;
  const library = find(mainData.children, c => {
    return c.name === lib;
  });
  createPack(library);
};

//TODO: - implement to list
export const onCategorySelected = (lib, cat) => {
  removeNodes();
  myDepth++;
  const library = find(mainData.children, c => {
    return c.name === lib;
  });
  createPack(library);
};

export const onBack = () => {
  removeNodes();
  init();
  createPack(mainData);
};

export const setSelectLib = getCategoriesFromLibrary => {
  getCategories = getCategoriesFromLibrary;
};

export const setSelectCat = handleClickOnCat => {
  selectCategory = handleClickOnCat;
};

export const setCanvas = (c, w, h) => {
  canvas = c;
  width = w;
  height = h;

  //addGlowFilter();
};

export const normalizeData = (data, newData) => {
  if (!newData)
    newData = {
      name: "root",
      value: 0,
      children: []
    };

  if (typeof data == "string") {
    newData.value = 1;
    delete newData.children;
    return newData;
  }

  for (const key in data) {
    const d = {
      name: key,
      value: 1,
      children: []
    };

    const countBack = normalizeData(data[key], d);

    newData.value += countBack.value;
    newData.children.push(d);
  }

  return newData;
};

export const createPack = (data, isMainData) => {
  if (isMainData) mainData = data;

  packDomain = data.value;
  const group = canvas.append("g").attr("class", "pack");

  const packLayout = d3
    .pack()
    .size([width, height])
    .padding(padding);

  const treeRoot = d3.hierarchy(data);
  packLayout(treeRoot);

  const nodes = treeRoot.descendants();
  createNodes(group, nodes);
};
