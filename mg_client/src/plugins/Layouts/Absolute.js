import PropTypes from 'prop-types';
import styled from 'styled-components';

const Absolute = styled.div`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  background: transparent;
`;

Absolute.defaultProps = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
  }
  
  Absolute.propTypes = {
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }
  
  
  export default Absolute