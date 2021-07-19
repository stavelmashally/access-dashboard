import styled from 'styled-components/macro';

const Input = styled.input`
  width: ${({ variant }) => (variant === 'small' ? '150px' : '200px')};
  padding: 0.5rem;
  color: #395464;
  border: 1px solid;
  border-color: ${({ error }) => (error ? '#e53935' : 'lightgray')};
  font-size: ${({ variant }) => (variant === 'small' ? '0.9rem' : '1rem')};
  border-radius: 4px;
  :focus {
    outline-color: ${({ error }) => (error ? '#e53935' : '#395464')};
  }
`;

export default Input;
