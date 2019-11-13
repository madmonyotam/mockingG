import React, { Component } from 'react';
import * as d3 from 'd3';
import { v4 } from 'node-uuid';

export default class Start extends Component {
  constructor(props) {
    super(props);

    this.width = 0;
    this.height = 0;
    this.measure = this.measure.bind(this);
    this.createCanvas = this.createCanvas.bind(this);
  }

  componentDidMount() {
    this.measure();
    const canvas = this.createCanvas();
    this.do(canvas);
  }

  do(canvas) {
    const { margin } = this.props;
    const width = this.width - (margin.left + margin.right);
    const height = this.height - (margin.top + margin.bottom);

    return this.props.canvasReady(canvas, width, height);
  }

  createCanvas() {
    const { margin } = this.props;

    const canvas = d3
      .select(`#${this.id}`)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    return canvas;
  }

  measure() {
    const cont = document.getElementById(this.id);
    const Bounding = cont.getBoundingClientRect();

    this.width = Bounding.width;
    this.height = Bounding.height;
  }

  render() {
    this.id = 'cont' + v4();

    return <div id={this.id} style={{ height: '100%', width: '100%' }} />;
  }
}

Start.defaultProps = {
  margin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};
