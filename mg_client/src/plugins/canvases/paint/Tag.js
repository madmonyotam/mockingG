import * as access from "../../access";
import { dropCircles, ripple } from "../utils/canvasActions";

let tagsContexts = [];

export default class Tag {
  constructor(params) {
    const { canvas, width, height, id, label, color, index, onSelect, selected } = params;

    this.onSelect = onSelect;
    this.selected = selected;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.id = id;
    this.label = label || id;
    this.color = color;
    this.index = index;

    this.initPosition();
    this.init();

    tagsContexts.push(this);
  }

  initPosition() {
    this.tagHeight = 34;
    this.tagWidth = 80;
    const margin = 15;

    this.positionX = this.width - (this.tagWidth + margin);
    const deltaY = this.tagHeight + 10;
    this.positionY = margin + deltaY * this.index;
  }

  init() {
    this.mainGroup = this.canvas.append("g").attr("id", this.id);
    this.mainGroup.attr("opacity", 0.5);
    if ( this.selected) {
        this.mainGroup.attr("opacity", 1);
    }

    this.paintTag();
    this.paintText();

    const tags = this.mainGroup.selectAll("rect");
    const texts = this.mainGroup.selectAll("text");

    dropCircles(this.mainGroup, this.height, tags, access.color("tags.moveOnTag"));
    dropCircles(
      this.mainGroup,
      this.height,
      texts,
      access.color("tags.moveOnText")
    );

    this.mouseEvents();
  }

  mouseEvents(){
    if ( this.selected) {
        this.mainGroup.attr("opacity", 1);
    }

    this.mainGroup.on("mouseenter", () => {
        this.mainGroup.attr("opacity", 0.8);
    });

    this.mainGroup.on("mouseleave", () => {
      if ( this.selected ) {
        this.mainGroup.attr("opacity", 1);
      } else {
        this.mainGroup.attr("opacity", 0.5);
      }
    });

    this.mainGroup.on("click", () => {
        this.mainGroup.attr("opacity", 1);
        this.onSelect(this.id);
      });
  }

  setSelected(selected) {
      
      this.selected = selected;

      if(!selected){
        this.mainGroup.attr("opacity", 0.5);
      }
  }

  paintText() {
    const { mainGroup, positionX, positionY, tagWidth, tagHeight } = this;

    const x = positionX + tagWidth / 2;
    const y = positionY + this.tagHeight / 2 + 3;

    const enterTexts = t => {
      t.enter()
        .append("text")
        .attr("transform", `translate(${x},${y})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "0")
        .attr("class", "light-text")
        .text(d => d.label)
        .transition()
        .duration(2000)
        .attr("font-size", 12);
    };

    const texts = mainGroup.selectAll("text").data([this], d => d.id);
    enterTexts(texts);

    return texts;
  }

  paintTag() {
    const {
      mainGroup,
      color,
      positionX,
      positionY,
      tagHeight,
      tagWidth
    } = this;

    const enterTags = t => {
      t.enter()
        .append("rect")
        .attr("width", 0)
        .attr("height", tagHeight)
        .attr("rx", 10)
        .attr("transform", `translate(${positionX},${positionY})`)
        .attr("fill", color)
        .transition()
        .duration(700)
        .attr("transform", `translate(${positionX},${positionY})`)
        .attr("width", tagWidth)
        .attr("height", tagHeight);
    };

    const tags = mainGroup.selectAll("rect").data([this], d => d.id);
    enterTags(tags);

    return tags;
  }
}