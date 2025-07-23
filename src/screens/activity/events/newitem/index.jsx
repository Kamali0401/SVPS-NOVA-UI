//
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
  // 	if (!item) {
  // 		return <div>loading</div>
  // 	}
  //  // set up dispatch
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  // const navigate = useNavigate();
  //state
  const [EventDate, setEventDate] = useState("");

  const [Topic, setTopic] = useState("");
  //const [Abstract, setAbstract] = useState("");

  const [DepartmentSemester, setDepartmentSemester] = useState("");
  const [DepartmentDesignation, setDepartmentDesignation] = useState("");
  const [TypeOfEvent, setEvent] = useState("");
  const [nParticipants, setnParticipants] = useState("");
  const [EventName, setEventName] = useState("");
  const [Impact, setImpact] = useState("");
  const [NameOfTheChiefGuest, setGuestName] = useState("");

  //const [OffLineOrOnLine, setOffLineOrOnLine] = useState("Offline");
  const [selectedFile, setselectedFile] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [file, setFile] = useState();
  const [filesList, setfilesList] = useState([]);
  const [fileName, setFileName] = useState();
  //const [datevalidation1, setdatevalidation] = useState(true);
  const [datevalidation, setdatevalidation] = useState(true);
  const [resetStudentORFaculty, setresetStudentORFaculty] = useState(false);
  const runFillActivityData = useRef();
  const [Fromdatevalidation1, setFromdatevalidation] = useState(false);
    const [Clicked , setClicked] = useState(false);
  const [updateClicked , setUpdateClicked] = useState(false);                
  const clearState = () => {
    setEventDate("");

    setTopic("");
    setnParticipants("");


    setEvent("");

    setEventName("");
    setImpact("");
    setGuestName("");


    //setOffLineOrOnLine("Offline");
    setselectedFile("");
    setCreatedBy("");

    seterrorMsg("");
    setvalidate("");
    setFile("");
    setfilesList([]);
    setFileName("");
    setdatevalidation(true);
    setFromdatevalidation(false);
    console.log("reseted");
  };


  const fromDatechange = (val) => {
   
     const inputDate = new Date(val.target.value);
     const year = inputDate.getFullYear();
 
     if (isNaN(inputDate.getTime()) || year < 1900) {
    setEventDate('');
   setdatevalidation(true);  
   return;
  }
     
    const formattedDate = `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${year}`;
     setEventDate(formattedDate);
     setdatevalidation(false);
    //setEventDate(`${new Date(val.target.value).getMonth() + 1}/${new Date(val.target.value).getDate()}/${new Date(val.target.value).getFullYear()}`);
    //setToDate('');
    // setdatevalidation(false);
 
    //setEventDate(val.target.value);
    //setdatevalidation(false);
  };

  const onCreatedBySelect = (e) => {
    setCreatedBy(e.target.value);
  };


  const onFileUpload = async (res) => {
    if (selectedFile?.length < 1) {
      dispatch(fetchActivities(39, null));
      closePopup();
      clearState();
      return;
    }
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
      activityData?.activityName || "Events"
    );
    console.log(Number(activityData?.id || 0), "Number(activityData?.id || 0)");
    try {
      const res = await AsyncPost(API.uploadFiles, formData);
      dispatch(fetchActivities(39, null));
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
     const sumitted = () =>{  
      if(Clicked) return;
      initiateActivity();
  };
  const updateSumited = () =>{
    if (updateClicked) return;
    updateActivity();
  };
  const initiateActivity = async () => {
    debugger;
    console.log("Manoj you are here");
    seterrorMsg("");
    const error = validationFun();
    if (error) {
      return;
    }
      setClicked(true);
    var data = {
      activityID: 39,
      Topic: Topic,
      EventName: EventName,
      nParticipants: nParticipants,
      NameOfTheChiefGuest: NameOfTheChiefGuest,
      EventDate: EventDate,//new Date(EventDate).toLocaleDateString(),      
      Impact: Impact,

      // OnlineOrOffline: OffLineOrOnLine,
      // blended: true,
      Attachment: "",// selectedFile,

    };
    var activityData = {
      id: 0,
      activityID: 39,
      activityName: "Events",
      data: JSON.stringify(data),
      filePath: "",//selectedFile
      typeOfEvent:TypeOfEvent,
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
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (error) {
      return;
    }
     setUpdateClicked(true);
    const data = {
      activityID: 39,
      Topic: Topic,
      TypeOfEvent: TypeOfEvent,
      NameOfTheChiefGuest: NameOfTheChiefGuest,
      EventName: EventName,
      nParticipants: nParticipants,
      EventDate: EventDate,//new Date(EventDate).toLocaleDateString(),

      Impact: Impact,

      //OnlineOrOffline: OffLineOrOnLine,
      //blended: true,
      Attachment: "",

    };
    const activityData = {
      ...activity,
      activityID: 39,
      activityName: "Events",
      data: JSON.stringify(data),
      //filePath: selectedFile,
    };

    try {
      dispatch(UpdateActivity(activityData));
      await onFileUpload();
      //closePopup();
    } catch (error) {
      console.log(error);
      closePopup();
      clearState();
    }
  };


  const validationFun = () => {
    setvalidate(true);
    if (
      Topic &&
      EventDate &&

      EventName 
      //Impact &&
      //NameOfTheChiefGuest
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
      case "topic":
        setTopic(e.target.value);
        break;

      case "nparticipants":

        var nparticipants = e.target.value.replace(/\D/g, "");
        setnParticipants(nparticipants);

        break;

      case "departmentsemester":
        setDepartmentSemester(e.target.value);
        break;
      case "departmentdesigantion":
        setDepartmentDesignation(e.target.value);
        break;
      case "event":
        setEvent(e.target.value);
        break;
      case "impact":
        setImpact(e.target.value);
        break;
      case "nameOfTheChiefGuest":
        setGuestName(e.target.value);
        break;
      case "eventName":
        setEventName(e.target.value);

      // if(/^[a-z A-Z 0-9-]*$/.test(e.target.value) == false){
      //   //error message
      // }     else
      // {
      // setEventName(e.target.value);
      // }
    }
  };
  const onFileChange = async (e) => {
    let AllFiles = e.target.files;
    console.log(AllFiles);
    setselectedFile(AllFiles);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const fillActivityData = (data) => {
    runFillActivityData.current = false;
    const obj = data;
    const objData = obj.data;
    console.log(obj);
    setEventDate(objData.EventDate);
    setTopic(objData.Topic);
    setEvent(objData.TypeOfEvent);
    setnParticipants(objData.nParticipants);
    setEventName(objData.EventName);
    setImpact(objData.Impact);
    setGuestName(objData.NameOfTheChiefGuest);
    // setOffLineOrOnLine(objData.OnlineOrOffline);
    setfilesList(obj.files);
    setCreatedBy(obj.createdDate);
    runFillActivityData.current = true;
  };

  useEffect(() => {
    if (!activity) {
      return;
    }
    runFillActivityData.current = true;
    if (runFillActivityData.current) {
      fillActivityData(activity);
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



            </div>
            {/*<div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Event Date</label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(EventDate).format("YYYY-MM-DD")}
                  max={Moment().format('YYYY-MM-DD')}
                  onChange={fromDatechange}
                  disabled={Fromdatevalidation1}
                />
                {!EventDate && validate ? (
                  <h6 style={{ color: "red" }}>{"Select The Date"}</h6>
                ) : null}
              </div>*/}
              <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Event Date</label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(EventDate).format("YYYY-MM-DD")}
                  max={Moment().format("YYYY-MM-DD")}
                  onChange={fromDatechange}
                  disabled={Fromdatevalidation1}
                 
                />
                {!EventDate && validate ? (
                  <h6 style={{ color: "red" }}>{"Select The Date"}</h6>
           
                ) : null}
                </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Event Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="eventName"
                  value={EventName}
                  onChange={onTextValueChange}
                  maxLength={300}
                />
                {!EventName && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>

              <div className="col-xs-12 col-md-12 col-lg-12 col-sm-12  form-group" >
                <label>Impact</label>
                <div>
                  <textarea

                    className="form-control"
                    id="impact" value={Impact}
                    onChange={onTextValueChange}
                    rows={25}
                    cols={85}
                    maxLength={1500}
                  />
                </div>
              </div>
              {/* <div
                id="students4"
                className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group tt"
              >
                <label>Department, Semister</label>
                <input
                  className="form-control"
                  type="text"
                  id="departmentsemester"
                  onChange={onTextValueChange}
                />
              </div> */}
              {/* <div
                id="students5"
                className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group tt"
              >
                <label>Department, Designation</label>
                <input
                  className="form-control"
                  type="text"
                  id="departmentdesigantion"
                  onChange={onTextValueChange}
                />
              </div> */}
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label><span style={{ color: "red" }}>*</span>Topic</label>
                <input
                  className="form-control"
                  type="text"
                  id="topic"
                  value={Topic}
                  onChange={onTextValueChange}
                  maxLength={150}
                />
                {!Topic && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>Type of Event</label>
                <input
                  className="form-control"
                  type="text"
                  id="event"
                  value={TypeOfEvent}
                  onChange={onTextValueChange}
                  maxLength={150}
                />

              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  {/* <span style={{ color: "red" }}>*</span> */}
                  Name of the Chief Guest</label>
                <input
                  className="form-control"
                  type="text"
                  id="nameOfTheChiefGuest"
                  value={NameOfTheChiefGuest}
                  onChange={onTextValueChange}
                  maxLength={512}
                />
                {/* {!NameOfTheChiefGuest && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null} */}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>No of Participants</label>
                <input
                  className="form-control"
                  type="text"
                  pattern="[0-9]*"
                  id="nparticipants"
                  value={nParticipants}
                  //value={Number(ExternalParticipants) + Number(nParticipantsGirls)+  Number(nParticipantsBoys)}
                  onChange={onTextValueChange}
                  maxLength={4}

                />
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Attachment</label>
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
            {/*&nbsp;*/}
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>


            <p>
              {!activity ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  //onClick={() => initiateActivity()}
                  onClick={sumitted}
                  disabled={Clicked}
                >
                  Initiate
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  //onClick={() => updateActivity()}
                  onClick={updateSumited}
                  disabled={updateClicked}
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
