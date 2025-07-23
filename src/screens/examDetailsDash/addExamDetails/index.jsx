import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';

import {
  addExamDetails,
  UpdateExamDetails,
} from "../../../app/redux/slices/examSlice";

const AddExamDetails = ({ isEdit,item, closePopup, exam }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (!exam) {
      return;
    }
    runFillExamData.current = true;
    if (runFillExamData.current) {
      fillExamData(exam);
    }
  }, []);
  const [IsActive, setIsActive] = useState(false);

  const [ExamId, setExamId] = useState("");
  const [Name, setName]= useState("");
  // const [CreatedBy, setCreatedBy] = useState("");
  // const [CreatedDate, setCreate] = useState("");
  // const [ModifiedBy, setCompanyAddr] = useState("");
  // const [ModifiedDate, setCurrentWorkLocation] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [Clicked , setClicked] = useState(false);
      const [updateClicked , setUpdateClicked] = useState(false);
  //const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const runFillExamData = useRef();

  const clearState = () => {
    setName("");
    setIsActive("");
  };
  const rName = (val) => {
  
      if(/^[a-z A-Z]*$/.test(val.target.value) == false){
        //error message
      }     else
      {
    setName(val.target.value);
      }
  };
 
  const isActive= (e) => {
    setIsActive(e.target.checked);
    
    
  }
  const sumitted = () =>{  
      if(Clicked) return;
      saveExamDetails();
  };
  const updateSumited = () =>{
    if (updateClicked) return;
    updateExamDetails();
  };
  const saveExamDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    setClicked(true);
    var examData = {
      Name : Name,
      IsActive: IsActive,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date()
    };

    // console.log("activitydata", activityData);
    dispatch(addExamDetails(examData));
    closePopup();
    clearState();
  };

  const updateExamDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
     setUpdateClicked(true);
    var data = {
      Id: ExamId,
      IsActive: IsActive,
      Name :Name,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: localStorage.getItem("username"),
      ModifiedDate: new Date()
    };

    const examData = {
      ...exam,
        data: data
    };

    console.log("UpdateExam", examData.data);
    dispatch(UpdateExamDetails(examData.data));
    closePopup();
    clearState();
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      !Name
    ) {
      setvalidate(false);
      seterrorMsg("Provide Exam Name field");
      return false;
    }
    else {
      return true;
    }
  };

  const closePopupFun = () => {
    clearState();
    closePopup();
    //window.location.reload(false);
  };

  const fillExamData = (obj) => {
    runFillExamData.current = false;
    setExamId(obj.data.id);
    setIsActive(obj.data.isActive);
    setName(obj.data.name);
    runFillExamData.current = true;
  };

  return (
    <div className="popup">
  <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
          <h2 className="heading">{isEdit ? "Edit Exam" : "Add New Exam"}</h2>
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopupFun()}
              type="button"
            >
              X
            </button>
            <div className="d-flex justify-content-center align-items-enter">
              
            </div>
            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Exam Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Name}
                  onChange={rName}
                  maxLength={25}
                />
              </div>  
            </div>
            <div className="checksection col custom-control custom-radio custom-control-inline">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input radio-btn custom-control-input"
                    type="checkbox"
                    //name="eligle-radio-btn"
                    //value="1"
                    checked={IsActive}
                    onChange={isActive}
                  />
                 
                  <label
                    htmlFor="students41"
                    className="form-check-label checkposition"
                  >
                    IsActive
                  </label>
                </div>
                
                
              </div>
            &nbsp;
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            <p>
              {!exam ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  //onClick={() => saveExamDetails()}
                    onClick={sumitted}
                  
                    disabled={Clicked}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  //onClick={() => updateExamDetails()}
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

export default AddExamDetails;