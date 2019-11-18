import styled from 'styled-components';
import PropTypes from "prop-types";
import { color } from "../access";

const Row = styled.div`  
  position: relative; 
  min-height: 50px;
  height: ${props => props.height || '50px'};
  width: ${props => props.width || '100%'};
  background: ${props => props.background || 'inherit'};
  color: ${props => props.color || color('texts.secondary')};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor:  ${(props) => (props.menuItem && 'pointer')};
  box-shadow: 0px 1px 4px 0px ${props => props.shadowColor ||  'rgb(93, 107, 140)'};
  :hover {
    background: ${(props) => (props.menuItem && color('backgrounds.hover'))};
    color: ${(props) => (props.menuItem && color('texts.primary'))};
  }
  :active {
    background: ${(props) => (props.menuItem && color('backgrounds.active'))};
    color: ${(props) => (props.menuItem && color('texts.primary'))};
  }
`

Row.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.string,
  shadowColor: PropTypes.string
};

export default Row;