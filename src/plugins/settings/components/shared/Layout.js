import styled from 'styled-components';

export const SIDEBAR_WIDTH = 240;

export const CenteredContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width: 100%;
  flex-wrap: wrap;
`;

export const Code = styled.code`
  font-size: 1rem;
  border-radius: 2px;
  background: #f3f6fa;
  padding: 0 0.5rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  color: #395464;
  border: 1px solid lightgray;
  border-radius: 4px;
  :focus {
    outline-color: #395464;
  }
`;