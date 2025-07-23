import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addSectionDetails,
  UpdateSectionDetails,
} from "../../../app/redux/slices/sectionSlice";
import { AsyncGet } from "../../../app/services/https";
import { API } from "../../../app/services/endpoints";
import AsyncSelect from "react-select/async";

const AddSectionDetails = ({ isEdit, item, closePopup, sections }) => {
  const dispatch = useDispatch();

  const [fieldErrors, setFieldErrors] = useState({});
  const [id, setId] = useState();

  
  const [isActive, setIsActive] = useState(false);
  const [gradeOrClass, setGradeOrClass] = useState("");
  const [section, setSection] = useState("");
  const [coordinatorId, setCoordinatorId] = useState(null);
  const [coordinator, setCoordinator] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [Clicked , setClicked] = useState(false);
    const [updateClicked , setUpdateClicked] = useState(false);

  const clearState = () => {
    setGradeOrClass("");
    setSection("");
    setIsActive(false);
    setCoordinatorId(null);
    setCoordinator("");
    setFieldErrors({});
    setErrorMsg("");
  };

  const handleGradeChange = (e) => setGradeOrClass(e.target.value);

  const handleSectionChange = (e) => {
    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      setSection(e.target.value);
    }
  };

  const handleIsActiveChange = (e) => setIsActive(e.target.checked);

  const fetchFaculties = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const response = await AsyncGet(`${API.getFacultyByName}/${inputValue}`);
       //const data = response.data;
      return response.data.map((faculty) => ({
        label: `${faculty.facultyName} (${faculty.facultyID})`,
        value: faculty.id,
      }));
    /*const facultyArray = Array.isArray(data) ? data : [data]; // Ensure it's an array

    return facultyArray.map((faculty) => ({
      label: `${faculty.facultyName} (${faculty.facultyID})`,
      value: faculty.id,
    }));*/
    } catch (error) {
      console.error("Error fetching faculties:", error);
      return [];
    }
  };

  const handleCoordinatorChange = (selected) => {
    if (selected) {
      setCoordinatorId({ id: selected.value, facultyName: selected.label });
      setCoordinator(selected.label);
    } else {
      setCoordinatorId(null);
      setCoordinator("");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!gradeOrClass.trim()) errors.gradeOrClass = "Grade/Class is required";
    if (!section.trim()) errors.section = "Section is required";
    if (!coordinatorId) errors.coordinatorId = "Coordinator is required";

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMsg("Please enter the mandatory fields.");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

      setClicked(true);
    const sectionData = {
      gradeOrClass,
      section,
      coordinatorId: coordinatorId?.id,
      isActive,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date(),
    };

    dispatch(addSectionDetails(sectionData));
    closePopup();
    clearState();
  };

  const handleUpdate = () => {
    if (!validateForm()) return;
 setUpdateClicked(true);
    const updatedData = {
      id,
      gradeOrClass,
      section,
      coordinatorId: coordinatorId?.id,
      isActive,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date(),
    };

    dispatch(UpdateSectionDetails(updatedData));
    closePopup();
    clearState();
  };

  const initializeForm = async () => {
    const obj = sections;
    setId(obj?.data?.id);
    setGradeOrClass(obj?.data?.gradeOrClass);
    setSection(obj?.data?.section);
    setIsActive(obj?.data?.isActive || false);

    if (obj?.data?.coordinatorId) {
      try {
        const res = await AsyncGet(API.getFaculties);
        const matched = res.data.find((f) => f.id === obj.data.coordinatorId);
        const facultyName = matched
          ? `${matched.facultyName} (${matched.facultyId})`
          : "Unknown";

        setCoordinatorId({ id: obj.data.coordinatorId, facultyName });
        setCoordinator(facultyName);
      } catch (err) {
        console.error("Error fetching coordinator data:", err);
      }
    }
  };

  useEffect(() => {
    if (sections) initializeForm();
  }, [sections]);

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">{isEdit ? "Edit Section" : "Add New Section"}</h2>
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopup()}
              type="button"
            >
              X
            </button>


          <div className="row formadduser">
            <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Grade/Class</label>
                <input
                className="form-control"
                type="text"
                value={gradeOrClass}
                onChange={handleGradeChange}
                maxLength={30}
              />
              {fieldErrors.gradeOrClass && (
                <small className="text-danger">{fieldErrors.gradeOrClass}</small>
              )}
            </div>

            <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>Section</label>
                <input
                className="form-control"
                type="text"
                value={section}
                onChange={handleSectionChange}
                maxLength={4}
              />
              {fieldErrors.section && (
                <small className="text-danger">{fieldErrors.section}</small>
              )}
            </div>

            <div
                id="students3"
                className="col-xs-12 col-md-12 col-lg-12 col-sm-12 form-group tt"
              >
                <label>
                  <span style={{ color: "red" }}>*</span>Coordinator
                </label>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={fetchFaculties}
                onChange={handleCoordinatorChange}
                value={
                  coordinatorId?.facultyName
                    ? { label: coordinatorId.facultyName, value: coordinatorId.id }
                    : null
                }
                styles={{
                  control: (base) => ({ ...base, fontWeight: "normal" }),
                  singleValue: (base) => ({ ...base, fontWeight: "normal" }),
                  option: (base) => ({ ...base, fontWeight: "normal" }),
                }}
              />
              {fieldErrors.coordinatorId && (
                <small className="text-danger">{fieldErrors.coordinatorId}</small>
              )}
            </div>
          </div>

          <div className="form-check form-check-inline checksection">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isActive}
              onChange={handleIsActiveChange}
            />
            <label className="form-check-label">IsActive</label>
          </div>

          {errorMsg && <h6 className="text-danger">{errorMsg}</h6>}

          <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
            <button
                className="btn btn-primary btn-block form-roundedbtn"
                type="button"
              onClick={sections ? handleUpdate : handleSave}
                disabled={sections ? updateClicked : Clicked} 
            >
              {sections ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddSectionDetails;


