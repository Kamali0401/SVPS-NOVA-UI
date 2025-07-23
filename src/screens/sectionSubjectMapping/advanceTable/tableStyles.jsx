import styled from "styled-components";

export const TableStyles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 0px solid black;
    width: 100%;

    tr {
      border-color: rgb(194, 194, 194);
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      /* border-bottom: 1px solid black; */
      border-right: 0.5px solid rgb(194, 194, 194);

      :last-child {
        border-right: 0;
      }
    }
    .pagination {
      padding: 0.5rem;
    }
  }
`;

export const PaginationBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border: none;
    border-radius: 3px;
    margin: 5px 8px;
    width: 2rem;
  }
`;
