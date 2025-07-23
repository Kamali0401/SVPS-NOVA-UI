import { useState, useEffect, useRef } from "react"; //Attendance 
import "./styles.css";
import dayjs from "dayjs";
import Moment from "moment";

import {
  AsyncGet,
  AsyncGetFiles,
  AsyncPost,
  AsyncPostFiles,
} from "../../../app/services/https";
import { API } from "../../../app/services/endpoints";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import RenderIf, { ExportToCsv } from "./utils";


const AttendancePage = () => {
  const dataTable = useRef();
  const [department, setdepartment] = useState("");
  const [gradeName, setgradeName] = useState("");
  const [sectionId, setsectionId] = useState("");
  const [sectionOpt, setsectionOpt] = useState([]);
  const [gradeOpt, setgradeOpt] = useState([]);
  const [UniqueGrades, setUniqueGrades] = useState([]);

  
  const [batch, setbatch] = useState("");
  const [multiBatch, setmultiBatch] = useState([]);
  const [batchOpt, setbatchOpt] = useState([]);
  const [hourOpt, sethourOpt] = useState([
    { value: '1', text: 'FN' },
    { value: '2', text: 'AN' },
    
  ]);
  const [unselectedBatcOpt, setunselectedBatcOpt] = useState([]);
  const [unselectedHourOpt, setunselectedHourOpt] = useState(hourOpt);


  const [datevalidation , setdatevalidation] = useState(true);//new add


  const [date, setdate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [sectionName, setsectionName] = useState("");
  const [hours, sethours] = useState("");
  const [multiHour, setmultiHour] = useState([]);
  
  const [disabled, setDisabled] = useState(false);
  const [attendance, setattendance] = useState([]);
  const [formatAttendance, setformatAttendance] = useState({});
  const [subjectOpts, setsubjectOpts] = useState([]);
  const [showReportOpts, setshowReportOpts] = useState(false);
  var count = 0;
  const inValidData =
      !sectionId ||  !date || !(multiHour || hours);

  const validFormatAttendance = useMemo(() => {
    return Object.keys(formatAttendance).length > 0;
  }, [formatAttendance]);
 
  const clearState = (type) => {
    debugger;
    switch (type) {
      
      case "grade": {
        setsectionId("");
        setmultiHour([]);
        setformatAttendance({});
        setattendance([]);
       // setsubjectName("");
        sethours(0);
        setDisabled(false);
        setdate("");
        return;
      }
      case "section": {
        setformatAttendance({});
       // setsubjectName("");
        setattendance([]);
        setmultiHour([]);
        sethours(0);
        setDisabled(false);
        setdate("");
        return;
      }
      
      case "date": {
        setattendance([]);
       // setsubjectName("");
        sethours(0);
        setformatAttendance({});
        //setdate("");
        
        setDisabled(false);
        setmultiHour([]);
        return;
      }     
      case "hours": {
        // sethours(0);
        setattendance([]);
        //setDisabled(false);
        setformatAttendance({});

        return;
      }
      case "multiHour": {
        sethours("");
        if (multiHour.length > 0) {
          setattendance([]);

          setformatAttendance({});
        }
        return;
      }
      default: {
        
      setgradeName("");
        setsectionId("");
        
        setmultiHour([]);
        sethours(0);
        setformatAttendance({});
        setattendance([]);
        setDisabled(false);
        return;
      }
    }
  };

  const _onChange = ({ key, data }) => {
    debugger;
    const functionallity = {
      
      grade: (data) => {
        setgradeName(data);
        clearState("grade");
      },
      
      section: (data) => {
        setsectionId(data);
        setsectionName(sectionOpt.filter(x=>x.id ==data)[0].section);
        clearState("section");
      },
     
      date: (data) => {     //New add
  
      const inputDate = dayjs(data, "YYYY-MM-DD", true);
      if (!inputDate.isValid() || inputDate.year() < 1900) {
        setdatevalidation(true); // invalid date 
        return;
      } const formattedDate = inputDate.format("MM/DD/YYYY");
      setdate(formattedDate);
      setdatevalidation(false); // valid
      clearState("date");


        //setdate(data);
        //clearState("date");
      },
     
      hour: (data) => {
        debugger;
        if (data != "") {
          setDisabled(true);
          sethours(data);
          //setformatAttendance({});
          const hour = multiHour.find((itm) => itm === data);
          //clearState("batch");
          if (hour || !data) return;
          setmultiHour((pre) => (pre.length > 0 ? [...pre, data] : [data]));
          clearState("multiHour");
        }
        else {
          setDisabled(false);
          clearState("hours");
        }
      },
      checkBox: ({ item, checked }) => {
        debugger;
        const updateObj = attendance.find((obj) => obj.uiId === item.uiId);
        updateObj.isPresent = checked;
        setattendance([...attendance]);
      },
    };
    functionallity[key](data);
  };

  const getGradeFun = async (isSubscribed) => {
    try {
      if (!isSubscribed) {
        return;
      }
      const response = await AsyncGet(API.Section);
      setgradeOpt(response.data);
      const uniqueValues = [...new Set(response.data.map(item => item.gradeOrClass))];
      setUniqueGrades(uniqueValues);
      
    } catch (error) {
      console.log(error);
    }
  };
  const getSectionFun = async (isSubscribed) => {
    debugger;
    try {
      if (isSubscribed && gradeName) {
        console.log(gradeOpt,".......uniqueValues");
        const sectionData =gradeOpt.filter(x=>x.gradeOrClass ==gradeName);
        //const response = await AsyncPost(API.getSection, body);
        setsectionOpt(sectionData);
         console.log(sectionData, "section options");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  

  const downloadAttendancewiseReport = async () => {
    const attendanceDate = dayjs(date).format("YYYY-MM-DD");

    AsyncGetFiles(
      API.generateAttendancedynamicreport +
     
      "&Section=" +
      sectionId
    )
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            // "application/vnd.ms-excel",
          })
          //URL.createObjectURL(new Blob([res.date]));
          //, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setshowReportOpts(false);
      })
      .catch((err) => {
        console.log(err);
        alert("No Attendance");
      });
  };

  const downloadMonthwiseReport = async () => {
    const attendanceDate = dayjs(date).format("YYYY-MM-DD");
    AsyncGetFiles(
      `${API.generateAttendanceMonthwisereport}&AttendanceDate=${attendanceDate}&Section=${sectionId}`
    )
      .then((res) => {
        console.log(res, "res=======================");
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setshowReportOpts(false);
        // =============================
      })
      .catch((err) => {
        console.log(err);
        alert("There is no attendance for selected month");
      });
  };

  const updateAllStudentIsPresent = (subjId, status) => {
    let oldArray = attendance;
    for (let i = 0; i < oldArray.length; i++) {
      const obj = oldArray[i];
      if (obj.sectionId === subjId) {
        obj.isPresent = status;
      }
    }
    setattendance([...oldArray]);
  };

  const checkCol = (index) => {
    let isChecked = null;
    const values = Object.values(formatAttendance);
    for (let i = 0; i < values.length; i++) {
      const arr = values[i];
      const checked = arr[index].isPresent;
      if (i > 0 && isChecked !== checked) {
        isChecked = false;
        break;
      }
      isChecked = checked;
    }
    return isChecked;
   
  };

  const formatDataFun = (data) => {
    if (data?.length < 1 || attendance?.length < 1) {
      return;
    }
    const attendanceData = data || attendance;
    const formatedData = attendanceData.reduce((acc, item) => {
      acc[`group_${item.studentId}`] = acc[`group_${item.studentId}`] || [];
      acc[`group_${item.studentId}`].push(item);
      return acc;
    }, {});
    setformatAttendance(formatedData);
  };

  const getAttendanceFun = async () => {
    debugger;
    if (inValidData) {
      return;
    }
    try {
      const attendanceDate = dayjs(date).format("YYYY-MM-DD");
      const response = await AsyncGet(
        `${API.getAllAttendance
        }?AttendanceDate=${attendanceDate}&SectionId=${Number(sectionId)}&Hoursday=${multiHour?.length > 0 ? multiHour.toString() : hours}`
      );
      console.log(response?.data, "getAllAttendance response");
      if (response?.data?.length < 1 || !response?.data) {
        alert("No student in selected section");
        return;
      }
      const dateAddedData = response?.data?.map((element) => {
        debugger;
        const obj = element;
        obj.date = dayjs(date).format();
        obj.uiId = uuidv4();
        return obj;
      });
      // console.log(dateAddedData);
      setattendance(dateAddedData);
      formatDataFun(dateAddedData);
      //BatchId =dateAddedData[0].batchId;
    } catch (error) {
      console.log(error);
    }
  };
  const updateAttendanceFun = async () => {
    console.log(attendance);
    for (let i = 0; i < attendance.length; i++) {
      attendance[i].hoursdays = multiHour?.length > 0 ? multiHour.toString() : hours;
    }
    try {
      const _attendance = [...attendance];
      const response = await AsyncPost(API.getAllAttendance, _attendance);
      alert("Updated Successfully");
      console.log(response.data);
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const deleteAttendanceFun = async () => {
    //const attendanceDate = dayjs(date).format("YYYY-MM-DD");
    debugger
    for (let i = 0; i < attendance.length; i++) {
      attendance[i].hoursday = Number(hours);
    }
    try {
      const _attendance = [...attendance];
      const response = await AsyncPost(API.deleteAttendance, _attendance);
      alert("Deleted Successfully");
      //console.log(response.data);
      clearState("date");
    }
    catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  // ------------------get All Department function-------------------------
  useEffect(() => {
    if (multiBatch?.length > 0) {
      const result = batchOpt.filter(
        (opt1) => !multiBatch.some((opt2) => opt2 === opt1.batchName)
      );
      setunselectedBatcOpt([...result]);
      return;
    }
    if (batchOpt?.length > 0) setunselectedBatcOpt([...batchOpt]);
  }, [multiBatch, batchOpt]);
  useEffect(() => {
    if (multiHour?.length > 0) {
      const result = hourOpt.filter(
        (opt1) => !multiHour.some((opt2) => opt2 === opt1.value)
      );
      setunselectedHourOpt([...result]);
      return;
    }
    if (hourOpt?.length > 0) setunselectedHourOpt([...hourOpt]);
  }, [multiHour, hourOpt]);
  useEffect(() => {
    let isSubscribed = true;
    getGradeFun(isSubscribed);
    return () => (isSubscribed = false);
  }, []);
  useEffect(() => {
    let isSubscribed = true;
    getSectionFun(isSubscribed);
    return () => (isSubscribed = false);
  }, [gradeName]);
  
  useEffect(() => {
    if (attendance) {
      formatDataFun();
    }
  }, [attendance]);

  const renderItems = () => {
    return (
      <div
        className="container pb-5 mt-3 pt-3 px-4 border"
        onClick={() => showReportOpts && setshowReportOpts(false)}
      >
        <p></p>
        <div className="row mb-4">
          <div className="col-lg-3">
            <p className="m-0">Grade/Class</p>
            <select
              className="form-select form-control"
              onChange={(e) =>
                _onChange({ key: "grade", data: e.target.value })
              }
              value={gradeName}
            >
              <option>
                {UniqueGrades?.length > 0 ? "Select Grade/Class" : "No Options"}
              </option>
              {UniqueGrades?.length > 0
                ? UniqueGrades.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
                : null}
            </select>
          </div>
          
      

          <RenderIf isTrue={gradeName}>
            <div className="col-lg-3">
              <p className="m-0">Section</p>
              <select
                className="form-select form-control"
                onChange={(e) =>
                  _onChange({ key: "section", data: e.target.value })
                }
                value={sectionId}
                maxLength={150}
              >
                <option>
                  {sectionOpt?.length > 0 ? "Select Section" : "No Options"}
                </option>
                {sectionOpt?.length > 0
                  ? sectionOpt.map((opt, idx) => (
                    <option key={idx} value={opt?.id}>
                      {opt.section}
                    </option>
                  ))
                  : null}
              </select>
            </div>
          </RenderIf>  
          <RenderIf isTrue={sectionId}>
            <div className="col-lg-3">
              <p className="m-0">Date</p>
              <input
                className="form-control"
                type="date"
                id="organisedby"
                value={dayjs(date).format("YYYY-MM-DD")}
                max={Moment().format("YYYY-MM-DD")}
                onChange={(e) =>
                  _onChange({ key: "date", data: e.target.value })
                }
              />
            </div>
          </RenderIf>

          <RenderIf isTrue={date}>
            <div className="col-lg-3">
              <p className="m-0">Session</p>
              <select
                className="form-select form-control"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue && !multiHour.includes(selectedValue)) {
                    setmultiHour((prev) => [...prev, selectedValue]);
                  } 
                }}
                value={hours}
                maxLength={150}
              >
                <option value="">
                  {hourOpt?.length > 0 ? "Select Hour" : "No Options"}
                </option>
                {unselectedHourOpt?.length > 0
                  ? unselectedHourOpt.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.text}
                    </option>
                  ))
                  : null}
              </select>

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {multiHour.length > 0
                  ? multiHour.map((itm) => (
                    <div
                      key={itm}
                      style={{
                        position: "relative",
                        display: "flex",
                        margin: "4px 3px 0px 0px",
                        background: "rgb(230,230,230)",
                        padding: "0px 0px 0px 5px",
                      }}
                    >
                      <label style={{ border: "0px solid" }}>{itm ==="1" ?"FN":"AF"}</label>
                      <label
                        style={{
                          background: "rgb(200,200,200)",
                          margin: "0px 0px 0px 5px",
                          padding: "0px 5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setmultiHour((pre) => {
                            const newArray = pre.filter((item) => item !== itm);
                            clearState("multiHour");
                            return newArray;
                          });
                        }}
                      >
                        X
                      </label>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          </RenderIf>
          <RenderIf isTrue={multiHour.length > 0}>
            <div className="col-lg-3">
              <p className="m-0">&nbsp;</p>
              <button
                type="button"
                onClick={getAttendanceFun}
                className="btn btn-primary w-100"
              >
                Get Attendance
              </button>
            </div>
          </RenderIf>
          <RenderIf isTrue={multiHour.length > 0}>
            <div className="col-lg-3">
              <p className="m-0">&nbsp;</p>
              <button
                type="button"
                onClick={clearState}
                className="btn btn-secondary w-100"
              >
                Reset
              </button>
            </div>
          </RenderIf>
          {/* <RenderIf isTrue={multiHour.length > 0}>
            <div className="col-lg-3">
              <p className="m-0">&nbsp;</p>
              <button
                type="button"
                onClick={() => {
                  attendance?.length < 1
                    ? alert(
                      "There are no attendance found, click on Get Attendance"
                    )
                    : setshowReportOpts(!showReportOpts);
                }}
                className="btn btn-success w-100"
              >
                Generate Report
              </button>
            </div>
          </RenderIf> */}
        </div>
        {/* -------------report-btns-block----------------- */}
        <RenderIf isTrue={sectionId && showReportOpts}>
          <div className="row report-btns-block mb-1 py-2">
            
            <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={() => downloadMonthwiseReport()}
                className="btn btn-success w-100"
              >
                Monthwise Report
              </button>
            </div>
            <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={() => downloadAttendancewiseReport()}
                className="btn btn-success w-100"
              >
                Attendance Report
              </button>
            </div>
            <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <ExportToCsv data={formatAttendance} hours={hours} />
            </div>
          </div>
        </RenderIf>
        <RenderIf isTrue={validFormatAttendance}>
          <div className="mb-5 mt-2 grid-table " style={{ overflow: "auto" }}>
            <table ref={dataTable} className="w-100">
              <thead className="">
                <tr>
                  <td>SNo</td>

                  <td>Student</td>
                  {Object.values(formatAttendance)[0]?.map((item, index) => {
                    // console.log(item);
                    debugger;
                    const checked = checkCol(index);
                    return (
                      <td key={index}>
                        <div className="d-flex justify-content-center">
                          <input
                            className="mx-2"
                            checked={checked}
                            type={"checkbox"}
                            onChange={(e) => {
                              updateAllStudentIsPresent(
                                item.sectionId,
                                e.target.checked
                              );
                            }}
                          />
                          {`${sectionName}-${multiHour}hr`}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="">
                {formatAttendance
                  ? Object.values(formatAttendance).map((_item, idx) => {
                    debugger;
                    return (
                      <tr key={idx}>
                        <td>{++count}</td>

                        <td>{_item[0].admissionNumber + "-" + _item[0].studentName || ""}</td>
                        {_item?.map((item, i) => {
                          debugger;
                          return (
                            <td key={i}>
                              <input
                                checked={item?.isPresent || false}
                                type={"checkbox"}
                                onChange={(e) =>
                                  _onChange({
                                    key: "checkBox",
                                    data: {
                                      item,
                                      checked: e.target.checked,
                                    },
                                  })
                                }
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                  : null}
              </tbody>
            </table>
          </div>
        </RenderIf>
        <RenderIf isTrue={validFormatAttendance}>
          <div className="row">
            <div className="col-lg-12 "></div>
            <div className="col-lg-3 my-1">
              <button
                type="button"
                onClick={updateAttendanceFun}
                className="btn btn-primary w-100"
              >
                Update Attendance
              </button>
            </div>
            
            <div className="col-lg-3"></div>
          </div>
        </RenderIf>
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};
export default AttendancePage;
