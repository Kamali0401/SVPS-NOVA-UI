import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSectionSubjectDetails,
  updateSectionSubjectDetails,
} from "../../../app/redux/slices/sectionSubjectMappingSlice";
import {
  AsyncGet,
  AsyncGetFiles,
  AsyncPost,
} from "../../../app/services/https";
import { API } from "../../../app/services/endpoints";
import SearchBox from "./searchBox";
import AsyncSelect from "react-select/async";
import { Prev } from "react-bootstrap/esm/PageItem";
const AddSectionSubjectDetails = ({ isEdit, item, closePopup, sectionSubjectMapping }) => {
  const [SectionToList, setSectionToList] = useState([]);
  const [SectionList, setSectionList] = useState([]);
  const [Id, setId] = useState();
  const [SectionId, setSectionId] = useState();
  const [SubjectName, setSubjectName] = useState("");

  const [section, setSection] = useState();
  const [subject, setSubject] = useState();
  const [SecId, setSecId] = useState(0);
  const [grade, setGrade] = useState();
  const [uniqueSectionList, setuniqueSectionList] = useState([]);
  const [SubjectToList, setSubjectToList] = useState([]);
  // const [SubjectUniqueToList, setSubjectUniqueToList] = useState([]);




  const [IsActive, setIsActive] = useState(false);
  const [SectionName, setSectionName] = useState("");
  const [coordinatorId, setcoordinatorId] = useState([]);
  const [errorMsg, seterrorMsg] = useState("");
  const [facultyList, setfacultyList] = useState([]);
  const [validate, setvalidate] = useState(false);
  const [Coordinator, setCoordinator] = useState("");
  //const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const runFillSectionSubjectData = useRef();
  const [Faculty, setFaculty] = useState([]);
    const [Clicked , setClicked] = useState(false);
        const [updateClicked , setUpdateClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    debugger;
    
      fetchsubject();
    
  }, []);
