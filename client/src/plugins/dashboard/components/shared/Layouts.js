import styled from 'styled-components/macro';

export const SIDEBAR_WIDTH = 240;
export const TOOLBAR_HEIGHT = 64;

const Flex = styled.div`
  width: 100%;
  display: flex;
`;

export const Row = styled(Flex)`
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
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
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const GridItem = styled.div`
  display: grid;
  grid-template-columns: 33.334% 66.667%;
  align-items: flex-start;
  gap: 0.5rem;
`;
