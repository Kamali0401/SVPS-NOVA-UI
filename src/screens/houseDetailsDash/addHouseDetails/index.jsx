import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addHouseDetails,
  UpdateHouseDetails,
} from "../../../app/redux/slices/houseSlice";

const AddHouseDetails = ({ isEdit, item, closePopup, house }) => {
  const dispatch = useDispatch();
  const runFillHouseData = useRef();

  const [Id, setId] = useState("");
  const [HouseDetails, setHouseDetails] = useState("");
  const [isActive, setIsActive] = useState(false); // ✅ UPDATED: default is false
  const [errorMsg, seterrorMsg] = useState("");
  const [validate, setvalidate] = useState(false);
  const [Clicked , setClicked] = useState(false);//addded
  const [updateClicked , setUpdateClicked] = useState(false);//added


  useEffect(() => {
    debugger;
    if (!house) return;
    runFillHouseData.current = true;
    if (runFillHouseData.current) {
      fillHouseData(house);
    }
  }, []);

  const houseChange = (val) => {
    setHouseDetails(val.target.value);
  };

  const handleActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  const clearState = () => {
    setHouseDetails("");
    setIsActive(false); // ✅ UPDATED: reset to false
  };


  const saveHouseDetails = () => {
    seterrorMsg("");
    const isValid = validationFun();
    if (!isValid) return;
    setClicked(true);//added
    const HouseData = {
      name: HouseDetails,
      isActive: isActive,
      CreatedBy: localStorage.getItem("username"),
    };

    dispatch(addHouseDetails(HouseData));
    closePopup();
    clearState();
  };

  const updateHouseDetails = () => {
    seterrorMsg("");
    const isValid = validationFun();
    if (!isValid) return;
      setUpdateClicked(true);//added
    const data = {
      Id: Id,
      name: HouseDetails,
      IsActive: isActive,
      ModifiedBy: localStorage.getItem("username"),
    };

    dispatch(UpdateHouseDetails(data));
    closePopup();
    clearState();
  };

  const validationFun = () => {
    setvalidate(true);
    if (!HouseDetails) {
      setvalidate(false);
      seterrorMsg("Provide All Required field");
      return false;
    }
    return true;
  };

  
//added
  const sumitted = () =>{
         
      if(Clicked) return;
      
      saveHouseDetails();

  };
//added
  const updateSumited = () =>{
    if (updateClicked) return;
    
    updateHouseDetails();
  };

  const closePopupFun = () => {
    clearState();
    closePopup();
  };

  const fillHouseData = (obj) => {
    debugger;
    console.log("Editing house data:", obj); 
    runFillHouseData.current = false;
    setId(obj.data.id);
    setHouseDetails(obj.data.name);
    setIsActive(obj.data.is_Active);
    runFillHouseData.current = true;
  };

  return (
    <div className="popup">
      <div className="popup-inner modal-content">
        <div className="col">
          <div className="formdata">
            <h2 className="heading">
              {isEdit ? "Edit House Details" : "Add New House Details"}
            </h2>
            <button
              className="btn btn-lg btnclose"
              onClick={closePopupFun}
              type="button"
            >
              X
            </button>

            <div className="col-xs-6 col-md-6 col-lg-6 col-sm-12 form-group">
              <label>
                <span style={{ color: "red" }}>*</span>House Details
              </label>
              <textarea
                className="form-control"
                type="text"
                value={HouseDetails}
                onChange={houseChange}
                maxLength={3000}
              ></textarea>
            </div>

            {/* ✅ UPDATED: Always show checkbox in both add/edit */}
            <div className="form-group mt-2">
              <label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={handleActiveChange}
                />{" "}
                Is Active
              </label>
            </div>

            <div className="d-flex justify-content-center align-items-enter mt-2">
              {errorMsg && <h6 style={{ color: "red" }}>{errorMsg}</h6>}
            </div>

            <div className="mt-3">
              {!house ? (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHouseDetails;
