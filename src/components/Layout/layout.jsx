import React from 'react';
import Header from "./Header"; 
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from './Footer';

const StyledContainer = styled.div`
  max-width: 100%;
  padding: 0;
`;

function Layout() {
  return (
    <StyledContainer className="flex flex-col items-center w-full">
      <Header />
      <Outlet />
      <Footer />
    </StyledContainer>
  );
}

export default Layout;
