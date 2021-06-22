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
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width: 100%;
  flex-wrap: wrap;
`;

export const Code = styled.code`
  border-radius: 2px;
  background: #f3f6fa;
  padding: 0 0.5rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
`;