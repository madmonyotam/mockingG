import * as d3 from "d3";
import { v4 } from "node-uuid";
import { isEmpty, find } from "lodash";
import * as access from "../../access";

import { move } from "./canvasActions";

const padding = 30;
const margin = 45;
const marginBottom = 10;

let canvas, width, height;
let getCategories;
let selectCategory;
let selectItem;
let clickIsBlock = false;
let mainGroup;
let packDomain = 0;
let mainData = null;
let colorScaleRange = [
  access.color("canvases.packBgStart"),
  access.color("canvases.packBgEnd")
];

// const addGlowFilter = () => {
//   var defs = canvas.append("defs");

//   var filter = defs.append("filter").attr("id", "glow");
//   filter
//     .append("feGaussianBlur")
//     .attr("stdDeviation", "3.5")
//     .attr("result", "coloredBlur");

//   var feMerge = filter.append("feMerge");
//   feMerge.append("feMergeNode").attr("in", "coloredBlur");
//   feMerge.append("feMergeNode").attr("in", "SourceGraphic");
// };

const getTranslate = d => {
  return `translate(${d.x},${d.y + margin - marginBottom})`;
};

const createNodes = nodes => {
  paintCircle(nodes);
  paintText(nodes);
  const circles = mainGroup.selectAll("circle");
  const texts = mainGroup.selectAll("text");

  move(canvas, circles, access.color("canvases.bg"));
  move(canvas, texts, access.color("canvases.fg"));

  handleNodeClick(circles, texts);
};

const handleNodeClick = (circle, text) => {
  const blockButton = () => {
    clickIsBlock = true;
    setTimeout(() => {
      clickIsBlock = false;
    }, 2000);
  };

  const clickAction = n => {
    if (clickIsBlock) return;
    if (n.depth === 0) return;
    if (n.depth === 2) n = n.parent;

    switch (n.data.level) {
      case 1:
        getCategories(n.data.name);
        break;
      case 2:
        selectCategory(n.data.name);
        break;
      case 3:
        selectItem(n.data.name);
        break;

      default:
        break;
    }

    createPack(n.data);
    blockButton();
  };

  circle.on("click", n => {
    clickAction(n);
  });

  text.on("click", n => {
    clickAction(n);
  });
};

const paintCircle = nodes => {
  const enterCircles = c => {
    c.enter()
      .append("circle")
      .attr("r", 0)
      .attr("transform", getTranslate)
      .attr("fill-opacity", 0.5)
      .transition()
      .duration(2000)
      .attr("fill", d => colorScale(d.data.value))
      .attr("transform", getTranslate)
      .attr("r", d => d.r);
  };

  const exitCircles = c => {
    c.exit()
      .transition()
      .duration(2000)
      .attr("r", 0)
      .transition()
      .remove();
  };

  const updateCircles = c => {
    c.transition()
      .duration(2000)
      .attr("fill", d => colorScale(d.data.value))
      .attr("transform", getTranslate)
      .attr("r", d => d.r);
  };

  const colorScale = d3
    .scaleLinear()
    .domain([0, packDomain])
    .range(colorScaleRange);

  const circles = mainGroup.selectAll("circle").data(nodes, d => d.data.id);

  enterCircles(circles);
  exitCircles(circles);
  updateCircles(circles);
};

