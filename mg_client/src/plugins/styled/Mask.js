import PropTypes from 'prop-types';
import styled from 'styled-components';

const Mask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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