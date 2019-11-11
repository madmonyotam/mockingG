import styled from 'styled-components';
import PropTypes from "prop-types";

const Row = styled.div`   
  min-height: 50px;
  height: ${props => props.height || '50px'};
  width: ${props => props.width || '100%'};
  background: ${props => props.background || 'inherit'};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor:  ${(props) => (props.menuItem ? 'pointer' : 'inherit')};
  box-shadow: 0px 1px 4px 0px ${props => props.shadowColor ||  'rgb(93, 107, 140)'};
  :hover {
    background: ${(props) => (props.menuItem ? '#6693b8' : 'inherit')};
  }
  :active {
    background: ${(props) => (props.menuItem ? '#4e79b9' : 'inherit')};
  }
`

Row.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.string,
  shadowColor: PropTypes.string
};

export default Row;