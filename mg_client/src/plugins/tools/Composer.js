import React from "react";
import PropTypes from "prop-types";

function Composer({ createElement, children }) {
  const mapChildren = children => {
    return React.Children.map(children, child => {

      if (child.type.isDecorator) {
        return React.cloneElement(child, {}, mapChildren(child.props.children));
      }
      return createElement(child);
    });
  };

  return mapChildren(children);
}

Composer.propsTypes = {
  createElement: PropTypes.func.isRequired
};

export default Composer;
