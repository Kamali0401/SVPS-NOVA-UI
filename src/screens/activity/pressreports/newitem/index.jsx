import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
//import { saveAs } from "file-saver";
import dayjs, { Dayjs } from "dayjs";
import Moment from "moment";

import {
  addActivity,
  fetchActivities,
  UpdateActivity,
} from "../../../../app/redux/slices/activitySlice";
import "./styles.css";
import "../../../../app/styles/addnew.css";
import {
  AsyncGet,
  AsyncGetFiles,
  AsyncPost,
} from "../../../../app/services/https";
import { API } from "../../../../app/services/endpoints";
import SearchBox from "./searchBox";
import axios from "axios";

const NewItem = ({isEdit, item, closePopup, activity }) => {
  // console.log(activity);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  //state
  const [DateOfPublished, setDateOfPublished] = useState("");
  const [NameOfNewspaper, setNameOfNewspaper] = useState("");
  const [DescriptionOfFunction, setDescriptionOfFunction] = useState("");
  const [DescriptionOfAward, setDescriptionOfAward] = useState("");
  const [DescriptionOfEvent, setDescriptionOfEvent] = useState("");
  const [DescriptionOfOthers, setDescriptionOfOthers] = useState("");
  const [DepartmentSemester, setDepartmentSemester] = useState("");
  const [DepartmentDesignation, setDepartmentDesignation] = useState("");
  const [PressReportsType, setPressReportsTypes] = useState("");
  const [NewspaperPage, setNewspaperPage] = useState("");
  const [NewspaperEdition, setNewspaperEdition] = useState("");
  const [InstitutionProgrammesOrCIICP, setInstitutionProgrammesOrCIICP] = useState("Institution");
  const [selectedFile, setselectedFile] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [studentList, setstudentList] = useState([]);
  const [facultyList, setfacultyList] = useState([]);
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [file, setFile] = useState();
  const [filesList, setfilesList] = useState([]);
  const [fileName, setFileName] = useState();
  const [datevalidation1, setdatevalidation] = useState(true);
  const [Fromdatevalidation1, setFromdatevalidation] = useState(false);
  const [resetStudentORFaculty, setresetStudentORFaculty] = useState(false);
  const [Initiateclick , setInitiateClick] = useState(false);
  const [UpdateClick , setUpdateClick] = useState(false);


  const runFillActivityData = useRef();
  const clearState = () => {
    setDateOfPublished("");
    setDescriptionOfFunction("");
    setDescriptionOfAward("");
    setDescriptionOfEvent("");
    setNameOfNewspaper("");
    setDescriptionOfOthers("");
    setDepartmentSemester("");
    setDepartmentDesignation("");
    setPressReportsTypes("");
    setNewspaperPage("");
    setNewspaperEdition("")
    setInstitutionProgrammesOrCIICP("Institution");
    setselectedFile("");
    setCreatedBy("");
    setstudentList([]);
    setfacultyList([]);
    seterrorMsg("");
    setvalidate("");
    setFile("");
    setfilesList([]);
    setFileName("");
    setdatevalidation(true);
    setFromdatevalidation(false);
    console.log("reseted");
  };


  const setOnOFFvalue = (val) => {
    setInstitutionProgrammesOrCIICP(val);
  };
  
  const fromDatechange = (val) => {
    const inputDate = new Date(val.target.value);
     const year = inputDate.getFullYear();

     if (isNaN(inputDate.getTime()) || year < 1900) {
    setDateOfPublished('');
   setdatevalidation(true);  
   return;
  }
  const formattedDate = `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${year}`;
     setDateOfPublished(formattedDate);
     setdatevalidation(false);
  };
  const onCreatedBySelect = (e) => {
    setCreatedBy(e.target.value);
  };

   const clicked = () =>{
    if(Initiateclick) return;
    initiateActivity();
   };

     const updateclicked = () =>{
      if(UpdateClick) return ;
      updateActivity();
     }



  const onFileUpload = async (res) => {
    if (selectedFile?.length < 1) {
      dispatch(
        fetchActivities(
          46, null
          // JSON.parse(localStorage.getItem("user")).departmentId
        )
      );
      closePopup();
      clearState();
      return;
    }

    console.log(res, "response");
    const activityData = res ? res : activity;
    const formData = new FormData();
    for (let index = 0; index < selectedFile.length; index++) {
      const fileUploaded = selectedFile[index];
      formData.append("FormFiles", fileUploaded);
    }

    formData.append("fileName", fileName);
    formData.append("id", Number(activityData?.id || 0));
    formData.append(
      "activityName",
      activityData?.activityName || "PressReports"
    );
    console.log(Number(activityData?.id || 0), "Number(activityData?.id || 0)");
    try {
      const res = await AsyncPost(API.uploadFiles, formData);
      dispatch(
        fetchActivities(
          46, null
          //JSON.parse(localStorage.getItem("user")).departmentId
        )
      );
      closePopup();
      clearState();
    } catch (ex) {
      console.log(ex);
    }
  };

  const downloadFileFun = async () => {
    AsyncGetFiles(API.downloadFiles + "?id=" + activity.id)
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/zip" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.zip");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initiateActivity = async () => {
    // debugger;
    console.log("Manoj you are here");
    seterrorMsg("");
    const error = validationFun();
    if (error) {
      return;
    }
   
     setInitiateClick(true);

    var data = {
      activityID: 46,
      NameOfNewspaper: NameOfNewspaper,
      DescriptionOfFunction: DescriptionOfFunction,
      DescriptionOfAward: DescriptionOfAward,
      DescriptionOfEvent: DescriptionOfEvent,
      DescriptionOfOthers: DescriptionOfOthers,
      PressReportsType: PressReportsType,
      NewspaperEdition: NewspaperEdition,
      NewspaperPage: NewspaperPage,
      DateOfPublished: DateOfPublished,// new Date(DateOfPublished).toLocaleDateString(),

      InstitutionProgrammesOrCIICP: InstitutionProgrammesOrCIICP,
      Attachment: "",

    };
    var activityData = {
      id: 0,
      activityID: 46,
      activityName: "PressReports",
      data: JSON.stringify(data),
      filePath: "",
      departmentID: 0,
      createdBy: localStorage.getItem("username"),
      createdDate: new Date(),
      modifiedBy: localStorage.getItem("username"),
      modifiedDate: new Date(),
    };
    try {
      const resp = await addActivity(activityData, dispatch);
      await onFileUpload(resp);
    } catch (error) {
      console.log(error);
      closePopup();
      clearState();
    }
  };

  const updateActivity = async () => {
    // debugger;
    // console.log("inside activity", activity);
    seterrorMsg("");
    const error = validationFun();
    if (error) {
      return;
    }
      
     setUpdateClick(true);

    const data = {
      activityID: 46,
      NameOfNewspaper: NameOfNewspaper,
      DescriptionOfFunction: DescriptionOfFunction,
      DescriptionOfAward: DescriptionOfAward,
      DescriptionOfEvent: DescriptionOfEvent,
      DescriptionOfOthers: DescriptionOfOthers,
      PressReportsType: PressReportsType,
      NewspaperEdition: NewspaperEdition,
      NewspaperPage: NewspaperPage,
      DateOfPublished: DateOfPublished,// new Date(DateOfPublished).toLocaleDateString(),
      InstitutionProgrammesOrCIICP: InstitutionProgrammesOrCIICP,
      Attachment: "",

    };
    const activityData = {
      ...activity,
      activityID: 46,
      activityName: "PressReports",
      data: JSON.stringify(data),
    };

    try {
      dispatch(UpdateActivity(activityData));
      await onFileUpload();
      //closePopup();
      clearState();
    } catch (error) {
      console.log(error);
      closePopup();
      clearState();
    }
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      // NameOfNewspaper &&
      DateOfPublished &&
      PressReportsType &&
      //InstitutionProgrammesOrCIICP &&
      (DescriptionOfFunction || DescriptionOfAward || DescriptionOfEvent || DescriptionOfOthers)

      //NewspaperPage &&
      // NewspaperEdition
    ) {
      setvalidate(false);
      return false;
    }
    seterrorMsg("Provide all required fields");
    return true;
  };

  const closePopupFun = () => {
    clearState();
    closePopup();
    //window.location.reload(false);
  };

  

  const onTextValueChange = (e) => {
    switch (e.target.id) {
      case "nameOfNewspaper":
        setNameOfNewspaper(e.target.value);
        break;
      case "descriptionOfFunction":
        setDescriptionOfFunction(e.target.value);


        break;
      case "descriptionOfAward":
        setDescriptionOfAward(e.target.value);

        break;
      case "descriptionOfOthers":
        setDescriptionOfOthers(e.target.value);

        break;
      case "descriptionOfEvent":
        setDescriptionOfEvent(e.target.value);
        break;


      case "departmentsemester":
        setDepartmentSemester(e.target.value);
        break;
      case "departmentdesigantion":
        setDepartmentDesignation(e.target.value);
        break;
      case "pressReportsTypes":
        setPressReportsTypes(e.target.value);
        setDescriptionOfFunction("");
        setDescriptionOfAward("");
        setDescriptionOfEvent("");
        setDescriptionOfOthers("");
        break;

      case "nameOfEdition":
        setNewspaperEdition(e.target.value);
        break;
      case "nameOfPage":

        setNewspaperPage(e.target.value);

    }
  };
  // On file select (from the pop up)
  const onFileChange = async (e) => {
    let AllFiles = e.target.files;
    console.log(AllFiles);
    setselectedFile(AllFiles);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const fillActivityData = (data) => {
    debugger;
    runFillActivityData.current = false;
    const obj = data;
    const objData = obj.data;
    // console.log(obj);
    setDateOfPublished(objData.DateOfPublished);
    setDescriptionOfFunction(objData.DescriptionOfFunction);
    setDescriptionOfAward(objData.DescriptionOfAward);
    setDescriptionOfEvent(objData.DescriptionOfEvent);
    setDescriptionOfOthers(objData.DescriptionOfOthers);
    setNameOfNewspaper(objData.NameOfNewspaper);
    setPressReportsTypes(objData.PressReportsType);
    setNewspaperPage(objData.NewspaperPage);
    setNewspaperEdition(objData.NewspaperEdition);
    setInstitutionProgrammesOrCIICP(objData.InstitutionProgrammesOrCIICP);
    setCreatedBy(obj.createdDate);
    //setselectedFile(obj.filePath);
    setfilesList(obj.files);
    runFillActivityData.current = true;
  };

  useEffect(() => {
    if (!activity) {
      return;
    }
    runFillActivityData.current = true;
    if (runFillActivityData.current) {
      fillActivityData(activity);

      //AsyncGet(API.getActivityById + "?id=" + activity.id)
      //  .then((res) => {
      //  console.log(res, "response");
      //  })
      //catch((err) => {
      //    console.log(err, "error");
      //});
    }
  }, []);

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">{isEdit ? "Edit" : "Add New"}</h2>
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopupFun()}
              type="button"
            >
              X
            </button>
            <div className="row">

              <div className="checksection col">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input radio-btn"
                    type="radio"
                    name="radio-btn2"
                    id="inlineRadio5"
                    value="option3"
                    checked={InstitutionProgrammesOrCIICP === "Institution"}
                    onChange={() => setOnOFFvalue("Institution")}
                  />
                  <label className="form-check-label checkposition">
                    School
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input radio-btn"
                    type="radio"
                    name="radio-btn2"
                    id="inlineRadio6"
                    value="option3"
                    checked={InstitutionProgrammesOrCIICP === "Programmes"}
                    onChange={() => setOnOFFvalue("Programmes")}
                  />
                  <label className="form-check-label checkposition">
                    Programmes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input radio-btn"
                    type="radio"
                    name="radio-btn2"
                    id="inlineRadio6"
                    value="option3"
                    checked={InstitutionProgrammesOrCIICP === "CIICP"}
                    onChange={() => setOnOFFvalue("CIICP")}
                  />
                  <label className="form-check-label checkposition">
                    CIICP
                  </label>
                </div>
              </div>
            </div>
            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Date of Published
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(DateOfPublished).format("YYYY-MM-DD")}
                  disabled={Fromdatevalidation1}
                  onChange={fromDatechange}
                  max={Moment().format("YYYY-MM-DD")}
                />
                {!DateOfPublished && validate ? (
                  <h6 style={{ color: "red" }}>{"Select the Date"}</h6>
                ) : null}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  Name Of Newspaper
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="nameOfNewspaper"
                  value={NameOfNewspaper}
                  onChange={onTextValueChange}
                  maxLength={250}
                />

              </div>



              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Newspaper Edition</label>
                <input
                  className="form-control"
                  type="text"
                  id="nameOfEdition"
                  value={NewspaperEdition}
                  onChange={onTextValueChange}
                  maxLength={250}
                />

              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  Newspaper Page
                </label>
                <input
                  className="form-control"
                  type="text"
                  pattern="[0-9]*"
                  id="nameOfPage"
                  value={NewspaperPage}
                  onChange={onTextValueChange}
                  maxLength={4}
                />

              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Press Reports Types
                </label>

                <select
                  className="form-control"
                  //type="text"

                  aria-label="Default select example"
                  id="pressReportsTypes"
                  value={PressReportsType}
                  onChange={onTextValueChange}
                >
                  <option value="">Select PressReportsType</option>
                  <option value="Function">Function</option>
                  <option value="Award">Award</option>
                  <option value="Event">Event</option>
                  <option value="Others">Others</option>
                </select>
                {!PressReportsType && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              {PressReportsType === "Function" && (
                <div className="col-xs-12 col-md-12 col-lg-12 col-sm-12 form-group tt txtarea">
                  <label>
                    <span style={{ color: "red" }}>*</span> Description of Function
                  </label>
                  <textarea
                    className="form-control clsabstract"
                    id="descriptionOfFunction"
                    value={DescriptionOfFunction}
                    onChange={onTextValueChange}
                    rows="5"
                    maxLength={1000}
                  />

                  {!DescriptionOfFunction && validate ? (
                    <h6 style={{ color: "red" }}>{"Required"}</h6>
                  ) : null}
                </div>
              )}
              {PressReportsType === "Award" && (
                <div className="col-xs-12 col-md-12 col-lg-12 col-sm-12 form-group tt txtarea">
                  <label>
                    <span style={{ color: "red" }}>*</span> Description of Award
                  </label>
                  <textarea
                    className="form-control clsabstract"
                    id="descriptionOfAward"
                    value={DescriptionOfAward}
                    onChange={onTextValueChange}
                    rows="5"
                    maxLength={1000}
                  />

                  {!DescriptionOfAward && validate ? (
                    <h6 style={{ color: "red" }}>{"Required"}</h6>
                  ) : null}
                </div>
              )}
              {PressReportsType === "Event" && (
                <div className="col-xs-12 col-md-12 col-lg-12 col-sm-12 form-group tt txtarea">
                  <label>
                    <span style={{ color: "red" }}>*</span>  Description of Event
                  </label>
                  <textarea
                    className="form-control clsabstract"
                    id="descriptionOfEvent"
                    value={DescriptionOfEvent}
                    onChange={onTextValueChange}
                    rows="5"
                    maxLength={1000}
                  />

                  {!DescriptionOfEvent && validate ? (
                    <h6 style={{ color: "red" }}>{"Required"}</h6>
                  ) : null}
                </div>
              )}
              {PressReportsType === "Others" && (
                <div className="col-xs-12 col-md-12 col-lg-12 col-sm-12 form-group tt txtarea">
                  <label>
                    <span style={{ color: "red" }}>*</span>Description of Others
                  </label>
                  <textarea
                    className="form-control clsabstract"
                    id="descriptionOfOthers"
                    value={DescriptionOfOthers}
                    onChange={onTextValueChange}
                    rows="5"
                    maxLength={1000}
                  />

                  {!DescriptionOfOthers && validate ? (
                    <h6 style={{ color: "red" }}>{"Required"}</h6>
                  ) : null}
                </div>
              )}
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Press Report  Clippings</label>
                <input
                  className="form-control"
                  onChange={onFileChange}
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
                {filesList?.length > 0 && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                      {filesList?.map((item, index) => (
                        <h6 className="border-bottom ms-1" key={index}>
                          {item || "No File Name"}
                        </h6>
                      ))}
                    </div>
                    <button
                      className="btn btn-sm btn-primary btn-block "
                      type="button"
                      onClick={() => downloadFileFun()}
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* &nbsp;*/}
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            {/*<button
              className="btn btn-secondary btn-block "
              type="button"
              onClick={onFileUpload}
            >
              upload
            </button>*/}
            <p>
              {!activity ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={clicked}
                  disabled={Initiateclick}
                >
                  Initiate
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={updateclicked}
                  disabled={UpdateClick}
                >
                  Update
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewItem;
