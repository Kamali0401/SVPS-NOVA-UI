import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import SearchBox from "./searchBox";
import {
  addFacultySubjectMappingDetails,
  UpdateFacultySubjectMappingDetails,
} from "../../../app/redux/slices/facultySubjectMappingSlice";
import { API } from "../../../app/services/endpoints";
import { AsyncGet, AsyncPost, } from "../../../app/services/https";

const AddFacultySubjectMapping = ({ item, closePopup, facultySubjectMapping }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (!facultySubjectMapping) {
      return;
    }
    runFillFacultySubjectMappingData.current = true;
    if (runFillFacultySubjectMappingData.current) {
      fillFacultySubjectMappingData(facultySubjectMapping);
    }
  }, []);
  const [Id, setId] = useState();
  const [FacultyId, setFacultyId] = useState();
  const [FacultyID, setFacultyID] = useState([]);
  const [facultyList, setfacultyList] = useState([]);
  const [SubjectId, setSubjectId] = useState();
  const [subjectOpts, setsubjectOpts] = useState([]);
  const [DepartmentId, setDepartmentId] = useState();
  const [DepartmentList, setDepartmentList] = useState([]);
  const [Sem, setSem] = useState("");
  const [Year, setYear] = useState("");
  const [Section, setSection] = useState("");
  const [sectionOpt, setsectionOpt] = useState([]);
  

  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const runFillFacultySubjectMappingData = useRef();
  const clearState = (type) => {
    switch (type) {
      case "dept": {
        setSection("");         
        setYear("");
        setSem("");
        setSubjectId();
        setFacultyID([]);
        
        return;
      }
      case "year": {
        setSem("");
        setSection("");  
        setSubjectId();
        setFacultyID([]);
      }
      case "sem": {
        setSection("");  
        setSubjectId();
        setFacultyID([]);
      }
      case "section": {
        
        setSubjectId();
        setFacultyID([]);
      }
      default: {
        setDepartmentId("");
        setSection("");         
        setYear("");
        setSem("");
        setSubjectId();
        setFacultyID([]);
      }

    //setIsActive("");
  };
}
  const dept = (val) => {
    setYear("");
    setSem("");
    setSection("");
    setSubjectId("");
    setFacultyID([]);
    setDepartmentId(val.target.value);

  };
  const year = (val) => {
    setSem("");
    setSection("");
    setSubjectId("");
    setFacultyID([]);
    setYear(val.target.value);
  };
  const sem = (val) => {
   
    setSection("");
    setSubjectId("");
    setFacultyID([]);
    setSem(val.target.value);
  };
  const section = (val) => {
   
    setSubjectId("");
    setFacultyID([]);
    setSection(val.target.value);
  };
  const subject = (val) => {
    setFacultyID([]);
    setSubjectId(val.target.value);
  };

 
  
  useEffect(() => {
debugger;
    let isSubscribed = true;
    getAllDepartmentFun(isSubscribed);
    return () => (isSubscribed = false);
  }, []);
  useEffect(() => {
    let isSubscribed = true;
    getSectionFun(isSubscribed);
    return () => (isSubscribed = false);
  }, [DepartmentId, Year, Sem]);
  useEffect(() => {
    let isSubscribed = true;
    getSubjects(isSubscribed);
    return () => (isSubscribed = false);
  }, [DepartmentId, Year, Sem, Section]);

  const getAllDepartmentFun = async (isSubscribed) => {
    debugger;
    try {
      if (!isSubscribed) {
        return;
      }
      const response = await AsyncGet(API.getAllDepartment);
      
      setDepartmentList(response.data);
      
      console.log(response.data, "department options");
    } catch (error) {
      console.log(error);
    }
  };
  const getSectionFun = async (isSubscribed) => {
    try {
      if (isSubscribed && DepartmentId && Year && Sem) {
        const body = {
          DepartmentId: Number(DepartmentId),
          Year: Number(Year),
          Sem: Sem,
        };
        const response = await AsyncPost(API.getSection, body);
        setsectionOpt(response.data);
        // console.log(response.data, "section options");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubjects = async (isSubscribed) => {
    try {
      
      if (isSubscribed && DepartmentId && Year && Sem && Section) {
        const response = await AsyncGet(
          API.getSubjectsForMarks + "Department=" + Number(DepartmentId) + "&Year=" + Year + "&Sem=" + Sem + "&Section=" + Section
        );
        setsubjectOpts(response.data);
         console.log(response.data, "batch options");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onFacultyIDChange = (data) => {
    setFacultyID(data);
  };
  const onFacultyIDInputChange = (data) => {
    debugger;
    if (!data) {
      return;
    }
    AsyncGet(API.getFacultyByName + "?facultyname=" + data)
      .then((res) => {

        setfacultyList(res.data);

      })
      .catch(() => setfacultyList([]));
  };

  const saveFacultySubjectMappingDetails = () => {
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    
   /* var data=[];
    for(var i=0; i< FacultyID.length;i++){
     data.push ({
      Id: 0,
      DepartmentId:Number(DepartmentId),
      Year:Year,
      Sem:Sem,
      Section:Section,
      SubjectId:Number(SubjectId),
     FacultyID,
      //Name: Name,
      //DepartmentCode:DepartmentCode,
      //IsActive: IsActive,
      // == 1 ? true:false
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date()
    })
  }
  var facultySubjectMappingData={
    data:data
  };*/
  
  var facultySubjectMappingData={
    Id: 0,
      DepartmentId:Number(DepartmentId),
      Year:Year,
      Sem:Sem,
      Section:Section,
      SubjectId:Number(SubjectId),
      FacultyId:JSON.stringify(FacultyID),
     //Data:JSON.stringify(FacultyID),
     CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date()
  };
  console.log("addFacultySubjectMappingDetails", facultySubjectMappingData);

    dispatch(addFacultySubjectMappingDetails(facultySubjectMappingData));
    closePopup();
    clearState();
  };

  const updateFacultySubjectMappingDetails = () => {
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    /*var data=[];
    for(var i=0; i< FacultyID.length;i++){
     data.push ({
      Id: Id,
      DepartmentId:Number(DepartmentId),
      Year:Year,
      Sem:Sem,
      Section:Section,
      SubjectId:Number(SubjectId),
      FacultyID:FacultyID[i].id,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: localStorage.getItem("username"),
      ModifiedDate: new Date()
    })

  }
  var facultySubjectMappingData={
    data:data
  };*/
  var data = {
    Id: Id,
    DepartmentId:Number(DepartmentId),
    Year:Year,
    Sem:Sem,
    Section:Section,
    SubjectId:Number(SubjectId),
    FacultyId:JSON.stringify(FacultyID),
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: localStorage.getItem("username"),
      ModifiedDate: new Date()
  };
  const facultySubjectMappingData = {
    ...facultySubjectMapping,
    data: data
  };
    console.log("UpdateFacultySubjectMappingDetails", facultySubjectMappingData.data);
    dispatch(UpdateFacultySubjectMappingDetails(facultySubjectMappingData.data));
    closePopup();
    clearState();
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      !DepartmentId ||
      //!FacultyId ||
      !SubjectId ||
      !Year ||
      !Sem ||
      !Section ||
      //!IsActive ||
      !(FacultyID?.length > 0)

    ) {
      setvalidate(false);
      seterrorMsg("Provide all required fields");
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

  const fillFacultySubjectMappingData = (obj) => {
    debugger;
    runFillFacultySubjectMappingData.current = false;
    // console.log(obj);
    setId(obj.id);
    setDepartmentId(obj.departmentId);
    setYear(obj.year);
    setSem(obj.sem);
    setSection(obj.section);
    setFacultyID(JSON.parse(obj.facultyId));   
    setSubjectId(obj.subjectId);
    /*var data=[];
    data.push({
      Id:obj[0].FacultyID,
      FacultyName:obj[0].facultyName,
    })*/
   // setFacultyID(obj[0].FacultyId);
   /*var faculty= ("id:"+obj[0].FacultyID.toString()).split(',');
   console.log("faculty",faculty);
    setFacultyID(faculty || []);*/


   /* setFacultyID(obj.data.FacultyID || []);
    setSubjectId(obj[0].SubjectId);*/

    
    runFillFacultySubjectMappingData.current = true;
  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">Add New</h2>
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
                <label><span style={{ color: "red" }}>*</span>Department</label>
                <select
                  className="form-select form-control"
                  onChange={dept}
                  aria-label="Default select example"
                  value={DepartmentId}
                >
                 { /*<option value="">--Select Department--</option>
                  {DepartmentList?.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}*/}

                  <option>
                {DepartmentList?.length > 0 ? "Select Department" : "No Options"}
              </option>
              {DepartmentList?.length > 0
                ? DepartmentList.map((opt, idx) => (
                    <option key={idx} value={opt?.id}>
                      {opt.name}
                    </option>
                  ))
                : null}
                </select>
                {!DepartmentId && validate ? (
                  <h6 style={{ color: "red" }}>{"Select Department"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> <span style={{ color: "red" }}>*</span>Year</label>
                <select
                  className="form-select form-control"
                  onChange={year}
                  aria-label="Default select example"
                  value={Year}
                >
                  <option value="">--select Year--</option>
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                </select>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label><span style={{ color: "red" }}>*</span>Semester</label>
                <select
                  className="form-select form-control"
                  onChange={sem}
                  aria-label="Default select example"
                  value={Sem}
                >
                  <option value="">--Select Semester--</option>
                  <option value="Odd">Odd</option>
                  <option value="Even">Even</option>
                </select>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label><span style={{ color: "red" }}>*</span>Section</label>

                <select
                  className="form-select form-control"
                  onChange={section}
                  value={Section}
                //maxLength={150}
                >
                  <option>
                    {sectionOpt?.length > 0 ? "Select Section" : "No Options"}
                  </option>
                  {sectionOpt?.length > 0
                    ? sectionOpt.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label><span style={{ color: "red" }}>*</span>Subject</label>
                <select
                  className="form-select form-control"
                  onChange={subject}

                  value={SubjectId}

                >
                  <option>
                    {subjectOpts?.length > 0 ? "Select Subject" : "No Options"}
                  </option>
                  {subjectOpts?.length > 0
                    ? subjectOpts.map((opt, idx) => (
                      <option key={idx} value={opt.id}>
                        {opt.subjectName}
                      </option>
                    ))
                    : null}
                </select>
              </div>
              {/*<div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
              <div className="form-check form-check-inline" style={{marginLeft:8,marginTop:28}}>
              
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
                    </div>*/}
              <div className="col-xs-12 col-md-12 col-lg-12 col-sm-12 form-group tt"
              >
                <label><span style={{ color: "red" }}>*</span>Faculty ID</label>
                <SearchBox
                  options={facultyList}
                  onChangeList={(data) => onFacultyIDChange(data)}
                  onInputChange={(e) => onFacultyIDInputChange(e)}
                  selectedOptions={FacultyID || []}

                  type="faculty"
                />
                {!FacultyID?.length > 0 && validate ? (
                  <h6 style={{ color: "red" }}>{"Required"}</h6>
                ) : null}
              </div>
             
            </div>

            {/*<div className="checksection col custom-control custom-radio custom-control-inline">
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


                </div>*/}
            &nbsp;
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            <p>
              {!facultySubjectMapping ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={() => saveFacultySubjectMappingDetails()}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={() => updateFacultySubjectMappingDetails()}
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

export default AddFacultySubjectMapping;