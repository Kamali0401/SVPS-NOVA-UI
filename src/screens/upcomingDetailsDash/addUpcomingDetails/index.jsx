import React, { useEffect, useRef, useState } from "react"; //competition Add New
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { API } from "../../../app/services/endpoints";
import {
  AsyncGet,
  AsyncPost,
  AsyncGetFiles,
} from "../../../app/services/https";
import {
  addUpcomingDetails,
  UpdateUpcomingDetails,
} from "../../../app/redux/slices/upcomingSlice";
import dayjs, { Dayjs } from "dayjs";

const AddUpcomingDetails = ({ isEdit, item, closePopup, upcoming }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!upcoming) {
      return;
    }
    runFillUpcomingData.current = true;
    if (runFillUpcomingData.current) {
      fillUpcomingData(upcoming);
    }
  }, []);
  useEffect(() => {
    debugger;
    AsyncGet(API.Section)
      .then((res) => {
        console.log(res.data, "getSections");

        const uniqueValues = [
          ...new Set(res.data.map((item) => item.gradeOrClass)),
        ];
        console.log(uniqueValues, "uniqueValues");
        setSectionList(uniqueValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [Id, setId] = useState("");
  const [UpcomingCode, setUpcomingCode] = useState("");
  const [UpcomingName, setUpcomingName] = useState("");
  const [DOB, setDob] = useState("");
  const [Day, setDay] = useState("");
  const [DressCode, setDressCode] = useState("");

  const [EndDate, setEndDate] = useState("");
  const [isPolling, setisPolling] = useState(false);
  const [Guidelines, setGuidelines] = useState("");

  const [SectionList, setSectionList] = useState([]);
  const [UpcomingShortForm, setUpcomingShortForm] = useState("");
  const [SectionId, setSection] = useState();
  const [time, setTime] = useState("");

  const [EventName, setEventName] = useState("");
  // const [CreatedDate, setCreate] = useState("");
  // const [ModifiedBy, setCompanyAddr] = useState("");
  // const [ModifiedDate, setCurrentWorkLocation] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [Fromdatevalidation1, setFromdatevalidation] = useState(false); //added
  const [datevalidation, setdatevalidation] = useState(true); //added
  const [initiateClick, setinitiateClick] = useState(false); //added
  const [updateClick, setUpdateClick] = useState(false); //added

  //const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const runFillUpcomingData = useRef();
  const clearState = () => {
    setUpcomingCode("");
    setUpcomingName("");
    setSection("");
    setEndDate("");
    setEventName("");
    //setTopic("");
    setTime("");
    setDressCode("");

    setUpcomingShortForm("");
    setdatevalidation(true); //added
    setFromdatevalidation(false); //added

    // setId("");
  };

  const dob = (val) => {
    debugger;
    //added
    const inputDate = new Date(val.target.value);
    const year = inputDate.getFullYear();

    if (isNaN(inputDate.getTime()) || year < 1900) {
      setDob("");
      setdatevalidation(true);
      return;
    }
    const formattedDate = `${year}-${String(inputDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(inputDate.getDate()).padStart(2, "0")}`;
    setDob(formattedDate);
    setdatevalidation(false);
  };

  //added
  const enddate = (val) => {
    const inputDate = new Date(val.target.value);
    const year = inputDate.getFullYear();

    if (isNaN(inputDate.getTime()) || year < 1900) {
      setEndDate("");
      setdatevalidation(true);
      return;
    }
    const formattedDate = `${year}-${String(inputDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(inputDate.getDate()).padStart(2, "0")}`;
    setEndDate(formattedDate);
    setdatevalidation(false);
  };

  //added
  const sumitted = () => {
    if (initiateClick) return;

    saveUpcomingDetails();
  };
  //added
  const updateSumited = () => {
    if (updateClick) return;

    updateUpcomingDetails();
  };

  const dayVal = (val) => {
    setDay(val.target.value);
  };
  const sName = (val) => {
    // if (/^[a-z A-Z 0-9-]*$/.test(val.target.value) == false) {
    //   //error message
    // } else {
    setUpcomingName(val.target.value);
  };
  const eventname = (val) => {
    setEventName(val.target.value);
  };
  const sCode = (val) => {
    // if (/^[a-zA-Z 0-9-]*$/.test(val.target.value) == false) {
    //   //error message
    // } else {
    setUpcomingCode(val.target.value);
  };
  const isActive = (e) => {
    setisPolling(e.target.checked);
  };
  const sect = (val) => {
    setSection(val.target.value);
  };
  const guidelines = (val) => {
    setGuidelines(val.target.value);
  };
  const shortform = (val) => {
    setUpcomingShortForm(val.target.value);
  };
  const dresscodechange = (val) => {
    setDressCode(val.target.value);
  };

  //const onTimeSelect = (e) => {
  // debugger;
  //let inputTime = e.target.value.toUpperCase().trim(); // Convert to uppercase and remove spaces
  // Ensure there is a space before AM/PM
  // inputTime = inputTime.replace(/(AM|PM)$/i, " $1");
  // const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  // setTime(inputTime);
  // setTime(val.target.value);
  //};

  {
    /*//new change
  const onTimeSelect = (e) => {
  let inputTime = e.target.value.toUpperCase().trim();
  inputTime = inputTime.replace(/(AM|PM)$/i, " $1");
  inputTime = inputTime.replace(/[^0-9:AMP ]/gi, "");
  //inputTime = inputTime.replace(/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/);
  setTime(inputTime);
};*/
  }

  const onTimeSelect = (e) => {
    let inputTime = e.target.value.toUpperCase().trim();
    inputTime = inputTime.replace(/[^0-9:APM ]/gi, "");
    inputTime = inputTime.replace(/(.)\1{2,}/g, "$1$1");
    inputTime = inputTime.replace(/(AM|PM)$/i, " $1");
    setTime(inputTime);
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/;

    if (timePattern.test(inputTime)) {
      setTime(inputTime);
    } else {
    }
  };

  const saveUpcomingDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    setinitiateClick(true); //added
    var upcomingData = {
      EventDate: DOB,
      EventDay: Day,
      EventName: EventName,
      Grade: SectionId,
      EventTiming: time,
      Eligibility: UpcomingCode,
      Guidelines: Guidelines,
      TimeLimit: UpcomingName,
      JudgingCriteria: UpcomingShortForm,
      DressCode: DressCode,
      IsPollingRequired: isPolling,
      PollingEndDate: EndDate,
      CreatedBy: localStorage.getItem("username"),
    };

    // console.log("activitydata", activityData);
    dispatch(addUpcomingDetails(upcomingData));
    closePopup();
    clearState();
  };

  const updateUpcomingDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    setUpdateClick(true); //added
    var data = {
      Id: Id,
      EventName: EventName,
      EventDay: Day,
      EventDate: DOB,
      Grade: SectionId,
      EventTiming: time,
      Eligibility: UpcomingCode,
      Guidelines: Guidelines,
      TimeLimit: UpcomingName,
      JudgingCriteria: UpcomingShortForm,
      DressCode: DressCode,
      IsPollingRequired: isPolling,
      PollingEndDate: EndDate,
      ModifiedBy: localStorage.getItem("username"),
    };

    const upcomingData = {
      ...upcoming,
      data: data,
    };

    console.log("UpdateUpcoming", upcomingData.data);
    dispatch(UpdateUpcomingDetails(upcomingData.data));
    closePopup();
    clearState();
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      !DOB ||
      !Day ||
      !time ||
      !DressCode ||
      !Guidelines ||
      !UpcomingName ||
      !UpcomingCode ||
      !SectionId ||
      !UpcomingShortForm
    ) {
      setvalidate(false);
      seterrorMsg("Provide All Required field");
      return false;
    } else {
      return true;
    }
  };
  const downloadInterested = async () => {
    debugger;
    alert("Please wait...");
    AsyncGetFiles(`${API.getInterestedStudentList}competitionId=${Id}`)
      .then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "StudentList.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopupFun = () => {
    clearState();
    closePopup();
    //window.location.reload(false);
  };

  const fillUpcomingData = (obj) => {
    runFillUpcomingData.current = false;

    setId(obj.data.id);
    setDay(obj.data.eventDay);
    setDob(obj.data.eventDate);
    setTime(obj.data.eventTiming);
    setUpcomingCode(obj.data.eligibility);
    setGuidelines(obj.data.guidelines);
    setEventName(obj.data.eventName);
    setUpcomingName(obj.data.timeLimit);
    setUpcomingShortForm(obj.data.judgingCriteria);
    setDressCode(obj.data.dressCode);
    setisPolling(obj.data.isPollingRequired);
    setEndDate(obj.data.pollingEndDate);
    setSection(obj.data.grade);
    runFillUpcomingData.current = true;
  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="heading">
                {isEdit ? "Edit Competition" : "Add New Competition"}
              </h2>
              {isEdit && (
                <button
                  className="btn btn-lg btn-secondary btn-block form-roundedbtn2 buttonW"
                  type="submit"
                  onClick={() => downloadInterested()}
                >
                  <span className="glyphicon glyphicon-remove"></span>{" "}
                  Interested List
                </button>
              )}
            </div>
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopupFun()}
              type="button"
            >
              X
            </button>
            <div className="row"></div>
            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Event Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={EventName}
                  onChange={eventname}
                  maxLength={150}
                />
                {!EventName && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Event Date
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(DOB).format("YYYY-MM-DD")}
                  //max={Moment().subtract(15, "year").format("YYYY-MM-DD")}
                  min={dayjs().format("YYYY-MM-DD")}
                  onChange={dob}
                  disabled={Fromdatevalidation1}
                />
                {!DOB && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Day
                </label>
                <select
                  className="form-select form-control"
                  onChange={dayVal}
                  aria-label="Default select example"
                  value={Day}
                >
                  <option value="">--Select Day--</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>

                  <option value="Sunday">Sunday</option>
                </select>
                {!Day && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              {/*<div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label htmlFor="time">
                  <span style={{ color: "red" }}>*</span> Time
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="time"
                  value={time}
                  onChange={onTimeSelect}
                  placeholder="hh:mm AM/PM"
                  aria-label="Select time in 12-hour format"
                />*/}
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label htmlFor="time">
                  <span style={{ color: "red" }}>*</span> Time
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="time"
                  value={time}
                  onChange={(e) => {
                    // Allow typing of partial values
                    const inputValue = e.target.value;
                    const allowedChars = /^[0-9:APMapm\s]*$/;

                    if (allowedChars.test(inputValue)) {
                      onTimeSelect(e);
                    }
                  }}
                  onBlur={(e) => {
                    const inputValue = e.target.value.trim();
                    const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
                    if (inputValue && !timeRegex.test(inputValue)) {
                      alert("Please enter time in hh:mm AM/PM format.");
                    }
                  }}
                  placeholder="hh:mm AM/PM"
                  aria-label="Select time in 12-hour format"
                />
                {validate && !time && (
                  <h6 style={{ color: "red" }}>Required</h6>
                )}
              </div>

              {/* <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label><span style={{ color: "red" }}>*</span>time</label>                
                <input
                  className="form-control"
                  type={"time"}
                  id="time"
                  value={time}
                  onChange={onTimeSelect}
                />
                {!time && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div> */}
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Grade
                </label>
                <select
                  className="form-select form-control"
                  onChange={sect}
                  aria-label="Default select example"
                  value={SectionId}
                >
                  <option value="">--Select Grade--</option>
                  {SectionList?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {!SectionId && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Eligibility
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={UpcomingCode}
                  onChange={sCode}
                  maxLength={300}
                />
                {!UpcomingCode && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Time Limit
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={UpcomingName}
                  onChange={sName}
                  maxLength={50}
                />
                {!UpcomingName && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Judging Criteria
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={UpcomingShortForm}
                  onChange={shortform}
                  maxLength={300}
                />
                {!UpcomingShortForm && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Guidelines
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={Guidelines}
                  onChange={guidelines}
                  maxLength={300}
                />
                {!Guidelines && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Dress Code
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={DressCode}
                  onChange={dresscodechange}
                  maxLength={300}
                />
                {!DressCode && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Polling End Date
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(EndDate).format("YYYY-MM-DD")}
                  min={dayjs().format("YYYY-MM-DD")} // Set minimum to today's date
                  //max={Moment().subtract(15, "year").format("YYYY-MM-DD")}
                  max={dayjs(DOB).format("YYYY-MM-DD")}
                  onChange={enddate}
                  disabled={Fromdatevalidation1}
                />
                {!EndDate && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label className="d-flex align-items-center">
                  Polling Option Required?{" "}
                </label>
                <input
                  className="form-check-input radio-btn custom-control-input me-2"
                  type="checkbox"
                  checked={isPolling}
                  onChange={isActive}
                />
              </div>
            </div>
            &nbsp;
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            <p>
              {!upcoming ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={sumitted} //added
                  disabled={initiateClick} //added
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={updateSumited} //added
                  disabled={updateClick} //added
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

export default AddUpcomingDetails;
