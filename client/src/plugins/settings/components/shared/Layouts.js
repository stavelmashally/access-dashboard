import styled from 'styled-components';

export const SIDEBAR_WIDTH = 240;

const Flex = styled.div`
  width: 100%;
  display: flex;
`;

export const Row = styled(Flex)`
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Column = styled(Flex)`
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1rem;
`;

export const SpaceBetween = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const CenteredContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  width: 100%;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  width: ${props => (props.variant === 'small' ? '150px' : '200px')};
  padding: 0.5rem;
  color: #395464;
  border: 1px solid;
  border-color: ${props => (props.error ? '#e53935' : 'lightgray')};
  font-size: ${props => (props.variant === 'small' ? '0.9rem' : '1rem')};
  border-radius: 4px;
  :focus {
    outline-color: ${props => (props.error ? '#e53935' : '#395464')};
  }
`;
