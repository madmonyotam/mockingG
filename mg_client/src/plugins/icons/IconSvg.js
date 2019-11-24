import React, { Component } from "react";
import PropTypes from "prop-types";

class IconSvg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      active: false
    };

    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
    this.onActive = this.onActive.bind(this);
    this.offActive = this.offActive.bind(this);
  }

  onActive() {
    this.setState({ active: true });
  }

  offActive() {
    this.setState({ active: false });
  }

  onHover() {
    this.setState({ hover: true });
  }

  offHover() {
    this.setState({ hover: false });
    this.offActive();
  }

  mapSVG(item, index) {
    if (item && item.shape) {
      let CustomTag = `${item.shape}`;
      return <CustomTag key={index} {...item.params} />;
    }

    return <path key={index} d={item} />;
  }

  SVGcontent(pureSVG) {
    return <g {...pureSVG.params}>{pureSVG.shapes.map(this.mapSVG)}</g>;
  }

  render() {
    const {
      color,
      hoverColor,
      activeColor,
      size,
      icon,
      selected,
      selectedColor,
      ...rest
    } = this.props;
    const { hover, active } = this.state;

    let fill = selected ? selectedColor : color;
    fill = hover ? hoverColor : fill;
    fill = active ? activeColor : fill;

    const vb = icon.viewBox || "0 0 48 48";

    return (
      <svg
        x="0px"
        y="0px"
        viewBox={vb}
        width={size}
        height={size}
        fill={fill}
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}
        onMouseDown={this.onActive}
        onMouseUp={this.offActive}
        style={{ cursor: "pointer" }}
        {...rest}
      >
        {this.SVGcontent(icon)}
      </svg>
    );
  }
}

IconSvg.propTypes = {
  icon: PropTypes.object.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  selectedColor: PropTypes.string,
  selected: PropTypes.bool
};

IconSvg.defaultProps = {
  size: "40px",
  color: "#abb6d5",
  hoverColor: "#ffffff",
  activeColor: "#abb6d5",
  selectedColor: "#ffffff",
  selected: false
};

export default IconSvg;
