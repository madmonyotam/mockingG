import styled from 'styled-components';

const Label = styled.div`   
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 10px;
  width: ${props => props.width || 'fit-content'};
  color: ${props => props.color || 'inherit'};
  font-size: ${props => props.fontSize || 'inherit'};
  font-weight:  ${props => props.weight || '400'};
`

export default Label;