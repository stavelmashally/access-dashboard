import styled from 'styled-components/macro';

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: ${({ variant }) => (variant === 'value' ? 'normal' : 'bold')};
  padding: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default Label;
