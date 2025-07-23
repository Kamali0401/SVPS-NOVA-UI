import React, { useEffect, useRef, useState } from "react";//announcement
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

import './style.css';
import { API } from "../../app/services/endpoints";
import {
  AsyncGet,
  AsyncPost,
  AsyncGetFiles,
} from "../../app/services/https";
import { v4 as uuidv4 } from "uuid";
import {
  addAnnouncementDetails,
  //fetchannouncements,
  UpdateAnnouncementDetails,
  deleteAnnouncement,
  fetchannouncements
} from "../../app/redux/slices/announcementSlice";
//const axios = require('axios').default;
let IsReadytoSend = false;
var count = 0;
let othersfilecount;
const AddAnnouncementDetails = ({ item, closePopup, announcement, }) => {
  const dispatch = useDispatch();

  const dataTable = useRef();
  const [id, setId] = useState(0);
  const [departmentOpt, setdepartmentOpt] = useState([]);
  const [unselecteddeptOpt, setunselecteddeptOpt] = useState([]);
  const [multiDepartment, setmultiDepartment] = useState([]);
  const [Department, setDepartment] = useState("");
  const [Year, setYear] = useState("");
  const [Semester, setSemester] = useState("");
  const [deletedata, setdeletedata] = useState();
  const [options, setOptions] = useState([]);
  const [AnnouncementDate, setAnnouncementDate] = useState("");//new useState
  const [TamilTranslate, setTamilTranslate] = useState("");
  const [EnglishTranslate, setEnglishTranslate] = useState("");
  const [englishTranslate, setenglishTranslate] = useState("");
  const [TranslateOptions, setTranslateOptions] = useState([]);
  //const[IsReadytoSend,setIsReadytoSend]=useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [validated, setvalidated] = useState(false);
  const [SenderType, setSenderType] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [UploadErrorMsg, setUploadErrorMsg] = useState("");

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState();
  const [selectedFile, setselectedFile] = useState("");
  const [filesList, setfilesList] = useState([]);
  const [fileName, setFileName] = useState();

  const [Bulkfile, setBulkFile] = useState();
  const [selectedBulkFile, setselectedBulkFile] = useState("");
  const [filesBulkList, setfilesBulkList] = useState([]);
  const [fileBulkName, setBulkFileName] = useState();

  const [From, setFrom] = useState('en');
  const [To, setTo] = useState('tam');
  const runFillAnnouncementData = useRef();

  const [datevalidation , setdatevalidation] = useState(true);

  const clearState = () => {

    /*switch (type) {
      case "Department": {
        
       
        setId("");
       

        return;
      }
      
     
      
      
    }*/
    setId("");
    setAnnouncementDate("")
    setEnglishTranslate("");
    setTamilTranslate("");
    setSenderType("");
    setFile("");
    setfilesList([]);
    setFileName("");
    setselectedFile("");
    setPhoneNumber("");
    setBulkFile("");
    setBulkFileName("");
    setfilesBulkList([]);
    setselectedBulkFile("");
    seterrorMsg("");
    setvalidate("");
    setErrorMsg("");
    setUploadErrorMsg("");
  };
  const downloadFileFun = async () => {
    debugger;

    AsyncGetFiles(API.downloadAnnouncementFiles + "?id=" + id)
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
  const englishtranslate = (val) => {
    debugger;


    setEnglishTranslate(val.target.value);


  };
  const tamiltranslate = (val) => {

    setTamilTranslate(val.target.value);

  };


  const dept = (val) => {

    setDepartment(val.target.value);
    const present = multiDepartment.find((itm) => itm === val);
    //clearState("batch");
    if (present || !val) return;
    setmultiDepartment((pre) => (pre.length > 0 ? [...pre, val] : [val]));

  };
  const othersmblno = (val) => {
    if (/^[0-9,]*$/.test(val.target.value) == false) {
      //error message
    } else {
      setPhoneNumber(val.target.value);
    }

  };
  const date = (val) => {

    setAnnouncementDate(val.target.value);

  };

  // const onFileChangeBulkUpload = async (e) => {
  //   debugger;
  //   let BulkFiles = e.target.files;
  //   if (BulkFiles[0].name != "Member.xlsx") {
  //     setUploadErrorMsg("File Name should be Member.xlsx only")
  //   }
  //   else {
  //     setUploadErrorMsg("");
  //   }
  //   setselectedBulkFile(BulkFiles);
  //   setBulkFile(e.target.files[0]);
  //   setBulkFileName(e.target.files[0].name);
  // };


  // const downloadBulkFileFun = async () => {
  //   AsyncGetFiles(API.DownloadTemplate)
  //     .then((res) => {
  //       const url = window.URL.createObjectURL(
  //         new Blob([res.data], { type: "application/zip" })
  //       );

  //       const link = document.createElement("a");

  //       link.href = url;

  //       link.setAttribute("download", "file.zip");

  //       document.body.appendChild(link);

  //       link.click();

  //       link.parentNode.removeChild(link);
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const onFileChange = async (e) => {
    debugger;
    let AllFiles = e.target.files;
    const blob =
      new Blob([AllFiles[0]], { type: AllFiles[0].type });

    if (blob.size > 10000000) {

      setErrorMsg("Uploaded file exceeds the maximum file size of 10,000,000 bytes.");
    }
    else {
      setErrorMsg("");
    }

    setselectedFile(AllFiles);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onFileUpload = async (res) => {
    debugger;
    if (selectedFile?.length > 0)  {
      console.log(res, "response");
      const formData = new FormData();
      const fileUploaded = selectedFile[0];

      formData.append("FormFiles", fileUploaded);

      
      

      formData.append("TypeofUser", "Announcement");
      formData.append("id", Number(res.id || 0));
      // formData.append("EnglishTranslate", res.englishTranslate);
      // formData.append("TamilTranslate", res.tamilTranslate);
      // formData.append("OthersPhoneNumber", res.phoneNumber);
      // formData.append("SenderType", res.senderType);
      //NUMBER //SENDERTYPE;
      try {
        debugger;
        const res = await AsyncPost(API.uploadFacultyfiles, formData);
        //dispatch(fetchFaculties());
        //closePopup();
        // clearState();
      } catch (ex) {
        console.log(ex);
      }

    }
  };
  const _onChange = ({ key, data }) => {

    const functionallity = {

      SenderType: (data) => {
        setSenderType(data);
      }

    };
    functionallity[key](data);
  };

  const validationFun = () => {


    setvalidate(true);
    if (
      From &&
      To &&
      (EnglishTranslate || TamilTranslate) &&
      SenderType
      //(SenderType =="Others" && !PhoneNumber)


    ) {
      if ((SenderType == "Others" && PhoneNumber == "") || (SenderType == "Members" && selectedBulkFile.length <= 0) || ErrorMsg != "") {
        seterrorMsg("Provide all required fields");

        return true;
      }

      setvalidate(false);
      return false;
    } else {
      seterrorMsg("Provide all required fields");
      return true;
    }
  };
  useEffect(() => {
    debugger;
    AsyncGet(API.Announcement)
      .then((res) => {
        console.log(res.data[0], "getAnnouncementDetails");

        setTranslateOptions(res.data);
        console.log(TranslateOptions, "Announcement");
        if (res.data.length > 0) {
          runFillAnnouncementData.current = true;
          if (runFillAnnouncementData.current) {
            fillAnnouncementData(res.data[0]);

          }

        }
      })

      .catch((err) => {
        console.log(err);
      });

  }, []);

  const translate = async () => {


    debugger;


    const response = await AsyncGet(
      API.getTransulate + "From=" + From + "&To=" + "ta" + "&EnglishTranslate=" + EnglishTranslate
    );
    console.log(response.data, "language");
    setTamilTranslate(response.data);

  };
  const dob = (val) => {  //Add Setdatevalidation-State and Datevalidation
    
     const inputDate = new Date(val.target.value);
     const year = inputDate.getFullYear();

     if (isNaN(inputDate.getTime()) || year < 1900) {
    setAnnouncementDate('');
    setdatevalidation(true);  
     return;
  }
     const formattedDate = `${year}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;
     setAnnouncementDate(formattedDate);
     setdatevalidation(false);
  
    //setAnnouncementDate(val.target.value);
  };


  const saveannouncementdetails = async (data) => {
    debugger;
    seterrorMsg("");
    const error = validationFun();
    if (error) {
      return;
    }

    var announcementdata = {

      Id: Number(id),

      AnnouncementDate: AnnouncementDate,
      SenderType: SenderType,
      //NUMBER;
      // Department:multiDepartment.toString(),
      // Semester:Semester,
      EnglishTranslate: EnglishTranslate,
      TamilTranslate: TamilTranslate,
      IsReadytoSend: data,
      IsEmailSend:false,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date(),
    };
    try {
      debugger;
      console.log("announcement", announcementdata);
      const resp = await addAnnouncementDetails(announcementdata, dispatch);
     
      await onFileUpload(resp);
      if (resp.id != 0 && data) {
        alert("Announcement start to send");
      }
    
      window.location.reload(true);
      // dispatch(fetchannouncements());
      // return resp;
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
      clearState();
    }

  }


  const deletedetails = async (id) => {
    debugger;

    try {

      const response = await AsyncPost(API.Announcement + "?id=" + id)
      console.log(response, "response");
      window.location.reload(true);
      //dispatch(fetchannouncements());    
    }
    catch (er) {
      console.log("failure of add indent");
    }
  }


  const fillAnnouncementData = (data) => {
    debugger;
    runFillAnnouncementData.current = false;

    const obj = data;

    // console.log(obj);
    setId(obj.id);
    setSenderType(obj.senderType);
    setPhoneNumber(obj.phoneNumber);
    setselectedFile(obj.filePath);
    setfilesList(obj.files);
    setAnnouncementDate(obj.announcementDate);
    setEnglishTranslate(obj.englishTranslate);
    setTamilTranslate(obj.tamilTranslate);
    setselectedBulkFile(obj.filePath);
    setfilesBulkList(obj.memeberFiles);
    // setIsReadytoSend(obj.data.isReadytoSend);

    runFillAnnouncementData.current = true;
  };




  return (
    <div className="App" style={{ marginTop: "40px" }}>

      <div className="row formadduser">

        <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
          <p className="m-0"><span style={{ color: "red" }}>*</span> Select Sender</p>
          <select
            className="form-select form-control"
            onChange={(e) =>
              _onChange({ key: "SenderType", data: e.target.value })}

            value={SenderType}
            maxLength={150}
          >
            <option>Select Sender</option>
            <option value={"Student"}>Student</option>
            <option value={"Faculty"}>Teacher</option>           
          </select>
          {!SenderType && validate ? (
            <h6 style={{ color: "red" }}>{"Required"}</h6>
          ) : null}
        </div>
        <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
        <p className="m-0"><span style={{ color: "red" }}>*</span> Announcement Valid Until
                </p>
                <input
                  className="form-control"
                  type="date"
                  value={dayjs(AnnouncementDate).format("YYYY-MM-DD")}
                //  max={Moment().subtract(15, "year").format("YYYY-MM-DD")}
                min={dayjs().format("YYYY-MM-DD")}  
                  onChange={dob}
                />
              </div>
       
        <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
          <p class="m-0">Attachment</p>
          <input
            className="form-control"
            onChange={onFileChange}
            type="file"
            id="formFileMultiple"
          //multiple
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
          <h6 style={{ color: "red" }}>{ErrorMsg}</h6>
        </div>


        <div className="flex" style={{ display: "flex" }}>
          <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
            <p className="m-0">  <span style={{ color: "red" }}>*</span> From ({From}) :</p>
            <select


              className="form-control"
              aria-label="Default select example"
              onChange={(e) => setFrom(e.target.value)}>


              <option selected code="en" value="en">English</option>
            </select>

            {!From && validate ? (
              <h6 style={{ color: "red" }}>{"Required"}</h6>
            ) : null}
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
            <p className="m-0"><span style={{ color: "red" }}>*</span> To ({To}) :</p>
            <select
              className="form-control"
              aria-label="Default select example"
              onChange={(e) => setTo("ta")}
            >


              <option code="ta" value="ta">Tamil</option>
              {/*{options.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.name}
            </option>
            ))}*/}
            </select>
            {!To && validate ? (
              <h6 style={{ color: "red" }}>{"Required"}</h6>
            ) : null}
          </div>
        </div>
        <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
          <p className="m-0"><span style={{ color: "red" }}>*</span>
            English Translate
          </p>
          <textarea

            className="form-control clstransulate"
            cols="50"
            rows="10"
            value={EnglishTranslate}
            onChange={englishtranslate}
            maxLength={150}

          //onInput={(e) => setEnglishTranslate(e.target.value)}

          >

          </textarea>
          {!EnglishTranslate && validate ? (
            <h6 style={{ color: "red" }}>{"Required"}</h6>
          ) : null}

        </div>

        <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
          <p className="m-0">   <span style={{ color: "red" }}>*</span>Tamil Translate </p>
          <textarea
            className="form-control clstransulate"
            cols="50" rows="10"

            value={TamilTranslate}
            onChange={tamiltranslate}
          // maxLength={150}
          >

          </textarea>
          {!TamilTranslate && validate ? (
            <h6 style={{ color: "red" }}>{"Required"}</h6>
          ) : null}
        </div>
      </div>
      {(SenderType != "Members" && SenderType != "Others") && (
        <div className="row report-btns-block mb-5 py-2">
          <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={e => translate()}>Translate</button>
          </div>

          {/* <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={e => saveannouncementdetails(false)} >Save</button>
          </div> */}
          <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-success btn-block w-100"
              onClick={e => saveannouncementdetails(true)}>Send Message</button>
          </div>
          {/* <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-danger btn-block w-100"
              onClick={() => downloadBulkFileFun()}>Download Template</button>
          </div> */}
          <div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-danger btn-block w-100"

              onClick={e => {  clearState() }}>Reset</button>
          </div>
        </div>
      )}
      {((SenderType == "Members") || (SenderType == "Others")) && (
        <div className="row report-btns-block mb-5 py-2">
          <div className="col-lg-3 d-flex my-1 flex-column justify-content-center">
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={e => translate()}>Translate</button>
          </div>

          {/*<div className="col-lg-4 d-flex my-1 flex-column justify-content-center">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={e => saveannouncementdetails(false)} >Save</button>
        </div>*/}
          <div className="col-lg-3 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-success btn-block w-100"
              onClick={e => saveannouncementdetails(true)}>Upload and Send</button>
          </div>
          {/* <div className="col-lg-3 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-danger btn-block w-100"
              onClick={() => downloadBulkFileFun()}>Download Template</button>
          </div> */}
          <div className="col-lg-3 d-flex my-1 flex-column justify-content-center">
            <button
              type="button"
              className="btn btn-secondary btn-block w-100"

              onClick={e => { if (window.confirm('Are you sure you want to delete \"' + " " + EnglishTranslate + "\"  record in Announcement ?")) deletedetails(id) }}>Delete</button>
          </div>
        </div>
      )}


    </div>
  );


};
export default AddAnnouncementDetails;