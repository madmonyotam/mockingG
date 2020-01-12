import * as d3 from "d3";

let prevMousePlace = null;

export const move = (canvas, board, color) => {
  const line = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveBasis);

  board.on("mouseout", () => {
    prevMousePlace = null;
  });

  board.on("mousemove", (d, i) => {
    const mousePlace = {
      x: d3.event.offsetX - 2,
      y: d3.event.offsetY - 2
    };

    if (!prevMousePlace) {
      prevMousePlace = mousePlace;
      return;
    }

    const data = [prevMousePlace, mousePlace];

    prevMousePlace = mousePlace;

    canvas
      .append("path")
      .attr("d", line(data))
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .transition()
      .duration(450)
      .attr("stroke-width", 0)
      .ease(t => d3.easeBounceOut(t))
      .transition()
      .duration(10)
      .remove();
  });
};

export const dropCircles = (canvas, height, board, color) => {
  board.on("mousemove", (d, i) => {
    const mousePlace = {
      x: d3.event.offsetX,
      y: d3.event.offsetY
    };

    canvas
      .append("circle")
      .attr("cx", mousePlace.x - 1)
      .attr("cy", mousePlace.y - 1)
      .attr("r", 1)
      .attr("fill", color)
      .transition()
      .duration(2000)
      .attr("cy", height)
      .ease(t => d3.easeCircleIn(t))
      .transition()
      .duration(10)
      .remove();
  });
};

export const ripple = (canvas, board, color = "white") => {
  board.on("click", (d, i) => {
    const mousePlace = {
      x: d3.event.offsetX,
      y: d3.event.offsetY
    };

    const circle = canvas
      .append("circle")
      .attr("cx", mousePlace.x)
      .attr("cy", mousePlace.y)
      .attr("r", 1)
      .attr("fill", color)
      .attr("fill-opacity", 0.3);

    ripple(canvas, circle, color);

    circle
      .transition()
      .duration(500)
      .attr("r", 70)
      .attr("fill-opacity", 0)
      .transition()
      .duration(10)
      .remove();
  });
};
