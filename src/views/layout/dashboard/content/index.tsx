import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Content = (): JSX.Element => {
  return (
    <Wrapper className="p-4 md:p-8 overflow-x-auto scroll-smooth min-h-[calc(100vh-10rem)]">
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  *::-webkit-scrollbar {
    display: none;
  }

  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default Content;