const paintText = nodes => {
  const childrenScope = d => {
    return isEmpty(d.data.children) || d.depth === 2;
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

  const getFontSize = d => {
    let size = Math.floor(d.r / 3);

    size = size < 8 ? 8 : size;
    size = size > 14 ? 14 : size;
    return size;
  };

  const getTextPosition = d => {
    if (d.depth === 0 && !isEmpty(d.data.children)) return -(d.r + 10);
    return childrenScope(d) ? 0 : -(d.r + 5);
  };

  const enterTexts = t => {
    t.enter()
      .append("text")
      .attr("transform", getTranslate)
      .attr("y", getTextPosition)
      .attr("class", d => (childrenScope(d) ? "light-text" : "text"))
      .attr("text-anchor", "middle")
      .attr("font-size", "0")
      .text(d => adaptText(d))
      .transition()
      .duration(2000)
      .attr("font-size", d => getFontSize(d));
  };

  const exitTexts = t => {
    t.exit()
      .transition()
      .duration(2000)
      .attr("font-size", 0)
      .transition()
      .remove();
  };

  const updateTexts = t => {
    t.transition()
      .duration(1000)
      .attr("font-size", 0)
      .transition()
      .duration(10)
      .attr("transform", getTranslate)
      .transition()
      .duration(1000)
      .text(d => adaptText(d))
      .attr("y", getTextPosition)
      .attr("class", d => (childrenScope(d) ? "light-text" : "text"))
      .attr("font-size", d => getFontSize(d));
  };

  const texts = mainGroup.selectAll("text").data(nodes, d => d.data.id);

  enterTexts(texts);
  exitTexts(texts);
  updateTexts(texts);
};

const findLibrary = lib => {
  const library = find(mainData.children, c => {
    return c.name === lib;
  });

  return library;
};

const findCategory = (lib, cat) => {
  const category = find(lib.children, l => {
    return l.name === cat;
  });

  return category;
};

const findItem = (category, item) => {
  const it = find(category.children, l => {
    return l.name === item;
  });

  return it;
};

export const onLibrarySelected = lib => {
  const library = findLibrary(lib);
  createPack(library);
};

export const onCategorySelected = (lib, cat) => {
  const library = findLibrary(lib);
  const category = findCategory(library, cat);
  createPack(category);
};

export const onItemSelected = (lib, cat, it) => {
  const library = findLibrary(lib);
  const category = findCategory(library, cat);
  const item = findItem(category, it);
  createPack(item);
};

export const onRemoveLibrary = lib => {
  mainData.children = mainData.children.filter(l => {
    return l.name !== lib;
  });

  createPack(mainData);
};

export const onRemoveCategory = (lib, cat) => {
  const library = findLibrary(lib);
  library.children = library.children.filter(l=>  l.name !== cat);
  createPack(library);
};

export const onRemoveItem = (lib, cat, it) => {
  const library = findLibrary(lib);
  const category = findCategory(library,cat);

  category.children = category.children.filter(l=>  l.name !== it);
  createPack(category);
};

export const onAddLibrary = newLib => {
  mainData.children.push({
    name: newLib,
    value: 1,
    children: [],
    id: v4(),
    level: 1
  });

  createPack(mainData);
};

export const onAddCategory = (lib, newCat) => {
  const library = findLibrary(lib);

  library.children.push({
    name: newCat,
    value: 1,
    children: [],
    id: v4(),
    level: 2
  });

  createPack(library);
};

export const onBack = (lib) => {
  if(lib){
    const library = findLibrary(lib);
    return createPack(library);
  }

  createPack(mainData);
};

export const setSelectLib = getCategoriesFromLibrary => {
  getCategories = getCategoriesFromLibrary;
};

export const setSelectCat = handleClickOnCat => {
  selectCategory = handleClickOnCat;
};

export const setSelectItem = handleClickOnItem => {
  selectItem = handleClickOnItem;
};

export const setCanvas = (c, w, h) => {
  canvas = c;
  width = w;
  height = h;

  mainGroup = canvas.append("g").attr("class", "pack");
};

export const normalizeData = (data, newData) => {
  if (!newData)
    newData = {
      name: "Project Name",
      value: 1,
      children: [],
      id: "id",
      level: 0
    };

  if (typeof data == "string" || typeof data == "number") {
    newData.value = 1;
    newData.name = `${newData.name}: ${data}`;
    delete newData.children;
    return newData;
  }

  for (const key in data) {
    const d = {
      name: key,
      value: 1,
      children: [],
      id: `${newData.id}-${key}`,
      level: newData.level + 1
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

  const packLayout = d3
    .pack()
    .size([width, height - margin])
    .padding(padding);

  const treeRoot = d3.hierarchy(data);
  packLayout(treeRoot);

  let nodes = treeRoot.descendants();

  nodes = nodes.filter(n => {
    return n.depth < 3;
    // return n.depth > 0 && n.depth < 3;
  });
  createNodes(nodes);
};
