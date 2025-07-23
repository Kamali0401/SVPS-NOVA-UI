import React, { useEffect, useRef, useState } from "react"; //AddFaculty
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import Moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import {
  addFacultyDetails,
  fetchFaculties,
  UpdateFacultyDetails,
} from "../../../app/redux/slices/facultySlice";
import { API } from "../../../app/services/endpoints";
import {
  AsyncGet,
  AsyncPost,
  AsyncGetFiles,
} from "../../../app/services/https";

const AddFacultyDetails = ({ isEdit, item, closePopup, faculty }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!faculty) {
      return;
    }
    runFillFacultyData.current = true;
    if (runFillFacultyData.current) {
      fillFacultyData(faculty);
    }
  }, []);

  
  useEffect(() => {
    AsyncGet(API.getRoles)
      .then((res) => {
        console.log(res.data, "getRoles");

        const filteredRoles = res.data.filter(
          (role) => role.name?.toLowerCase() !== "parent"
        );
  
        setRoleList(filteredRoles);
        console.log(filteredRoles,"role");
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
 
  const [Id, setId] = useState();
  const [FacultyId, setFacultyId] = useState("");
  const [RoleId, setRoleId] = useState();
  const [Faculty_FirstName, setFaculty_FirstName] = useState("");
  const [Faculty_MiddleName, setFaculty_MiddleName] = useState("");
  const [Faculty_LastName, setFaculty_LastName] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
 const [Address, setPermanentAddr] = useState("");
  const [FacultyMobileNo_1, setFacultyMobileNo_1] = useState("");
  const [FacultyMobileNo_2, setFacultyMobileNo_2] = useState("");
  const [Email, setEmailID] = useState("");
  const [Gender, setGender] = useState("");
  //const [Photo, setFaculty_Photo] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  const [filePath, setFilePath] = useState();
  // const [CreatedBy, setCreatedBy] = useState("");
  const [fileName, setFileName] = useState();
  // const [CreatedDate, setCreate] = useState("");
  // const [ModifiedBy, setCompanyAddr] = useState("");
  // const [ModifiedDate, setCurrentWorkLocation] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [filesList, setfilesList] = useState([]);
  const [facultyMobErrorMsg, setfacultyMobErrorMsg] = useState("");
  const [DOB, setDob] = useState("");
  const [facultyMob1ErrorMsg, setfacultyMob1ErrorMsg] = useState("");
  const runFillFacultyData = useRef();
  const emailRef = useRef();
  const [RoleList, setRoleList] = useState([]);
  const [datevalidation, setdatevalidation] = useState(true);//added
  const [Fromdatevalidation1 , setFromdatevalidation] = useState(false)//added
  const [Clicked , setClicked] = useState(false);//addded
  const [updateClicked , setUpdateClicked] = useState(false);//added


 

  const [sizeValidate, setsizeValidate] = useState("");
  const fName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setFaculty_FirstName(val.target.value);
    }
  };
  const clearState = () => {
    setId("");
    setDob("");
    setFaculty_FirstName("");
    setFaculty_MiddleName("");
    setFaculty_LastName("");
    setBloodGroup("");
    setPermanentAddr("");
    setRoleId("");
    setFacultyId("");
    setUserName("");
    setPassword("");
    setGender("");
    setFacultyMobileNo_1("");
    setFacultyMobileNo_2("");
    setEmailID("");
    setselectedFile("");
    //setCreatedBy("");
    seterrorMsg("");
    setvalidate("");
    setFilePath("");
    setfilesList([]);
    setFileName("");
   
    setdatevalidation(true);
    setFromdatevalidation(false);
    console.log("reseted");
  };
  const mName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setFaculty_MiddleName(val.target.value);
    }
  };
  const permanentAddr = (val) => {
    setPermanentAddr(val.target.value);
  };
  const lName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setFaculty_LastName(val.target.value);
    }
  };
  const genderVal = (val) => {
    setGender(val.target.value);
  };
  //added
  const dob = (val) => {
    const inputDate = new Date(val.target.value);
     const year = inputDate.getFullYear();

     if (isNaN(inputDate.getTime()) || year < 1900) {
    setDob('');
   setdatevalidation(true);  
   return;
  }
    const formattedDate = `${year}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;
     setDob(formattedDate);
     setdatevalidation(false);
    //setDob(val.target.value);
  };
//added
  const sumitted = () =>{
         
      if(Clicked) return;
      
      saveFacultyDetails();

  };
//added
  const updateSumited = () =>{
    if (updateClicked) return;
    
    updateFacultyDetails();
  };



  const bloodGroup = (val) => {
    setBloodGroup(val.target.value);
  };
 
  
  const facultyId = (val) => {
    setFacultyId(val.target.value);
    // if (/^[a-zA-Z0-9]*$/.test(val.target.value) == false) {
    //   //error message
    // } else {
    //   setFacultyId(val.target.value);
    // }
  };
  
  const roleId = (val) => {
    setRoleId(val.target.value);
  };
  const contactPrimary = (e) => {
    var phNo1 = e.target.value.replace(/\D/g, "");

    if (phNo1.length == 10) {
      setFacultyMobileNo_1(phNo1);

      setfacultyMobErrorMsg("");
    } else {
      setFacultyMobileNo_1(phNo1);

      setfacultyMobErrorMsg("Please enter valid Mobile No");
    }
  };

  const contactAlt = (e) => {
    var phNo2 = e.target.value.replace(/\D/g, "");

    if (phNo2.length == 10) {
      setFacultyMobileNo_2(phNo2);

      setfacultyMob1ErrorMsg("");
    } else {
      setFacultyMobileNo_2(phNo2);
      if (phNo2 != "") setfacultyMob1ErrorMsg("Please enter valid Mobile No");
      else setfacultyMob1ErrorMsg("");
    }
  };

  // const faculty_Photo = (event) => {
  //   setFaculty_Photo(event.target.files[0]);
  // };
  const emailID = (val) => {
    if (validator.isEmail(val.target.value)) {
      setEmailErrorMsg("");
      emailRef.current.style.border = "";
    } else {
      emailRef.current.focus();
      emailRef.current.style.border = "1px solid red";
      setEmailErrorMsg("Enter valid Email!");
    }
    setEmailID(val.target.value);
  };
  const userName = (val) => {
    if (/^[a-zA-Z0-9.]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setUserName(val.target.value);
    }
  };
  const password = (val) => {
    if (
      /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(val.target.value) ==
      false
    ) {
      //error message
    } else {
      setPassword(val.target.value);
    }
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      !Faculty_FirstName ||
      !Faculty_LastName ||
      !BloodGroup ||
      !DOB ||
      !RoleId ||
      !Gender ||
      !FacultyMobileNo_1 ||    
      !Address ||  
      !Email ||
      !FacultyId ||
      !UserName ||
      !Password
    ) {
      setvalidate(false);
      seterrorMsg("Provide all required fields");
      return false;
    } else {
      return true;
    }
  };
  const onFileUpload = async (res) => {
    debugger;
    if (selectedFile?.length < 1) {
      dispatch(fetchFaculties());
      closePopup();
      clearState();
      return;
    }
    console.log(res, "response");
    const facultyData = res ? res : faculty;
    const formData = new FormData();
    for (let index = 0; index < selectedFile.length; index++) {
      const fileUploaded = selectedFile[index];
      formData.append("FormFiles", fileUploaded);
    }
    formData.append("TypeofUser", "Facultys");
    formData.append("id", Number(facultyData?.id || 0));
    try {
      debugger;
      const res = await AsyncPost(API.uploadFacultyfiles, formData);
      dispatch(fetchFaculties());
      closePopup();
      clearState();
    } catch (ex) {
      console.log(ex);
    }
  };

  const downloadFileFun = async () => {
    debugger;

    AsyncGetFiles(API.downloadFacultyFiles + "?id=" + faculty.id)
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/zip" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.zip");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveFacultyDetails = async () => {
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }  setClicked(true);//added
    var facultyData = {
      Id: 0,
      UserName: UserName,
      Password: Password,
      RoleId: Number(RoleId),
      FacultyId: FacultyId,
      Faculty_FirstName: Faculty_FirstName,
      Faculty_MiddleName: Faculty_MiddleName,
      Faculty_LastName: Faculty_LastName,
      BloodGroup: BloodGroup,
      DOB: (DOB),
      Address: Address,
      FacultyMobileNo_1: FacultyMobileNo_1,
      FacultyMobileNo_2: FacultyMobileNo_2,
      Email: Email,
      Photo: "",
      Gender: Gender,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date(),
    };
    try {
      console.log("facultyData", facultyData);
      const resp = await addFacultyDetails(facultyData, dispatch);
      //debugger;
      await onFileUpload(resp);
    } catch (error) {
      console.log(error);
      closePopup();
      clearState();
    }

    /*try{
      console.log("facultyData", facultyData);
    const resp = await  addFacultyDetails(facultyData,dispatch);
   // const resp =await addFacultyDetails(facultyData,dispatch);
    debugger
     await onFileUpload(resp);
     //dispatch(fetchFaculties);
    closePopup();
    window.location.reload(true);}
    catch(error){
      console.log(error);
      closePopup();
      dispatch(fetchFaculties());
      window.location.reload(true);
    }*/
  };

  const updateFacultyDetails = async () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }setUpdateClicked(true);//added
    var data = {
      Id: Id,
      UserName: UserName,
      Password: Password,
      RoleId: Number(RoleId),
      FacultyId: FacultyId,
      Faculty_FirstName: Faculty_FirstName,
      Faculty_MiddleName: Faculty_MiddleName,
      Faculty_LastName: Faculty_LastName,
      BloodGroup: BloodGroup,
      DOB: (DOB),
      Address: Address,
      FacultyMobileNo_1: FacultyMobileNo_1,
      FacultyMobileNo_2: FacultyMobileNo_2,
      Email: Email,
      Photo: "",
      Gender: Gender,
        FileNames:fileName,
       FilePath:filePath,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: localStorage.getItem("username"),
      ModifiedDate: new Date(),
    };

    const facultyData = {
      ...faculty,
      //Photo: "",
      data: data,
    };

    try {
      // dispatch(UpdateFacultyDetails(facultyData));
      await UpdateFacultyDetails(facultyData.data, dispatch);
      await onFileUpload();
    } catch (error) {
      console.log(error);
      closePopup();
      clearState();
    }
  };
  /*console.log("UpdateFaculty", facultyData.data);
    dispatch(UpdateFacultyDetails(facultyData.data));
    debugger
    await onFileUpload();
    closePopup();
    window.location.reload(true);
  }*/

  const closePopupFun = () => {
    closePopup();
    //window.location.reload(false);
  };
  const onFileChange = async (e) => {
    let AllFiles = e.target.files;
    setselectedFile(AllFiles);
   // setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const fillFacultyData = (obj) => {
    runFillFacultyData.current = false;
    // console.log(obj);
    setId(obj.data.id);
    setFaculty_FirstName(obj.data.faculty_FirstName);
    setFaculty_MiddleName(obj.data.faculty_MiddleName);
    setFaculty_LastName(obj.data.faculty_LastName);
    setBloodGroup(obj.data.bloodGroup);
    setDob(obj.data.dob);
    setPermanentAddr(obj.data.address);
    setRoleId(obj.data.roleId);
    setFacultyId(obj.data.facultyId);
    setUserName(obj.data.userName);
    setPassword(obj.data.password);
    setFacultyMobileNo_1(obj.data.facultyMobileNo_1);
    setFacultyMobileNo_2(obj.data.facultyMobileNo_2);
    setGender(obj.data.gender);
    setFileName(obj.data.fileNames);
    setFilePath(obj.data.filePath);
    //setFaculty_Photo(obj.data.photo);
    setEmailID(obj.data.email);
    seterrorMsg("");
    setfilesList(obj.files);
    runFillFacultyData.current = true;
  };

  return (
    <div className="popup" style={{ height: "120vh" }}>
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">{isEdit ? "Edit Faculty" : "Add New Faculty"}</h2>
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
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>First Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={Faculty_FirstName}
                  onChange={fName}
                  maxLength={150}
                />
                {!Faculty_FirstName && validate ? (
                  <h6 style={{ color: "red" }}>{"Requird"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>Middle Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Faculty_MiddleName}
                  onChange={mName}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Last Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={Faculty_LastName}
                  onChange={lName}
                  maxLength={150}
                />
                {!Faculty_LastName && validate ? (
                  <h6 style={{ color: "red" }}>{"Requird"}</h6>
                ) : null}
              </div>

              
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> DOB
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(DOB).format("YYYY-MM-DD")}
                //  max={Moment().subtract(15, "year").format("YYYY-MM-DD")}
                max={dayjs().format("YYYY-MM-DD")}  
                  onChange={dob}
                  disabled={Fromdatevalidation1}
                />
              </div>
              
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Role 
                </label>
                <select
                  className="form-select form-control"
                  onChange={roleId}
                  aria-label="Default select example"
                  value={RoleId}
                >
                  <option value="">--Select Role--</option>

                  {RoleList?.map((opt) => (
                    <option key={opt.id} value={opt.roleId}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Gender
                </label>
                <select
                  className="form-select form-control"
                  onChange={genderVal}
                  aria-label="Default select example"
                  value={Gender}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Faculty ID
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={FacultyId}
                  onChange={facultyId}
                  maxLength={15}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Primary Contact No.
                </label>

                <input
                  className="form-control"
                  type="text"
                  value={FacultyMobileNo_1}
                  onChange={contactPrimary}
                  minLength={10}
                  maxLength={10}
                />

                <h6 style={{ color: "red" }}>{facultyMobErrorMsg}</h6>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>Secondary Contact No.</label>

                <input
                  className="form-control"
                  type="text"
                  value={FacultyMobileNo_2}
                  onChange={contactAlt}
                  minLength={10}
                  maxLength={10}
                />

                <h6 style={{ color: "red" }}>{facultyMob1ErrorMsg}</h6>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Email Address
                </label>
                <input
                  ref={emailRef}
                  className="form-control"
                  type="text"
                  value={Email}
                  onChange={(e) => emailID(e)}
                />
                <h6
                  style={{
                    color: "red",
                  }}
                >
                  {emailErrorMsg}
                </h6>
                {!Email && validate ? (
                  <h6 style={{ color: "red" }}>{"Requird"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Blood Group
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={BloodGroup}
                  onChange={bloodGroup}
                  maxLength={10}
                />
                
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Permanent Address
                </label>
                <textarea
                  className="form-control"
                  type="text"
                  value={Address}
                  onChange={permanentAddr}
                  maxLength={500}
                ></textarea>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>User name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={UserName}
                  onChange={userName}
                />
                {!UserName && validate ? (
                  <h6 style={{ color: "red" }}>{"Requird"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={Password}
                  onChange={password}
                />
                {!Password && validate ? (
                  <h6 style={{ color: "red" }}>{"Requird"}</h6>
                ) : null}
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Faculty Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChange}
                  type="file"
                  id="formFileMultiple"
                />
                {filesList?.length > 0 && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                      {filesList?.map((item, index) => (
                        <h6 className="border-bottom ms-1" key={index}>
                          {item || "No File Name"}
                        </h6>
                      ))}
                    </div>
                    <button
                      className="btn btn-sm btn-primary btn-block "
                      type="button"
                      onClick={() => downloadFileFun()}
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>
            &nbsp;
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            <p>
              {!faculty ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={sumitted}//added
                  disabled={Clicked}//added
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={updateSumited}//added
                  disabled={updateClicked}//added
                 
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

export default AddFacultyDetails;
