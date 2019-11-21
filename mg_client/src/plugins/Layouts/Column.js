import styled from "styled-components";
import PropTypes from "prop-types";

const Column = styled.div`
  z-index: ${props => props.zIndex};
  position: relative;
  min-width: 100px;
  height: ${props => props.height};
  background: ${props => props.background};
  display: flex;
  flex: ${props => props.flex};
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  box-shadow: 1px 0px 4px 0px ${props => props.shadowColor};
`;

Column.defaultProps = {
  zIndex: 1,
  flex: 0.2,
  height: '100%',
  background: 'inherit',
  shadowColor: "rgb(93, 107, 140)",
  }

Column.propTypes = {
  flex: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.string,
  shadowColor: PropTypes.string
};

export default Column;
