import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateManager } from "react-select";
import validator from "validator";
import $ from "jquery";

import {
  addSectionStudDetails,
  UpdateSectionStudDetails,
} from "../../../app/redux/slices/sectionStudentMappingSlice";
import { API } from "../../../app/services/endpoints";
import { AsyncGet } from "../../../app/services/https";
import "./styles.css";

const AddSectionStudMappings = ({ isEdit, item, sectionStud, closePopup }) => {
  const [filterValue, setFilterValue] = React.useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!sectionStud) {
      return;
   // }
    }
    runFillBatchData.current = true;
    if (runFillBatchData.current) {
      //getBatchList();
      fillBatchData(sectionStud);
    }
  }, []);
  useEffect(() => {
    AsyncGet(API.Section)
      .then((res) => {
        console.log(res.data, "getSections");
        setGradeList(res.data);
       // setSectionId(res.data.id);
        const uniqueValues = [...new Set(res.data.map(item => item.gradeOrClass))];
        setUniqueGrades(uniqueValues);
      
      

      const filteredRecord = res.data.find(
        (item) => item.gradeOrClass === DepartmentId && item.section === Year
      );

      if (filteredRecord) {
        setSectionId(filteredRecord.id);
      }
      console.log("sectionId",SectionId);
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    debugger;
    AsyncGet(API.getStudents)
      .then((res) => {
        console.log(res.data, "get Students");
       // const filteredStudents = res.data.filter(student => student.isSectionMapped===true);
        setStudentList(res.data);
        setStudentOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  const [Id, setId] = useState();
  const [BatchId, setBatchId] = useState("");
  const [StudentList, setStudentList] = useState([]);
  const [StudentOptions, setStudentOptions] = useState([]);
  const [SelectedStudList, setSelectedStudListFromDB] = useState([]);
  const [DepartmentId, setDepartmentId] = useState("");
  const [StudYear, setStudYear] = useState("");
  const [BatchList, setBatchListList] = useState([]);
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [listForEdit, selectedStudList] = useState([]);
  const [Year, setYear] = useState("");

  const [Sem, setSem] = useState();
  const [GradeList, setGradeList] = useState([]);
  const [SectionId, setSectionId] = useState("");
  const runFillBatchData = useRef();
  const batchIdRef = useRef();
  const selectedListRef = useRef();
  const [SectionList, setSectionList] = useState([]); // Filtered Sections
  const [uniqueGrades, setUniqueGrades] = useState([]);
   const [Clicked , setClicked] = useState(false);
          const [updateClicked , setUpdateClicked] = useState(false);
  const clearState = () => {
    setBatchId("");
    setSelectedStudListFromDB([]);
    setYear("");
    setSem("");
    setDepartmentId("");
    //setStudentList([]);
  };
  const validationFun = () => {
    setvalidate(true);
    if (!Year || !DepartmentId || $("#lstBox2 option").length == 0) {
      if (!Year) {
        batchIdRef.current.focus();
        batchIdRef.current.style.border = "1px solid red";
      }
      if ($("#lstBox2 option").length == 0) {
        selectedListRef.current.focus();
        selectedListRef.current.style.border = "1px solid red";
      }
      setvalidate(false);
      seterrorMsg("Provide all required fields");
      return false;
    } else {
      return true;
    }
  };
  const dept = (val) => {
   
    const selectedGrade = val.target.value;
    setDepartmentId(selectedGrade);

    // Filter sections based on selected grade
    const filteredSections = GradeList.filter(
      (item) => item.gradeOrClass === selectedGrade
    ).map((item) => item.section);

    setSectionList(filteredSections);
    console.log(filteredSections,"section");
    setYear(""); // Reset section selection when grade changes
  };
  const sec = (val) => {
    debugger;
    var year = val.target.value;
    setYear(year);

    const selectedItem = GradeList.find(
        (item) => item.gradeOrClass === DepartmentId && item.section === year
    );

    if (selectedItem) {
        const selectedId = selectedItem.id;
        console.log(selectedId, "selected ID");
        setSectionId(selectedId); // Store the ID in state if needed
    }

    if (Year != "") {
      seterrorMsg("");
      batchIdRef.current.style.border = "";
    }
  };
  const sumitted = () =>{  
      if(Clicked) return;
      saveBatchDetails();
  };
  const updateSumited = () =>{
    if (updateClicked) return;
    updateBatchDetails();
  };

  const saveBatchDetails = () => {
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    setClicked(true);
    var mappedStudents = $("#lstBox2 option");
    var data = [];
    for (var i = 0; i < mappedStudents.length; i++) {
      var studDetails = mappedStudents[i].innerHTML.split("-");
      data.push({
        id: 0,
        SectionId: Number(SectionId),      
        studentId: Number(mappedStudents[i].value),
       // isActive:true,
       // studentName: studDetails[0].trim(),
       // rollNo: studDetails[1].trim(),
        createdBy: localStorage.getItem("username"),
        createdDate: new Date(),
        //modifiedBy: localStorage.getItem("username"),
       // modifiedDate: new Date(),
      });
    }
    var sectionStudData = {
      data: data,
    };

    dispatch(addSectionStudDetails(sectionStudData.data));
    closePopup();
    clearState();
  };

  const updateBatchDetails = () => {
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
      setUpdateClicked(true);
    var mappedStudents = $("#lstBox2 option");
    var data = [];
    for (var i = 0; i < mappedStudents.length; i++) {
      var studDetails = mappedStudents[i].innerHTML.split("-");
      data.push({
        id:
          SelectedStudList.filter(
            (x) => x.studentId == Number(mappedStudents[i].value)
          ).length > 0
            ? SelectedStudList.filter(
                (x) => x.studentId == Number(mappedStudents[i].value)
              )[0].id
            : 0,
        //batchId: BatchId,
        //batchName: BatchList.filter((x) => x.batchId === Number(BatchId))[0]
        //  .batchName,
        SectionId: Number(SectionId),      
        studentId: Number(mappedStudents[i].value),
       // isActive:true,
        //createdBy: localStorage.getItem("username"),
        //createdDate: new Date(),
        modifiedBy: localStorage.getItem("username"),
        modifiedDate: new Date(),
      });
    }
    const sectionStudData = {
      data: data,
    };

    // const batchStudData = {
    //     ...batchStud,
    //     studentData: mappedData
    // };

    console.log("UpdateBatch", sectionStudData.data);
    dispatch(UpdateSectionStudDetails(sectionStudData.data));
    closePopup();
    clearState();
  };

  const closePopupFun = () => {
    closePopup();
    //clearState();
    //window.location.reload(false);
  };

  const fillBatchData = (obj) => {
    debugger;
    runFillBatchData.current = false;
    //setId(obj.id);
    setDepartmentId(obj[0].GradeOrClass);
    setYear(obj[0].SectionName);
    setSectionList([obj[0].SectionName]); 
    setSectionId(obj[0].SectionId);
    var data = [];
    obj.data
      .filter((x) => x.IsActive)
      .map((y) =>
        data.push({
          id: y.Id,
          studentId: y.StudentId,
          studentName: y.StudentName,
          admissionNumber: y.AdmissionNumber,
        })
      );
    selectedStudList(data);
    setSelectedStudListFromDB(data);
    /*var deptId = JSON.parse(localStorage.getItem("SectionDetails")).filter(
      (item) => item.sectionId == obj[0].SectionId
    )[0].departmentId;
    setDepartmentId(deptId);
    var year = JSON.parse(localStorage.getItem("SectionDetails")).filter(
      (item) => item.sectionId == obj[0].SectionId
    )[0].year;
    setStudYear(year);*/

    runFillBatchData.current = true;
  };

  const moveRight = (e) => {
    debugger;
    if (Year != "") {
      seterrorMsg("");
      batchIdRef.current.style.border = "";
      var selectedOpts = $("#lstBox1 option:selected");
      if (selectedOpts.length == 0) {
        alert("Nothing to move.");
        e.preventDefault();
      }
      $("#lstBox2").append($(selectedOpts).clone());

      $(selectedOpts).remove();
      e.preventDefault();
    } else {
      seterrorMsg(
        "Please select the section to which you are mapping students!"
      );
      batchIdRef.current.focus();
      batchIdRef.current.style.border = "1px solid red";
    }
  };

  const moveAllRight = (e) => {
    if (Year != "") {
      seterrorMsg("");
      batchIdRef.current.style.border = "";
      var selectedOpts = $("#lstBox1 option");
      if (selectedOpts.length == 0) {
        alert("Nothing to move.");
        e.preventDefault();
      }
      $("#lstBox2").append($(selectedOpts).clone());
      $(selectedOpts).remove();
      e.preventDefault();
    } else {
      seterrorMsg(
        "Please select the section to which you are mapping students!"
      );
      batchIdRef.current.focus();
      batchIdRef.current.style.border = "1px solid red";
    }
  };

  const moveLeft = (e) => {
    var selectedOpts = $("#lstBox2 option:selected");
    if (selectedOpts.length == 0) {
      alert("Nothing to move.");
      e.preventDefault();
    }
    $("#lstBox1").append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
  };

  const moveAllLeft = (e) => {
    var selectedOpts = $("#lstBox2 option");
    if (selectedOpts.length == 0) {
      alert("Nothing to move.");
      e.preventDefault();
    }
    $("#lstBox1").append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata1">
            <h2 className="heading">
              {isEdit ? "Edit Student Mapping" : "Add New Student Mapping"}
            </h2>
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopupFun()}
              type="button"
            >
              X
            </button>
            <div className="d-flex justify-content-center align-items-enter">
              {/*{errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}*/}
            </div>
            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Grade
                </label>
                <select
                  className="form-select form-control"
                  onChange={dept}
                  aria-label="Default select example"
                  value={DepartmentId}
                >
                  <option value="">--Select Grade--</option>
                  {uniqueGrades?.map((grade, index) => (
      <option key={index} value={grade}>
        {grade}
      </option>
    ))}
                </select>
                {!DepartmentId && validate ? (
                  <h6 style={{ color: "red" }}>{"Select Department"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  {" "}
                  <span style={{ color: "red" }}>*</span>Section
                </label>
                <select
                  className="form-select form-control"
                  onChange={sec}
                  aria-label="Default select example"
                  ref={batchIdRef}
                  value={Year}
                >
                  <option value="">--Select Section--</option>
                  {SectionList.map((section, index) => (
        <option key={index} value={section}>
            {section}
        </option>
    ))}
                </select>
                {!Year && validate ? (
                  <h6 style={{ color: "red" }}>{"Select Year"}</h6>
                ) : null}
              </div>
            </div>
            <div className="row formadduser">
              <div className="col-xs-5 col-md-5 col-lg-5 col-sm-12 form-group subject-info-box-1">
                <label>
                  <span style={{ color: "red" }}>*</span>Students
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search students..."
                  onChange={(e) => setFilterValue(e.target.value.toLowerCase())}
                />
                <select
                  multiple="multiple"
                  id="lstBox1"
                  className="form-control"
                >
                  {isEdit
    ? StudentOptions.filter((val) => {
        console.log("Checking Student:", val); // ✅ Now it logs each student object
        return (
            
            !val.isSectionMapped &&
           
            !listForEdit
                .map((stud) => Number(stud.studentId))
                .includes(val.id) &&
            (val.studentName.toLowerCase().includes(filterValue) ||
                val.admissionNumber.toLowerCase().includes(filterValue))
        );
    }).map((opt) => (
        <option key={opt.id} value={opt.id}>
            {opt.studentName + " - " + opt.admissionNumber}
        </option>
    ))
    : StudentOptions.filter((val) => {
        console.log("Checking Non-Edit Student:", val); // ✅ Debugging for non-edit mode
        return (
            !val.isSectionMapped &&
            (val.studentName.toLowerCase().includes(filterValue) ||
                val.admissionNumber.toLowerCase().includes(filterValue))
        );
    }).map((opt) => (
        <option key={opt.id} value={opt.id}>
            {opt.studentName + " - " + opt.admissionNumber}
        </option>
    ))
}
                </select>
              </div>
              <div
                className="col-xs-2 col-md-2 col-lg-2 subject-info-arrows text-center"
                style={{ margin: "auto" }}
              >
                <input
                  type="button"
                  onClick={moveAllRight}
                  id="btnAllRight"
                  value=">>"
                  className="btn btn-default"
                />
                <br />
                <input
                  type="button"
                  onClick={moveRight}
                  id="btnRight"
                  value=">"
                  className="btn btn-default"
                />
                <br />
                <input
                  type="button"
                  onClick={moveLeft}
                  id="btnLeft"
                  value="<"
                  className="btn btn-default"
                />
                <br />
                <input
                  type="button"
                  onClick={moveAllLeft}
                  id="btnAllLeft"
                  value="<<"
                  className="btn btn-default"
                />
              </div>
              <div className="col-xs-5 col-md-5 col-lg-5 col-sm-12 form-group subject-info-box-2">
                <label>
                  <span style={{ color: "red" }}>*</span>Students
                </label>
                <select
                  multiple="multiple"
                  id="lstBox2"
                  className="form-control"
                  ref={selectedListRef}
                >
                  {listForEdit?.map((opt) => (
                    <option key={opt.studentId} value={opt.studentId}>
                      {opt.studentName + " - " + opt.admissionNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            &nbsp;
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            <p>
              {!sectionStud ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                 // onClick={() => saveBatchDetails()}
                 onClick={sumitted}
                  
                    disabled={Clicked}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                 // onClick={() => updateBatchDetails()}
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

export default AddSectionStudMappings;
