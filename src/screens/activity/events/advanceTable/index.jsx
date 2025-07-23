import React from "react";
import TableComp from "./table";
import { TableStyles } from "./tableStyles";

const AdvanceTable = (props) => {
  const makeData = () => {
    return props.data.map((obj) => ({
      ...obj,
      data: JSON.parse(obj.data),
    }));
  };

  const columns = React.useMemo(() => {
    const userRole = localStorage.getItem("userRole")?.toUpperCase();

    const baseColumns = [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Topic",
        accessor: "data.Topic",
      },
      {
        Header: "Event Name",
        accessor: "data",
      },
      {
        Header: "Event Date",
        accessor: "data.EventDate",
      },
    ];

    // Add Action column only if NOT Admin
    if (userRole == "ADMIN") {
      baseColumns.push({
        Header: "Action",
        accessor: "action",
      
      });
    }

    return baseColumns;
  }, []);

  const data = React.useMemo(() => makeData(50), []);

  return (
    <TableStyles>
      <TableComp columns={columns} data={data} {...props} />
    </TableStyles>
  );
};

export default AdvanceTable;
