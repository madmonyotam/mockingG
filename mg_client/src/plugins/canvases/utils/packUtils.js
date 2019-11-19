import * as d3 from "d3";
import { isEmpty, find, findIndex } from "lodash";
import * as access from "../../access";

import { move } from "./canvasActions";
import { string } from "prop-types";

const padding = 30;
const margin = 35;

let canvas, width, height;
let getCategories;
let selectCategory;
let clickIsBlock = false;
let mainGroup;
let packDomain = 0;
let myDepth = 0;
let mainData = null;
let colorScaleRange = [
  access.color("canvases.packBgStart"),
  access.color("canvases.packBgEnd")
];

const init = () => {
  packDomain = 0;
  myDepth = 0;
};

const addGlowFilter = () => {
  var defs = canvas.append("defs");

  var filter = defs.append("filter").attr("id", "glow");
  filter
    .append("feGaussianBlur")
    .attr("stdDeviation", "3.5")
    .attr("result", "coloredBlur");

  var feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");
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

  const blockButton = ()=>{
    clickIsBlock = true;
    setTimeout(() => {
      clickIsBlock = false
    }, 2000)
  }

  const clickAction = n => {
    if(clickIsBlock) return;
    if (n.depth === 0) return;
    if (n.depth === 2) n = n.parent;
    
    if (myDepth === 0) {
      getCategories(n.data.name);
      blockButton();
      myDepth++;
    } else if (myDepth === 1) {
      selectCategory(n.data.name);
      blockButton();
      myDepth++;
    }

    createPack(n.data);
  };

  circle.on("mouseup", n => {
    clickAction(n);
  });

  text.on("mouseup", n => {
    clickAction(n);
  });

};

const paintCircle = nodes => {

  const enterCircles = c => {
    c.enter()
      .append("circle")
      .attr("r", 0)
      .attr("transform", d => `translate(${d.x},${d.y + margin})`)
      .transition()
      .duration(2000)
      .attr("fill", d => colorScale(d.data.value))
      .attr("fill-opacity", 0.5)
      .attr("transform", d => `translate(${d.x},${d.y + margin})`)
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
      .attr("transform", d => `translate(${d.x},${d.y + margin})`)
      .attr("r", d => d.r);
  };

  const colorScale = d3
    .scaleLinear()
    .domain([0, packDomain])
    .range(colorScaleRange);

  const circles = mainGroup.selectAll("circle").data(nodes);

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
    if(d.depth === 0 && !isEmpty(d.data.children)) return -(d.r + 10)
    return childrenScope(d) ? 0 : -(d.r + 5)
  }

  const enterTexts = t => {
    t.enter()
      .append("text")
      .attr("transform", d => `translate(${d.x},${d.y + margin})`)
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
      .attr("transform", d => `translate(${d.x},${d.y + margin})`)
      .transition()
      .duration(1000)
      .text(d => adaptText(d))
      .attr("y", getTextPosition)
      .attr("class", d => (childrenScope(d) ? "light-text" : "text"))
      .attr("font-size", d => getFontSize(d));
  };

  const texts = mainGroup.selectAll("text").data(nodes);

  enterTexts(texts);
  exitTexts(texts);
  updateTexts(texts);
};

const findLibrary = (lib) => {
  const library = find(mainData.children, c => {
    return c.name === lib;
  });

  return library;
}

const findCategory = (lib,cat) => {
  const category = find(lib.children, l => {
    return l.name === cat;
  });

  return category;
}

export const onLibrarySelected = lib => {
  myDepth = 1;
  const library = find(mainData.children, c => {
    return c.name === lib;
  });
  createPack(library);
};

export const onRemoveLibrary = lib => {

  mainData.children = mainData.children.filter(l => {
    return l.name !== lib;
  });

  createPack(mainData);
};

export const onRemoveCategory = (lib, cat) => {
  const index = findIndex(mainData.children, c => {
    return c.name === lib;
  });
  
  mainData.children[index].children = mainData.children[index].children.filter(l => {
    return l.name !== cat;
  });
  
  const library = mainData.children[index];
  createPack(library);
};

export const onAddLibrary = newLib => {
  mainData.children.push({
    name: newLib,
    value: 1,
    children: []
  });

  createPack(mainData);
};

export const onAddCategory = (lib, newCat) => {
  const library = findLibrary(lib);

  library.children.push({
    name: newCat,
    value: 1,
    children: []
  });

  createPack(library);
};

export const onCategorySelected = (lib, cat) => {
  myDepth = 2;
  const library = findLibrary(lib);
  const category = findCategory(library, cat);
  createPack(category);
};

export const onBack = () => {
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

  mainGroup = canvas.append("g").attr("class", "pack");
};

export const normalizeData = (data, newData) => {
  if (!newData)
    newData = {
      name: "all",
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
