import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import { API } from "../../../app/services/endpoints";
import {
  AsyncGet,
  AsyncPost,
  AsyncGetFiles,
} from "../../../app/services/https";
import {
  addSubjectDetails,
  UpdateSubjectDetails,
} from "../../../app/redux/slices/subjectSlice";

const AddSubjectDetails = ({ isEdit, item, closePopup, subject }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (!subject) {
      return;
    }
    runFillSubjectData.current = true;
    if (runFillSubjectData.current) {
      fillSubjectData(subject);
    }
  }, []);
  useEffect(() => {
    debugger;
    AsyncGet(API.Section)
      .then((res) => {
        console.log(res.data, "getSections");

        const uniqueValues = [...new Set(res.data.map(item => item.gradeOrClass))];
        console.log(uniqueValues,"uniqueValues");
        setSectionList(uniqueValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const [Id, setId] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [SubjectName, setSubjectName]= useState("");

   const [SectionList, setSectionList] = useState([]);
  const [SubjectShortForm, setSubjectShortForm]= useState("");
  const [SectionId, setSection] = useState();
  const [Clicked , setClicked] = useState(false);
        const [updateClicked , setUpdateClicked] = useState(false);
  // const [CreatedBy, setCreatedBy] = useState("");
  // const [CreatedDate, setCreate] = useState("");
  // const [ModifiedBy, setCompanyAddr] = useState("");
  // const [ModifiedDate, setCurrentWorkLocation] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  //const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const runFillSubjectData = useRef();
  const clearState = () => {
    setSubjectCode("");
    setSubjectName("");
    setSection("");
    //setTopic("");
   
    setSubjectShortForm("");
   // setId("");
  };

  const sumitted = () =>{  
      if(Clicked) return;
      saveSubjectDetails();
  };
  const updateSumited = () =>{
    if (updateClicked) return;
    updateSubjectDetails();
  };
  const sName = (val) => {
    if(/^[a-z A-Z]*$/.test(val.target.value) == false){
      //error message
    }     else
    {
    setSubjectName(val.target.value);
    }
  };
  const sCode = (val) => {
    if(/^[a-zA-Z 0-9-]*$/.test(val.target.value) == false){
      //error message
    }     else
    {
    setSubjectCode(val.target.value);
    }
  };
  const sect = (val) => {
    setSection(val.target.value);
  };

  const shortform = (val) => {
    
    setSubjectShortForm(val.target.value);
    
  };

  
  const saveSubjectDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
     setClicked(true);
    var subjectData = {
      SubjectCode:"",
      SubjectName : SubjectName,
      SubjectShortForm:SubjectShortForm,
      Grade:SectionId,
      CreatedBy:localStorage.getItem("username"),
    };

    // console.log("activitydata", activityData);
    dispatch(addSubjectDetails(subjectData));
    closePopup();
    clearState();
  };

  const updateSubjectDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
     setUpdateClicked(true);
    var data = {
      Id:Id,
      SubjectCode:"",
      SubjectName : SubjectName,
      SubjectShortForm:SubjectShortForm,
      Grade: SectionId,
      ModifiedBy: localStorage.getItem("username"),
      
    };

    const subjectData = {
      ...subject,
        data: data
    };

    console.log("UpdateSubject", subjectData.data);
    dispatch(UpdateSubjectDetails(subjectData.data));
    closePopup();
    clearState();
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      !SubjectName||
      !SectionId
      ||!SubjectShortForm
    ) {
      setvalidate(false);
      seterrorMsg("Provide All Required field");
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

  const fillSubjectData = (obj) => {
    
    runFillSubjectData.current = false;
    setId(obj.data.id);
    setSubjectCode(obj.data.subjectCode);
    setSubjectName(obj.data.subjectName);
    setSubjectShortForm(obj.data.subjectShortForm);
    setSection(obj.data.grade);
    runFillSubjectData.current = true;
  };

  return (
    <div className="popup">
  <div className="popup-inner modal-content">
      <div className="col">
        <div className="formdata">
        <h2 className="heading">{isEdit ? "Edit Subject" : "Add New Subject"}</h2>          <button
            className="btn btn-lg btnclose"
            onClick={() => closePopupFun()}
            type="button"
          >
            X
          </button>
          <div className="row">
            
          </div>
          <div className="row formadduser">
          {/* <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Subject Code</label>
                <input
                  className="form-control"
                  type="text"
                  value={SubjectCode}
                  onChange={sCode}
                  maxLength={15}
                />
              </div>  */}
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
              </div>
              
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Subject Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={SubjectName}
                  onChange={sName}
                  maxLength={150}
                />
              </div>       
            
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Subject Short Form</label>
                <input
                  className="form-control"
                  type="text"
                  value={SubjectShortForm}
                  onChange={shortform}
                  maxLength={10}
                />
              </div>
            
          </div>
          &nbsp;
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            <p>
              {!subject ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                   onClick={sumitted}
                  disabled={Clicked}
                //  onClick={() => saveSubjectDetails()}
                   // disabled={Clicked}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                 // onClick={() => updateSubjectDetails()}
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

export default AddSubjectDetails;