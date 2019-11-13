import PropTypes from 'prop-types';
import styled from 'styled-components';

const Mask = styled.div`
  position: absolute;
  top: ${props => props.top || 0};
  bottom: ${props => props.bottom || 0};
  left: ${props => props.left || 0};
  right: ${props => props.right || 0};
  opacity: ${props => props.opacity};
  background: ${props => props.mask};
`;

Mask.defaultProps = {
    opacity: 0.7,
    mask: 'white',
  }
  
  Mask.propTypes = {
    opacity: PropTypes.number,
    mask: PropTypes.string,
  }
  
  
  export default Mask