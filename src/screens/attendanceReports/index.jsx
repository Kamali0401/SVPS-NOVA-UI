import { useState, useEffect, useRef } from "react";
import "./styles.css";
import dayjs from "dayjs";
import Moment from "moment";
import DatePicker from "react-datepicker";

import {
  AsyncGet,
  AsyncGetFiles,
  AsyncPost,
  AsyncPostFiles,
} from "../../app/services/https";
import { API } from "../../app/services/endpoints";
import { Spinner } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import RenderIf, { ExportToCsv } from "./utils";
import excel_file from "./blobfile.json";

const AttendancePage = () => {
  const dataTable = useRef();
  const [department, setdepartment] = useState("");
  const [year, setyear] = useState("");
  const [semester, setsemester] = useState("");
  const [section, setsection] = useState("");
  const [sectionOpt, setsectionOpt] = useState([]);
  const [gradeName, setgradeName] = useState("");
  const [UniqueGrades, setUniqueGrades] = useState([]);
  const [sectionId, setsectionId] = useState("");
  const [date, setdate] = useState(new Date());
  const [todate, settodate] = useState(new Date());
  //const [date, setdate] = useState(new Date());
  //const [subjectName, setsubjectName] = useState("");
  //const [hours, sethours] = useState(0);
  const [AcadamicYearFrom, setAcadamicYearFrom] = useState("");
  const [AcadamicYearTo, setAcadamicYearTo] = useState("");
  const [attendance, setattendance] = useState([]);
  const [formatAttendance, setformatAttendance] = useState({});
  const [subjectOpts, setsubjectOpts] = useState([]);
  const [showReportOpts, setshowReportOpts] = useState(false);
  const [AcadamicYearFromvalidation1, setAcadamicYearFromvalidation] =  useState(false);
  const [monthvalidation, setmonthvalidation] = useState(true);
  const [sectionName, setsectionName] = useState("");
  const [gradeOpt, setgradeOpt] = useState([]);

  const inValidData =
    !department || !year || !semester || !section ;

  const validFormatAttendance = useMemo(() => {
    return Object.keys(formatAttendance).length > 0;
  }, [formatAttendance]);

  const clearState = (type) => {
    switch (type) {
      case "grade": {
        setsectionId("");
        setformatAttendance({});
        setattendance([]);
       // setsubjectName("");
        settodate("");
        setdate("");
        return;
      }
      case "section": {
        setformatAttendance({});
       // setsubjectName("");
        setattendance([]);
        settodate("");

        setdate("");
        return;
      }
      
      case "date": {
        setattendance([]);
       // setsubjectName("");
        setformatAttendance({});
        //setdate("");
      
        return;
      }     
      case "todate": {
        setattendance([]);
       // setsubjectName("");
        setformatAttendance({});
        //setdate("");
      
        return;
      }   
      default: {
        setdepartment("");
        setyear("");
        setsemester("");
        setsection("");
        setgradeName("");
        settodate("");
        setdate("");
        setshowReportOpts(false);
        setsectionId("");
        setformatAttendance({});
        setattendance([]);
        setAcadamicYearFrom("");
        setAcadamicYearTo("");
        return;
      }
    }
  };
  const acadamicYearFrom = (val) => {
    setAcadamicYearFrom(val.target.value);
    setmonthvalidation(false);
  };
  const acadamicYearTo = (val) => {
    if (val.target.value != "") setAcadamicYearFromvalidation(true);
    else setAcadamicYearFromvalidation(false);
    setAcadamicYearTo(val.target.value);
    //setAcadamicYearTo(val.target.value);
  };
  const _onChange = ({ key, data }) => {
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
     
      date: (data) => {
        setdate(data);
        clearState("date");
      },
      todate: (data) => {
        settodate(data);
        clearState("todate");
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
  const downloadSubjectwiseDailyReport = async () => {
    const frommonth = dayjs(date).format("MM");
    const fromyear = dayjs(date).format("YYYY");

    const tomonth = dayjs(todate).format("MM");
    const toyear = dayjs(todate).format("YYYY");

    AsyncGetFiles(
      `${API.generateAttendancesubjectwisereport}startMonth=${frommonth}&startYear=${fromyear}&endMonth=${tomonth}&endYear=${toyear}&sectionId=${sectionId}&grade=${gradeName}&section=${sectionName}`
    )
      .then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/.xlsx",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "AttendanceReport.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setshowReportOpts(false);
      })
      .catch((err) => {
        console.log(err);
        alert("There is no Attendance for selected subject on the given month");
      });
  };

  // const downloadAttendancewiseReport = async () => {
  //   const attendanceDate = dayjs(date).format("YYYY-MM-DD");

  //   AsyncGetFiles(
  //     API.generateAttendancedynamicreport +
  //     "Sem=" +
  //     semester +
  //     "&Year=" +
  //     year +
  //     "&Department=" +
  //     department +
  //     "&Section=" +
  //     section
  //   )
  //     .then((res) => {
  //       const url = window.URL.createObjectURL(
  //         new Blob([res.data], {
  //           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //           // "application/vnd.ms-excel",
  //         })
  //         //URL.createObjectURL(new Blob([res.date]));
  //         //, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
  //       );
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "file.xlsx");
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //       setshowReportOpts(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("No Attendance");
  //     });
  // };

  const downloadMonthwiseReport = async () => {
    const frommonth = dayjs(date).format("MM");
    const fromyear = dayjs(date).format("YYYY");    AsyncGetFiles(
      `${API.generateAttendanceMonthwisereport}month=${frommonth}&year=${fromyear}&sectionId=${sectionId}&grade=${gradeName}&section=${sectionName}`
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
        link.setAttribute("download", "DailyAttendance.xlsx");
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
const downloadCumulativeAttendanceReport = async () => {
  const fromYear = dayjs(date).format("YYYY");
  const toYear = dayjs(todate).format("YYYY");

  AsyncGetFiles(
    `${API.generateAttendanceCumulativeReport}StartYear=${fromYear}&EndYear=${toYear}&SectionId=${sectionId}`
  )
    .then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CumulativeAttendance.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setshowReportOpts(false);
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to download cumulative attendance report.");
    });
};



  const downloadSemAttandanceReport = async () => {
    debugger

    AsyncGetFiles(
      `${API.generateAttendanceSemwisereport}Sem=${semester}&Year=${year}&Department=${department}&Section=${section}&AcademicFrom=${AcadamicYearFrom}&AcademicTo=${AcadamicYearTo}`
     
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
        alert("failure");
      });
  };

  const updateAllStudentIsPresent = (subjId, status) => {
    let oldArray = attendance;
    for (let i = 0; i < oldArray.length; i++) {
      const obj = oldArray[i];
      if (obj.subjectId === subjId) {
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
        className=" custom-container pb-5 mt-6 pt-0 px-4 border"
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
              <p className="m-0">From Date</p>
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
          <RenderIf isTrue={sectionId}>
            <div className="col-lg-3">
              <p className="m-0">To Date</p>
              <input
                className="form-control"
                type="date"
                id="toDate"
                //value={dayjs(todate).format("YYYY-MM-DD")}
                   value={todate ? dayjs(todate).format("YYYY-MM-DD") : ""}
            min={date ? dayjs(date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")}
                
               // max={Moment().format("YYYY-MM-DD")}
                onChange={(e) =>
                  _onChange({ key: "todate", data: e.target.value })
                }
              />
            </div>
          </RenderIf>
          {/* <RenderIf isTrue={semester}>
            <div className="col-lg-3">
            <label>
                  <span style={{ color: "red" }}>*</span> From AcademicYear
                </label>
                <DatePicker
                  className="form-control"
                  showYearPicker
                  dateFormat="yyyy"
                  maxDate={new Date()}
                  //disabled={AcadamicYearFromvalidation1}
                  selected={
                    AcadamicYearFrom ? new Date(`${AcadamicYearFrom}/01/01`) : new Date()
                  }
                  onChange={(date) => {
                    const dateIs = {
                      target: { value: dayjs(date).format("YYYY") },
                    };
                    acadamicYearFrom(dateIs);
                  }}
                />
              </div>
              </RenderIf>
              <RenderIf isTrue={AcadamicYearFrom}>
            <div className="col-lg-3">
            
            <label>
                  {" "}
                  <span style={{ color: "red" }}>*</span>To AcademicYear
                </label>
               <DatePicker
                  className="form-control"
                  showYearPicker
                  dateFormat="yyyy"
                  disabled={monthvalidation}
                  minDate={new Date(AcadamicYearFrom)}
                  selected={
                    AcadamicYearTo ? new Date(`${AcadamicYearTo}/01/01`) : new Date()
                  }
                  onChange={(date) => {
                    const dateIs = {
                      target: { value: dayjs(date).format("YYYY") },
                    };
                    acadamicYearTo(dateIs);
                  }}
                />              
              </div>
              </RenderIf>*/}
    
            </div> 
            <div className="row mb-4">
          <RenderIf isTrue={todate}>
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
          <RenderIf isTrue={todate}>
            <div className="col-lg-3">
              <p className="m-0">&nbsp;</p>
              <button
                type="button"
                onClick={() => {
                  setshowReportOpts(!showReportOpts);
                }}
                className="btn btn-success w-100"
              >
                Generate Report
              </button>
            </div>
          </RenderIf>
          </div>
          <RenderIf isTrue={todate && showReportOpts}>
          <div className="row report-btns-block mb-1 py-2">
            <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={() => downloadMonthwiseReport()}
                className="btn btn-success w-100"
              >
                Daywise Report
              </button>
            </div>
            <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={() => downloadSubjectwiseDailyReport()}
                className="btn btn-success w-100"
              >
                Monthwise Report
              </button>
            </div>
          <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
  <button
    type="button"
    onClick={() => downloadCumulativeAttendanceReport()}
    className="btn btn-success w-100"
  >
    Cumulative Attendance Report
  </button>
</div>

           
          </div>
        </RenderIf>
        
       </div>
    );
  };

  return <div>{renderItems()}</div>;
};
export default AttendancePage;
