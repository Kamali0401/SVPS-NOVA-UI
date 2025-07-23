import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import {
  addHolidayCalendarDetails,
  UpdateHolidayCalendarDetails,
} from "../../../app/redux/slices/holidaycalendarSlice";

const AddHolidayCalendarDetails = ({ isEdit, item, closePopup, holidayCalendar }) => {
  const dispatch = useDispatch();

  const runFillHolidayCalendarData = useRef();

  const [Id, setId] = useState("");
  const [DateofHoliday, setDateofHoliday] = useState("");
  const [HolidayDetails, setHolidayDetails] = useState("");
  const [Fromdatevalidation1, setFromdatevalidation] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [Clicked, setClicked] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);

  useEffect(() => {
    if (!holidayCalendar) return;

    runFillHolidayCalendarData.current = true;
    if (runFillHolidayCalendarData.current) {
      fillHolidayCalendarData(holidayCalendar);
    }
  }, []);

  const clearState = () => {
    setDateofHoliday("");
    setHolidayDetails("");
  };

  const dob = (e) => {
    setDateofHoliday(e.target.value);
  };

  const holiday = (e) => {
    setHolidayDetails(e.target.value);
  };

  const saveHolidayCalendarDetails = async () => {
    if (Clicked) return;

    const isValid = validationFun();
    if (!isValid) return;

    setClicked(true);

    const data = {
      
      DateofHoliday: DateofHoliday,
      HolidayDetails: HolidayDetails,
      ModifiedBy: localStorage.getItem("username"),
    };

    try {
      await dispatch(addHolidayCalendarDetails(data));
      clearState();
      closePopup();
    } catch (err) {
      console.error("Save failed", err);
      seterrorMsg("Save failed. Please try again.");
    } finally {
      setClicked(false);
    }
  };

  const updateHolidayCalendarDetails = async () => {
    if (updateClicked) return;

    const isValid = validationFun();
    if (!isValid) return;

    setUpdateClicked(true);

    const data = {
      Id: Id,
      DateofHoliday: DateofHoliday,
      HolidayDetails: HolidayDetails,
      ModifiedBy: localStorage.getItem("username"),
    };

    try {
      await dispatch(UpdateHolidayCalendarDetails(data));
      clearState();
      closePopup();
    } catch (err) {
      console.error("Update failed", err);
      seterrorMsg("Update failed. Please try again.");
    } finally {
      setUpdateClicked(false);
    }
  };

  const validationFun = () => {
    if (!DateofHoliday) {
      seterrorMsg("Date of Holiday is required.");
      return false;
    }

    const selectedDate = dayjs(DateofHoliday);
    const today = dayjs().startOf("day");

    if (!selectedDate.isValid()) {
      seterrorMsg("Invalid date format.");
      return false;
    }

    if (selectedDate.isBefore(today)) {
      seterrorMsg("Date of Holiday cannot be in the past.");
      return false;
    }

    if (!HolidayDetails) {
      seterrorMsg("Holiday Details is required.");
      return false;
    }

    seterrorMsg("");
    return true;
  };

  const closePopupFun = () => {
    clearState();
    closePopup();
  };

  const fillHolidayCalendarData = (obj) => {
    runFillHolidayCalendarData.current = false;
    setId(obj.data.id);
    setDateofHoliday(obj.data.dateofHoliday);
    setHolidayDetails(obj.data.holidayDetails);
    runFillHolidayCalendarData.current = true;
  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">{isEdit ? "Edit Holiday Calendar" : "Add New Holiday Calendar"}</h2>
            <button className="btn btn-lg btnclose" onClick={closePopupFun} type="button">
              X
            </button>

            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Date of Holiday
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={DateofHoliday ? dayjs(DateofHoliday).format("YYYY-MM-DD") : ""}
                  disabled={Fromdatevalidation1}
                  min={dayjs().format("YYYY-MM-DD")}
                  onChange={dob}
                />
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Holiday Details
                </label>
                <textarea
                  className="form-control"
                  value={HolidayDetails}
                  onChange={holiday}
                  maxLength={3000}
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg && <h6 style={{ color: "red" }}>{errorMsg}</h6>}
            </div>

            <p>
              {!holidayCalendar ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={saveHolidayCalendarDetails}
                  disabled={Clicked}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={updateHolidayCalendarDetails}
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

export default AddHolidayCalendarDetails;
