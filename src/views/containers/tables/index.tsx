import React from "react";
import TableWrapper from "./styled";

const DataTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableWrapper>
      <table>{children}</table>
    </TableWrapper>
  );
};

export default DataTable;
