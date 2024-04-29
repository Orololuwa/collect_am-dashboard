import styled from "styled-components";

const TableWrapper = styled.div`
  overflow-x: scroll;
  margin: 25px 0;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  table {
    font-size: 16px;
    width: 100%;
    min-width: 400px;
    overflow: hidden;

    border-collapse: separate;
    border-spacing: 10px 20px;

    thead {
      tr {
      }

      th {
        text-transform: capitalize;
        font-weight: 900;
      }
    }

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      margin: 20px 0;
      color: ${({ theme }) => theme.colors.base.dark[300]};
    }

    th {
      padding: 20px 15px;
    }

    tbody {
    }

    tr {
      border-radius: 10px;
      box-shadow: 1.5px 2.6px 10px rgba(119, 119, 119, 0.2);
    }
  }
`;

export const PaginationInfoCtx = styled.div`
  padding-right: 10px;
  font-weight: 600;
`;

export default TableWrapper;
