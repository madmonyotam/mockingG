import styled from 'styled-components';
import PropTypes from "prop-types";
import { color } from "plugins/access";

const Row = styled.div`  
  z-index: ${props => props.zIndex};
  position: relative; 
  overflow: hidden;
  min-height: 50px;
  height: ${props => props.height};
  width: ${props => props.width};
  background: ${props => props.background};
  color: ${props => props.color};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor:  ${(props) => (props.menuItem && 'pointer')};
  box-shadow: 0px 1px 4px 0px ${props => props.shadowColor};
  :hover {
    background: ${(props) => (props.menuItem && color('backgrounds.hover'))};
    color: ${(props) => (props.menuItem && color('texts.primary'))};
  }
  :active {
    background: ${(props) => (props.menuItem && color('backgrounds.active'))};
    color: ${(props) => (props.menuItem && color('texts.primary'))};
  }
`

Row.defaultProps = {
  zIndex: 1,
  width: '100%',
  height: '50px',
  background: 'inherit',
  color: color('texts.secondary'),
  shadowColor: 'rgb(93, 107, 140)',
  }

Row.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.string,
  shadowColor: PropTypes.string
};

export default Row;