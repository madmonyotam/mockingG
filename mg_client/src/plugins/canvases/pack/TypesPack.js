import * as d3 from "d3";
import Pack from "plugins/canvases/pack/Pack";
import * as access from "plugins/access";
import { isEmpty } from "lodash";
import Tag from "plugins/canvases/paint/Tag";

export default class TypesPack extends Pack {
  constructor(params) {
    super(params);

    this.colorScaleRange = [
      access.color("types.packBgStart"),
      access.color("types.packBgEnd")
    ];

    this.clickColor = access.color("types.clickColor");

    this.textClasses = {
      out: "light-text",
      in: "light-text-types"
    }

    this.fillOpacity = 0.5;
    this.limitByLevel = 2;
    this.dragCircle = null;
    this.dragText = null;
    this.blockDrag = false;
    this.firstMove = true;
    this.panelIsopen = false;

    this.addToSchema = () => {};
    this.setDrag = () => {};
  }

  setAddToSchema(func) {
    this.addToSchema = func;
  }

  setDragState(func) {
    this.setDrag = func;
  }

  getXyFromEvent() {
    const event = d3.event.sourceEvent;
    let x = event.offsetX;
    let y = event.offsetY;

    const { prevX } = this.getPrevCircle();
    if(prevX<100 && !this.firstMove){
      x = prevX + event.movementX;
    }

    return { x, y };
  }

  getPrevCircle() {
    const { dragCircle } = this;

    const prevX = Number(dragCircle.attr("cx"));
    const prevY = Number(dragCircle.attr("cy"));
    const prevR = Number(dragCircle.attr("r"));
    const prevT = dragCircle.attr("transform");

    return { prevX, prevY, prevR, prevT };
  }

  getPrevText() {
    const { dragText } = this;

    const prevFontSize = dragText.attr("font-size");
    const prevText = dragText.text();

    return { prevText, prevFontSize };
  }

  initDragStart(d, i, items) {
    this.dragCircle = d3.select(`#circle-${d.data.id}`);
    this.dragText = d3.select(`#text-${d.data.id}`);

    const { prevX, prevY, prevR, prevT } = this.getPrevCircle();
    const { prevText, prevFontSize } = this.getPrevText();

    this.TempText = prevText;
    this.TempFontSize = prevFontSize;
    this.TempX = prevX;
    this.TempY = prevY;
    this.TempR = prevR;
    this.TempT = prevT;
  }

  startDragCircle() {
    const { x, y } = this.getXyFromEvent();

    this.dragCircle
      .attr("transform", null)
      .attr("cx", x)
      .attr("cy", y)
      .transition()
      .duration(access.time("typesPack.transitions"))
      .attr("r", 10)
      .attr("fill-opacity", 1);
  }

  endDragCircle() {
    this.dragCircle
      .transition()
      .duration(access.time("typesPack.transitions"))
      .attr("r", this.TempR)
      .attr("cx", this.TempX)
      .attr("cy", this.TempY)
      .attr("transform", this.TempT)
      .attr("fill-opacity", 0.5);
  }

  startDragText() {
    const { x, y } = this.getXyFromEvent();

    const addText = d => {
      this.setDrag(d.data.name);
      return d.data.name;
    };

    this.dragText
      .attr("transform", null)
      .attr("class", this.textClasses.out)
      .attr("y", y + 30)
      .attr("x", x)
      .transition()
      .duration(access.time("typesPack.transitions"))
      .attr("font-size", "20px")
      .text(addText);
  }

  endDragText() {
    const childrenScope = d => {
      return (
        isEmpty(d.data.children) ||
        d.depth === 2 ||
        d.data.level >= this.limitByLevel
      );
    };

    this.dragText
      .transition()
      .duration(access.time("typesPack.transitions"))
      .attr("x", this.TempX)
      .attr("y", this.TempY)
      .attr("class", d =>
        childrenScope(d) ? this.textClasses.in : this.textClasses.out
      )
      .text(this.TempText)
      .attr("transform", this.TempT)
      .attr("font-size", this.TempFontSize);
  }

  onDrag() {
    const { dragCircle, dragText } = this;
    const { x, y } = this.getXyFromEvent();

    dragText
      .attr("x", x)
      .attr("y", y + 30);
    dragCircle
      .attr("cx", x)
      .attr("cy", y);
  }

  stop(d) {
    if (d.data.level < 2) return true;
    if (this.blockDrag) return true;
  }

  block() {
    this.blockDrag = true;
    setTimeout(() => {
      this.blockDrag = false;
    }, 500);
  }

  handleNodeDrag(circles, texts) {
    const dragAction = d3
      .drag()
      .on("drag", d => {
        if (this.stop(d)) return null;
        if (this.firstMove) {
          this.startDragCircle();
          this.startDragText();
        }

        this.onDrag();
        this.firstMove = false;
      })
      .on("end", d => {
        if (this.stop(d)) return null;
        this.block();
        this.checkDrop(d);
        this.endDragText();
        this.endDragCircle();
        this.setDrag(false);
        this.firstMove = true;
      })
      .on("start", (d, i, items) => {
        if (this.stop(d)) return null;
        this.initDragStart(d);
      });

    circles.call(dragAction);
    texts.call(dragAction);
  }

  checkDrop(d) {
    let { x, y } = this.getXyFromEvent();

    if (x < 0) {
      setTimeout(() => {
        this.addToSchema(d.data.nameKey);
      }, access.time("addItemPanel.addToSchema"));

      this.canvas
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("fill", access.color("canvases.fg"))
        .attr("r", 10)
        .transition()
        .duration(access.time("addItemPanel.addToSchema"))
        .attr("fill", access.color("canvases.bg"))
        .attr("r", 4)
        .attr("cx", 0)
        .transition()
        .duration(10)
        .remove();
    }
  }

  _clickAction() {
    const { canvas, width, height } = this;
    let backTag;

    const onSelect = () => {
      this.createPack(this.mainData);
      backTag.removeTag();
    };

    backTag = new Tag({
      selected: false,
      onSelect,
      canvas,
      width,
      height,
      id: "back",
      index: 2,
      color: access.color("tags.bg")
    });
  }
}
