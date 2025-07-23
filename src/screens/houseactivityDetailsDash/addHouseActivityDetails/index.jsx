import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addHouseActivityDetails,
  UpdateHouseActivityDetails,
} from "../../../app/redux/slices/houseActivitySlice";
import { API } from "../../../app/services/endpoints";
import { AsyncGet } from "../../../app/services/https";

const AddHouseActivityDetails = ({ isEdit, item, closePopup, houseactivity }) => {
  const dispatch = useDispatch();
  const runFillHouseData = useRef();

  const [houseId, setHouseId] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [houseList, setHouseList] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [studentList, setStudentList] = useState("");
  const [points, setPoints] = useState("");
  const [Id, setId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  useEffect(() => {
    AsyncGet(API.house)
      .then((res) => {
        setHouseList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleHouseChange = (e) => {
    setHouseId(e.target.value);
  };

  const validationFun = () => {
    setvalidate(true);
    if (!houseId || !activityName || !studentList || !points) {
      setvalidate(false);
      seterrorMsg("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const saveHouseDetails = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    seterrorMsg("");

    const isValid = validationFun();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    const HouseActivityData = {
      HouseId: houseId,
      ActivityName: activityName,
      StudentList: studentList,
      Point: parseInt(points),
      CreatedBy: localStorage.getItem("username"),
    };

    dispatch(addHouseActivityDetails(HouseActivityData));
    closePopup();
    clearState();
    setIsSubmitting(false);
  };

  const updateHouseDetails = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    seterrorMsg("");

    const isValid = validationFun();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    const HouseActivityData = {
      Id: Id,
      HouseId: houseId,
      ActivityName: activityName,
      StudentList: studentList,
      Point: parseInt(points),
      ModifiedBy: localStorage.getItem("username"),
    };

    dispatch(UpdateHouseActivityDetails(HouseActivityData));
    closePopup();
    clearState();
    setIsSubmitting(false);
  };

  const clearState = () => {
    setHouseId("");
    setActivityName("");
    setStudentList("");
    setPoints("");
  };

  const fillHouseActivityData = (obj) => {
    runFillHouseData.current = false;
    setId(obj.data.id);
    setHouseId(obj.data.houseId);
    setActivityName(obj.data.activityName);
    setStudentList(obj.data.studentList);
    setPoints(obj.data.point);
    runFillHouseData.current = true;
  };

  useEffect(() => {
    if (isEdit && houseactivity) {
      fillHouseActivityData(houseactivity);
    }
  }, [isEdit, houseactivity]);

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">
              {isEdit ? "Edit House Activity Details" : "Add New House Activity Details"}
            </h2>
            <button
              className="btn btn-lg btnclose"
              onClick={closePopup}
              type="button"
            >
              X
            </button>
            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Activity Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label> House Name </label>
                <select
                  className="form-control"
                  value={houseId}
                  onChange={handleHouseChange}
                  disabled={isEdit}
                >
                  <option value="">-- Select House --</option>
                  {houseList.map((houseactivity) => (
                    <option key={houseactivity.id} value={houseactivity.id}>
                      {houseactivity.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Student List
                </label>
                <textarea
                  className="form-control"
                  style={{ width: "100%", height: "100px" }}
                  rows={6}
                  value={studentList}
                  onChange={(e) => {
                    setStudentList(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  maxLength={500}
                  placeholder="Enter student names"
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Points
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>

              {errorMsg && (
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <h6 style={{ color: "red" }}>{errorMsg}</h6>
                </div>
              )}

              <div className="mt-3">
                {!houseactivity ? (
                  <button
                    className="btn btn-primary btn-block form-roundedbtn"
                    type="button"
                    onClick={saveHouseDetails}
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-lg btn-primary btn-block form-roundedbtn"
                    type="button"
                    onClick={updateHouseDetails}
                    disabled={isSubmitting}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHouseActivityDetails;
