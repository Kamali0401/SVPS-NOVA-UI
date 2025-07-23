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

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
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

export function TableComp({
  columns,
  data,
  deleteRoleProp,
  editRoleProp,
}) {
  // Use the state and functions returned from useTable to build your UI

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
      data,
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
            // console.log(row, "row 777");
            return (
              <tr {...row.getRowProps()}>
                <td>{row.index + 1}</td>

                <td>{row.original.name} </td>

                <td className="d-row">
                  <span
                    onClick={() => {
                      editRoleProp(row.original);
                    }}
                    className="mx-2"
                  >
                    <AiFillEdit color="#FFC107" />
                  </span>
                  <span
                    onClick={() => {
                      // if (window.confirm('Are you sure you wish to delete ' + row.original.name + '?'))  deleteRoleProp(row.values);

                      deleteRoleProp(row.values);
                    }}
                    className="mx-2"
                  >
                    <MdDelete color="#8E2E18" />
                  </span>
                </td>

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

      </PaginationBlock>
    </>
  );
}

export default TableComp;
