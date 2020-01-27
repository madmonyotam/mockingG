import * as d3 from "d3";
import { isEmpty, get } from "lodash";
import * as access from "plugins/access";

import { move } from "plugins/canvases/utils/canvasActions";

export default class Pack {
  constructor(params) {
    this.circlePadding = get(params, "circlePadding", 30);
    this.margin = get(params, "margin", 45);
    this.marginBottom = get(params, "marginBottom", 10);
    this.marginRight = get(params, "marginRight", 22);
    this.showMainCircle = get(params, "showMainCircle", true);
    this.limitByLevel = get(params, "limitByLevel", 10);
    this.fillOpacity = get(params, "fillOpacity", 0.8);

    this.moveOnCircleColor = get(
      params,
      "moveOnCircleColor",
      access.color("canvases.moveOnCircle")
    );
    this.moveOnTextColor = get(
      params,
      "moveOnTextColor",
      access.color("canvases.moveOnText")
    );

    this.getTranslate = this.getTranslate.bind(this);
    this.createPack = this.createPack.bind(this);
    this.normalizeData = this.normalizeData.bind(this);

    this.firstLevelClick = () => {};
    this.secondLevelClick = () => {};
    this.thirdLevelClick = () => {};
    this.onClick = () => {};

    this.clickIsBlock = false;
    this.packDomain = 0;
    this.colorScaleRange = [
      access.color("canvases.packBgStart"),
      access.color("canvases.packBgEnd")
    ];

    this.clickColor = access.color("canvases.clickColor");

    this.textClasses = {
      in: "light-text",
      out: "text"
    };

    this.init(params);
  }

  init(params) {
    this.canvas = params.canvas;
    this.width = params.width;
    this.height = params.height;
    this.mainGroup = this.canvas.append("g").attr("class", "pack");
  }

  initWithData(data, projectName) {
    this.mainData = this.normalizeData(data, null, projectName);
    this.createPack(this.mainData, true);
  }

  normalizeData(data, newData, projectName = "Gen") {
    if (!newData)
      newData = {
        name: projectName,
        value: 1,
        children: [],
        id: projectName,
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
        nameKey: key,
        value: 1,
        children: [],
        id: `${newData.id}-${key}`,
        level: newData.level + 1
      };

      if (this.limitByLevel === newData.level + 1) {
        d.name = data[key].name || key;
      }

      const countBack = this.normalizeData(data[key], d);

      newData.value += countBack.value;
      newData.children.push(d);
    }

