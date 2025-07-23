import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTimetableDetails,
    UpdateTimetableDetails,
} from "../../../app/redux/slices/timetableSlice";
import {
    AsyncGet,
    AsyncGetFiles,
    AsyncPost,
} from "../../../app/services/https";
import { API } from "../../../app/services/endpoints";
import SearchBox from "./searchBox";
import AsyncSelect from "react-select/async";
import { Prev } from "react-bootstrap/esm/PageItem";
const AddTimetableDetails = ({ isEdit, item, closePopup, timetables }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (!timetables) {
            return;
        }

        runFillTimetableData.current = true;
        AsyncGet(API.Section)
            .then((res) => {
                setSectionToList(res.data);
                const uniqueValues = [...new Set(res.data.map(item => item.gradeOrClass))];
                console.log(uniqueValues, "uniqueValues");
                setSectionList(uniqueValues);
                const filteredSections = res.data.filter(
                    (item) => item.gradeOrClass === timetables.data.gradeOrClass
                ).map((item) => item.section);

                setuniqueSectionList(filteredSections);


            })
            .catch((err) => {
                console.log(err);
            });

        if (runFillTimetableData.current) {



            fillTimetableData(timetables);

        }
    }, []); // Dependency array ensures this runs when `timetables` changes
    useEffect(() => {
        debugger;
        AsyncGet(API.Section)
            .then((res) => {
                console.log(res.data, "getSection");
                setSectionToList(res.data);
                const uniqueValues = [...new Set(res.data.map(item => item.gradeOrClass))];
                console.log(uniqueValues, "uniqueValues");
                setSectionList(uniqueValues);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const [Id, setId] = useState();
    const [grade, setGrade] = useState();
    const [SectionId, setSectionId] = useState();
    const [uniqueSectionList, setuniqueSectionList] = useState([]);
    const [SectionToList, setSectionToList] = useState([]);
    const [SecId, setSecId] = useState(0);
    const [section, setSection] = useState();
    const [SectionList, setSectionList] = useState([]);
    const [hallNo, setHallNo] = useState("");

    const [errorMsg, seterrorMsg] = useState("");
    const [facultyList, setfacultyList] = useState([]);
    const [validate, setvalidate] = useState(false);
    //const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const runFillTimetableData = useRef();
    const [Faculty, setFaculty] = useState([]);
    const [day, setDay] = useState("");
      const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
    

    const clearState = () => {
        setGrade("");
        setHours("");
        setvalidate("");
        setDay("");
    };

    const [hours, setHours] = useState([]);


    const handleHourChange = (hourKey, value) => {
        setHours((prev) => ({
            ...prev,
            [hourKey]: value,
        }));
    };
    const saveTimetableDetails = () => {
         if (isSubmitting) return;
    setIsSubmitting(true);
    seterrorMsg("");

    const isValid = validationFun();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }
        var timetableData = {
            Day: day,
            SectionId: SectionId ? SectionId.toString() : "",
            hallNo: hallNo,
            WithEffectFrom: new Date(), 
            hour1: hours.hour1,
            hour2: hours.hour2,
            hour3: hours.hour3,
            hour4: hours.hour4,
            hour5: hours.hour5,
            hour6: hours.hour6,
            hour7: hours.hour7,
            hour8: hours.hour8,
            CreatedBy: localStorage.getItem("username"),

        };


        // console.log("activitydata", activityData);
        dispatch(addTimetableDetails(timetableData));
        closePopup();
        clearState();
        setIsSubmitting(false);
    };

    const updateTimetableDetails = () => {
        if (isSubmitting) return;
    setIsSubmitting(true);
    seterrorMsg("");

    const isValid = validationFun();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }
        var data = {
            id: Id,
            Day: day,
            SectionId: SectionId ? SectionId.toString() : "",
            WithEffectFrom: new Date(), 
            hallNo: hallNo,
            hour1: hours.hour1,
            hour2: hours.hour2,
            hour3: hours.hour3,
            hour4: hours.hour4,
            hour5: hours.hour5,
            hour6: hours.hour6,
            hour7: hours.hour7,
            hour8: hours.hour8,
            ModifiedBy: localStorage.getItem("username"),

        };

        const timetableData = {
            ...timetables,
            data: data
        };

        console.log("UpdateTimetable", timetableData.data);
        dispatch(UpdateTimetableDetails(timetableData.data));
        closePopup();
        clearState();
        setIsSubmitting(false);
    };
    const grad = (val) => {
        debugger;
        setuniqueSectionList(SectionToList.filter(x => x.gradeOrClass == val.target.value).map(x => x.section));
        console.log("SectionList", uniqueSectionList);

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

    const validationFun = () => {
        setvalidate(true);
        debugger;
        if (
            !grade ||
            !day ||
            !hours

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

    const fillTimetableData = async (obj) => {
        debugger;
        runFillTimetableData.current = false;
        setId(obj.data.id);
        setGrade(obj.data.gradeOrClass);
        setHallNo(obj.data.hallNo);

        setSection(obj.data.section);
        setSectionId(obj.data.sectionId);
        setDay(obj.data.day)
        const extractedHours = {
            hour1: obj.data.hour1 || "",
            hour2: obj.data.hour2 || "",
            hour3: obj.data.hour3 || "",
            hour4: obj.data.hour4 || "",
            hour5: obj.data.hour5 || "",
            hour6: obj.data.hour6 || "",
            hour7: obj.data.hour7 || "",
            hour8: obj.data.hour8 || "",
        };
        setHours(extractedHours);




        runFillTimetableData.current = true;
    };


    return (
        <div className="popup">
            <div className="popup-inner modal-content">
                <div className="col">
                    <div className="formdata">
                        <h2 className="heading">{isEdit ? "Edit Timetable" : "Add New Timetable"}</h2>
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
                                    <span style={{ color: "red" }}></span>Section
                                </label>
                                <select
                                    className="form-select form-control"
                                    onChange={sect}
                                    aria-label="Default select example"
                                    value={section}
                                >
                                    <option value="">--Select Section--</option>
                                    {uniqueSectionList.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                                <label>Hall Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={hallNo}
                                    onChange={(e) => setHallNo(e.target.value)}
                                />
                            </div>
                            <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                                <label><span style={{ color: "red" }}>*</span>Select Day</label>
                                <select className="form-control" value={day} onChange={(e) => setDay(e.target.value)}>
                                    <option value="">Select a Day</option>
                                    {daysOfWeek.map((day, index) => (
                                        <option key={index} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="row formadduser">
                                {[...Array(8)].map((_, index) => {
                                    const hourKey = `hour${index + 1}`;
                                    return (
                                        <div key={hourKey} className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                                            <label>{`Period ${index + 1}`}</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={hours[hourKey]}
                                                onChange={(e) => handleHourChange(hourKey, e.target.value)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>


                        </div>

                        &nbsp;
                        <div className="d-flex justify-content-center align-items-enter">
                            {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
                        </div>
                        <p>
                            {!timetables ? (
                                <button
                                    className="btn btn-primary btn-block form-roundedbtn"
                                    type="button"
                                    onClick={() => saveTimetableDetails()}
                                disabled={isSubmitting}
                               >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="btn btn-lg btn-primary btn-block form-roundedbtn"
                                    type="button"
                                    onClick={() => updateTimetableDetails()}
                                disabled={isSubmitting}
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

export default AddTimetableDetails;