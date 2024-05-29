import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Calendar from '../components/calendar';
import Task from '../components/task';

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  padding: 20px;
  flex: 1;
  background: #f5f5f7;
`;

const IndexPage = () => {
  return (
    <Layout>
      <Sidebar />
      <Content>
        <Header />
        <Main>
          <Calendar />
          <Task title="Presentar proceso de la APP" time="08:30 AM - 09:30 AM" />
          <Task title="Reunión de análisis del proyecto" time="10:00 AM - 11:30 AM" />
        </Main>
      </Content>
    </Layout>
  );
};

export default IndexPage;
