import React, { useState, useRef, useEffect, useMemo } from "react";
import dayjs from "dayjs";

import "./styles.css";
import { AsyncPost } from "../../../app/services/https";
import { API } from "../../../app/services/endpoints";
import { activity_opts, MainOptionsList } from "./optionsVar";
import mokdata1 from "./data.json";
import GridExample from "./test";

const tableDataMok = [
  {
    activityID: 1,
    topic: "CloudComputing ",
    abstract: "good",
    event: "Internal",
    organisedBy: "",
    venue: "Stadium",
    prize: "Two",
    fromDate: "6/2/2022",
    toDate: "6/8/2022",
    impact: "good",
    studentORFaculty: "Student",
    internalOrExternal: "Internal",
    onlineOrOffline: "Offline",
    blended: true,
    attachment: "",
    studentID: [
      {
        studentID: "18CS5431",
        studentName: "Harrini  Prakash",
        departmentName: "Computer Science",
      },
    ],
    facultyID: [],
  },
];

const ReportPage = () => {
  const dropDown = useRef();
  const tableRef = useRef();
  const [filterName, setfilterName] = useState("");
  const [filterValue, setfilterValue] = useState("");
  const [filterColumns, setfilterColumns] = useState([]);
  const [validate, setvalidate] = useState(false);
  const [optionsList, setoptionsList] = useState([]);
  const [tableData, settableData] = useState([]);
  const [filterActivity, setfilterActivity] = useState("");
  const [activityOpts, setactivityOpts] = useState(activity_opts);
  const [exportExcelStatus, setexportExcelStatus] = useState(false);
  const selectActivity = useMemo(
    () => activityOpts?.find((itm) => itm.value === filterActivity),
    [filterActivity]
  );
  const addColumn = () => {
    setvalidate(true);
    if (!filterName || !filterValue) {
      return;
    }
    setfilterColumns((list) => {
      if (list?.length > 0) {
        return [...list, { name: filterName, value: filterValue }];
      }
      return [{ name: filterName, value: filterValue }];
    });
    setoptionsList((opts) => opts.filter((opt) => opt !== filterName));
    clearState();
    setvalidate(false);
  };
  const deleteColumn = (name) => {
    setfilterColumns((list) => list.filter((obj) => obj.name !== name));
    setoptionsList((opts) => [...opts, name]);
  };

  const clearState = () => {
    setfilterName("");
    setfilterValue("");
  };

  const searchFun = async () => {
    // debugger;
    try {
      const body = {
        type: parseInt(filterActivity),
        departmentId: null,
        filterColumns: filterColumns,
      };
      const response = await AsyncPost(API.getReports, body);
     
      if (response.data.length < 1) {
        alert("No Record Found");
      }
      settableData(response.data);
      //settableData(mokdata1);
      console.log(response.data);
    } catch (error) {
      alert("Something went wrong try after sometimes");
      //settableData(mokdata1);
      console.log(error);
    }
  };

  const RenderIf = ({ children, isTrue }) => {
    return isTrue ? children : null;
  };

  useEffect(() => {
    debugger;
    const list = MainOptionsList[filterActivity];
    console.log(list);
    setoptionsList(list);
    setfilterName("");
    setfilterColumns([]);
  }, [filterActivity]);

  useEffect(() => {
    if (tableData?.length > 0) {
      settableData([]);
    }
  }, [filterName, filterActivity]);

  const renderItems = () => {
    return (
      <div className="container mt-3 p-5">
        <div className="row mb-4">
          <div className="col-lg-2 d-flex align-items-end">
            <h2 className="heading m-0">Reports</h2>
          </div>
          <div className="col-lg-3">
            {/* <label>Event</label> */}
            <select
              ref={dropDown}
              className="form-select form-control"
              onChange={(e) => setfilterActivity(e.target.value)}
              value={filterActivity}
              maxLength={150}
            >
              <option>Select Activity</option>
              {activityOpts?.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {!filterName && validate ? (
              <h6 style={{ color: "red" }}>{"Required"}</h6>
            ) : null}
          </div>
        </div>
        <p></p>
        {filterColumns?.map((item) => {
          return (
            <div key={item.name} className="row align-items-end mb-2">
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 form-group">
                <input
                  disabled={true}
                  className="form-control"
                  type="text"
                  id="organisedby"
                  value={item.name}
                  maxLength={500}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 form-group">
                <input
                  disabled={true}
                  className="form-control"
                  type="text"
                  id="organisedby"
                  value={item.value}
                  maxLength={500}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 form-group">
                <button
                  className="btn btn-danger"
                  type="button"
                  style={{ height: "33px" }}
                  onClick={() => deleteColumn(item.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="row align-items-start">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 form-group mb-3">
            {/* <label>Event</label> */}
            <select
              ref={dropDown}
              className="form-select form-control h-100"
              onChange={(e) => setfilterName(e.target.value)}
              value={filterName}
              maxLength={150}
            >
              <option>Select Event</option>
              {optionsList?.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {!filterName && validate ? (
              <h6 style={{ color: "red" }}>{"Required"}</h6>
            ) : null}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 form-group mb-3">
            {/* <label>OrganisedBy</label> */}
            <input
              className="form-control"
              type="text"
              id="organisedby"
              value={filterValue}
              onChange={(e) => setfilterValue(e.target.value)}
              maxLength={500}
            />
            {!filterValue && validate ? (
              <h6 style={{ color: "red" }}>{"Required"}</h6>
            ) : null}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-2 form-group">
            <button
              className="btn btn-success"
              type="button"
              style={{ height: "33px" }}
              onClick={addColumn}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end w-100 my-2">
          <div className="col-md-4">
            <button
              className="btn btn-primary w-100"
              type="button"
              style={{ height: "33px" }}
              onClick={() => searchFun()}
            >
              Search
            </button>
          </div>
        </div>
        <RenderIf isTrue={tableData?.length >= 0}>
          <div className="d-flex justify-content-end w-100 my-3">
            <div className="col-md-2">
              {/* <ExportToCsv data={tableData} /> */}
            </div>

            {/* <div className="col-md-2">
              <ExportToPdf data={tableData} />
            </div> */}
          </div>
        </RenderIf>
        <RenderIf isTrue={tableData && tableData?.length > 0}>
          <div className="my-3 grid-table">
            <GridExample
              gridBigData={tableData}
              activityName={selectActivity?.label || ""}
            />
          </div>
        </RenderIf>
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};
export default ReportPage;