    return newData;
  }

  createPack(data, isMainData) {
    const {
      width,
      height,
      margin,
      circlePadding,
      showMainCircle,
      limitByLevel
    } = this;
    const size = [width - margin, height - margin];

    if (isMainData) this.mainData = data;
    this.packDomain = data.value;

    const packLayout = d3
      .pack()
      .size(size)
      .padding(circlePadding);

    const treeRoot = d3.hierarchy(data);
    packLayout(treeRoot);

    let nodes = treeRoot.descendants();

    nodes = nodes.filter(n => {
      if (n.data.level > limitByLevel) return false;
      if (showMainCircle) return n.depth < 3;
      return n.depth > 0 && n.depth < 3;
    });

    this.createNodes(nodes);
  }

  createNodes(nodes) {
    const { moveOnCircleColor, moveOnTextColor, canvas, mainGroup } = this;

    this.paintCircles(nodes);
    this.paintTexts(nodes);
    const circles = mainGroup.selectAll("circle");
    const texts = mainGroup.selectAll("text");

    move(canvas, circles, moveOnCircleColor);
    move(canvas, texts, moveOnTextColor);

    this.handleNodeClick(circles, texts);
    this.handleNodeDrag(circles, texts);
  }

  handleNodeDrag(circles, texts) {}

  paintCircles(nodes) {
    const { colorScaleRange, packDomain, mainGroup } = this;

    const colorScale = d3
      .scaleLinear()
      .domain([0, packDomain])
      .range(colorScaleRange);

    const enterCircles = c => {
      c.enter()
        .append("circle")
        .attr("id", d => `circle-${d.data.id}`)
        .attr("r", 0)
        .attr("transform", this.getTranslate)
        .attr("fill-opacity", this.fillOpacity)
        .transition()
        .duration(2000)
        .attr("fill", d => colorScale(d.data.value))
        .attr("transform", this.getTranslate)
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
        .attr("transform", this.getTranslate)
        .attr("r", d => d.r);
    };

    const circles = mainGroup.selectAll("circle").data(nodes, d => d.data.id);

    enterCircles(circles);
    exitCircles(circles);
    updateCircles(circles);

    return circles;
  }

  paintTexts(nodes) {
    const { mainGroup, textClasses, limitByLevel } = this;

    const childrenScope = d => {
      return (
        isEmpty(d.data.children) ||
        d.depth === 2 ||
        d.data.level >= limitByLevel
      );
    };

    const adaptText = d => {
      let text = d.data.name;
      let radius = d.r;
      let cutIn = 25;

      if (childrenScope(d)) {
        cutIn = radius < 80 ? 16 : cutIn;
        cutIn = radius < 70 ? 14 : cutIn;
        cutIn = radius < 40 ? 12 : cutIn;
        cutIn = radius < 35 ? 9 : cutIn;
        cutIn = radius < 30 ? 7 : cutIn;
        cutIn = radius < 20 ? 3 : cutIn;
        cutIn = radius < 14 ? 0 : cutIn;

        if (text.length <= cutIn) return text;
        return text.substring(0, cutIn) + "...";
      }

      return text;
    };

    const getFontSize = (d, isChildren) => {
      if (isChildren) {
        return Math.min(Math.max(d.r, 30) / 4, 36);
      }

      return Math.min(d.r, 60) / 3;
    };

    const getTextPosition = d => {
      if (d.depth === 0 && !isEmpty(d.data.children)) return -(d.r + 10);
      return childrenScope(d) ? 0 : -(d.r + 5);
    };

    const enterTexts = t => {
      t.enter()
        .append("text")
        .attr("id", d => `text-${d.data.id}`)
        .attr("transform", this.getTranslate)
        .attr("y", getTextPosition)
        .attr("class", d =>
          childrenScope(d) ? textClasses.in : textClasses.out
        )
        .attr("text-anchor", "middle")
        .attr("font-size", "0")
        .text(d => adaptText(d))
        .transition()
        .duration(2000)
        .attr("font-size", d => getFontSize(d, childrenScope(d)));
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
        .attr("transform", this.getTranslate)
        .transition()
        .duration(1000)
        .text(d => adaptText(d))
        .attr("y", getTextPosition)
        .attr("class", d =>
          childrenScope(d) ? textClasses.in : textClasses.out
        )
        .attr("font-size", d => getFontSize(d, childrenScope(d)));
    };

    const texts = mainGroup.selectAll("text").data(nodes, d => d.data.id);

    enterTexts(texts);
    exitTexts(texts);
    updateTexts(texts);

    return texts;
  }

  navigateBack(data) {}

  handleNodeClick(circles, text) {
    const blockButton = (t = 1000) => {
      this.clickIsBlock = true;
      setTimeout(() => {
        this.clickIsBlock = false;
      }, t);
    };

    const clickAction = n => {
      if (this.clickIsBlock) return;
      if (n.depth === 0) {
        this.navigateBack(n.data);
        return;
      }
      if (n.depth === 2) n = n.parent;

      switch (n.data.level) {
        case 1:
          this.firstLevelClick(n.data.name);
          break;
        case 2:
          this.secondLevelClick(n.data.name);
          break;
        case 3:
          this.thirdLevelClick(n.data.name);
          break;

        default:
          this.onClick(n.data.name);
          break;
      }

      if(n.depth){
        blink(n.data);
      }

      if (n.data.level < this.limitByLevel) {
        this._clickAction && this._clickAction();
        this.createPack(n.data);
        blockButton();
      }
    };

    const blink = (data) => {
      const circle = d3.select(`#circle-${data.id}`);
      let orininalColor;
      
      try {
        orininalColor = circle.attr("fill");
      } catch (error) {
        return null;
      }

      if(this.lastClickedId === data.id){
        setTimeout(() => {
          if(this.lastClickedId === data.id) this.lastClickedId = null;
        }, 1000)
        
        return null;
      } else {
        this.lastClickedId = data.id;
      }

      circle
        .transition()
        .duration(200)
        .attr("fill", this.clickColor)
        .transition()
        .duration(600)
        .attr("fill", orininalColor);
    }

    circles.on("click", n => {
      clickAction(n);
    });

    text.on("click", n => {
      clickAction(n);
    });
  }

  getTranslate(d) {
    return `translate(${d.x + this.margin - this.marginRight},${d.y +
      this.margin -
      this.marginBottom})`;
  }

  setLevelClick(level, func) {
    switch (level) {
      case 1:
        this.firstLevelClick = func;
        break;
      case 2:
        this.secondLevelClick = func;
        break;
      case 3:
        this.thirdLevelClick = func;
        break;

      default:
        this.onClick = func;
        break;
    }
  }

  scaleDown() {
    this.mainGroup
      .transition()
      .duration(2000)
      .attr(
        "transform",
        `translate(${this.width / 2},${this.height / 2}), scale(0)`
      );
  }

  scaleUp() {
    this.mainGroup
      .transition()
      .duration(2000)
      .attr("transform", `translate(0,0), scale(1)`);
  }
}
