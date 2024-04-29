import styled from "styled-components";

const AsideWrapper = styled.aside<{ isShow: boolean }>`
  background: ${({ theme }) => theme.colors.main.secondary[400]};
  transition: all 300ms;

  .top {
    background: ${({ theme }) => theme.colors.main.secondary[300]};
    color: ${({ theme }) => theme.colors.base.light[100]};
    position: relative;

    .avatar {
      border: 4px solid ${({ theme }) => theme.colors.main.primary[300]};
    }

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      right: 0;
      width: 60%;
      height: 4px;
      background: white;
      visibility: ${({ isShow }) => (isShow ? "visible" : "hidden")};
    }
  }
`;

export default AsideWrapper;
