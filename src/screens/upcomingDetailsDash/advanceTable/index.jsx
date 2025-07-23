import React from "react";
import TableComp from "./table";
import { TableStyles } from "./tableStyles";

const AdvanceTable = (props) => {
  const makeData = (count) => {
    let data = [];
    console.log("Props inside AdvanceTableIndex", props.data);
    for (let i = 0; i < props.data.length; i++) {
      const obj = props.data[i];
      data.push({ ...obj, data: obj });
    }
    return data;
  };
  const columns = React.useMemo(
    () => [
      
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Event Name",
        accessor: "eventName",
      },
      
      {
        Header: "Judging Criteria",
        accessor: "judgingCriteria",
      },
      {
        Header: "Polling Status",
        //accessor: "EventDate",
       // disableGlobalFilter: true, // optional
        id: "pollingStatus",
    accessor: row => `${row.interestedStudent} / ${row.totalStudent}`
      },
      {
        Header: "Actions",
        accessor: "",
      }
    ],
    []
  );

  const data = React.useMemo(() => makeData(50), []);

  return (
    <TableStyles>
      <TableComp columns={columns} data={data} {...props} />
    </TableStyles>
  );
};

export default AdvanceTable;
