import React from "react";
import TableComp from "./table";
import { TableStyles } from "./tableStyles";

const AdvanceTable = (props) => {
  // Function to prepare the data for the table
  const makeData = () => {
    return props.data.map((obj) => ({ ...obj, data: obj }));
  };

  // Recompute the table data whenever props.data changes
  const data = React.useMemo(() => makeData(), [props.data]);

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "House Name",
        accessor: "houseName",
      },
      {
        Header: "Activity Name",
        accessor: "activityName",
      },
      {
        Header: "House Points",
        accessor: "point",
      },
      {
        Header: "Actions",
        accessor: "", 
      },
    ],
    []
  );

  // Render the table with styles
  return (
    <TableStyles>
      <TableComp columns={columns} data={data} {...props} />
    </TableStyles>
  );
};

export default AdvanceTable;
