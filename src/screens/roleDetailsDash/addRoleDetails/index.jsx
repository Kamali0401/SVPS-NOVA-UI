import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';

import {
  addRoleDetails,
  UpdateRoleDetails,
} from "../../../app/redux/slices/roleSlice";

const AddRoleDetails = ({ isEdit,item, closePopup, role }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    if (!role) {
      return;
    }
    runFillRoleData.current = true;
    if (runFillRoleData.current) {
      fillRoleData(role);
    }
  }, []);
  
  const [RoleId, setRoleId] = useState("");
  const [Name, setName]= useState("");
  // const [CreatedBy, setCreatedBy] = useState("");
  // const [CreatedDate, setCreate] = useState("");
  // const [ModifiedBy, setCompanyAddr] = useState("");
  // const [ModifiedDate, setCurrentWorkLocation] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [Clicked , setClicked] = useState(false);
    const [updateClicked , setUpdateClicked] = useState(false);     
  //const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const runFillRoleData = useRef();

  const clearState = () => {
    setName("");
  };
  const rName = (val) => {
  
      if(/^[a-z A-Z]*$/.test(val.target.value) == false){
        //error message
      }     else
      {
    setName(val.target.value);
      }
  };
 

  
  const saveRoleDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
    setClicked(true);
    var roleData = {
      Name : Name,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: "",
      ModifiedDate: new Date()
    };

    // console.log("activitydata", activityData);
    dispatch(addRoleDetails(roleData));
    closePopup();
    clearState();
  };

  const updateRoleDetails = () => {
    seterrorMsg("");
    const error = validationFun();
    if (!error) {
      return;
    }
      setUpdateClicked(true);
    var data = {
      RoleId: RoleId,
      Name :Name,
      CreatedBy: localStorage.getItem("username"),
      CreatedDate: new Date(),
      ModifiedBy: localStorage.getItem("username"),
      ModifiedDate: new Date()
    };

    const roleData = {
      ...role,
        data: data
    };

    console.log("UpdateRole", roleData.data);
    dispatch(UpdateRoleDetails(roleData.data));
    closePopup();
    clearState();
  };

  const validationFun = () => {
    setvalidate(true);
    if (
      !Name
    ) {
      setvalidate(false);
      seterrorMsg("Provide Role Name field");
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

  const fillRoleData = (obj) => {
    runFillRoleData.current = false;
    setRoleId(obj.data.roleId);
    setName(obj.data.name);
    runFillRoleData.current = true;
  };

  return (
    <div className="popup">
  <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
          <h2 className="heading">{isEdit ? "Edit Role" : "Add New Role"}</h2>
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
                <label><span style={{ color: "red" }}>*</span>Role Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={Name}
                  onChange={rName}
                  maxLength={25}
                />
              </div>  
            </div>
            &nbsp;
            <div className="d-flex justify-content-center align-items-enter">
              {errorMsg ? <h6 style={{ color: "red" }}>{errorMsg}</h6> : null}
            </div>
            <p>
              {!role ? (
                <button
                  className="btn btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={() => saveRoleDetails()}
                    disabled={Clicked}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-lg btn-primary btn-block form-roundedbtn"
                  type="button"
                  onClick={() => updateRoleDetails()}
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

export default AddRoleDetails;