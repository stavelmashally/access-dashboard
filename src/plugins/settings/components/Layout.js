import styled from 'styled-components';

export const SIDEBAR_WIDTH = 240

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
  gap: 8px;
`;

export const Code = styled.code`
  font-size: 1rem;
  border-radius: 2px;
  background: #f8f8f8;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
`;