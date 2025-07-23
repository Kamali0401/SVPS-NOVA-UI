import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import AddRoleDetails from "./addRoleDetails/index";
import AdvanceTable from "./advanceTable";
import {
  fetchRoles,
  roleSelector,
  deleteRole,
} from "../../app/redux/slices/roleSlice";

import Popup from "reactjs-popup";

const RoleDetails = () => {
  // set up dispatch
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, error, roleList } = useSelector(roleSelector);
  const [IsEdit, setIsEdit] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [assessment, setassessment] = useState("");
  const [role, setRole] = useState();
  const [listOfRole, setlistOfRole] = useState(roleList || []);

  const togglePopup = () => {
    onAssessmentSelection("Role Details");
    setshowPopup(!showPopup);setIsEdit(false);
    if (!showPopup) {
      setRole();
    }
  };

  const onAssessmentSelection = (assessment) => {
    setassessment(assessment);
  };

  // fetch data from our store

  // console.log(loading);
  console.log("Fetch data from Store", roleList);

  const deleteRoleFun = (item) => {
    
    dispatch(deleteRole(item.roleId));
  };

  const editRole = (item) => {
    debugger;
    setRole({ ...item, data: item });
    setshowPopup(!showPopup);
    setIsEdit(true);
  };

  useEffect(() => {
    getRoleData();
  }, []);
  
  const getRoleData = () => {
    dispatch(fetchRoles());
  };

  useEffect(() => {
    if (!roleList) {
      return;
    }
    setlistOfRole(roleList);
  }, [roleList]);

  console.log("Before Render roleList", roleList);
  console.log("Before Render listOfRole", listOfRole);

  // render the items
  const renderItems = () => {
    //loading state
    if (loading) return <strong>Loading please wait...</strong>;

    // error state
    if (error) return <strong>Items not available at this time</strong>;

    // regular data workflow
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="formsec">
          <div className="row">
            <h2 className="heading col pt-2">Role Details</h2>
            <div className="but col text-end">
              <button
                onClick={() => togglePopup()}
                className="btn btn-lg btn-success btn-block form-roundedbtn3"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
              >
                <i className="fa fa-plus"></i> ADD NEW
              </button>
              {/*<button
                className="btn btn-lg btn-secondary btn-block form-roundedbtn2"
                type="submit"
              >
                <span className="glyphicon glyphicon-remove"></span> DELETE
              </button>*/}
            </div>
          </div>
          <div className="bootstrap-table">
            <div className="fixed-table-toolbar">
            </div>
            <div className="fixed-table-container">
              <div className="fixed-table-body">
              <AdvanceTable
                  deleteRoleProp={(item) => deleteRoleFun(item)}
                  editRoleProp={(item) => editRole(item)}
                  data={listOfRole}
                />
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    ADD NEW
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Role Id:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Role Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Event Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="recipient-name"
                      />
                    </div> */}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup ? (
          <AddRoleDetails
          isEdit={IsEdit}
            item={assessment}
            closePopup={togglePopup}
            role={role}
          />
        ) : null}
      </div>
    );
  };

  // template
  return (
    // onWheel={()=> {dispatch(fetchProducts("Sarees"));}}
    <div>{renderItems()}</div>
  );
};
export default RoleDetails;
