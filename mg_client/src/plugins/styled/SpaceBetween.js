import styled from 'styled-components';

const SpaceBetween = styled.div`   
  width: ${props => props.width || '50px'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export default SpaceBetween;