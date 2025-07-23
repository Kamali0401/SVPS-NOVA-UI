import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import dayjs from "dayjs";
import Moment from "moment";

/*import {
  //addPasswordDetails,
  fetchPasswords,
  UpdateChangePasswords,
} from "../../../app/redux/slices/changepasswordSlice";*/
import "./styles.css";
//import "../../../app/styles/addnew.css";
import { AsyncGet, AsyncGetFiles, AsyncPost } from "../../../app/services/https";
import { API } from "../../../app/services/endpoints";
import SearchBox from "./searchBox";
import axios from "axios";
import { Alert } from "react-bootstrap";

const NewItem = ({ item, closePopup, password }) => {
  // 	if (!item) {
  // 		return <div>loading</div>
  // 	}
  //  // set up dispatch
  const dispatch = useDispatch();
  
  const [Id, setId] = useState();

  const [RoleId, setRoleId] = useState();
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [OldPassword, setCurrentPassword] = useState("");
  const [NewPassword, setChangePassword] = useState("");
  const [ReenterNewPassword, setConfrimPassword] = useState("");
 
 //const [Verification,setVerification]=useState("Failure");  
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [pswdErrorMsg, setPswdErrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  
  const runFillActivityData = useRef();
  var validation ="Failure";
  const clearState = () => {
    setId("");
    setChangePassword("");
    setConfrimPassword("");
   // setTopic("");
    setCurrentPassword("");    
    seterrorMsg("");
    setvalidate("");    
    console.log("reseted");
  };
  
  const currentpassword = (val) => {
    if (
      /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(val.target.value) ==
      false
    ) {
      //error message
    } else {
      setCurrentPassword(val.target.value);
    }
  };
  const changepassword = (val) => {
    if (
      /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(val.target.value) ==
      false
    ) {
      //error message
    } else {
      setChangePassword(val.target.value);
    }
  };
  const confrimpassword = (val) => {
    if (
      /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(val.target.value) ==
      false
    ) {
      //error message
    } else {
      setConfrimPassword(val.target.value);
    }
  };

  const Verifypassword = async () => {
    debugger
    try {
     
      const error = validationFun(OldPassword);
    if (error) {
      return;
    }   
     const response = await AsyncGet(     
      `${
        API.verifypassword
      }?username=${JSON.parse(localStorage.getItem("user")).userName}&password=${OldPassword}`
      );
      console.log(response?.data, "verifypassword response");
      if (response?.data?.length == 1) {
        validation="Success";
        //setVerification("Success");
        alert("Password verified");   
      
      }
      else if
        (response?.data?.length < 1 || !response?.data) {
          //setVerification("Failure");
          validation="Failure";
          alert("Verification failed! Password mismatch"); 
        }
        else if
        (response?.data?.length > 1 || !response?.data) {
          //setVerification("Failure");
          validation="Failure";
          alert("Multiple User Found in Given password");
        }
      
    } catch (error) {
      
      console.log(error);
     
    }
  };
  const updatePasword = async () => {
    debugger
    const error = validationFun(OldPassword);
    if (error) {
      return;
    } 
    if(NewPassword == ReenterNewPassword ){
      try {  
        debugger;
       const response = await AsyncPost(     
        `${
          API.updatePasswordData
        }?username=${localStorage.getItem("facultyUsername")}&FacultyId=${localStorage.getItem("userId")}
        &OldPassword=${OldPassword}&NewPassword=${NewPassword}`
        );
        debugger;
        console.log(response?.data, "updatePasswordData response");  
        if(response.data =="Success")   
        {
          alert("Successfully updated your new password : " + NewPassword );}
          else if(response?.data ==50000)
          {
            alert("Password Mismatch. ");
          }
          // clearState();
          // closePopup();
      } catch (error) {
        
        console.log(error);
        alert("Something Went Wrong! While update password.");
        // closePopup();
        // clearState();
      }
    }
      else{
        alert("New passwords are not similar.");
        // setChangePassword("");
        // setConfrimPassword("");
      }
  clearState();
  closePopup();
  };



  const validationFun = () => {
    setvalidate(true);
    if (      
      OldPassword &&
      NewPassword &&
      ReenterNewPassword
    ) {
      setvalidate(false);
      return false;
    }
    seterrorMsg("Provide all required fields");
    return true;
  };

  const closePopupFun = () => {
   
    closePopup();
   
    //window.location.reload(false);
  };

 
  
  // const onFileChange = async (e) => {
  //   let AllFiles = e.target.files;
  //   setselectedFile(AllFiles);
  //   setFile(e.target.files[0]);
  //   setFileName(e.target.files[0].name);
  // };

  const fillActivityData = (obj) => {
    runFillActivityData.current = false;

    // console.log(obj);
    setId(obj.data.id);
    setChangePassword(obj.data.NewPassword);
    setConfrimPassword(obj.data.ReenterNewPassword);  
    setCurrentPassword(obj.data.OldPassword);  
    seterrorMsg("");
    runFillActivityData.current = true;
  };

  useEffect(() => {
    if (!password) {
      return;
    }
    runFillActivityData.current = true;
    if (runFillActivityData.current) {
      fillActivityData(password);
    }
  }, []);

  return (
    <div className="popup border">
    <div className="popup-inner modal-content" >
        <div className="col">
          <div className="formdata">
            <h2 className="heading">Change Password</h2>
            <button
              className="btn btn-lg btnclose"
              onClick={() => closePopupFun()}
              type="button"
            >
              X
            </button>
            
            <div className="row formadduser">
            
            <div className="form-check form-check-inline">
            
            <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label>
                  <span style={{ color: "red" }}>*</span>Current Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={OldPassword}
                  onChange={currentpassword}
                />
                {!OldPassword && validate ? (
                  <h6 style={{ color: "red" }}>{"Requird"}</h6>
                ) : null}
               </div>      
            
{/*            
               <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <button
                  className="btn btn-lg btn-secondary btn-block form-roundedbtn2 buttonW"
                  type="button"                  
                  onClick={() => Verifypassword()}
                >
                  Verify 
                </button>
                </div> */}
             
             {/*<div className="form-check form-check-inline">*/}
             
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>
                  New Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={NewPassword}
                  onChange={changepassword}
                />                
              </div>        
             
             
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
                <label><span style={{ color: "red" }}>*</span>
                 Re-enter New password
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={ReenterNewPassword}
                  onChange={confrimpassword}
                />                
              </div>
               
              <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12  form-group">
              <button
                  className="btn btn-lg btn-secondary btn-block form-roundedbtn3 buttonW"
                  type="button"
                  onClick={() => updatePasword()}
                >
                  Verify & Update
                </button>
                </div>  
                          
                </div>   
                       
            </div>    
              
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>           
            {/*<p>
                            <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={() => updatePasword()}
                >
                  Update
                </button>            
            
                </p>*/}            
          </div>
        </div>
      </div>
      </div>
  );
};
export default NewItem;
