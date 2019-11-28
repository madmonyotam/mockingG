import styled from 'styled-components';

const Center = styled.div`   
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: ${props => props.overflow || 'auto'};
`

export default Center;