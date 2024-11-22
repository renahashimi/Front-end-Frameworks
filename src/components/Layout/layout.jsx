import { Outlet } from "react-router-dom";
import Header from "./Header"; 
import styled from "styled-components";

// Optional styled-components for custom styling (if needed)
const StyledContainer = styled.div`
  max-width: 100%;
  padding: 0;
`;

function Layout() {
  return (
    <StyledContainer className="flex flex-col items-center w-full">
      <Header />
      <Outlet />
    </StyledContainer>
  );
}

export default Layout;
