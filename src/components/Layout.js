import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';

export const sidebarWidth = 240;

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${sidebarWidth}px);
  height: 100%;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Sidebar />
      <PageContent>
        <Toolbar />
        {children}
      </PageContent>
    </LayoutContainer>
  );
};

export default Layout;
