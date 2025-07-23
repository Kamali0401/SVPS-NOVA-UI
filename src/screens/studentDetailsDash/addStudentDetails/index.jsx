import React, { useEffect, useRef, useState } from "react";//Students
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Moment from "moment";
import validator from "validator";
import "./styles.css";
import {
  addStudentDetails,
  fetchStudents,
  UpdateStudentDetails,
} from "../../../app/redux/slices/studentSlice";
import { API } from "../../../app/services/endpoints";
import {
  AsyncGet,
  AsyncPost,
  AsyncGetFiles,
} from "../../../app/services/https";

const AddStudentDetails = ({ isEdit, item, student, closePopup }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!student) {
      return;
    }
    runFillStudentData.current = true;
    if (runFillStudentData.current) {
      fillStudentData(student);
    }
  }, []);

  /*useEffect(() => {
    AsyncGet(API.getDepartments)
      .then((res) => {
        console.log(res.data, "getDepartments");
        setDeparmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);*/
  const [Id, setId] = useState();

  const [Student_FirstName, setFirstName] = useState("");
  const [Student_MiddleName, setMiddleName] = useState("");
  const [Student_LastName, setLastName] = useState("");

  const [AdmissionNumber, setAdmissionNo] = useState("");
  const [AllergicTo, setAllergicTo] = useState("");
  const [HouseId, setHouseId] = useState("");
  const[HouseList,setHouseList]=useState([]);
  const [BloodGroup, setBloodGroup] = useState("");
  const [Gender, setGender] = useState("");
  const [DOB, setDob] = useState("");
  const [CommunicationAddress, setCommunicationAddr] = useState("");
  const [PermanentAddress, setPermanentAddr] = useState("");
  const [Student_AadhaarNumber, setstudent_AadhaarNumber] = useState("");
  const [ParentEmailId, setParentEmailId] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [Father_MobileNumber, setFather_MobileNumber] = useState("");

  const [Father_Photo, setFather_Photo] = useState([]);
  const [MotherName, setMotherName] = useState("");
  const [Mother_MobileNumber, setMother_MobileNumber] = useState("");
  const [Mother_Photo, setMother_Photo] = useState("");
  const [Gardian1Name, setGardian1Name] = useState("");
  const [Gardian1MobileNumber, setGardian1MobileNumber] = useState("");
  //const [Mother_Occupation, setMother_Occupation] = useState("");

  const [Gardian1Photo, setGardian1Photo] = useState("");
  const [Gardian2MobileNumber, setGardian2MobileNumber] = useState("");
  const [Gardian2Name, setGardian2Name] = useState("");
  const [Gardian2Photo, setGardian2Photo] = useState("");

  const [Gardian3MobileNumber, setGardian3MobileNumber] = useState("");
  const [Gardian3Name, setGardian3Name] = useState("");
  const [Gardian3Photo, setGardian3Photo] = useState("");
  const [Gardian4MobileNumber, setGardian4MobileNumber] = useState("");
  const [Gardian4Name, setGardian4Name] = useState("");
  const [Gardian4Photo, setGardian4Photo] = useState("");
  const [Photo, setPhoto] = useState([]);
  
  const [DateofJoining , setDateofjoining] = useState("");//added
  const [DateofLeaving , setDateofLeaving] = useState("");//added
  const [Fromdatevalidation , setFromdatevalidation] = useState(false);//added
  const [Clicked , setClicked] = useState(false);//addded
  const [updateClicked , setUpdateClicked] = useState(false);//added
  
  const [createdBy, setCreatedBy] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [aadharErrorMsg, setaadharErrorMsg] = useState("");
  const [datevalidation, setdatevalidation] = useState(true);//added
  const [validate, setvalidate] = useState(false);
  const [monthvalidation, setmonthvalidation] = useState(true);
  const runFillStudentData = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const [selectedFile, setselectedFile] = useState("");
  const [file, setFile] = useState();
  const [filesList, setfilesList] = useState([]);
  const [fileName, setFileName] = useState();

  const [Father_selectedFile, setFather_selectedFile] = useState("");
  const [Father_file, setFather_File] = useState();
  const [Father_filesList, setFather_filesList] = useState([]);
  const [Father_fileName, setFather_FileName] = useState();

  const [Mother_selectedFile, setMother_selectedFile] = useState("");
  const [Mother_file, setMother_File] = useState();
  const [Mother_filesList, setMother_filesList] = useState([]);
  const [Mother_fileName, setMother_FileName] = useState();

  const [Gardian1_selectedFile, setGardian1_selectedFile] = useState("");
  const [Gardian1_file, setGardian1_File] = useState();
  const [Gardian1_filesList, setGardian1_filesList] = useState([]);
  const [Gardian1_fileName, setGardian1_FileName] = useState("");

  const [Gardian2_selectedFile, setGardian2_selectedFile] = useState("");
  const [Gardian2_file, setGardian2_File] = useState();
  const [Gardian2_filesList, setGardian2_filesList] = useState([]);
  const [Gardian2_fileName, setGardian2_FileName] = useState();


  const [Gardian3_selectedFile, setGardian3_selectedFile] = useState("");
  const [Gardian3_file, setGardian3_File] = useState();
  const [Gardian3_filesList, setGardian3_filesList] = useState([]);
  const [Gardian3_fileName, setGardian3_FileName] = useState();


  const [Gardian4_selectedFile, setGardian4_selectedFile] = useState("");
  const [Gardian4_file, setGardian4_File] = useState();
  const [Gardian4_filesList, setGardian4_filesList] = useState([]);
  const [Gardian4_fileName, setGardian4_FileName] = useState();

  const [fatherMobErrorMsg, setfatherMobErrorMsg] = useState("");

  const [motherMob1ErrorMsg, setmotherMob1ErrorMsg] = useState("");

  const [gardian1MobErrorMsg, setgardian1MobErrorMsg] = useState("");

  const [gardian2MobErrorMsg, setgardian2MobErrorMsg] = useState("");


  const [gardian3MobErrorMsg, setgardian3MobErrorMsg] = useState("");

  const [gardian4MobErrorMsg, setgardian4MobErrorMsg] = useState("");
  const [AcadamicYearFromvalidation1, setAcadamicYearFromvalidation] =
    useState(false);
  
   const [DateofJoiningvalidation, setDateofJoiningvalidation] = useState(false);
    

  const clearState = () => {
    setId("");
    setFirstName("");
    setMiddleName("");
    setLastName("");

    setAdmissionNo(""); // setTeamName("");

    setAllergicTo("");
    setHouseId("");
    setBloodGroup("");
    setGender("");
    setDob("");
    setCommunicationAddr("");
    setParentEmailId("");
    setPermanentAddr("");
    setstudent_AadhaarNumber("");
    setFatherName("");
    setFather_MobileNumber("");
    setFather_Photo([]);

    setMotherName("");
    setMother_MobileNumber("");

    setMother_Photo("");

    //setNumberOfSibling("");

    setGardian1MobileNumber("");
    setGardian1Name("");
    setGardian1Photo("");

    setGardian2MobileNumber("");
    setGardian2Name("");
    setGardian2Photo("");

    setGardian3MobileNumber("");
    setGardian3Name("");
    setGardian3Photo("");

    setGardian4MobileNumber("");
    setGardian4Name("");
    setGardian4Photo("");

    setselectedFile("");
    setCreatedBy("");
    //setstudentList([]);
    //setfacultyList([]);
    seterrorMsg("");
    setvalidate("");
    setFile("");
    setfilesList([]);
    setFileName("");

    setFather_File("");
    setFather_FileName("");
    setFather_filesList([]);
    setFather_selectedFile("");

    setMother_File("");
    setMother_FileName("");
    setMother_filesList([]);
    setMother_selectedFile("");

    setGardian1_File("");
    setGardian1_FileName("");
    setGardian1_filesList([]);
    setGardian1_selectedFile("");

    setGardian2_File("");
    setGardian2_FileName("");
    setGardian2_filesList([]);
    setGardian2_selectedFile("");


    setGardian3_File("");
    setGardian3_FileName("");
    setGardian3_filesList([]);
    setGardian3_selectedFile("");


    setGardian4_File("");
    setGardian4_FileName("");
    setGardian4_filesList([]);
    setGardian4_selectedFile("");
    setDateofjoining("");
    setDateofLeaving("");


    setdatevalidation(true);
    setFromdatevalidation(false);
    console.log("reseted");
  };
  useEffect(() => {
    AsyncGet(API.house)
      .then((res) => {
        console.log(res.data, "getHouses");
        setHouseList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const fName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setFirstName(val.target.value);
    }
  };
  const mName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setMiddleName(val.target.value);
    }
  };
  const lName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setLastName(val.target.value);
    }
  };

  const admissionNo = (val) => {
    setAdmissionNo(val.target.value);
    // if (/^[a-zA-Z0-9]*$/.test(val.target.value) == false) {
    //   //error message
    // } else {
    //   setAdmissionNo(val.target.value);
    // }
  };
  const allergicTo = (val) => {
    setAllergicTo(val.target.value);
  };
  const bloodGroup = (val) => {
    setBloodGroup(val.target.value);
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
 //  setdatevalidation(false);  
   return;
  }
    const formattedDate = `${year}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;
     setDob(formattedDate);
    // setdatevalidation(false);
    
    //setDob(val.target.value);
  };
  const commAddr = (val) => {
    setCommunicationAddr(val.target.value);
  };
  const permanentAddr = (val) => {
    setPermanentAddr(val.target.value);
  };
  const aathaarNo = (val) => {
    var aadhaar = val.target.value.replace(/\D/g, "");
    if (aadhaar.length < 12) setaadharErrorMsg("Aadhar must be 12 digits");
    else setaadharErrorMsg("");
    setstudent_AadhaarNumber(aadhaar);
  };
    
  //added
  const sumitted = () =>{
         
      if(Clicked) return;
      
      saveStudentDetails();

  };
//added
  const updateSumited = () =>{
    if (updateClicked) return;
    
    updateStudentDetails();
  };


  //added
  const Datejoin = (val) =>{
     const inputDate = new Date(val.target.value);
     const year = inputDate.getFullYear();

     if (isNaN(inputDate.getTime()) || year < 1900) {
    setDateofjoining('');
   setdatevalidation(false);  
   return;
  }
    const formattedDate = `${year}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;
     setDateofjoining(formattedDate);
     setdatevalidation(false);
    setDateofLeaving("");
     //setDateofjoining(val.target.value);
  };
  
   const DateLeave = (val) =>{

     const inputDate = new Date(val.target.value);
     const year = inputDate.getFullYear();

    if (isNaN(inputDate.getTime()) || year < 1900) {
    setDateofLeaving('');
   // setdatevalidation(true);  
    return;
  }
    const formattedDate = `${year}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;
     setDateofLeaving(formattedDate);
   //  setdatevalidation(false);
     if (val.target.value !== "") {
    setDateofJoiningvalidation(true);
  } else {
    setDateofJoiningvalidation(false);
  }
     //setDateofLeaving(val.target.value);
   };
   
  const emailID = (val) => {
    if (validator.isEmail(val.target.value)) {
      setEmailErrorMsg("");
      emailRef.current.style.border = "";
    } else {
      emailRef.current.focus();
      emailRef.current.style.border = "1px solid red";
      setEmailErrorMsg("Enter valid Email!");
    }
    setParentEmailId(val.target.value);
  };

  const fatherName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setFatherName(val.target.value);
    }
  };
  const fatherMob = (e) => {
    var phNo1 = e.target.value.replace(/\D/g, "");

    if (phNo1.length == 10) {
      setFather_MobileNumber(phNo1);

      setfatherMobErrorMsg("");
    } else {
      setFather_MobileNumber(phNo1);

      setfatherMobErrorMsg("Please enter valid Mobile No");
    }
  };

  const motherName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setMotherName(val.target.value);
    }
  };
  const motherMob = (e) => {
    var phNo1 = e.target.value.replace(/\D/g, "");

    if (phNo1.length == 10) {
      setMother_MobileNumber(phNo1);

      setmotherMob1ErrorMsg("");
    } else {
      setMother_MobileNumber(phNo1);

      setmotherMob1ErrorMsg("Please enter valid Mobile No");
    }
  };

  const gardianName = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setGardian1Name(val.target.value);
    }
  };
  const gardianMob = (e) => {
    var phNo1 = e.target.value.replace(/\D/g, "");

    if (phNo1.length == 10) {
      setGardian1MobileNumber(phNo1);

      setgardian1MobErrorMsg("");
    } else {
      setGardian1MobileNumber(phNo1);

      setgardian1MobErrorMsg("Please enter valid Mobile No");
    }
  };
  const house = (val) => {
    setHouseId(val.target.value);
  };
  const gardian2Name = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setGardian2Name(val.target.value);
    }
  };
  const gardian2Mob = (e) => {
    var phNo1 = e.target.value.replace(/\D/g, "");

    if (phNo1.length == 10) {
      setGardian2MobileNumber(phNo1);

      setgardian2MobErrorMsg("");
    } else {
      setGardian2MobileNumber(phNo1);

      setgardian2MobErrorMsg("Please enter valid Mobile No");
    }
  };


  const gardian3Name = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setGardian3Name(val.target.value);
    }
  };
  const gardian3Mob = (e) => {
    var phNo1 = e.target.value.replace(/\D/g, "");

    if (phNo1.length == 10) {
      setGardian3MobileNumber(phNo1);

      setgardian3MobErrorMsg("");
    } else {
      setGardian3MobileNumber(phNo1);

      setgardian3MobErrorMsg("Please enter valid Mobile No");
    }
  };

  const gardian4Name = (val) => {
    if (/^[a-z A-Z]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setGardian4Name(val.target.value);
    }
  };
  const gardian4Mob = (e) => {
    var phNo1 = e.target.value.replace(/\D/g, "");

    if (phNo1.length == 10) {
      setGardian4MobileNumber(phNo1);

      setgardian4MobErrorMsg("");
    } else {
      setGardian4MobileNumber(phNo1);

      setgardian4MobErrorMsg("Please enter valid Mobile No");
    }
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      !Student_FirstName ||
      !HouseId ||
      //!Student_LastName ||
      !AdmissionNumber ||
      !Gender ||
      !BloodGroup ||
      !DOB ||
      !DateofJoining ||
      !CommunicationAddress ||
      !PermanentAddress ||
      !Student_AadhaarNumber ||
      !ParentEmailId ||
      !FatherName ||
      !Father_MobileNumber ||
      !MotherName ||
      !Mother_MobileNumber
    ) {
      setvalidate(false);
      seterrorMsg("Provide all required fields");
      alert("Provide all required fields");
      return false;
    } else {
      return true;
    }
  };
  const  getAllFileLit=(i)=>{
    debugger;
    switch(i){
      case 1:
        return selectedFile;
      case 2:
        return Father_selectedFile;
        case 3:
          return Mother_selectedFile;
        case 4:
          return Gardian1_selectedFile;
          case 5:
          return Gardian2_selectedFile;
          case 6:
          return Gardian3_selectedFile;
          case 7:
          return Gardian4_selectedFile;
          
      default:
        return "[]";

     };

  }
  const onFileUpload = async (res) => {
    debugger;
    /*if ((selectedFile?.length < 1) ||(Father_selectedFile?.length < 1)||(Mother_selectedFile?.length<1)
      ||(Gardian1_selectedFile?.length < 1)||(Gardian2_selectedFile?.length < 1) ||(Gardian3_selectedFile?.length < 1)
    ||(Gardian4_selectedFile?.length < 1)  
  ) {
      dispatch(fetchStudents());
      closePopup();
      clearState();
      return;
    }*/
      const allFiles = [
        ...(selectedFile || []),
        ...(Father_selectedFile || []),
        ...(Mother_selectedFile || []),
        ...(Gardian1_selectedFile || []),
        ...(Gardian2_selectedFile || []),
        ...(Gardian3_selectedFile || []),
        ...(Gardian4_selectedFile || [])
      ];
    
      // ✅ If no file is selected
      if (allFiles.length === 0) {
        dispatch(fetchStudents());
        closePopup();
        clearState();
        return;
      }
    
debugger;
    console.log(res, "response");
    const studentData = res ? res : student;
    const formData = new FormData();
    for(let i=1;i<8;i++)
    {
     var AllFileList= getAllFileLit(i);
    for (let index = 0; index < AllFileList.length; index++) {
      const fileUploaded = AllFileList[index];
      formData.append("FormFiles", fileUploaded);
    }
  }
    formData.append("TypeofUser", "Students");
    formData.append("id", Number(studentData?.id || 0));

    try {
      debugger;
      const res = await AsyncPost(API.uploadFacultyfiles, formData);
      dispatch(fetchStudents());
      closePopup();
      clearState();
    } catch (ex) {
      console.log(ex);
    }
  };

  const downloadFileFun = async () => {
    //debugger;

    AsyncGetFiles(API.downloadStudentFiles + "?id=" + student.id)
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

  const saveStudentDetails = async () => {
    //debugger;
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }   setClicked(true);//added
    
        
    debugger;
    var studentData = {
     
      Id: 0,
      Student_FirstName: Student_FirstName,
      Student_MiddleName: Student_MiddleName,
      Student_LastName: Student_LastName,
      AdmissionNumber: AdmissionNumber,
      AllergicTo: AllergicTo,
      BloodGroup: BloodGroup,
      Gender: Gender,
      DOB: DOB,
      DOJ:DateofJoining,
      DOL:DateofLeaving,
     
      HouseId: Number(HouseId) == null ? 0 : Number(HouseId),
      CommunicationAddress: CommunicationAddress,
      PermanentAddress: PermanentAddress,
      Student_AadhaarNumber: Student_AadhaarNumber,
      ParentEmailId: ParentEmailId,
      Photo: fileName,
      FatherName: FatherName,
      Father_MobileNumber: Father_MobileNumber,
      Father_Photo: Father_fileName,
      MotherName: MotherName,
      Mother_MobileNumber: Mother_MobileNumber,
      Mother_Photo: Mother_fileName,
      Gardian1Name: Gardian1Name,
      Gardian1MobileNumber: Gardian1MobileNumber,
      Gardian1Photo: Gardian1_fileName,
      Gardian2Name: Gardian2Name,

      Gardian2MobileNumber: Gardian2MobileNumber,
      Gardian2Photo: Gardian2_fileName,

      Gardian3Name: Gardian3Name,

      Gardian3MobileNumber: Gardian3MobileNumber,
      Gardian3Photo: Gardian3_fileName,


      Gardian4Name: Gardian4Name,

      Gardian4MobileNumber: Gardian4MobileNumber,
      Gardian4Photo: Gardian4_fileName,
      DateofJoining: DateofJoining,
      DateofLeaving: DateofLeaving,

      CreatedBy: localStorage.getItem("username"),
      
    };

    try {
      console.log("studentData", studentData);
      const resp = await addStudentDetails(studentData, dispatch);
      //debugger;
      await onFileUpload(resp);
    } catch (error) {
      console.log(error);
      closePopup();
      clearState();
    }
  };

  const updateStudentDetails = async () => {
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }   setUpdateClicked(true);//added
    var data = {
      Id: Id,
      Student_FirstName: Student_FirstName,
      Student_MiddleName: Student_MiddleName,
      Student_LastName: Student_LastName,
      AdmissionNumber: AdmissionNumber,
      AllergicTo: AllergicTo,
      BloodGroup: BloodGroup,
      Gender: Gender,
      DOB: DOB,
      DOJ:DateofJoining,
      DOL:DateofLeaving,
      HouseId: Number(HouseId) == null ? 0 : Number(HouseId),
      CommunicationAddress: CommunicationAddress,
      PermanentAddress: PermanentAddress,
      Student_AadhaarNumber: Student_AadhaarNumber,
      ParentEmailId: ParentEmailId,
      Photo: fileName?fileName:Photo,
      FatherName: FatherName,
      Father_MobileNumber: Father_MobileNumber,
      Father_Photo: Father_fileName? Father_fileName:Father_Photo,
      MotherName: MotherName,
      Mother_MobileNumber: Mother_MobileNumber,
      Mother_Photo: Mother_fileName ? Mother_fileName : Mother_Photo,

      Gardian1Name: Gardian1Name,
      Gardian1MobileNumber: Gardian1MobileNumber,
      Gardian1Photo: Gardian1_fileName ?Gardian1_fileName :Gardian1Photo,
      Gardian2Name: Gardian2Name,

      Gardian2MobileNumber: Gardian2MobileNumber,
      Gardian2Photo: Gardian2_fileName?Gardian2_fileName :Gardian2Photo,
      Gardian3Name: Gardian3Name,

      Gardian3MobileNumber: Gardian3MobileNumber,
      Gardian3Photo: Gardian3_fileName?Gardian3_fileName:Gardian3Photo,


      Gardian4Name: Gardian4Name,

      Gardian4MobileNumber: Gardian4MobileNumber,
      Gardian4Photo: Gardian4_fileName?Gardian4_fileName:Gardian4Photo,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date(),
    };

    const studentData = {
      ...student,
      data: data,
    };

    try {
      await UpdateStudentDetails(studentData.data, dispatch);
      await onFileUpload();
      //closePopup();
    } catch (error) {
      console.log(error);
      closePopup();
      clearState();
    }
  };

  const closePopupFun = () => {
    closePopup();
    //window.location.reload(false);
  };
  const onFileChange = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setselectedFile(AllFiles);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onFileChangeFather = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setFather_selectedFile(AllFiles);
    setFather_File(e.target.files[0]);
    setFather_FileName(e.target.files[0].name);
  };
  const onFileChangeMother = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setMother_selectedFile(AllFiles);
    setMother_File(e.target.files[0]);
    setMother_FileName(e.target.files[0].name);
  };
  const onFileChangeGardian1 = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setGardian1_selectedFile(AllFiles);
    setGardian1_File(e.target.files[0]);
    setGardian1_FileName(e.target.files[0].name);
  };
  const onFileChangeGardian2 = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setGardian2_selectedFile(AllFiles);
    setGardian2_File(e.target.files[0]);
    setGardian2_FileName(e.target.files[0].name);
  };

  const onFileChangeGardian3 = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setGardian3_selectedFile(AllFiles);
    setGardian3_File(e.target.files[0]);
    setGardian3_FileName(e.target.files[0].name);
  };


  const onFileChangeGardian4 = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    setGardian4_selectedFile(AllFiles);
    setGardian4_File(e.target.files[0]);
    setGardian4_FileName(e.target.files[0].name);
  };


  const fillStudentData = (obj) => {
    debugger;
    runFillStudentData.current = false;
    // console.log(obj);
    setId(obj.data.id);
    setFirstName(obj.data.student_FirstName);
    setMiddleName(obj.data.student_MiddleName);
    setLastName(obj.data.student_LastName);
    setGender(obj.data.gender);
    setHouseId(obj.data.houseId);
    setAdmissionNo(obj.data.admissionNumber);

    setDob(obj.data.dob);
    setDateofLeaving(obj.data.dOL);
    setDateofjoining(obj.data.dOJ);
    setAllergicTo(obj.data.allergicTo);
    setBloodGroup(obj.data.bloodGroup);
    setCommunicationAddr(obj.data.communicationAddress);
    setPermanentAddr(obj.data.permanentAddress);
    setstudent_AadhaarNumber(obj.data.student_AadhaarNumber);
    setParentEmailId(obj.data.parentEmailId);
    setPhoto(obj.data.photo);

    setFatherName(obj.data.fatherName);
    setFather_MobileNumber(obj.data.father_MobileNumber);
    setFather_Photo(obj.data.father_Photo);
    setMotherName(obj.data.motherName);
    setMother_MobileNumber(obj.data.mother_MobileNumber);
    setMother_Photo(obj.data.mother_Photo);
    setGardian1Name(obj.data.gardian1Name);
    setGardian1Photo(obj.data.gardian1Photo);
    setGardian1MobileNumber(obj.data.gardian1MobileNumber);

    setGardian2Name(obj.data.gardian2Name);
    setGardian2MobileNumber(obj.data.gardian2MobileNumber);
    setGardian2Photo(obj.data.gardian2Photo);


    setGardian3Name(obj.data.gardian3Name);
    setGardian3MobileNumber(obj.data.gardian3MobileNumber);
    setGardian3Photo(obj.data.gardian3Photo);


    setGardian4Name(obj.data.gardian4Name);
    setGardian4MobileNumber(obj.data.gardian4MobileNumber);
    setGardian4Photo(obj.data.gardian4Photo);
    //debugger;
    setfilesList(obj.files);
      
    setCreatedBy("");
    seterrorMsg("");
    runFillStudentData.current = true;
  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">
              {isEdit ? "Edit Student" : "Add New Student"}
            </h2>{" "}
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopupFun()}
              type="button"
            >
              X
            </button>
            <div className="row formadduser">
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  {" "}
                  <span style={{ color: "red" }}>*</span> First Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={Student_FirstName}
                  onChange={fName}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>Middle Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Student_MiddleName}
                  onChange={mName}
                  maxLength={150}
                />
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Student_LastName}
                  onChange={lName}
                  maxLength={150}
                />
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                <span style={{ color : "red"}}>*</span>Admission No</label>
                <input
                  className="form-control"
                  type="text"
                  value={AdmissionNumber}
                  onChange={admissionNo}
                  maxLength={15}
                />
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Houses
                </label>
                <select
                  className="form-select form-control"
                  onChange={house}
                  aria-label="Default select example"
                  value={HouseId}
                >
                  <option value="">--Select Houses--</option>
                  {HouseList?.map((opt) => (
                    <option key={opt.id} value={opt.id}>
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

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> DOB
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(DOB).format("YYYY-MM-DD")}
                  //max={Moment().subtract(15, "year").format("YYYY-MM-DD")}
                  max={dayjs().format("YYYY-MM-DD")}  
                  onChange={dob}
                  disabled={Fromdatevalidation}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                 <span style={{ color: "red" }}>*</span>  Date of Joining
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(DateofJoining).format("YYYY-MM-DD")}
                   disabled={DateofJoiningvalidation}
                  //max={Moment().subtract(15, "year").format("YYYY-MM-DD")}
                  max={dayjs().format("YYYY-MM-DD")}  
                  onChange={Datejoin}
                 // disabled={Fromdatevalidation}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  Date of Leaving
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(DateofLeaving).format("YYYY-MM-DD")}
                  min={dayjs(DateofJoining).format("YYYY-MM-DD")}
                  onChange={DateLeave}
                   disabled={datevalidation}
                  //disabled={Fromdatevalidation}
                />
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
                  maxLength={4}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Allegeric To</label>
                <textarea
                  className="form-control"
                  type="text"
                  value={AllergicTo}
                  onChange={allergicTo}
                  maxLength={500}
                ></textarea>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Student Aadhar Number
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={Student_AadhaarNumber}
                  onChange={aathaarNo}
                  maxLength={12}
                />
                <h6
                  style={{
                    color: "red",
                  }}
                >
                  {aadharErrorMsg}
                </h6>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Father's Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={FatherName}
                  onChange={fatherName}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Father's ContactNo
                </label>
                <input
                  className="form-control"
                  onChange={fatherMob}
                  value={Father_MobileNumber}
                  type="text"
                  minLength={10}
                  maxLength={10}
                />
                <h6 style={{ color: "red" }}>{fatherMobErrorMsg}</h6>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Mother's Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={MotherName}
                  onChange={motherName}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Mother's ContactNo
                </label>
                <input
                  className="form-control"
                  onChange={motherMob}
                  value={Mother_MobileNumber}
                  type="text"
                  minLength={10}
                  maxLength={10}
                />
                <h6 style={{ color: "red" }}>{motherMob1ErrorMsg}</h6>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Parent Email Id
                </label>
                <input
                  ref={emailRef}
                  className="form-control"
                  type="text"
                  value={ParentEmailId}
                  onChange={(e) => emailID(e)}
                />
                <h6
                  style={{
                    color: "red",
                  }}
                >
                  {emailErrorMsg}
                </h6>
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Gardian1Name}
                  onChange={gardianName}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian ContactNo</label>
                <input
                  className="form-control"
                  onChange={gardianMob}
                  value={Gardian1MobileNumber}
                  type="text"
                  minLength={10}
                  maxLength={10}
                />
                <h6 style={{ color: "red" }}>{gardian1MobErrorMsg}</h6>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian2 Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Gardian2Name}
                  onChange={gardian2Name}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian2 ContactNo</label>
                <input
                  className="form-control"
                  onChange={gardian2Mob}
                  value={Gardian2MobileNumber}
                  type="text"
                  minLength={10}
                  maxLength={10}
                />
                <h6 style={{ color: "red" }}>{gardian2MobErrorMsg}</h6>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian3 Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Gardian3Name}
                  onChange={gardian3Name}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian3 ContactNo</label>
                <input
                  className="form-control"
                  onChange={gardian3Mob}
                  value={Gardian3MobileNumber}
                  type="text"
                  minLength={10}
                  maxLength={10}
                />
                <h6 style={{ color: "red" }}>{gardian3MobErrorMsg}</h6>
              </div>


              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian4 Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Gardian4Name}
                  onChange={gardian4Name}
                  maxLength={150}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>Gardian4 ContactNo</label>
                <input
                  className="form-control"
                  onChange={gardian4Mob}
                  value={Gardian4MobileNumber}
                  type="text"
                  minLength={10}
                  maxLength={10}
                />
                <h6 style={{ color: "red" }}>{gardian4MobErrorMsg}</h6>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Communication Address
                </label>
                <textarea
                  className="form-control"
                  type="text"
                  value={CommunicationAddress}
                  onChange={commAddr}
                  maxLength={500}
                />
              </div>
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span> Permanent Address
                </label>
                <textarea
                  className="form-control"
                  type="text"
                  value={PermanentAddress}
                  onChange={permanentAddr}
                  maxLength={500}
                ></textarea>
              </div>

              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> Student Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChange}
                  type="file"
                  id="formFileMultiple"
                />
                  {filesList?.length > 0  && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                      
                        <h6 className="border-bottom ms-1" >
                         {Photo|| "No File Name"}
                        </h6>
                      
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
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> Father Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChangeFather}
                  type="file"
                  id="formFileMultiple"
                />
                 {filesList?.length > 0  && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                   
                        <h6 className="border-bottom ms-1" >
                          {Father_Photo || "No File Name"}
                        </h6>
                     
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
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> Mother Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChangeMother}
                  type="file"
                  id="formFileMultiple"
                />
                  {filesList?.length > 0  && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                    
                        <h6 className="border-bottom ms-1">
                          {Mother_Photo || "No File Name"}
                        </h6>
                      
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
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> Gardian1 Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChangeGardian1}
                  type="file"
                  id="formFileMultiple"
                />
                 {filesList?.length > 0  && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                                             <h6 className="border-bottom ms-1">
                          {Gardian1Photo || "No File Name"}
                        </h6>
                     
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
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> Gardian2 Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChangeGardian2}
                  type="file"
                  id="formFileMultiple"
                />
                  {filesList?.length > 0  && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                     
                        <h6 className="border-bottom ms-1" >
                          {Gardian2Photo || "No File Name"}
                        </h6>
                   
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
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> Gardian3 Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChangeGardian3}
                  type="file"
                  id="formFileMultiple"
                />
                  {filesList?.length > 0  && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                     
                        <h6 className="border-bottom ms-1" >
                          {Gardian3Photo || "No File Name"}
                        </h6>
                   
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
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label> Gardian4 Photo</label>
                <input
                  className="form-control"
                  onChange={onFileChangeGardian4}
                  type="file"
                  id="formFileMultiple"
                />
                  {filesList?.length > 0  && (
                  <div className="d-flex align-items-center mt-2  rounded">
                    <div className="border rounded download-list-block">
                     
                        <h6 className="border-bottom ms-1" >
                          {Gardian4Photo || "No File Name"}
                        </h6>
                   
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
              {!student ? (
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

export default AddStudentDetails;
