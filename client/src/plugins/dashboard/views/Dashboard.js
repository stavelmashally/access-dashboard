import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import MainContent from './MainContent';
import ConfirmModal from '../components/shared/ConfirmModal';

const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <MainContent />
      <ConfirmModal />
    </>
  );
};

export default Dashboard;
