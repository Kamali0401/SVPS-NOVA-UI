import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Moment from "moment";
import { API } from "../../../app/services/endpoints";
import {
  AsyncGet,
  AsyncPost,
  AsyncGetFiles,
} from "../../../app/services/https";
import {
  addAcademicCalendarDetails,
  UpdateAcademicCalendarDetails,
} from "../../../app/redux/slices/academiccalendarSlice";

const AddAcademicCalendarDetails = ({ isEdit, item, closePopup, academicCalendar }) => {
  const dispatch = useDispatch();
  const runFillAcademicCalendarData = useRef();
 const [Clicked , setClicked] = useState(false);
  const [updateClicked , setUpdateClicked] = useState(false); 
  const [Id, setId] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [AcademicDetails, setAcademicDetails] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validate, setValidate] = useState(false);
  const [isStartDateDisabled, setIsStartDateDisabled] = useState(false);
  const [isEndDateDisabled, setIsEndDateDisabled] = useState(false);

  useEffect(() => {
    if (!academicCalendar) return;
    runFillAcademicCalendarData.current = true;
    if (runFillAcademicCalendarData.current) {
      fillAcademicCalendarData(academicCalendar);
    }
  }, []);

  const clearState = () => {
    setStartDate("");
    setEndDate("");
    setAcademicDetails("");
    setIsStartDateDisabled(false);
    setIsEndDateDisabled(false);
    setValidate(false);
        setClicked(false);
        setUpdateClicked(false);

    setErrorMsg("");
  };

  const handleStartDateChange = (e) => {
  const inputDate = new Date(e.target.value);

  if (isNaN(inputDate.getTime())) {
    setStartDate("");
    return;
  }

  setStartDate(dayjs(inputDate).format("YYYY-MM-DD"));
};


  const handleEndDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    const year = inputDate.getFullYear();

    if (isNaN(inputDate.getTime()) || year < 1900) {
      setEndDate("");
      return;
    }

    setEndDate(dayjs(inputDate).format("YYYY-MM-DD"));
  };

  const handleAcademicDetailsChange = (e) => {
    setAcademicDetails(e.target.value);
  };

  const validateFields = () => {
    setValidate(true);
    if (!StartDate || !EndDate || !AcademicDetails) {
      setErrorMsg("Provide all required fields");
      return false;
    }
    return true;
  };

  const saveAcademicCalendarDetails = () => {
    if (!validateFields()) return;
setClicked(true);
    const AcademicCalendarData = {
      StartDate: dayjs(StartDate).format("YYYY-MM-DD"),
      EndDate: dayjs(EndDate).format("YYYY-MM-DD"),
      AcademicActivities: AcademicDetails,
      CreatedBy: localStorage.getItem("username"),
    };

    dispatch(addAcademicCalendarDetails(AcademicCalendarData));
    closePopup();
    clearState();
    
  };

  const updateAcademicCalendarDetails = () => {

    if (!validateFields()) return;
    setUpdateClicked(true); // Disable Update button

    const data = {
      Id,
      StartDate,
      EndDate,
      AcademicActivities: AcademicDetails,
      ModifiedBy: localStorage.getItem("username"),
    };

    dispatch(UpdateAcademicCalendarDetails(data));
    closePopup();
    clearState();
  };

  const closePopupFun = () => {
    clearState();
    closePopup();
  };

  const fillAcademicCalendarData = (obj) => {
    runFillAcademicCalendarData.current = false;
    setId(obj.data.id);
    setStartDate(dayjs(obj.data.startDate).format("YYYY-MM-DD"));
    setEndDate(dayjs(obj.data.endDate).format("YYYY-MM-DD"));
    setAcademicDetails(obj.data.academicActivities);
  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">
              {isEdit ? "Edit Academic Calendar" : "Add New Academic Calendar"}
            </h2>
            <button
              className="btn btn-lg btnclose"
              onClick={closePopupFun}
              type="button"
            >
              X
            </button>

            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Start Date
                </label>
                <input
  className="form-control"
  type="date"
  value={StartDate ? dayjs(StartDate).format("YYYY-MM-DD") : ""}
  onChange={handleStartDateChange}
  disabled={isStartDateDisabled}
/>

                {!StartDate && validate && (
                  <h6 style={{ color: "red" }}>Select the start date</h6>
                )}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>End Date
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={EndDate ? dayjs(EndDate).format("YYYY-MM-DD") : ""}
                  min={StartDate ? dayjs(StartDate).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")}
                  onChange={handleEndDateChange}
                  disabled={isEndDateDisabled}
                />
                {!EndDate && validate && (
                  <h6 style={{ color: "red" }}>Select the end date</h6>
                )}
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Academic Details
                </label>
                <textarea
                  className="form-control"
                  type="text"
                  value={AcademicDetails}
                  onChange={handleAcademicDetailsChange}
                  maxLength={3000}
                ></textarea>
                {!AcademicDetails && validate && (
                  <h6 style={{ color: "red" }}>Enter academic details</h6>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              {errorMsg && <h6 style={{ color: "red" }}>{errorMsg}</h6>}
            </div>

            <p>
              {!academicCalendar ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={saveAcademicCalendarDetails}
                  disabled={Clicked}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={updateAcademicCalendarDetails}
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

export default AddAcademicCalendarDetails;
