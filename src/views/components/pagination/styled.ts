import styled from "styled-components";

const PaginationCtx = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0.5rem 0;
  flex-wrap: wrap;
  gap: 0.5rem;

  .pagination-item {
    height: 32px;
    width: 32px;
    text-align: center;
    margin: auto 4px;
    background: transparent;
    color: ${({ theme }) => theme.colors.base.dark[200]};
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;
    text-align: center;
    transition: all 0.4s;
    box-shadow: 1.5px 2.6px 10px rgba(119, 119, 119, 0.2);

    &.dots:hover {
      cursor: default;
      color: ${({ theme }) => theme.colors.base.dark[400]};
      font-weight: 600;
    }
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.base.dark[400]};
      font-weight: 600;
    }

    &.selected {
      background-color: ${({ theme }) => theme.colors.main.primary[400]};
      color: ${({ theme }) => theme.colors.base.light[100]};
      font-weight: 600;
    }

    .arrow {
      &::before {
        position: relative;
        /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
        content: "";
        /* By using an em scale, the arrows will size with the font */
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: 0.12em solid ${({ theme }) => theme.colors.base.dark[300]};
        border-top: 0.12em solid ${({ theme }) => theme.colors.base.dark[300]};
      }

      &.left {
        transform: rotate(-135deg) translate(-50%);
      }

      &.right {
        transform: rotate(45deg);
      }
    }

    &.disabled {
      pointer-events: none;

      .arrow::before {
        border-right: 0.12em solid ${({ theme }) => theme.colors.base.dark[300]};
        border-top: 0.12em solid ${({ theme }) => theme.colors.base.dark[300]};
      }

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export default PaginationCtx;
