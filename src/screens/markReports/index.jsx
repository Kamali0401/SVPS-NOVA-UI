import { useState, useEffect, useRef } from "react";
import "./styles.css";
import dayjs from "dayjs";
import Moment from "moment";

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

const MarkPage = () => {
  let sequence = 0;
  var count = 0;

  const dataTable = useRef();
  const fileInputRef = useRef(null);
  const [departmentOpt, setdepartmentOpt] = useState([]);
  const [department, setdepartment] = useState("");
  const [departmentVal, setdepartmentVal] = useState("");

  const [selectedFile, setselectedFile] = useState("");

  const [year, setyear] = useState("");
  const [exam, setExam] = useState();

  const [semester, setsemester] = useState("");
  const [section, setsection] = useState("");
  const [sectionOpt, setsectionOpt] = useState([]);
  const [examOpt, setexamOpt] = useState([]);

  

  const [multiSubject, setmultiSubject] = useState([]);
  const [subjectName, setsubjectName] = useState("");
  const [subjectOpts, setsubjectOpts] = useState([]);
 // const [subjectOptsTest, setsubjectOptsTest] = useState([]);
  const [IsAttendance, setIsAttendance] = useState(false);

  const [subjectShortForm, setsubjectShortForm] = useState("");
  const [file, setFile] = useState();
  const [filesList, setfilesList] = useState([]);
  const [fileName, setFileName] = useState();
  const [unselectedSubjOpt, setunselectedSubjOpt] = useState([]);
  const [attendance, setattendance] = useState([]);
  const [formatAttendance, setformatAttendance] = useState({});
  const [ReadytosendEmail,setReadytosendEmail]=useState(true);
  const [sectiondata, setsectiondata] = useState("");
  const [gradeName, setgradeName] = useState("");

  const [gradeOpt, setgradeOpt] = useState([]);
  const [UniqueGrades, setUniqueGrades] = useState([]);
 
 
  //  const [sectionName, setsectionName] = useState("");
  //const [sectionId, setsectionId] = useState("");
  //const [sectionOpt, setsectionOpt] = useState([]);
 

 // let ReadytosendEmail=true;

   
  
  const [showReportOpts, setshowReportOpts] = useState(false);

  const inValidData =
     !sectiondata || !exam;

  const validFormatAttendance = useMemo(() => {
    return Object.keys(formatAttendance).length > 0;
  }, [formatAttendance]);

  const clearState = (type) => {
    switch (type) {
      case "grade": {
        setsectiondata("");
        setmultiSubject([]);
        setExam("");
        //setformatAttendance({});
        // setdate("");
        setattendance([]);
        setsubjectName("");
     //   setIsAttendance(false);
        return;
      }
      case "section": {
        //setbatch("");
        setmultiSubject([]);
        setExam("");
        //setformatAttendance({});
        // setdate("");
        setattendance([]);
       // setsubjectName("");
       // setIsAttendance(false);
        // sethours(0);
        return;
      }
      case "exam": {
        setmultiSubject([]);
        setsubjectName("");
       // setIsAttendance(false);
      }
      /*case "batch": {
        setformatAttendance({});
        //setsubjectName("");
        setattendance([]);
        //sethours(0);
        return;
      }
     
      case "date": {
        setformatAttendance({});
        return;
      }*/
      case "multiSubject": {
        setsubjectName("");
        if (multiSubject.length <= 1) {
          setsubjectName("");
          setattendance([]);
          //setformatAttendance({});
        //  setIsAttendance(false);
          //sethours(0);
        }
        return;
      }
      default: {
      
        setsectiondata("");
        setdepartmentVal("");
        setgradeName("");
        //setattendance([]);
        //setbatch("");
        setmultiSubject([]);
        setsubjectName("");
        //sethours(0);
        setExam("");
        setattendance([]);
        return;
      }
    }
  };

  const _onChange = ({ key, data }) => {
    const functionallity = {
      grade: (data) => {
        setgradeName(data);
        clearState("grade");
      },
      
      section: (data) => {
        debugger;
        setsectiondata(data);
        //setsectionName(sectionOpt.filter(x=>x.id ==data.split('-')[1])[0].section);
        clearState("section");
      },
      exam: (data) => {
        setExam(data);
        clearState("exam");

      },
      
      subject: (data) => {
        setsubjectName( data);

        
          const present = multiSubject.find((itm) => itm === data);
          //clearState("batch");
          if (present || !data) return;
          setmultiSubject((pre) => (pre.length > 0 ? [...pre, data] : [data]));
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
  const getExamFun = async (isSubscribed) => {
    debugger;
    try {
      if (isSubscribed && gradeName &&sectiondata) {
        const response = await AsyncGet(API.Exam);
        const activeExam=response.data.filter(x=>x.isActive ===true);
        setexamOpt(activeExam);
         console.log(response.data, "exam options");
      }
    } catch (error) {
      console.log(error);
    }
  };
 

  const getSubjects = async (isSubscribed) => {
    debugger;
    try {

      if (isSubscribed &&  sectiondata && gradeName && exam) {

        const response = await AsyncGet(
          API.Subject );
          const SubjectByGrade =response.data.filter(x=>x.grade===gradeName);
        setsubjectOpts(SubjectByGrade);
        setunselectedSubjOpt(SubjectByGrade);
     //   setsubjectOptsTest(SubjectByGrade);
        // console.log(response.data, "batch options");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const isAttendance = (e) => {
  //   setIsAttendance(e.target.checked);
  // }
  const onFileChange = async (e) => {
    let AllFiles = e.target.files;
    setselectedFile(AllFiles);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onFileUpload = async (res) => {
    debugger;

    if (selectedFile[0].name == "Mark.xlsx") {
      debugger;
      console.log(res, "response");
      //const studentData = res ? res[0] : student;
      const formData = new FormData();
      for (let index = 0; index < selectedFile.length; index++) {
        const fileUploaded = selectedFile[index];

        formData.append("FormFiles", fileUploaded);

      }

      formData.append("TypeofUser", "Mark");
      
      formData.append("Section", sectiondata);
      //formData.append("isAttendnce", IsAttendance);

      try {
        debugger;
        const res = await AsyncPost(API.bulkupload, formData);

        alert(res.data);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert("File Name should be Mark.xlsx only");
    }
    setselectedFile("");
    const response = await AsyncGet(API.getStudentMark);
    console.log(response?.data, "GetStudentMark response");
    if (response?.data?.length < 1 || !response?.data) {
      alert("Error while fetching uploaded Mark");
      return;
    }
    const dateAddedData = response?.data?.map((element) => {
      const obj = element;
      obj.uiId = uuidv4();
      return obj;
    });
    setattendance(dateAddedData);
    formatDataFun(dateAddedData);

  };

  const getMarkTemplate = async () => {
    debugger;
    alert("Please wait for the template to download.");
    AsyncGetFiles(
      `${API.getAllMarkReports
      }Section=${sectiondata}&subjects=${multiSubject?.length > 0 ? multiSubject.toString() : ""
      }&test=${exam}`
    )
      .then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Mark.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setshowReportOpts(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to download the template");
      });
  };
  const deleteMarkFun = async() => {
    //const attendanceDate = dayjs(date).format("YYYY-MM-DD");
    debugger
    
    try {
      const _attendance = [...attendance];
      const response = await AsyncPost(API.deleteMark, _attendance);
      
      if(response.data="Success"){
      alert("Deleted Successfully");
      setformatAttendance({});

      }
      //console.log(response.data);
     
    } 
    catch (error) {
      alert("Error while deleting marks");
      console.log(error);
    }
  };
  const sendemail =async ()=>{
    debugger; //API.getSubjectsForMarks + "Department=" + Number(department) +
    //const response = await AsyncPost(API.getEmailUpdate +"ReadytosendEmail=" + ReadytosendEmail);
    const response = await AsyncPost(
      API.getEmailUpdate + "ReadytosendEmail=" +ReadytosendEmail );
    
     console.log("email",response);
     if(response.status =="200")
     {
      alert("Students' marks will be available in the app.");
     }
     else{
      alert("Something went wrong!..Send Again!");
     }

  }

  // const generateReport = async () => {
  //   debugger;
  //   AsyncGetFiles(
  //     `${API.generateReport
  //     }Section=${sectiondata}&test=${exam}`
  //   )
  //     .then((res) => {
  //       console.log(res);
  //       const url = window.URL.createObjectURL(
  //         new Blob([res.data], {
  //           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //         })
  //       );
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "MarkReport.xlsx");
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //       setshowReportOpts(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(err);
  //     });
  // };
  const formatDataFun = (data) => {
    debugger;
    if (data?.length < 1 || attendance?.length < 1) {
      return;
    }
    const attendanceData = data || attendance;
    const formatedData = attendanceData.reduce((acc, item) => {
      acc[`group_${item.studentId}`] = acc[`group_${item.studentId + ' - ' + item.studentName}`] || [];
      acc[`group_${item.studentId}`].push(item);
      return acc;
    }, {});
    setformatAttendance(formatedData);
  };
  
  // ------------------get All Department function-------------------------
  useEffect(() => {
    if (multiSubject?.length > 0) {
      debugger;
      const result = subjectOpts.filter(
        (opt1) => !multiSubject.some((opt2) => opt2 === opt1.subjectCode)
      );
      setunselectedSubjOpt([...result]);
      return;
    }
    if (subjectOpts?.length > 0) setunselectedSubjOpt([...subjectOpts]);
  }, [multiSubject, subjectOpts]);

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
    debugger;
    let isSubscribed = true;
    getSubjects(isSubscribed);
    return () => (isSubscribed = false);
  }, [gradeName, sectiondata,exam]);
  useEffect(() => {
    debugger;
    let isSubscribed = true;
    getExamFun(isSubscribed);
    return () => (isSubscribed = false);
  }, [gradeName, sectiondata]);

  useEffect(() => {
    if (multiSubject?.length > 0) {
      const result = subjectOpts.filter(
        (opt1) => !multiSubject.some((opt2) => opt2 === opt1.value)
      );
      setunselectedSubjOpt([...result]);
      return;
    }
    if (subjectOpts?.length > 0) setunselectedSubjOpt([...subjectOpts]);
  }, [multiSubject, subjectOpts]);
  useEffect(() => {
    if (attendance) {
      formatDataFun();
    }
  }, [attendance]);

  const renderItems = () => {
    return (
      <div
        className="custom-container pb-5 mt-6 pt-0 px-4 border"
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
                value={sectiondata}
                maxLength={150}
              >
                <option>
                  {sectionOpt?.length > 0 ? "Select Section" : "No Options"}
                </option>
                {sectionOpt?.length > 0
                  ? sectionOpt.map((opt, idx) => (
                    <option key={idx} value={opt?.gradeOrClass+"-"+opt?.section+"-"+opt?.id}>
                      {opt.section}
                    </option>
                  ))
                  : null}
              </select>
            </div>
          </RenderIf> 
         
          <RenderIf isTrue={sectiondata}>
            <div className="col-lg-3">
              <p className="m-0">Exam</p>
              <select
                className="form-select form-control"
                onChange={(e) =>
                  _onChange({ key: "exam", data: e.target.value })
                }
                value={exam}
                maxLength={150}
              >
                <option>
                  {examOpt?.length > 0 ? "Select Exam" : "No Options"}
                </option>
                {examOpt?.length > 0
                  ? examOpt.map((opt, idx) => (
                    <option key={idx} value={opt?.name}>
                      {opt.name}
                    </option>
                  ))
                  : null}
              </select>
              
            </div>
          </RenderIf>
          <RenderIf isTrue={exam}>
            
              <div className="col-lg-3">
                <p className="m-0">Subject</p>
                <select
                  className="form-select form-control"
                  onChange={(e) =>
                    _onChange({ key: "subject", data: e.target.value })
                  }
                  value={subjectName}
                  maxLength={150}
                >
                  <option value="">
                    {subjectOpts?.length > 0 ? "Select Subject" : "No Options"}
                  </option>
                  {unselectedSubjOpt?.length > 0
                    ? unselectedSubjOpt.map((opt, idx) => (
                      <option key={idx} value={opt.subjectName + "-" + opt.subjectShortForm}>
                        {opt.subjectName}
                      </option>
                    ))
                    : null}
                </select>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {multiSubject.length > 0
                    ? multiSubject.map((itm) => (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          margin: "4px 3px 0px 0px",
                          background: "rgb(230,230,230)",
                          padding: "0px 0px 0px 5px",
                        }}
                      >
                        <label
                          style={{ border: "0px solid" }}
                          key={itm}
                        >{`${itm}`}</label>

                        <label
                          style={{
                            background: "rgb(200,200,200)",
                            margin: "0px 0px 0px 5px",
                            padding: "0px 5px",
                          }}
                          onClick={() => {
                            console.log(itm);
                            setmultiSubject((pre) => {
                              const newArray = pre.filter(
                                (item) => item !== itm
                              );
                              clearState("multiSubject");
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
              {/* <div className="col-lg-3 ">
            <p className="m-0">Is Attendance Required?</p>
              <input
                className="form-check-input radio-btn i custom-control-input mx-0 radio-btn-size"
                checked={IsAttendance}
                type={"checkbox"}
                onChange={isAttendance}
              />

            </div> */}
          </RenderIf>
        
        </div>
        {localStorage.getItem("userRole").toUpperCase() == "ADMIN" ? (
        <RenderIf isTrue={multiSubject.length > 0}>

          <div className="row report-btns-block mb-5 py-2">
          <div className="col-lg-6 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={getMarkTemplate}
                className="btn btn-secondary w-100"
              >
                Download Template
              </button>
            </div>
            <div className="col-lg-6 d-flex my-1 flex-column justify-content-center">
              
              <button
                type="button"
                onClick={clearState}
                className="btn btn-secondary w-100"
              >
                Reset
              </button>
              </div>
          <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <input
                ref={fileInputRef}
                className="form-control"
                onChange={onFileChange}
                type="file"
                accept=".xls,.xlsx"
                id="formFileMultiple"
              />

            </div>
            <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={onFileUpload}
                className="btn btn-secondary w-100"
              >
                Upload
              </button>
            </div>
            
            
              <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              onClick={sendemail}
              className="btn btn-secondary w-100"
            >Send Mark</button>
            </div>
           
            
            
            {/* <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={generateReport}
                className="btn btn-secondary w-100"
              >
                Generate Report
              </button>
            </div> */}
         </div>         
        </RenderIf>
           ): null}
           {/*{JSON.parse(localStorage.getItem("user")).roleName != "Admin" ? (*/}
            {localStorage.getItem("userRole").toUpperCase() != "ADMIN" ? (
        <RenderIf isTrue={multiSubject.length > 0}>

          <div className="row report-btns-block mb-5 py-2">
            <div className="col-lg-6 d-flex my-1 flex-column justify-content-center">
              <button
                type="button"
                onClick={getMarkTemplate}
                className="btn btn-primary w-100"
              >
                Download Template
              </button>
            </div>
            <div className="col-lg-6 d-flex my-1 flex-column justify-content-center">
              
              <button
                type="button"
                onClick={clearState}
                className="btn btn-secondary w-100"
              >
                Reset
              </button>
              </div>
          
          </div>

        </RenderIf>
         ): null}
        <RenderIf isTrue={validFormatAttendance}>
          <div className="mb-5 mt-2 grid-table " style={{ overflow: "auto" }}>
            <table ref={dataTable} className="w-100">
              <thead className="">
                <tr>
                  <td>S.No</td>
                  <td>Reg.No </td>
                  <td>Student Name</td>
                  <td>Mark Details</td>

                </tr>
              </thead>
              <tbody className="">
                {formatAttendance
                  ? Object.values(formatAttendance).map((_item, idx) => {
                    //sequence = formatAttendance.length + 1;
                    return (
                      <tr key={idx}>
                        <td>{++count}</td>
                        <td>{_item[0].studentId || ""}</td>
                        <td>{_item[0].studentName || ""}</td>                     
                        <td>{_item[0]?.data.split(",").map((line, i) => { return (<div key={i}>{line}</div>) })}</td>
                        {/* <td>{_item[0].data || ""}</td> */}

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
            
             <div className="col-lg-3 my-1">

              <button 
              type="button"
              onClick={deleteMarkFun}
              className="btn btn-primary w-100"
              > 
              Delete Mark
              </button>
                  </div> 
         
          </div>
        </RenderIf>
      </div>
    );
  };

  return <div>{renderItems()}</div>;
};
export default MarkPage;
