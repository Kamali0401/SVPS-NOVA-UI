import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { PaginationBlock } from "./tableStyles";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    // const pattern = new RegExp('11/2012', 'gi');
    console.log(value);
    setGlobalFilter(value);
  }, 200);

  return (
    <div className="fixed-table-toolbar">
      <div className="float-start search  col-6">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
function DateFilter({ filterValue }) {
  const [value, setValue] = React.useState();

  const onChange = useAsyncDebounce((value) => {
    // const pattern = new RegExp('11/2012', 'gi');
    console.log(value);
    filterValue(value);
  }, 200);

  return (
    <div className="fixed-table-toolbar">
      <div className="float-start search  col-6">
        <input
          className="form-control mx-1"
          type="text"
          placeholder="Search by date"
          value={value}
          onChange={(e) => {
            // setValue(e.target.value);
            // onChange(e.target.value);
            filterValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export function TableComp({
  columns,
  data,
  deleteActivityProp,
  editActivityProp,
}) {
  // Use the state and functions returned from useTable to build your UI

  const [secondFilterValue, setsecondFilterValue] = useState(null);
  const [filteredData, setfilteredData] = useState([]);

  const filterData = (value) => {
    if (!value) {
      setfilteredData(data);
      return;
    }
    const dataIs = data.filter((item) => {
      const date = dayjs(JSON.parse(item.data).EventDate).format("DD-MM-YYYY");
      return date.includes(`${value}`);
    });
    setfilteredData(dataIs);
    // console.log(dataIs, "11111111111111111111");
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
    state,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data:
        !secondFilterValue && filteredData?.length < 1 ? data : filteredData,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  // Render the UI for your table
  return (
    <>
      <table
        {...getTableProps()}
        className="table-responsive table table-hover"
      >
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              <DateFilter
                filterValue={(val) => {
                  filterData(val);
                  setsecondFilterValue(val);
                }}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            const date = dayjs(JSON.parse(row.values.data).EventDate).format(
              "DD-MM-YYYY"
            );
            const dateString = date;
            return (
              <tr {...row.getRowProps()}>
                <td>{row.index + 1}</td>
                {/*<td>{row.values.id}</td>*/}
                <td>{JSON.parse(row.values.data).Topic}</td>
                <td>{JSON.parse(row.values.data).EventName}</td>
                <td>{`${dateString}`}</td>
                {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? 
                <td className="d-row">
                  <span
                    onClick={() => {
                      editActivityProp(row.original);
                    }}
                    className="mx-2"
                  >
                    <AiFillEdit color="#FFC107" />
                  </span>
                  <span
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete \"'+ JSON.parse(row.values.data).EventName+ "\" record in Events?")) deleteActivityProp(row.values);         
                    }}
                    className="mx-2"
                  >
                    <MdDelete color="#8E2E18" />
                  </span>
                </td>
                :null}
                {/* <td>{"Cell"}</td> */}
                {/* {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })} */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginationBlock>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
        </div>
        {/* <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "} */}
      </PaginationBlock>
    </>
  );
}

export default TableComp;
