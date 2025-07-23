import React from "react";
import TableComp from "./table";
import { TableStyles } from "./tableStyles";

const AdvanceTable = (props) => {
  const makeData = (count) => {
    let data = [];
    for (let i = 0; i < props.data.length; i++) {
      const obj = props.data[i];
      data.push({ ...obj, data: JSON.parse(obj.data) });
    }
    return data;
  };
  const columns = React.useMemo(
    () =>  {
      const userRole = localStorage.getItem("userRole")?.toUpperCase();

    const baseColumns = [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name of Newspaper",
        accessor: "NameOfNewspaper",
      },
      {
        Header: "Press Reports Type",
        accessor: "data",
      },
      {
        Header: "Published Date",
        accessor: "data.PublishedDate",
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