useEffect(() => {
  debugger;
  fetchsection();
}, []);
  useEffect(() => {

    if (!sectionSubjectMapping) {
      return;
    }
    
    runFillSectionSubjectData.current = true;
    AsyncGet(API.Section)
      .then((res) => {
        setSectionToList(res.data);
        const uniqueValues = [...new Set(res.data.map(item => item.gradeOrClass))];
        setSectionList(uniqueValues);
        const filteredSections = res.data.filter(
          (item) => item.gradeOrClass === sectionSubjectMapping.data.gradeorClass
        ).map((item) => item.section);

        setuniqueSectionList(filteredSections);


      })
      .catch((err) => {
        console.log(err);
      });

    fetchsubject();
   
    if (runFillSectionSubjectData.current) {


      fillSectionSubData(sectionSubjectMapping);
    }

  },
    []); // Dependency array ensures this runs when `sections` changes
  
  const fetchsection = () => {
    AsyncGet(API.Section)
      .then((res) => {
        console.log(res.data, "getSection");
        setSectionToList(res.data);
        const uniqueValues = [...new Set(res.data.map(item => item.gradeOrClass))];
        console.log(uniqueValues, "uniqueValues");
        setSectionList(uniqueValues);

        const filteredRecord = res.data.find(
          (item) => item.gradeOrClass === grade && item.section === section
        );
      
        if (filteredRecord) {
          setSectionId(filteredRecord.id);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }
 

  const fetchsubject = () => {
    AsyncGet(API.Subject)
      .then((res) => {
        console.log(res.data, "getSection");
        setSubjectToList(res.data);
        // setSubjectUniqueToList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const clearState = () => {
    setGrade();
    setIsActive("");
    setSection();
    setSubject();
    setuniqueSectionList([]);
    setSubjectToList([]);
    setSectionToList([]);
    setSubjectName("");
    setcoordinatorId([]);
    setvalidate("");
  };


  const fetchFaculties = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const response = await AsyncGet(
        `${API.getFacultyByName}/${inputValue}`
      );
      setfacultyList(response.data);
      return response.data.map((faculty) => ({
        label: `${faculty.facultyName} : ${faculty.facultyID}`, // Show "facultyName : facultyID"
        value: faculty.id, // Keep facultyID as value
      }));
    } catch (error) {
      console.error("Error fetching faculties:", error);
      return [];
    }
  };



  // Handler for selecting a coordinator
  const onCoordinatorChange = (selected) => {
    if (selected) {
      debugger;
      var facultyName = selected.label
      setcoordinatorId({ id: selected.value, facultyName: facultyName });
      //setCoordinator(facultyName); 
      setCoordinator((prev) => {
        console.log(selected.label, "Updated Coordinator");
        return selected.label;
      });

    } else {
      setcoordinatorId(null);
      //setCoordinator(null);
      setCoordinator((prev) => {
        console.log(null, "Updated Coordinator");
        return null;
      });
    }
    setCoordinator(facultyName);
    console.log(facultyName, "facultyName");
  };

const sumitted = () =>{  
      if(Clicked) return;
      saveSectionSubjectDetails();
  };
  const updateSumited = () =>{
    if (updateClicked) return;
    updateSecSubjectDetails();
  };
  // useEffect(() => {
  //   console.log("coordinatorId:", coordinatorId);
  //   console.log("Coordinator:", Coordinator);
  // }, [coordinatorId, Coordinator]);
  const saveSectionSubjectDetails = () => {
    
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    setClicked(true);
    var sectionData = {

      Name: grade,
      SectionId: SectionId,
      SubjectId: parseInt(subject),
      FacultyID: coordinatorId?.id,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),

    };


    dispatch(addSectionSubjectDetails(sectionData));
    closePopup();
    clearState();
  };

  const updateSecSubjectDetails = () => {
   
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
     setUpdateClicked(true);
    var data = {
      Id: Id,
      Name: grade,
      SectionId: SectionId,
      SubjectId: parseInt(subject),
      FacultyID: coordinatorId?.id,
      ModifiedBy: "",
      ModifiedDate: new Date()
    };

    const sectionData = {
      section,
      data: data
    };

    console.log("UpdateSection", sectionData.data);
    dispatch(updateSectionSubjectDetails(sectionData.data));
    closePopup();
    clearState();
  };

  const validationFun = () => {
    setvalidate(true);
   
    if (
      !grade ||
      !SectionId ||
      !subject ||
      !coordinatorId?.id

    ) {
      setvalidate(false);
      seterrorMsg("Provide required field");
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

  const fillSectionSubData = async (obj) => {
    debugger;
    runFillSectionSubjectData.current = false;
    setId(obj.data.id);
    setGrade(obj.data.gradeorClass);
    setSection(obj.data.sectionName);
    setSectionId(obj.data.sectionID);
    setSubject(obj.data.subjectID);
    // setuniqueSectionList(obj.data.sectionName.ToList())
    //   if (SectionToList.length > 0) {
    //     const filteredSections = SectionToList.filter(x => x.gradeOrClass === obj.data.gradeorClass)
    //                                            .map(x => x.section);
    //     setuniqueSectionList(filteredSections);
    // }
    // if(obj.data.subjectID)
    // {
    //   fetchsubject();
    // }

    if (obj.data.facultyID) {

      try {
        const response = await AsyncGet(API.getFaculties);  // Fetch faculty data
        if (response?.data) {
          setFaculty(response.data);  // Store full faculty list

          // Filter faculty based on coordinatorId
          const matchedFaculty = response.data.find(
            (faculty) => faculty.id === obj.data.facultyID
          );

          // Set coordinator ID and name
          setcoordinatorId({
            id: obj.data.facultyID,
            facultyName: matchedFaculty
              ? `${matchedFaculty.facultyName} (${matchedFaculty.facultyId})`
              : "Unknown"
          });

          setCoordinator(
            matchedFaculty
              ? `${matchedFaculty.facultyName} (${matchedFaculty.facultyId})`
              : "Unknown"
          );

        }
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    } else {
      setcoordinatorId(null);
      setCoordinator(null);
    }

    runFillSectionSubjectData.current = true;
  };
  const grad = (val) => {
    debugger;
    const selectedGrade = val.target.value;
    const filteredSections = SectionToList.filter(
      (item) => item.gradeOrClass === selectedGrade
    ).map((item) => item.section);

    setuniqueSectionList(filteredSections);
  //   const filtersub = SubjectToList.filter(x=>x.grade==selectedGrade);
       
  //  // console.log(filtersub, "getSubjects");
  //  setSubjectUniqueToList(filtersub);
    setGrade(val.target.value);
  };
  const sect = (event) => {
    debugger;
    const selectSec = SectionToList.find(
      (item) => item.gradeOrClass === grade && item.section === event.target.value
    );

    if (selectSec) {

      const idsect = selectSec.id;
      console.log(SecId, "selected ID");
      setSectionId(idsect); // Store the ID in state if needed
    }
    console.log("After Setting SectionId:", SecId);
    setSection(event?.target?.value);

  };





  const sub = (event) => {

    setSubject(event?.target?.value);

  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">{isEdit ? "Edit Section Subject Mapping" : "Add New Section Subject Mapping"}</h2>
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopupFun()}
              type="button"
            >
              X
            </button>
            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Grade
                </label>
                <select
                  className="form-select form-control"
                  onChange={grad}
                  aria-label="Default select example"
                  value={grade}
                >
                  <option value="">--Select Grade--</option>
                  {SectionList?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Section
                </label>
                <select
                  className="form-select form-control"
                  onChange={sect}
                  aria-label="Default select example"
                  value={section}
                >
                  <option value="">--Select Section--</option>
                  {uniqueSectionList.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))
                  }
                </select>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Subject Name</label>
                <select
                  className="form-select form-control"
                  onChange={sub}
                  aria-label="Default select example"
                  value={subject}
                >
                  <option value="">--Select Subject--</option>
                  {SubjectToList?.filter(item=>item.grade==grade)?.map((opt) => (
                    <option key={opt} value={opt.id}>
                      {opt.grade}-{opt.subjectName}
                    </option>
                  ))}
                </select>
              </div>


              <div
                id="students3"
                className="col-xs-12 col-md-12 col-lg-12 col-sm-12 form-group tt"
              >
                <label>
                  <span style={{ color: "red" }}>*</span>Faculty Name
                </label>

                
                <AsyncSelect
                  //className="form-select"sections
                  cacheOptions
                  defaultOptions
                  loadOptions={fetchFaculties}
                  onChange={onCoordinatorChange}  // Pass faculty ID on selection // Pass faculty ID on selection
                  /*value={
                    coordinatorId
                      ? { label: `${coordinatorId.facultyName}`, value: coordinatorId.id }
                      : null
                  }*/
                  value={
                    coordinatorId?.facultyName
                      ? { label: coordinatorId.facultyName, value: coordinatorId.id }
                      : null
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      fontWeight: "normal", // Remove boldness
                    }),
                    singleValue: (base) => ({
                      ...base,
                      fontWeight: "normal", // Ensure selected text is not bold
                    }),
                    option: (base) => ({
                      ...base,
                      fontWeight: "normal", // Ensure dropdown options are not bold
                    }),
                  }}

                />

              </div>
            </div>
         
          &nbsp;
          <div className="d-flex justify-content-center align-items-enter">
            {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
          </div>
          <p>
            {!sectionSubjectMapping ? (
              <button
                className="btn btn-primary btn-block form-roundedbtn"
                type="button"
                //onClick={() => saveSectionSubjectDetails()}
                  onClick={sumitted}
                  
                    disabled={Clicked}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-lg btn-primary btn-block form-roundedbtn"
                type="button"
                //onClick={() => updateSecSubjectDetails()}
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

export default AddSectionSubjectDetails;