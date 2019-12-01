import * as d3 from "d3";
import Pack from "./Pack";
import * as access from "../../access";
import { isEmpty } from "lodash";

export default class TypesPack extends Pack {
  constructor(params) {
    super(params);

    this.limitByLevel = 2;
    this.dragCircle = null;
    this.dragText = null;
    this.blockDrag = false;
    this.firstMove = true;

    // this.colorScaleRange = [
    //   "white",
    //   "grey"
    // ];

    // this.textClasses = {
    //   in: "text",
    //   out: "light-text",
    // }
  }

  getXyFromEvent() {
    const event = d3.event.sourceEvent;
    const x = event.offsetX;
    const y = event.offsetY;

    if (this.firstMove) {
      return { x, y };
    }

    const { prevX, prevY } = this.getPrevCircle();

    return {
      x: prevX + event.movementX,
      y: prevY + event.movementY
    };
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
      .duration(500)
      .attr("r", 10)
      .attr("fill-opacity", 1);
  }

  endDragCircle() {
    this.dragCircle
      .transition()
      .duration(250)
      .attr("r", this.TempR)
      .attr("cx", this.TempX)
      .attr("cy", this.TempY)
      .attr("transform", this.TempT)
      .attr("fill-opacity", 0.5);

    this.TempR = null;
    this.TempY = null;
    this.TempX = null;
  }

  startDragText() {
    const { x, y } = this.getXyFromEvent();

    this.dragText
    .attr("transform", null)
    .attr("class", this.textClasses.out)
    .attr("y", y + 30)
    .attr("x", x)
    .transition()
    .duration(500)
      .attr("font-size", "20px")
      .text(d => d.data.name);
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
      .duration(250)
      .attr("x", this.TempX)
      .attr("y", this.TempY)
      .attr("class", d =>
        childrenScope(d) ? this.textClasses.in : this.textClasses.out
      )
      .text(this.TempText)
      .attr("transform", this.TempT)
      .attr("font-size", this.TempFontSize);

    this.TempText = null;
    this.TempFontSize = null;
  }

  onDrag() {
    const { dragCircle, dragText } = this;
    const { x, y } = this.getXyFromEvent();

    dragText.attr("x", x).attr("y", y + 30);
    dragCircle.attr("cx", x).attr("cy", y);
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


    const dragAction = d3.drag()
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

        this.endDragText();
        this.endDragCircle();
        this.firstMove = true;
        this.block();
      })
      .on("start", (d, i, items) => {
        if (this.stop(d)) return null;
        this.initDragStart(d);
      });
      
        circles.call(dragAction);
        texts.call(dragAction);
  }
}
